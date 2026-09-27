import { MissionDefinition } from '../game/types';

export const mockMissions: Record<string, MissionDefinition> = {
  "phishing-01": {
    id: "phishing-01",
    type: "EMAIL_ANALYSIS",
    title: "El Gancho Corporativo",
    difficulty: 1,
    scenario: "Has recibido un correo en tu bandeja de entrada corporativa. Analiza sus componentes y marca los elementos que consideres sospechosos.",
    basePoints: 100,
    steps: [
      {
        id: "step-1",
        content: "Analiza el remitente.",
        hints: ["Fíjate bien en el dominio después del @."],
        options: [
          { id: "opt-1", label: "soporte@banco-secure.com", isCorrect: true, feedback: "El dominio 'banco-secure.com' no es el oficial." },
          { id: "opt-2", label: "De: Soporte Técnico", isCorrect: false, feedback: "El nombre a mostrar puede ser falsificado fácilmente." }
        ]
      },
      {
        id: "step-2",
        content: "Analiza el cuerpo del mensaje.",
        hints: ["Busca tácticas de presión o urgencia."],
        options: [
          { id: "opt-3", label: "Su cuenta será suspendida en 24 horas", isCorrect: true, feedback: "La urgencia artificial es una táctica clásica de ingeniería social." },
          { id: "opt-4", label: "Estimado usuario,", isCorrect: true, feedback: "Los correos legítimos suelen usar tu nombre real, no saludos genéricos." }
        ]
      }
    ]
  },
  "password-01": {
    id: "password-01",
    type: "PASSWORD",
    title: "El Laboratorio de Entropía",
    difficulty: 2,
    scenario: "Un sistema de la empresa ha sido vulnerado por ataques de fuerza bruta. Necesitas crear una contraseña nueva que resista los ataques modernos.",
    basePoints: 150,
    steps: [
      {
        id: "step-1",
        content: "Crea una contraseña que alcance el nivel FUERTE de seguridad. Usa mayúsculas, números y caracteres especiales.",
        hints: ["Las frases de paso (ej. Perro-Camina-Lento-99!) son muy seguras y fáciles de recordar."]
      }
    ]
  },
  "privacy-01": {
    id: "privacy-01",
    type: "PRIVACY",
    title: "El Campo Minado (Cookies)",
    difficulty: 1,
    scenario: "Acabas de entrar a una nueva red social. Inmediatamente aparece un aviso bloqueando la pantalla.",
    basePoints: 100,
    steps: [
      {
        id: "step-1",
        content: "Navega las opciones de privacidad e impide que la plataforma rastree tus datos con fines comerciales.",
        hints: ["Busca la letra pequeña. No hagas clic en el botón de color brillante que dice 'Aceptar Todo'."]
      }
    ]
  },
  "safe-01": {
    id: "safe-01",
    type: "SAFE_BROWSING",
    title: "El Clon del Banco",
    difficulty: 2,
    scenario: "Te enviaron un link para actualizar tus datos bancarios. Revisa el navegador.",
    basePoints: 100,
    steps: [
      {
        id: "step-1",
        content: "Elige la URL segura.",
        hints: ["Las conexiones seguras usan HTTPS.", "Verifica la ortografía del dominio."],
        options: [
          { id: "opt-1", label: "https://banco-nacional.com", isCorrect: true, feedback: "Correcto, conexión encriptada y dominio legítimo." },
          { id: "opt-2", label: "http://banco-naclonal.com", isCorrect: false, feedback: "Falta HTTPS y el dominio está mal escrito (naclonal)." }
        ]
      }
    ]
  },
  "social-01": {
    id: "social-01",
    type: "SOCIAL_ENG",
    title: "Urgencia del Jefe",
    difficulty: 3,
    scenario: "Recibes un mensaje de tu 'CEO' por WhatsApp corporativo.",
    basePoints: 150,
    steps: [
      {
        id: "step-1",
        content: "Analiza el mensaje: 'Necesito que transfieras 50k a esta cuenta. ¡Es para cerrar un trato ya!'",
        hints: ["Las solicitudes urgentes fuera de los canales oficiales son bandera roja."],
        options: [
          { id: "opt-1", label: "Transferir inmediatamente", isCorrect: false, feedback: "Pésima idea. Evadiste los controles de la empresa." },
          { id: "opt-2", label: "Llamar al CEO por canal oficial para verificar", isCorrect: true, feedback: "¡Excelente! La verificación fuera de banda es la mejor defensa." }
        ]
      }
    ]
  },
  "incident-01": {
    id: "incident-01",
    type: "INCIDENT",
    title: "Código Rojo",
    difficulty: 3,
    scenario: "Un ransomware ha infectado tu computadora de trabajo.",
    basePoints: 200,
    steps: [
      {
        id: "step-1",
        content: "¿Cuál es el PRIMER paso crítico?",
        hints: ["Debes evitar que se propague a la red."],
        options: [
          { id: "opt-1", label: "Pagar el rescate", isCorrect: false, feedback: "Nunca se debe pagar. Fomenta el cibercrimen y no garantiza recuperar los datos." },
          { id: "opt-2", label: "Desconectar el equipo de la red (WiFi/Cable)", isCorrect: true, feedback: "¡Perfecto! El aislamiento de red es el primer paso de contención." }
        ]
      }
    ]
  }
};
