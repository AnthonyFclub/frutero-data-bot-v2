import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { initDatabase, saveUser, saveMessage, getStats } from './database/sqlite-db.js';
import { detectEvent, isGMMessage, isWelcomeMessage, sharesResource, isHelpMessage } from './analyzers/event-detector.js';
import { POINTS_CONFIG } from './config/points-system.js';

// Cargar variables de entorno
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN!;
const TEST_GROUP_ID = process.env.TEST_GROUP_ID!;

// Inicializar bot
const bot = new Telegraf(BOT_TOKEN);

// Inicializar base de datos
console.log('🗄️  Inicializando base de datos...\n');
initDatabase();

// ESCUCHAR NUEVOS MENSAJES
bot.on('message', async (ctx) => {
  try {
    // Solo procesar mensajes de grupos
    if (ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup') {
      return;
    }

    const chatId = ctx.chat.id.toString();
    const messageId = ctx.message.message_id.toString();
    
    // Información del usuario
    const userId = ctx.from.id.toString();
    const username = ctx.from.username || null;
    const displayName = ctx.from.first_name + (ctx.from.last_name ? ' ' + ctx.from.last_name : '');
    
    // Contenido del mensaje
    let content = '';
    if ('text' in ctx.message) {
      content = ctx.message.text;
    } else if ('caption' in ctx.message) {
      content = ctx.message.caption || '';
    }

    // ⭐ DETECCIÓN MANUAL DE COMANDOS (con o sin @nombre_bot)
    const commandMatch = content.match(/^\/([a-z]+)(@[a-z_]+)?$/i);
    
    if (commandMatch) {
      const command = commandMatch[1].toLowerCase(); // "start" o "stats"
      
      // Comando /start
      if (command === 'start') {
        const welcomeMessage = `
🍊 *FRUTERO DATA BOT ACTIVO* 🤖

¡Hola! Estoy recopilando información del grupo para:
- Detectar eventos (hackathons, meetups)
- Calcular Pulpa Score por actividad
- Generar rankings de participación

*Comandos disponibles:*
/stats - Ver estadísticas del bot
/start - Mostrar este mensaje

Desarrollado por Anthony 🚀
        `.trim();
        
        await ctx.reply(welcomeMessage, { parse_mode: 'Markdown' });
        console.log('✅ Comando /start ejecutado por:', displayName);
        
        // Guardar usuario pero NO guardar el comando como mensaje
        saveUser(userId, username, displayName);
        return;
      }
      
      // Comando /stats
      if (command === 'stats') {
        const stats = getStats();
        const message = `
📊 *ESTADÍSTICAS FRUTERO BOT*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 Usuarios únicos: *${stats.users}*
💬 Mensajes guardados: *${stats.messages}*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
🍊 Bot funcionando correctamente
        `.trim();
        
        await ctx.reply(message, { parse_mode: 'Markdown' });
        console.log('✅ Comando /stats ejecutado por:', displayName);
        
        // Guardar usuario pero NO guardar el comando como mensaje
        saveUser(userId, username, displayName);
        return;
      }
    }

    // Si no es un comando, analizar mensaje
    saveUser(userId, username, displayName);
    
    // 🎪 ANÁLISIS DEL MENSAJE
    let messageType = 'normal';
    let detectedEventInfo = null;
    
    // Detectar tipo de mensaje
    if (isGMMessage(content)) {
      messageType = 'GM';
      console.log('   🌅 GM detectado!');
    } else if (isWelcomeMessage(content)) {
      messageType = 'Bienvenida';
      console.log('   👋 Mensaje de bienvenida detectado!');
    } else if (sharesResource(content)) {
      messageType = 'Recurso compartido';
      console.log('   📚 Recurso compartido detectado!');
    } else if (isHelpMessage(content)) {
      messageType = 'Pide ayuda';
      console.log('   🆘 Mensaje de ayuda detectado!');
    }
    
    // Detectar eventos
    const eventAnalysis = detectEvent(content);
    if (eventAnalysis.hasEvent) {
      messageType = 'Evento compartido';
      detectedEventInfo = eventAnalysis;
      
      console.log('   🎉 EVENTO DETECTADO!');
      console.log('   📋 Tipo:', eventAnalysis.eventType);
      if (eventAnalysis.eventName) console.log('   🏷️  Nombre:', eventAnalysis.eventName);
      if (eventAnalysis.date) console.log('   📅 Fecha:', eventAnalysis.date);
      if (eventAnalysis.location) console.log('   📍 Ubicación:', eventAnalysis.location);
      if (eventAnalysis.link) console.log('   🔗 Link:', eventAnalysis.link);
      console.log('   📊 Confianza:', eventAnalysis.confidence + '%');
      
      // TODO: Guardar evento en tabla events (próxima sesión)
      // TODO: Dar puntos extra por compartir evento
    }
    
    // Guardar mensaje
    saveMessage(messageId, userId, chatId, content);

    // Mostrar en consola
    console.log('📨 Nuevo mensaje guardado:');
    console.log(`   👤 Usuario: ${displayName} (@${username || 'sin username'})`);
    console.log(`   💬 Mensaje: ${content || '[sin texto]'}`);
    console.log(`   🆔 Chat ID: ${chatId}`);
    console.log('');

    // Mostrar estadísticas cada 5 mensajes
    const stats = getStats();
    if (stats.messages % 5 === 0) {
      console.log('📊 ESTADÍSTICAS:');
      console.log(`   Usuarios únicos: ${stats.users}`);
      console.log(`   Mensajes guardados: ${stats.messages}`);
      console.log('');
    }

  } catch (error) {
    console.error('❌ Error procesando mensaje:', error);
  }
});

// INICIAR BOT
console.log('🤖 Bot iniciado y escuchando mensajes...');
console.log(`📍 Grupo de prueba ID: ${TEST_GROUP_ID}`);
console.log('💡 Escribe algo en tu grupo de Telegram para ver la magia!\n');

bot.launch();

// Manejo de cierre elegante
process.once('SIGINT', () => {
  console.log('\n👋 Cerrando bot...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('\n👋 Cerrando bot...');
  bot.stop('SIGTERM');
});