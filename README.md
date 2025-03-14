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

3.5 **Configurar variables de entorno (`.env`)**  
   Crea un archivo `.env` en la raíz del proyecto con:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://USUARIO:CONTRASEÑA@cluster.mongodb.net/NOMBRE_DB
   JWT_SECRET=TU_CLAVE_SECRETA
   ```
4. Uso
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

## 📌 Endpoints de la API

### **🔹 1. Registro de Usuario**
📌 **URL:** `/api/auth/register`  
📌 **Método:** `POST`  
📌 **Descripción:** Crea una nueva cuenta de usuario.  

📌 **Cuerpo (`JSON`):**
```json
{
  "nombre": "Juan",
  "email": "juan@example.com",
  "password": "123456"
}
```

📌 **Respuesta esperada (201 Created):**
```json
{
  "msg": "Usuario registrado exitosamente",
  "user": {
    "_id": "65a1234567890abcde",
    "nombre": "Juan",
    "email": "juan@example.com"
  }
}
```

---

### **🔹 2. Inicio de Sesión**
📌 **URL:** `/api/auth/login`  
📌 **Método:** `POST`  
📌 **Descripción:** Inicia sesión con un usuario registrado y genera un token JWT.

📌 **Cuerpo (`JSON`):**
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

📌 **Respuesta esperada (200 OK):**
```json
{
  "msg": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65a1234567890abcde",
    "nombre": "Juan",
    "email": "juan@example.com"
  }
}
```

---

### **🔹 3. Obtener Perfil de Usuario**
📌 **URL:** `/api/user/profile/:id`  
📌 **Método:** `GET`  
📌 **Descripción:** Obtiene la información del usuario autenticado.  

📌 **Headers (`Autenticación requerida`):**
```
Authorization: Bearer TU_TOKEN_AQUI
```

📌 **Ejemplo de URL:**  
```
GET http://localhost:3000/api/user/profile/65a1234567890abcde
```

📌 **Respuesta esperada (200 OK):**
```json
{
  "_id": "65a1234567890abcde",
  "nombre": "Juan",
  "email": "juan@example.com"
}
```

---

### **🔹 4. Editar Perfil de Usuario**
📌 **URL:** `/api/user/profile/:id`  
📌 **Método:** `PUT`  
📌 **Descripción:** Modifica el nombre o email del usuario autenticado.  

📌 **Headers (`Autenticación requerida`):**
```
Authorization: Bearer TU_TOKEN_AQUI
```

📌 **Cuerpo (`JSON`):**
```json
{
  "nombre": "Juan Actualizado",
  "email": "juan@example.com"
}
```

📌 **Respuesta esperada (200 OK):**
```json
{
  "msg": "Perfil actualizado",
  "user": {
    "_id": "65a1234567890abcde",
    "nombre": "Juan Actualizado",
    "email": "juan@example.com"
  }
}
```
