// 🎪 DETECTOR DE EVENTOS - Frutero Bot
// Detecta cuando alguien comparte hackathons, meetups, workshops, etc.

import { KEYWORDS } from '../config/points-system.js';

export interface DetectedEvent {
  hasEvent: boolean;
  eventType?: string;
  eventName?: string;
  date?: string;
  location?: string;
  link?: string;
  confidence: number; // 0-100 qué tan seguro estamos de que es un evento
}

/**
 * Analiza un mensaje y detecta si menciona un evento
 */
export function detectEvent(message: string): DetectedEvent {
  const lowerMessage = message.toLowerCase();
  
  // Inicializar resultado
  const result: DetectedEvent = {
    hasEvent: false,
    confidence: 0,
  };

  // PASO 1: Verificar si contiene keywords de eventos
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
    return result; // No es un evento
  }

  // PASO 2: Detectar tipo de evento
  if (lowerMessage.includes('hackathon') || lowerMessage.includes('buildathon')) {
    result.eventType = 'Hackathon';
  } else if (lowerMessage.includes('meetup')) {
    result.eventType = 'Meetup';
  } else if (lowerMessage.includes('workshop') || lowerMessage.includes('taller')) {
    result.eventType = 'Workshop';
  } else if (lowerMessage.includes('ama')) {
    result.eventType = 'AMA';
  } else if (lowerMessage.includes('spaces') || lowerMessage.includes('livestream') || lowerMessage.includes('live')) {
    result.eventType = 'Live Stream';
  } else {
    result.eventType = 'Evento';
  }

  // PASO 3: Buscar links (URLs)
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = message.match(urlRegex);
  
  if (urls && urls.length > 0) {
    result.link = urls[0]; // Primer link encontrado
    result.confidence += 30;
  }

  // PASO 4: Buscar fechas (formato: DD/MM, DD-MM, "mañana", "hoy", nombres de meses)
  const datePatterns = [
    /\d{1,2}[\/\-]\d{1,2}/g, // 12/11, 12-11
    /\d{1,2}\s+de\s+[a-z]+/gi, // 12 de noviembre
    /(hoy|mañana|pasado mañana|este\s+\w+|próximo\s+\w+)/gi, // hoy, mañana, este viernes
  ];

  for (const pattern of datePatterns) {
    const dateMatch = message.match(pattern);
    if (dateMatch) {
      result.date = dateMatch[0];
      result.confidence += 20;
      break;
    }
  }

  // PASO 5: Buscar ubicación (ciudad, país, "online", "virtual", "remoto")
  const locationKeywords = [
    'online', 'virtual', 'remoto', 'remote',
    'méxico', 'mexico', 'argentina', 'colombia', 'cdmx', 'buenos aires', 'bogotá',
    'discord', 'zoom', 'meet', 'twitter spaces',
  ];

  for (const locKeyword of locationKeywords) {
    if (lowerMessage.includes(locKeyword)) {
      result.location = locKeyword.charAt(0).toUpperCase() + locKeyword.slice(1);
      result.confidence += 10;
      break;
    }
  }

  // PASO 6: Intentar extraer nombre del evento
  // Buscar texto después de palabras como "hackathon", "meetup", etc.
  const nameRegex = new RegExp(`(${matchedKeyword})\\s+([A-Z][\\w\\s]+)`, 'i');
  const nameMatch = message.match(nameRegex);
  
  if (nameMatch && nameMatch[2]) {
    result.eventName = nameMatch[2].trim();
    result.confidence += 10;
  }

  // PASO 7: Determinar si es realmente un evento (confidence mínimo)
  if (result.confidence >= 40) {
    result.hasEvent = true;
  }

  return result;
}

/**
 * Verifica si un mensaje es "GM" (Good Morning)
 */
export function isGMMessage(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim();
  
  for (const gmKeyword of KEYWORDS.GM) {
    if (lowerMessage === gmKeyword || lowerMessage.startsWith(gmKeyword + ' ')) {
      return true;
    }
  }
  
  return false;
}

/**
 * Verifica si un mensaje es de bienvenida a nuevos miembros
 */
export function isWelcomeMessage(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  for (const welcomeKeyword of KEYWORDS.WELCOME) {
    if (lowerMessage.includes(welcomeKeyword)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Verifica si un mensaje comparte recursos útiles
 */
export function sharesResource(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  // Debe tener keyword de recurso + link
  let hasResourceKeyword = false;
  for (const resourceKeyword of KEYWORDS.RESOURCES) {
    if (lowerMessage.includes(resourceKeyword)) {
      hasResourceKeyword = true;
      break;
    }
  }
  
  const hasLink = /https?:\/\/[^\s]+/.test(message);
  
  return hasResourceKeyword && hasLink;
}

/**
 * Verifica si un mensaje es de ayuda/pide ayuda
 */
export function isHelpMessage(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  for (const helpKeyword of KEYWORDS.HELP) {
    if (lowerMessage.includes(helpKeyword)) {
      return true;
    }
  }
  
  return false;
}
