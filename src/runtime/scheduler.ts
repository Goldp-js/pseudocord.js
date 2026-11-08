/** Una ejecución por tarea programada. La cancelación es cooperativa a través del intérprete. */
export class NonOverlappingTask {
  private running = false;
  private stopped = false;
  private controller?: AbortController;
  private inFlight?: Promise<unknown>;
  constructor(private readonly work: (signal: AbortSignal) => Promise<unknown>) {}
  get isRunning(): boolean { return this.running; }
  /** Devuelve false cuando el tick se omite por solapamiento o parada. */
  async run(): Promise<boolean> {
    if (this.running || this.stopped) return false;
    this.running = true;
    const controller = new AbortController();
    this.controller = controller;
    try {
      const task=this.work(controller.signal);
      this.inFlight=task;
      await task;return true;
    }
    finally {this.inFlight=undefined; this.controller=undefined; this.running=false;}
  }
  stop(): void { this.stopped = true; this.controller?.abort(); }
  /** Espera limitada tras solicitar cancelación; false indica I/O pendiente. */
  async drain(maxWaitMs=2000):Promise<boolean>{
    if(!this.inFlight)return true;
    const task=this.inFlight;
    let timer:ReturnType<typeof setTimeout>|undefined;
    try{
      return await Promise.race([
        task.then(()=>true,()=>true),
        new Promise<boolean>(resolve=>{timer=setTimeout(()=>resolve(false),maxWaitMs);})
      ]);
    }finally{if(timer)clearTimeout(timer);}
  }
}
