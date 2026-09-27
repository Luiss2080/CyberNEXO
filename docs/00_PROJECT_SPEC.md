# 00. PROJECT SPECIFICATION (CYBERNEXO)

## 1. Visión General
**CyberNexo** es un videojuego didáctico multiplataforma sobre ciberseguridad. El jugador asume el rol de un nuevo recluta en el **CyberNexo Security Lab**, superando misiones basadas en situaciones cotidianas de riesgo digital. 
**No es hacking ofensivo**. Es una herramienta educativa defensiva ("Blue Team" para usuarios finales).

## 2. Filosofía Base (El Ciclo de Aprendizaje)
Cada interacción del jugador debe seguir estrictamente este modelo cognitivo:
`OBSERVAR → ANALIZAR → DECIDIR → RECIBIR CONSECUENCIA → APRENDER → DESBLOQUEAR`

## 3. Plataformas Soportadas (Write Once, Run Anywhere)
- **Web**: Acceso directo desde navegador.
- **PWA Móvil/Tablet**: Instalable vía Service Workers.
- **Desktop (Windows, macOS, Linux)**: Empaquetado nativo utilizando Electron.js (con estricta política de `contextIsolation`).

## 4. Stack Tecnológico
- **Frontend**: React 18, Vite, Tailwind CSS v4, Zustand (Estado), Framer Motion (Animaciones).
- **Gameplay**: DOM-based UI (React) y Phaser.js para mecánicas 2D complejas.
- **Backend**: Node.js, Express.js.
- **Base de Datos**: MySQL 8 (Persistencia oficial) + Prisma ORM.
- **Offline / Local Storage**: IndexedDB (para guardar progreso sin internet).

## 5. Arquitectura General
El sistema implementa una arquitectura Frontend-Backend desacoplada y modular:

```text
               [ INTERFACES REACT ]
                         │
                    GAME CORE
     (MissionEngine, RuleEngine, ScoreEngine)
                         │
                         ▼
                [ SYNC QUEUE (IndexedDB) ]
                         │
                         ▼
                [ NODE.JS + EXPRESS API ]
                         │
                         ▼
                    [ MYSQL DB ]
```

## 6. MVP Realista (Minimum Viable Product)
La primera versión productiva debe contener exclusivamente:
1. Landing Page completa.
2. Instalación PWA.
3. Auth (Registro/Login).
4. Dashboard y Mapa del Jugador.
5. Módulos obligatorios: Phishing, Contraseñas, Privacidad.
6. Sistema base de XP, Niveles y Logros.
7. Backend MySQL con modo Offline básico (Queue).
