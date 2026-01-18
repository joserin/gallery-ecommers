# Astro Starter Kit: Basics

```sh
pnpm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
# Gallery Ecommers

Sitio de ejemplo de e-commerce creado con Astro. Contiene una galería de productos, componentes reutilizables y datos de ejemplo para desplegar o extender.

## Características

- Interfaz basada en componentes con Astro/React/TSX.
- Datos de ejemplo en JSON/TS para productos.
- Componentes: barra de acciones, navegación inferior, tarjetas de producto y filtros.

## Estructura relevante

- **Páginas:** [src/pages/index.astro](src/pages/index.astro)
- **Layout principal:** [src/layouts/Layout.astro](src/layouts/Layout.astro)
- **Componentes clave:** [src/components/CardProduct.astro](src/components/CardProduct.astro), [src/components/BarAction.tsx](src/components/BarAction.tsx), [src/components/BottomNav.tsx](src/components/BottomNav.tsx)
- **Datos de productos:** [src/data/product.json](src/data/product.json) y [public/data/products.ts](public/data/products.ts)
- **Estilos globales:** [src/styles/global.css](src/styles/global.css)

## Requisitos

- Node.js (v16+ recomendado)
- pnpm (gestor de paquetes)

## Instalación y desarrollo

1. Instala dependencias:

```
pnpm install
```

2. Ejecuta el servidor de desarrollo:

```
pnpm dev
```

3. Construir para producción:

```
pnpm build
```

4. Previsualizar el build localmente:

```
pnpm preview
```

## Datos y personalización

- Los productos de ejemplo se encuentran en [src/data/product.json](src/data/product.json). Puedes editar ese archivo o sustituir/añadir datos en [public/data/products.ts](public/data/products.ts) según necesites.
- Para cambiar la presentación o la lógica, modifica los componentes en [src/components](src/components).

## Despliegue

Este proyecto genera un sitio estático (carpeta `dist/`) listo para servir en Netlify, Vercel u otros hosts estáticos. Comando de build: `pnpm build`.

## Contribuir

Si quieres colaborar, crea un issue o un pull request. Indica claramente cambios en datos o componentes.

## Licencia

Revisa si existe un archivo `LICENSE` en el repositorio. Si no hay licencia, añade la que prefieras antes de publicar.

