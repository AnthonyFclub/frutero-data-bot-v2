// 🍊 CONFIGURACIÓN DE PULPA - Bot Frutero v2.0
// Sistema de recompensas con token PULPA
// Aquí Mel puede cambiar fácilmente las cantidades de PULPA

export const PULPA_CONFIG = {
  // 🌅 Acciones básicas de comunidad
  REACTION: 1,                    // 1 PULPA por cada reacción a mensaje
  GM_MESSAGE: 5,                  // 5 PULPA por buenos días
  WELCOME_MESSAGE: 8,             // 8 PULPA por dar bienvenida a nuevos
  
  // 📚 Compartir valor
  SHARE_EVENT: 25,                // 25 PULPA por compartir hackathon/meetup
  SHARE_RESOURCE: 15,             // 15 PULPA por compartir link útil
  SHARE_OPPORTUNITY: 20,          // 20 PULPA por compartir trabajo/proyecto
  SHARE_NEWS: 10,                 // 10 PULPA por compartir noticia del ecosistema
  
  // 💬 Participación activa
  REPLY_TO_THREAD: 12,            // 12 PULPA por responder en hilo importante
  ASK_FOR_HELP: 5,                // 5 PULPA por pedir ayuda (fomenta conversación)
  HELP_SOMEONE: 20,               // 20 PULPA por ayudar a alguien
  START_CONVERSATION: 18,         // 18 PULPA por iniciar conversación que genere >5 respuestas
  
  // 📊 Engagement con contenido
  ANSWER_POLL: 8,                 // 8 PULPA por contestar encuesta
  VOICE_MESSAGE: 10,              // 10 PULPA por mensaje de voz (más personal)
  SHARE_MEME: 3,                  // 3 PULPA por meme/GIF (cultura de grupo)
  
  // 🎯 Acciones premium
  ORGANIZE_EVENT: 50,             // 50 PULPA por organizar evento/meetup
  WRITE_THREAD: 35,               // 35 PULPA por thread educativo (>3 mensajes)
  INVITE_BUILDER: 30,             // 30 PULPA por invitar builder nuevo que participe
  ATTEND_IRL: 60,                 // 60 PULPA por asistir a evento IRL y compartir foto
  
  // 🏆 Bonificaciones especiales
  FIRST_REPLY: 8,                 // 8 PULPA por ser el primero en responder
  CONSISTENT_WEEK: 40,            // 40 PULPA por participar 5+ días en la semana
  STREAK_7_DAYS: 75,              // 75 PULPA por 7 días seguidos participando
  TOP_CONTRIBUTOR: 100,           // 100 PULPA reconocimiento especial de Mel
};

// 🔍 KEYWORDS PARA DETECTAR ACCIONES
export const KEYWORDS = {
  // Eventos
  EVENTS: [
    'hackathon', 'meetup', 'workshop', 'conference', 'evento',
    'buildathon', 'demo day', 'pitch', 'networking', 'ama',
    'twitter space', 'live', 'webinar', 'charla', 'panel'
  ],
  
  // Buenos días
  GM: [
    'gm', 'good morning', 'buenos días', 'buen día', 'buenas',
    'morning', 'gn', 'good night', 'buenas noches'
  ],
  
  // Bienvenidas
  WELCOME: [
    'bienvenido', 'bienvenida', 'welcome', 'hola a todos',
    'nuevo aquí', 'recién llego', 'me presento'
  ],
  
  // Recursos/Links útiles
  RESOURCES: [
    'documentación', 'docs', 'tutorial', 'guía', 'ejemplo',
    'repositorio', 'github', 'código', 'aprende', 'curso',
    'video', 'artículo', 'blog', 'newsletter'
  ],
  
  // Oportunidades
  OPPORTUNITIES: [
    'trabajo', 'contrato', 'freelance', 'proyecto', 'colaboración',
    'hiring', 'buscamos', 'oportunidad', 'vacante', 'equipo',
    'grant', 'funding', 'inversión', 'bounty'
  ],
  
  // Noticias del ecosistema
  NEWS: [
    'noticia', 'actualización', 'lanzamiento', 'release', 'anuncia',
    'nuevo protocolo', 'partnership', 'alianza', 'fusión'
  ],
  
  // Pedir ayuda
  HELP: [
    'ayuda', 'help', 'alguien sabe', 'pregunta', 'duda',
    'cómo', 'problema', 'error', 'no entiendo', 'stuck',
    'necesito', 'recomendación'
  ],
  
  // Organizar evento
  ORGANIZE: [
    'organizo', 'organizamos', 'vamos a hacer', 'propongo',
    'hagamos', 'armemos', 'coordinemos'
  ],
  
  // Thread educativo
  THREAD_START: [
    'thread', 'hilo', '1/', '1 /', 'les cuento sobre',
    'déjenme explicar', 'mini tutorial'
  ],
  
  // Asistencia IRL
  ATTEND_IRL: [
    'en el evento', 'en el meetup', 'en el hackathon',
    'aquí en', 'presente en', 'foto del evento'
  ]
};

// ⚙️ UMBRALES Y CONFIGURACIONES
export const THRESHOLDS = {
  MIN_REACTIONS_FOR_BONUS: 10,        // Reacciones para bonificación
  MIN_REPLIES_FOR_CONVERSATION: 5,    // Respuestas para contar como conversación
  MIN_THREAD_LENGTH: 3,                // Mensajes para contar como thread
  MIN_MESSAGE_LENGTH_HELP: 50,        // Caracteres para contar como ayuda
  DAYS_FOR_STREAK: 7,                  // Días para streak
  MESSAGES_PER_WEEK_CONSISTENT: 5,    // Mensajes/semana para consistencia
};

// 🍊 NIVELES DE PULPA (para rankings y airdrops)
export const PULPA_LEVELS = {
  SEED: { min: 0, max: 99, emoji: '🌱', name: 'Semilla' },
  SPROUT: { min: 100, max: 299, emoji: '🌿', name: 'Brote' },
  FRUIT: { min: 300, max: 699, emoji: '🍊', name: 'Fruta' },
  TREE: { min: 700, max: 1499, emoji: '🌳', name: 'Árbol' },
  ORCHARD: { min: 1500, max: Infinity, emoji: '🏞️', name: 'Huerta' },
};

// 🎯 FUNCIÓN PARA OBTENER NIVEL SEGÚN PULPA
export function getPulpaLevel(pulpa: number) {
  if (pulpa >= PULPA_LEVELS.ORCHARD.min) return PULPA_LEVELS.ORCHARD;
  if (pulpa >= PULPA_LEVELS.TREE.min) return PULPA_LEVELS.TREE;
  if (pulpa >= PULPA_LEVELS.FRUIT.min) return PULPA_LEVELS.FRUIT;
  if (pulpa >= PULPA_LEVELS.SPROUT.min) return PULPA_LEVELS.SPROUT;
  return PULPA_LEVELS.SEED;
}