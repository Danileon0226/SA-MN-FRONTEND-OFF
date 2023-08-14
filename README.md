# SA-MN Frontend

Este el cliente de nuestro software de contabilidiad, encargado de consumir de nuestra api en el backend

[Repo del backend](https://github.com/SamuelVasquezGonzalez/SA-MN-Backend)

Hecho con React+vite y Redux



## Por hacer

- Botones para aumentar/disminuir cantidad en los productos
- Layout de la informacion laboral de cada uno de los empleados
- Logica para daumentar/disminuir por unidad la cantidad del producto en el inventario (Con un PUT)
- Logica para poder editar los conjuntos existentes (Con un put)
- Crear las variable de entorno de las solicitudes fetch

## Estructura

```
SA-MN-FRONTEND
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ assets
│  │  └─ icons
│  │     ├─ add-line.svg
│  │     ├─ admin-line.svg
│  │     ├─ close-line.svg
│  │     ├─ emotion-line.svg
│  │     ├─ group-line.svg
│  │     ├─ home-line.svg
│  │     ├─ login-box-line.svg
│  │     ├─ moon-line.svg
│  │     ├─ settings-line.svg
│  │     ├─ shopping-cart-line.svg
│  │     ├─ sun-line.svg
│  │     └─ user-smile-line.svg
│  ├─ Components
│  │  ├─ Navbar
│  │  │  ├─ Navbar.css
│  │  │  └─ Navbar.jsx
│  │  └─ productosLayout
│  │     ├─ ProductosLayout.css
│  │     └─ ProductosLayout.jsx
│  ├─ main.css
│  ├─ main.jsx
│  ├─ middleware
│  │  └─ middleware.jsx
│  ├─ Routes
│  │  └─ Routes.jsx
│  ├─ Screens
│  │  ├─ agregarConjunto
│  │  │  ├─ AgregarConjunto.css
│  │  │  └─ AgregarConjunto.jsx
│  │  ├─ Empleados
│  │  │  ├─ Empleados.css
│  │  │  └─ Empleados.jsx
│  │  ├─ Home
│  │  │  ├─ Home.css
│  │  │  └─ Home.jsx
│  │  └─ Login
│  │     ├─ Login.css
│  │     └─ Login.jsx
│  └─ Store
│     ├─ Slices.jsx
│     └─ Store.jsx
└─ vite.config.js

```