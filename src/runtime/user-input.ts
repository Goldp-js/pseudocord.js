/** Errores de entrada sin exposición de detalles internos del intérprete. */
export class UserInputError extends Error {
  constructor(message:string){super(message);this.name='UserInputError';}
}
