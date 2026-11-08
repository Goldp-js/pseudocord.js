import { AsyncLocalStorage } from 'node:async_hooks';

export class ExecutionCancelledError extends Error {
  constructor(message = 'Ejecución cancelada') { super(message); this.name = 'ExecutionCancelledError'; }
}
interface Budget { startedAt: number; iterations: number; maxIterations: number; maxExecutionMs: number; }
interface Scope { budget: Budget; signal?: AbortSignal; }
const storage = new AsyncLocalStorage<Scope>();

/** Cada comando/evento recibe su propio presupuesto. Las ramas comparten presupuesto, no el de otros comandos. */
export function runExecution<T>(limits: {maxIterations: number; maxExecutionMs: number}, signal: AbortSignal | undefined, run: () => Promise<T>): Promise<T> {
  const budget = { startedAt: Date.now(), iterations: 0, ...limits };
  return storage.run({budget, signal}, run);
}
export function currentSignal(): AbortSignal | undefined { return storage.getStore()?.signal; }
/** Milisegundos disponibles antes del límite de ejecución; Infinity fuera del intérprete. */
export function remainingExecutionMs():number {
  const b=storage.getStore()?.budget;
  return b?Math.max(0,b.maxExecutionMs-(Date.now()-b.startedAt)):Infinity;
}
export function executionGuard(loop = false): void {
  const scope = storage.getStore(); if (!scope) return;
  if (scope.signal?.aborted) throw new ExecutionCancelledError();
  if (Date.now() - scope.budget.startedAt > scope.budget.maxExecutionMs)
    throw new Error(`Ejecución interrumpida: tiempo máximo excedido (${scope.budget.maxExecutionMs} ms).`);
  if (loop && ++scope.budget.iterations > scope.budget.maxIterations)
    throw new Error(`Ejecución interrumpida: límite de iteraciones excedido (${scope.budget.maxIterations}).`);
}

/** Bloquea hasta finalizar o cancelar. La cancelación es cooperativa, no termina una llamada externa ya enviada. */
export function sleepCancelable(ms: number): Promise<void> {
  const signal = currentSignal();
  if (!Number.isFinite(ms) || ms < 0 || ms > 2_147_483_647) throw new RangeError('ESPERAR: duración no válida (milisegundos finitos no negativos requeridos).');
  executionGuard();
  return new Promise((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const cleanup = () => { if (timer) clearTimeout(timer); signal?.removeEventListener('abort', onAbort); };
    const onAbort = () => { cleanup(); reject(new ExecutionCancelledError()); };
    signal?.addEventListener('abort', onAbort, {once: true});
    if (signal?.aborted) { onAbort(); return; }
    timer = setTimeout(() => { cleanup(); resolve(); }, ms);
  });
}

function childSignal(parent?: AbortSignal): {controller: AbortController; dispose: () => void} {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (parent?.aborted) controller.abort();
  else parent?.addEventListener('abort', abort, {once: true});
  return {controller, dispose: () => parent?.removeEventListener('abort', abort)};
}

/** Corre una rama con señal de cancelación propia conservando el presupuesto de su ejecución padre. */
function fork<T>(signal: AbortSignal, task: () => Promise<T>): Promise<T> {
  const scope = storage.getStore();
  if (!scope) return task();
  return storage.run({...scope, signal}, task);
}

export async function runConcurrent<T>(branches: readonly (() => Promise<T>)[], mode: 'all' | 'race'): Promise<T[] | T> {
  if (!branches.length) return mode === 'all' ? [] : undefined as T;
  const children = branches.map(() => childSignal(currentSignal()));
  const tasks = branches.map((run, i) => fork(children[i]!.controller.signal, run));
  try { return mode === 'race' ? await Promise.race(tasks) : await Promise.all(tasks); }
  finally { for (const child of children) { child.controller.abort(); child.dispose(); } }
}

/** Si vence el tiempo, cancela la rama del intérprete y permite ejecutar EXPIRA. */
export async function runWithTimeout<T>(ms: number, body: () => Promise<T>, onTimeout?: () => Promise<T>): Promise<T | undefined> {
  if (!Number.isFinite(ms) || ms < 0 || ms > 2_147_483_647) throw new RangeError('TIEMPO_LIMITE: milisegundos fuera de rango o no finitos.');
  const parent = currentSignal();
  const child = childSignal(parent);
  let timer: ReturnType<typeof setTimeout> | undefined;
  let timedOut = false;
  const parentCancel = () => child.controller.abort();
  const cancellation = new Promise<never>((_, reject) => {
    const onAbort = () => {
      child.controller.signal.removeEventListener('abort', onAbort);
      reject(new ExecutionCancelledError());
    };
    child.controller.signal.addEventListener('abort', onAbort, {once: true});
    if (child.controller.signal.aborted) onAbort();
  });
  try {
    timer = setTimeout(() => { timedOut = true; child.controller.abort(); }, ms);
    return await Promise.race([fork(child.controller.signal, body), cancellation]);
  } catch (err) {
    if (timedOut && err instanceof ExecutionCancelledError) {
      executionGuard(); // también respeta la cancelación del contexto padre
      if (onTimeout) return await onTimeout();
      throw new Error(`TIEMPO_LIMITE: plazo de ${ms} ms agotado.`);
    }
    throw err;
  } finally {
    if (timer) clearTimeout(timer);
    child.controller.abort();
    child.dispose();
    parent?.removeEventListener('abort', parentCancel);
  }
}
