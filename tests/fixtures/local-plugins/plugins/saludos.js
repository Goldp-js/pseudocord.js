export default {
  name: 'saludos',
  version: '1.0.0',
  compatibility: { core: '^0.17.0' },
  dependencies: { plugins: { texto: '^1.0.0' } },
  setup(api) {
    const service=api.services.get('texto', '^1.0.0');
    api.functions.register('SALUDAR_EXTERNO', (nombre) => service.saludar(nombre));
  }
};
