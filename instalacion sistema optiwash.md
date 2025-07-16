1. Crea la carpeta optiwash y dentro la carpeta server(cliente y package.json se crea después)

| OptiWash/├── client/       \# Aplicación React \+ Vite├── server/       \# Backend Express \+ MySQL├── package.json  \# Configuración principal |
| :---- |

2. se crea le package.json raíz

| cd OptiWashnpm init \-y |
| :---- |

3. Instala concurrently para ejecutar ambos servidores en la carpeta optiwash:

| npm install concurrently \--save\-dev |
| :---- |

4. Scripts para ejecutar ambos servidores. En el package.json de la raíz:

|   "scripts": {    "test": "echo \\"Error: no test specified\\" && exit 1",    "cliente": "cd cliente && npm run dev",    "server": "cd server/src && node server.js",    "dev": "concurrently \\"npm run server\\" \\"npm run cliente\\""  }, |
| :---- |

   

5. instalación de ract+vite en la carpeta cliente mas las dependencias(router-dom y axios)

| npm create vite@latest cliente \--template reactcd clientenpm installnpm i react-router-dom axios |
| :---- |

   

6. En la carpeta server creamos el package.json y las dependencias(express, mysql2 y dotenv)

| cd servernpm init \-ynpm i express mysql2 dotenv |
| :---- |

   

7. Server/package.json,arriba de name:

| "type": "module", |
| :---- |

8. `Proxy:(cliente/vite.config) reemplazar todo todo por:`

| import { defineConfig } from 'vite';import react from '@vitejs/plugin-react';export default defineConfig({  plugins: \[react()\],  server: {    proxy: {      '/api': {        target: 'http://localhost:3001',        changeOrigin: true,        secure: false,      },    },  },}); |
| :---- |

9. Reemplazar las carpeta src de /server por la src \- backend al igual que el src de /cliente por src \-frontend. estados carpetas deben quedar con el nombre de src. sin el guion ni frontend o backend.

10. Subir la BD al servidor y revisar las variables de entorno(server/.env)(carpeta backend en server y frontend en cliente)

| DB\_HOST=localhostDB\_USER=rootDB\_PASS=DB\_NAME=OptiWashPORT=3001 |
| :---- |

  


11. Ejecutar la aplicación

| npm run dev |
| :---- |

Esto iniciará tanto el servidor Express (en puerto 3001\) como el servidor de desarrollo de Vite (normalmente puerto 5173).

12. si hay un error instalar node.js ultima version ([https://nodejs.org/es/download](https://nodejs.org/es/download))  
13. si hay otro error iniciar powershell como administrador y poner el siguiente comando:

| Set\-ExecutionPolicy RemoteSigned |
| :---- |

    

    