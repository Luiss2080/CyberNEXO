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
  }
};
