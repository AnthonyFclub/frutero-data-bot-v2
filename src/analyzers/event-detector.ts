import { KEYWORDS } from '../config/pulpa-system.js';

export interface DetectedEvent {
  hasEvent: boolean;
  eventType?: string;
  eventName?: string;
  date?: string;
  location?: string;
  link?: string;
  confidence: number;
}

/**
 * Detectar si un mensaje contiene información de un evento
 */
export function detectEvent(message: string): DetectedEvent {
  const lowerMessage = message.toLowerCase();
  
  const result: DetectedEvent = {
    hasEvent: false,
    confidence: 0
  };

  // 1. DETECTAR KEYWORDS DE EVENTOS
  let hasEventKeyword = false;
  let matchedKeyword = '';
  
  for (const keyword of KEYWORDS.EVENTS) {
    if (lowerMessage.includes(keyword.toLowerCase())) {
      hasEventKeyword = true;
      matchedKeyword = keyword;
      result.confidence += 30;
      break;
    }
  }

  if (!hasEventKeyword) {
    return result;
  }

  // 2. IDENTIFICAR TIPO ESPECÍFICO
  if (lowerMessage.includes('hackathon')) {
    result.eventType = 'Hackathon';
  } else if (lowerMessage.includes('meetup')) {
    result.eventType = 'Meetup';
  } else if (lowerMessage.includes('workshop') || lowerMessage.includes('taller')) {
    result.eventType = 'Workshop';
  } else if (lowerMessage.includes('ama') || lowerMessage.includes('ask me anything')) {
    result.eventType = 'AMA';
  } else if (lowerMessage.includes('conferencia') || lowerMessage.includes('conference')) {
    result.eventType = 'Conferencia';
  } else if (lowerMessage.includes('webinar')) {
    result.eventType = 'Webinar';
  } else {
    result.eventType = 'Evento';
  }

  // 3. BUSCAR URL (link al evento)
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = message.match(urlRegex);
  if (urls && urls.length > 0) {
    result.link = urls[0];
    result.confidence += 30;
  }

  // 4. BUSCAR FECHA
  const datePatterns = [
    /\d{1,2}[\/\-]\d{1,2}/g,
    /\d{1,2}\s+de\s+[a-z]+/gi,
    /(hoy|mañana|pasado mañana)/gi,
    /(lunes|martes|miércoles|miercoles|jueves|viernes|sábado|sabado|domingo)/gi,
    /\d{1,2}\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/gi
  ];

  for (const pattern of datePatterns) {
    const dateMatch = message.match(pattern);
    if (dateMatch) {
      result.date = dateMatch[0];
      result.confidence += 20;
      break;
    }
  }

  // 5. BUSCAR UBICACIÓN
  const locationKeywords = [
    'online', 'virtual', 'remoto', 'zoom', 'discord', 'twitter spaces',
    'méxico', 'mexico', 'cdmx', 'ciudad de méxico',
    'buenos aires', 'argentina', 'bogotá', 'bogota', 'colombia',
    'lima', 'peru', 'santiago', 'chile',
    'madrid', 'españa', 'barcelona',
    'miami', 'san francisco', 'new york', 'austin',
    'monterrey', 'guadalajara', 'querétaro', 'queretaro'
  ];

  for (const loc of locationKeywords) {
    if (lowerMessage.includes(loc)) {
      // Capitalizar primera letra
      result.location = loc.charAt(0).toUpperCase() + loc.slice(1);
      result.confidence += 10;
      break;
    }
  }

  // 6. EXTRAER NOMBRE DEL EVENTO (MEJORADO)
  // Intentar extraer nombre antes de la keyword del evento
  const keywordIndex = lowerMessage.indexOf(matchedKeyword.toLowerCase());
  
  if (keywordIndex > 0) {
    // Tomar palabras antes de la keyword
    const beforeKeyword = message.substring(0, keywordIndex).trim();
    const words = beforeKeyword.split(/\s+/);
    
    // Si hay al menos una palabra antes, usar las últimas 1-3 palabras
    if (words.length > 0 && words.length <= 3) {
      result.eventName = beforeKeyword;
      result.confidence += 10;
    } else if (words.length > 3) {
      // Tomar últimas 3 palabras
      result.eventName = words.slice(-3).join(' ');
      result.confidence += 10;
    }
  }
  
  // Si no encontró nombre antes, intentar después
  if (!result.eventName && keywordIndex >= 0) {
    const afterKeyword = message.substring(keywordIndex + matchedKeyword.length).trim();
    const words = afterKeyword.split(/\s+/);
    
    // Tomar primeras 1-3 palabras después (evitando fechas y URLs)
    const validWords = words.filter(word => {
      return !word.match(/^https?:/) && 
             !word.match(/^\d+[\/\-]\d+/) &&
             !word.match(/^(hoy|mañana|pasado)$/i) &&
             word.length > 2;
    });
    
    if (validWords.length > 0 && validWords.length <= 3) {
      result.eventName = validWords.slice(0, 3).join(' ');
      result.confidence += 10;
    }
  }

  // Si aún no hay nombre, usar el tipo del evento
  if (!result.eventName || result.eventName.length < 3) {
    result.eventName = result.eventType;
  }

  // 7. DECIDIR SI ES UN EVENTO VÁLIDO
  if (result.confidence >= 40) {
    result.hasEvent = true;
  }

  return result;
}

/**
 * Detectar mensaje GM
 */
export function isGMMessage(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim();
  for (const keyword of KEYWORDS.GM) {
    if (lowerMessage === keyword.toLowerCase() || lowerMessage.startsWith(keyword.toLowerCase() + ' ')) {
      return true;
    }
  }
  return false;
}

/**
 * Detectar mensaje de bienvenida
 */
export function isWelcomeMessage(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  for (const keyword of KEYWORDS.WELCOME) {
    if (lowerMessage.includes(keyword)) {
      return true;
    }
  }
  return false;
}

/**
 * Detectar si comparte un recurso
 */
export function sharesResource(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  // Debe tener URL Y keyword de recurso
  const hasURL = /https?:\/\/[^\s]+/.test(message);
  if (!hasURL) return false;
  
  for (const keyword of KEYWORDS.RESOURCES) {
    if (lowerMessage.includes(keyword)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Detectar mensaje pidiendo ayuda
 */
export function isHelpMessage(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  for (const keyword of KEYWORDS.HELP) {
    if (lowerMessage.includes(keyword)) {
      return true;
    }
  }
  return false;
}