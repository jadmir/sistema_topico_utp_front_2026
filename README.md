# Sistema Tópico - Frontend

Aplicación web frontend construida con Vue 3 y Quasar.

## Requisitos

- **Git** para clonar el repositorio.
- **Node.js** compatible con el proyecto: `22.12` o superior dentro de la versión 22, cualquier versión `24.x` o `26` en adelante. Se recomienda Node.js `24.x`.
- **npm**, incluido con Node.js. El proyecto contiene `package-lock.json`; usa `npm ci` para instalar las versiones bloqueadas.

### Versiones y dependencias

Las versiones de Node.js permitidas están definidas en `package.json`. Los rangos indicados abajo son los declarados por el proyecto; `package-lock.json` fija las versiones exactas que instalará `npm ci`.

| Paquete | Versión declarada |
| --- | --- |
| Node.js | `>=26`, `24.x` o `22.12+` en la rama `22.x` |
| `@quasar/extras` | `^2.1.0` |
| `axios` | `^1.20.0` |
| `pinia` | `^4.0.2` |
| `quasar` | `^2.35.1` |
| `vue` | `^3.5.22` |
| `vue-router` | `^5.0.6` |
| `@quasar/app-vite` | `^3.10.2` |
| `@eslint/js` | `^10.0.1` |
| `@types/node` | `^22.19.11` |
| `@vue/eslint-config-prettier` | `^10.2.0` |
| `@vue/eslint-config-typescript` | `^14.7.0` |
| `autoprefixer` | `^10.4.27` |
| `eslint-plugin-vue` | `^10.8.0` |
| `globals` | `^17.4.0` |
| `postcss` | `^8.5.8` |
| `typescript` | `^6.0.0` |
| `vite-plugin-checker` | `^0.14.5` |
| `vue-eslint-parser` | `^10.4.0` |
| `vue-tsc` | `^3.3.3` |
| `eslint` | `^10.8.0` |
| `prettier` | `^3.8.1` |

La instalación de estas dependencias se realiza automáticamente con `npm ci`; el archivo de bloqueo contiene además sus dependencias transitivas.

## Clonar e instalar en otra PC (Windows)

1. Instala Git desde [git-scm.com](https://git-scm.com/download/win) y Node.js compatible desde [nodejs.org](https://nodejs.org/). Cierra y vuelve a abrir PowerShell después de instalarlos.
2. Verifica que estén disponibles:

   ```powershell
   git --version
   node --version
   npm --version
   ```

3. Clona el repositorio. Reemplaza `<URL_DEL_REPOSITORIO>` por la URL HTTPS o SSH que te proporcione el propietario del repositorio:

   ```powershell
   git clone <URL_DEL_REPOSITORIO> sistema-topico-front
   cd sistema-topico-front
   ```

4. Instala las dependencias exactas del archivo de bloqueo:

   ```powershell
   npm ci
   ```

   No es necesario copiar `node_modules`; se genera en cada computadora. Si el proyecto requiere variables de entorno, solicita sus valores al equipo: los archivos `.env` no se incluyen en Git.

5. Inicia el servidor de desarrollo:

   ```powershell
   npm run dev
   ```

   Quasar abrirá la aplicación en el navegador y mostrará la dirección local en la terminal.

## Backend

El frontend envía las solicitudes API a `http://localhost:3000/api`. Para usar las funciones que dependen de la API, inicia también el backend en esa dirección. Si el backend corre en otra computadora o puerto, actualiza la URL base en `src/services/api.ts` para que apunte al servidor correcto.

## Comandos disponibles

```powershell
npm run dev       # Servidor local de desarrollo
npm run build     # Compilación de producción
npm run typecheck # Verificación de tipos TypeScript/Vue
npm run lint      # Formatea y aplica correcciones de lint
```

La compilación de producción queda en `dist/spa`.
