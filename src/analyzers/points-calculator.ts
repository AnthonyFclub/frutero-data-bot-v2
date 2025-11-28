import { PULPA_CONFIG } from '../config/pulpa-system.js';
/**
 * Calcular PULPA según el tipo de mensaje
 */
export function calculatePulpa(messageType: string): number {
  switch (messageType) {
    case 'GM':
      return PULPA_CONFIG.GM_MESSAGE;
    
    case 'Bienvenida':
      return PULPA_CONFIG.WELCOME_MESSAGE;
    
    case 'Recurso compartido':
      return PULPA_CONFIG.SHARE_RESOURCE;
    
    case 'Pide ayuda':
      return PULPA_CONFIG.ASK_FOR_HELP;
    
    case 'Evento compartido':
      return PULPA_CONFIG.SHARE_EVENT;
    
    case 'Responde hilo':
      return PULPA_CONFIG.REPLY_TO_THREAD;
    
    case 'Contesta encuesta':
      return PULPA_CONFIG.ANSWER_POLL;
    
    default:
      return 0; // Sin PULPA para mensajes normales
  }
}

/**
 * Obtener descripción de la acción
 */
export function getActionDescription(messageType: string): string {
  switch (messageType) {
    case 'GM':
      return 'Saludo GM';
    
    case 'Bienvenida':
      return 'Mensaje de bienvenida';
    
    case 'Recurso compartido':
      return 'Compartir recurso';
    
    case 'Pide ayuda':
      return 'Pedir ayuda';
    
    case 'Evento compartido':
      return 'Compartir evento';
    
    case 'Responde hilo':
      return 'Responder en hilo';
    
    case 'Contesta encuesta':
      return 'Contestar encuesta';
    
    default:
      return 'Mensaje normal';
  }
}