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
  }
};
