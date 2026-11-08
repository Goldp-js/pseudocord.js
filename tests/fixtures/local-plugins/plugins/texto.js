export default {
  name: 'texto',
  version: '1.0.0',
  compatibility: { core: '^0.17.0', sdk: '^0.1.0' },
  setup(api) {
    api.services.register('texto', '1.0.0', {
      saludar: (nombre) => `Hola, ${String(nombre)}`
    });
  }
};
