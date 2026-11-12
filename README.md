# pseudocord.js

**Crea bots de Discord utilizando pseudocódigo en español.**

Pseudocord.js es una biblioteca para **Node.js** que permite definir comandos, eventos e interacciones de Discord mediante un lenguaje de instrucciones legibles. Está construida sobre **discord.js** y ofrece una API para integrar los archivos de pseudocódigo en aplicaciones JavaScript o TypeScript.

> **Estado:** Alpha · **Licencia:** GNU GPL v3.0 (`GPL-3.0-only`)
>
> El proyecto está en desarrollo. La sintaxis y las API pueden cambiar antes de una versión estable.

## Características

- Comandos de barra (`/`), comandos con prefijo y comandos contextuales.
- Opciones tipadas: texto, números, usuarios, booleanos y otros tipos admitidos por Discord.
- Condiciones, operadores lógicos, variables y estructuras de control.
- Respuestas con texto, embeds y componentes interactivos.
- Acceso al usuario ejecutor, los argumentos y el contexto del comando.
- Módulos `.pdiscord` y `.pd` para organizar el código.
- Extensión mediante plugins JavaScript.
- Diagnósticos de análisis, validación y ejecución.

## Requisitos

- **Node.js 22.13 o posterior**.
- Una aplicación de Discord con bot, creada desde el [Discord Developer Portal](https://discord.com/developers/applications).
- Los permisos y ámbitos de instalación necesarios para los comandos que utilices.

## Instalación

```bash
npm install pseudocord.js
```

Para instalar una versión preliminar publicada bajo la etiqueta `alpha`:

```bash
npm install pseudocord.js@alpha
```

## Primer bot

Crea un archivo `commands/ping.pdiscord`:

```text
COMANDO BARRA "ping" DESCRIPCION "Comprueba la respuesta del bot"
    RESPONDER "Pong!"
FIN COMANDO
```

Después crea `bot.mjs`:

```javascript
import { PseudoClient } from 'pseudocord.js';

const bot = new PseudoClient({
  token: process.env.DISCORD_TOKEN,
  commands: {
    sync: 'auto',
    mode: 'upsert'
  }
});

bot.loadCommands('./commands');
await bot.start();
```

Configura `DISCORD_TOKEN` como variable de entorno y ejecuta:

```bash
node bot.mjs
```

**Seguridad:** nunca incluyas el token de tu bot en archivos publicados, repositorios o ejemplos compartidos.

## Ejemplos

### Comando con una opción de usuario

```text
COMANDO BARRA "saludar" DESCRIPCION "Saluda a un usuario"
    OPCION usuario TIPO usuario DESCRIPCION "Destinatario" REQUERIDO
    RESPONDER "Hola {NOMBRE_DE(argumentos.usuario)}"
FIN COMANDO
```

### Avatar con argumento opcional

```text
COMANDO BARRA "avatar" DESCRIPCION "Muestra el avatar de un usuario"
    OPCION objetivo TIPO usuario DESCRIPCION "Usuario a consultar" OPCIONAL
    RESPONDER "{AVATAR_DE(COALESCER(argumentos.objetivo, contexto.usuario))}"
FIN COMANDO
```

En este ejemplo, `argumentos.objetivo` representa el usuario seleccionado y `contexto.usuario` al ejecutor. `COALESCER` permite utilizar al ejecutor cuando no se selecciona otro usuario.

### Valores booleanos

```text
COMANDO BARRA "booleano" DESCRIPCION "Invierte un valor lógico"
    OPCION activo TIPO booleano DESCRIPCION "Estado" REQUERIDO
    RESPONDER "{NO argumentos.activo}"
FIN COMANDO
```

`NO` es el operador de negación lógica: convierte `VERDADERO` en `FALSO` y viceversa.

## Organización de archivos

```text
mi-bot/
├── bot.mjs
├── commands/
│   ├── ping.pdiscord
│   ├── saludar.pdiscord
│   └── avatar.pdiscord
└── package.json
```

Los comandos se pueden dividir en archivos independientes para facilitar su mantenimiento.

## Contexto y argumentos

| Expresión | Descripción |
| --- | --- |
| `contexto.usuario` | Usuario que ejecuta el comando. |
| `argumentos.usuario` | Valor de una opción declarada como `usuario`. |
| `argumentos.objetivo` | Valor de una opción declarada como `objetivo`. |
| `usuario` | Referencia abreviada; si existe una opción homónima, puede referirse a ella. |

Para evitar confusiones, utiliza `contexto.*` para datos de ejecución y `argumentos.*` para opciones del comando.

## Estado del proyecto

Pseudocord.js se distribuye inicialmente como  **Alpha**. Es posible encontrar incompatibilidades o errores de ejecución en determinados comandos e interacciones. Puedes reportarlos en github

## Licencia

Pseudocord.js se distribuye bajo la **GNU General Public License, versión 3** (`GPL-3.0-only`). Consulta el archivo `LICENSE` incluido en el proyecto para conocer los términos completos.

Discord y discord.js pertenecen a sus respectivos titulares. Pseudocord.js es un proyecto independiente y no está afiliado a Discord.
