# Especificación de CyberNexo (spec.md) - MoureDev SDD Standard

## 1. Contexto
CyberNexo es un ecosistema educativo interactivo cuyo objetivo principal es enseñar buenas prácticas de ciberseguridad a usuarios no técnicos mediante minijuegos y simulaciones en un entorno ficticio (CyberNexo Security Lab).

## 2. Usuarios
- **Jugador (Recluta)**: Usuario final que realiza misiones para aprender y obtener XP.
- **Admin**: Usuario con privilegios para gestionar misiones JSON y revisar métricas globales.

## 3. Historias de Usuario
- Como jugador, quiero poder iniciar sesión desde cualquier dispositivo para guardar mi progreso y rango.
- Como jugador, quiero analizar correos sospechosos y señalar partes peligrosas (Phishing Hunter) para aprender a detectarlos en la vida real.
- Como jugador, quiero que si se corta mi internet pueda seguir jugando y mi puntaje se sincronice cuando recupere la conexión.

## 4. Requisitos Funcionales (Notación EARS)

### Core & Progresión
- **RF-1 (Universal)**: El sistema DEBERÁ almacenar el progreso de todos los usuarios registrados en una base de datos MySQL (XP, rango y estado de misiones).
- **RF-2 (Event-Driven)**: CUANDO el usuario complete una misión, el sistema DEBERÁ calcular su puntaje, asignar estrellas (1-3) y emitir un evento de finalización.
- **RF-3 (State-Driven)**: MIENTRAS el jugador no tenga conexión a internet activa, el sistema DEBERÁ guardar los intentos de misión completados en `IndexedDB` y encolarlos para sincronización.

### Minijuegos (Ejemplo: Phishing Hunter)
- **RF-4 (Universal)**: El sistema DEBERÁ parsear misiones configuradas mediante archivos u objetos JSON.
- **RF-5 (Ubiquitous)**: El sistema DEBERÁ restar puntos (-10) de la calificación final de la misión si el jugador solicita una pista.
- **RF-6 (Optional)**: SI el jugador selecciona correctamente todas las "banderas rojas" en un correo electrónico simulado sin usar pistas, ENTONCES el sistema DEBERÁ otorgarle una medalla de "Ojo Digital".

### Seguridad (Electrón y Web)
- **RF-7 (Universal)**: El contenedor de escritorio (Electron) DEBERÁ aislar el contexto de Node.js de la interfaz de usuario web para prevenir ejecución de código arbitrario.

### Design System y UI Base (Fase 2)
- **RF-8 (Universal)**: El frontend DEBERÁ implementar un Design System basado en Tailwind CSS, soportando un esquema de color principal inmersivo (estilo ciberseguridad moderno, oscurecido por defecto).
- **RF-9 (Universal)**: El sistema DEBERÁ proporcionar componentes de UI reutilizables básicos (Button, Card, Input) accesibles y tipados estrictamente mediante TypeScript.

### Landing Page y SEO (Fase 3)
- **RF-10 (Universal)**: El frontend DEBERÁ mostrar una Landing Page como ruta raíz (`/`), la cual debe incluir un Hero section con la propuesta de valor y los botones de acción primarios (Jugar, Instalar).
- **RF-11 (Universal)**: La Landing Page DEBERÁ listar las áreas de aprendizaje mediante tarjetas visuales construidas sobre el Design System (Phishing, Contraseñas, Privacidad, etc.).
- **RF-12 (Universal)**: El Design System DEBERÁ incorporar componentes interactivos complejos como `Modal` para mostrar opciones de instalación multiplataforma y `Carousel` para exhibir un vistazo del gameplay.
- **RF-13 (Universal)**: La interfaz DEBERÁ contener micro-animaciones (framer-motion o CSS puro), gradientes vibrantes y un diseño premium (Premium Design Standard) para maximizar la retención.
- **RF-14 (Universal)**: La Landing Page DEBERÁ promover fuertemente la instalación (Desktop/PWA) mediante una sección dedicada, argumentando las ventajas del juego offline.

### Autenticación y Seguridad (Fase 4)
- **RF-15 (Universal)**: El sistema backend DEBERÁ manejar la persistencia de usuarios mediante Prisma ORM conectándose a MySQL, guardando credenciales utilizando hash bcrypt o Argon2.
- **RF-16 (Universal)**: El sistema DEBERÁ emitir tokens JWT sin estado (stateless) para la autenticación de usuarios.
- **RF-17 (Universal)**: El frontend DEBERÁ manejar el estado del usuario globalmente mediante Zustand y proveer interfaces de Login y Registro accesibles.

### Motor del Juego (Game Engine - Fase 5)
- **RF-18 (Universal)**: El frontend DEBERÁ contar con un `MissionEngine` centralizado que orqueste el ciclo de vida de cualquier misión (Cargar, Presentar, Observar, Decidir, Evaluar, Recompensar).
- **RF-19 (Universal)**: Las misiones DEBERÁN ser cargadas de forma agnóstica a la vista mediante objetos JSON estrictamente tipados.
- **RF-20 (Universal)**: El sistema DEBERÁ contar con un `RuleEngine` que determine los puntajes parciales o deducciones basándose en el comportamiento (ej: uso de pistas).

### Módulo 1: Phishing Hunter (Fase 6)
- **RF-21 (Phishing)**: La vista de misión de tipo `EMAIL_ANALYSIS` DEBERÁ renderizar una interfaz que simule un cliente de correo electrónico corporativo.
- **RF-22 (Phishing)**: El jugador DEBERÁ poder hacer clic en elementos sospechosos (remitente, enlaces, texto de urgencia) para analizarlos y el `MissionEngine` DEBERÁ registrar la corrección de sus selecciones.

## 5. Casos Límite y Errores (Edge Cases)
- **Desincronización de XP**: Si un usuario manipula `localStorage` o `IndexedDB` para ganar 9999 XP, el backend rechazará la sincronización pues recalcula los puntos validando los tiempos e intentos.
- **Recuperación de Conexión**: Si 5 intentos offline se envían de golpe al recuperar conexión, el backend debe procesarlos de forma idempotente.

## 6. Fuera de Alcance (Out of Scope para Fase MVP)
- Misiones multijugador en tiempo real con Socket.IO.
- Gráficos 3D pesados.
- Hacking ofensivo o explotación de vulnerabilidades.

## 7. Criterios de Finalización (DoD)
- El código de la aplicación corre sin errores de tipado o linting.
- Se puede completar una misión de principio a fin, sumando XP.
- La desconexión simulada (offline) de la red y posterior reconexión sincroniza datos sin corromper el estado.
- Pruebas automatizadas validando las lógicas principales del motor de misiones y la sincronización (QA).

## 8. Dudas Abiertas
- ¿La estructuración de las misiones (JSON) vivirá directamente en la base de datos MySQL o como archivos estáticos servidos en la API? *(Decisión propuesta: Base de datos para facilidad de administración desde un backoffice).*
