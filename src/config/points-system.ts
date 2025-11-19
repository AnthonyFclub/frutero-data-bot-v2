// 🍊 SISTEMA DE PUNTOS FRUTERO - CONFIGURACIÓN
// Si Mel pide cambios, modifica los números aquí

export const POINTS_CONFIG = {
    // Reacciones y mensajes básicos
    REACTION: 1,
    MESSAGE: 0,
    
    // Eventos (hackathons, meetups)
    SHARE_EVENT: 10,
    EVENT_HIGH_ENGAGEMENT: 5,
    
    // Interacciones en el grupo
    REPLY_TO_THREAD: 5,
    POLL_ANSWER: 3,
    HELP_OTHERS: 8,
    
    // Contenido valioso
    SHARE_RESOURCE: 15,
    START_CONVERSATION: 7,
    
    // Mensajes especiales
    GM_MESSAGE: 2,
    WELCOME_NEW_MEMBER: 5,
  };
  
  // 🔍 KEYWORDS PARA DETECTAR ACCIONES
  export const KEYWORDS = {
    // Eventos
    EVENTS: [
      'hackathon',
      'meetup',
      'workshop',
      'evento',
      'devcon',
      'ethglobal',
      'buildathon',
      'livestream',
      'ama',
      'spaces',
      'twitter spaces',
    ],
    
    // Pedir ayuda o ayudar
    HELP: [
      'ayuda',
      'help',
      'cómo',
      'como',
      'how to',
      'explica',
      'explain',
      'tutorial',
      'alguien sabe',
      'does anyone know',
    ],
    
    // Compartir recursos
    RESOURCES: [
      'link',
      'recurso',
      'resource',
      'documentación',
      'documentation',
      'docs',
      'guía',
      'guide',
      'template',
      'repo',
      'github',
    ],
    
    // Buenos días / GM
    GM: [
      'gm',
      'good morning',
      'buenos días',
      'buen día',
      'morning',
    ],
    
    // Dar bienvenida
    WELCOME: [
      'bienvenido',
      'bienvenida',
      'welcome',
      'hola a todos',
      'hi everyone',
      'hey everyone',
    ],
  };
  
  // 🎯 UMBRALES (Thresholds)
  export const THRESHOLDS = {
    MIN_REACTIONS_FOR_BONUS: 10,  // Reacciones mínimas para bonus
    MIN_REPLIES_FOR_CONVERSATION: 5, // Respuestas mínimas para considerar conversación
  };