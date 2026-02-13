# Guía de Contribución - DISACCORT

Este documento establece los estándares de ingeniería para el desarrollo del sitio web oficial de Disaccort.

## 🔒 Privacidad y Seguridad

Este es un repositorio de propiedad privada. No subir credenciales, claves API o información sensible de clientes.

## 🛠️ Flujo de Trabajo (Git Flow)

1. **Ramas:**
   - `main`: Producción (Estable). Protegida.
   - `feat/`: Para nuevas características.
   - `fix/`: Para corrección de errores.
   - `docs/`: Para documentación.
   - `refactor/`: Para limpieza de código sin cambios funcionales.

2. **Commits:**
   Usamos **Conventional Commits**.
   - Ej: `feat: add contact form validation`
   - Ej: `fix: correct mobile padding in services section`

3. **Calidad de Código:**
   Husky ejecutará automáticamente `lint` y `format` antes de cada commit.
   - No usar `git commit --no-verify` a menos que sea una emergencia crítica.

## 🧪 Pruebas Locales

Antes de solicitar un Pull Request, asegúrate de que el sitio cargue correctamente en local y no tenga errores en la consola del navegador.
