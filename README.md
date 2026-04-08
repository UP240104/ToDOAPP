# Todo App — React Native

Aplicación móvil de lista de tareas desarrollada con React Native, Expo y NativeWind.

## Repositorio de la API

Este proyecto depende de la API REST disponible en:

-> https://github.com/RamsesMeza/todo-app-api

Debes tener la API corriendo en local antes de correr esta app.

---

## Requisitos previos

- Node.js 18 o superior
- npm
- Expo Go instalado en tu celular (opcional, para probar en dispositivo físico)
- MySQL corriendo en local
- La API del proyecto corriendo en local

---

## 1. Configurar y correr la API

Clona el repositorio de la API:

```bash
git clone https://github.com/RamsesMeza/todo-app-api.git
cd todo-app-api
```

Instala las dependencias:

```bash
npm install
```

Crea el archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

Abre el `.env` y configura tus credenciales de MySQL:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=todo_app
```

Crea la base de datos ejecutando el script SQL:

```bash
mysql -u root -p < sql/init.sql
```

Corre la API:

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`.

---

## 2. Configurar y correr la app

Clona este repositorio:

```bash
git clone https://github.com/UP240104/ToDOAPP
cd ToDOAPP
```

Instala las dependencias:

```bash
npm install
```

Abre el archivo `services/api.ts` y configura la URL del backend:

**Para web:**

```ts
const BASE_URL = "http://localhost:3000/todos";
```

**Para móvil (celular físico o emulador):**

Obtén tu IP local con:

```bash
ipconfig      # Windows
```

Busca la línea "Dirección IPv4" y úsala:

```ts
const BASE_IP = "192.168.x.x"; // tu IP local
const BASE_URL = `http://${BASE_IP}:3000/todos`;
```

> El celular y la PC deben estar conectados al mismo WiFi.

---

## 3. Correr la app

```bash
npx expo start --clear
```

Luego elige una opción:

- Presiona `w` para abrir en el navegador web
- Presiona `a` para abrir en emulador Android
- Escanea el QR con la app Expo Go desde tu celular

---

## Funcionalidades

- Listar todas las tareas
- Crear una nueva tarea
- Ver el detalle de una tarea
- Editar una tarea
- Eliminar una tarea
- Marcar tarea como completada con checkbox

---

## Tecnologías utilizadas

- React Native
- Expo
- Expo Router
- NativeWind (Tailwind CSS para React Native)
- TypeScript
