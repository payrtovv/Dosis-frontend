<h1 align="center">Dosis</h1>

<p align="center">
  Aplicación web para registrar y administrar tus medicamentos de forma segura, con autenticación JWT y datos separados por usuario.
</p>

[![Ver el video Dosis](https://img.youtube.com/vi/hBraqjwdxCI/maxresdefault.jpg)](https://www.youtube.com/watch?v=hBraqjwdxCI)

<p align="center">
  <img src="https://img.shields.io/badge/STATUS-EN%20DESARROLLO-green" alt="Estado: en desarrollo">
  <img src="https://img.shields.io/badge/Django-REST%20Framework-092E20?logo=django&logoColor=white" alt="Django REST Framework">
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=black" alt="React con Vite">
  <img src="https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white" alt="Autenticación JWT">
</p>

## Índice

* [Descripción del proyecto](#descripción-del-proyecto)
* [Estado del proyecto](#estado-del-proyecto)
* [Funcionalidades](#funcionalidades)
* [Capturas de pantalla](#capturas-de-pantalla)
* [Acceso al proyecto](#acceso-al-proyecto)
* [Abre y ejecuta el proyecto](#abre-y-ejecuta-el-proyecto)
* [API](#api)
* [Tecnologías utilizadas](#tecnologías-utilizadas)
* [Personas contribuyentes](#personas-contribuyentes)
* [Autores](#autores)


## Descripción del proyecto

**Gestor de Medicamentos** es una aplicación web full stack que permite a cada usuario llevar el control de sus medicamentos: nombre comercial y genérico, laboratorio, concentración, presentación (tableta, cápsula, jarabe, inyectable, etc.), indicaciones y contraindicaciones.

El backend expone una API REST con Django REST Framework y autenticación por tokens JWT. El frontend, hecho con React, consume esa API y ofrece pantallas de registro, inicio de sesión y un CRUD completo de medicamentos. Cada usuario solo puede ver y modificar sus propios registros.

## Estado del proyecto


## Funcionalidades

- `Registro de usuarios`: creación de cuenta con correo y contraseña, con confirmación de contraseña y mensajes de error por campo.
- `Inicio de sesión`: autenticación con JWT (tokens `access` y `refresh`).
- `Rutas protegidas`: el frontend redirige al login si no hay sesión activa.
- `CRUD de medicamentos`: crear, listar, editar y eliminar medicamentos.
  - `Aislamiento por usuario`: cada persona solo accede a sus propios medicamentos.
- `Cierre de sesión`: elimina los tokens del navegador y vuelve al login.

## Acceso al proyecto

Clona el repositorio:

```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO
```

## Abre y ejecuta el proyecto

### Requisitos previos

- Python 3.10 o superior
- Node.js 18 o superior
- `pip` y `npm`

> Ajusta los nombres de las carpetas (`backend/`, `frontend/`) a los de tu repositorio.

### 1. Backend (Django)

```bash
cd backend

# Crear y activar un entorno virtual
python -m venv venv
source venv/bin/activate        # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

# Crear la base de datos
python manage.py makemigrations
python manage.py migrate

# Iniciar el servidor
python manage.py runserver
```

El backend queda disponible en `http://127.0.0.1:8000/`.

Opcionalmente, crea un superusuario para entrar al panel de administración (`/admin/`):

```bash
python manage.py createsuperuser
```

### 2. Frontend (React + Vite)

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend queda disponible en `http://localhost:5173/`.

### Configuración importante

- **CORS:** el origen del frontend debe estar en `CORS_ALLOWED_ORIGINS` dentro de `settings.py`:

  ```python
  CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]
  ```

- **URL de la API:** se define en `src/Axios.js` (`baseUrl`). Cámbiala si despliegas el backend en otra dirección.

## API

| Método | Ruta | Descripción | Requiere token |
|---|---|---|---|
| POST | `/register/` | Crear una cuenta | No |
| POST | `/login/` | Iniciar sesión, devuelve `access` y `refresh` | No |
| POST | `/token/refresh/` | Obtener un nuevo `access` con el `refresh` | No |
| GET | `/me/` | Datos del usuario autenticado | Sí |
| GET | `/medicines/` | Listar tus medicamentos | Sí |
| POST | `/medicines/` | Crear un medicamento | Sí |
| GET | `/medicines/<id>/` | Ver el detalle de un medicamento | Sí |
| PUT / PATCH | `/medicines/<id>/` | Editar un medicamento | Sí |
| DELETE | `/medicines/<id>/` | Eliminar un medicamento | Sí |


## Tecnologías utilizadas

**Backend**

- [Python](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/)
- [django-cors-headers](https://github.com/adamchainz/django-cors-headers)

**Frontend**

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- CSS con variables personalizadas

