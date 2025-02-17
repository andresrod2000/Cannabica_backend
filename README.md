# Cannabica_backend

## Descripción

Este es el backend del proyecto cannabica, construido con Node.js, Express y TypeScript.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona el repositorio:
   git clone https://github.com/Jhosgun/Cannabica_backend.git

2. Navega al directorio del proyecto:
cd Cannabica_backend

3. Instala las dependencias:
npm install

Ejecución en modo desarrollo
Para correr la aplicación en modo desarrollo, utiliza el siguiente comando:
npm run dev

Uso
Una vez que el servidor esté corriendo, puedes abrir tu navegador y acceder a la siguiente URL para ver los datos dummy del usuario:

http://localhost:3000/api/user/



```
backend-lotus
├─ nodemon.json
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ app.ts
│  ├─ controllers
│  │  └─ userController.ts
│  ├─ models
│  │  └─ userModel.ts
│  ├─ routers
│  │  ├─ inferenceRoute.ts
│  │  └─ userRoute.ts
│  ├─ server.ts
│  └─ services
│     └─ inferenceService.ts
└─ tsconfig.json

```