import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { initDatabase, saveUser, saveMessage, getStats, saveEvent, addPulpaToUser, getUserPulpa, getTopUsers, getRecentEvents } from './database/sqlite-db.js';
import { detectEvent, isGMMessage, isWelcomeMessage, sharesResource, isHelpMessage } from './analyzers/event-detector.js';
import { calculatePulpa, getActionDescription } from './analyzers/points-calculator.js';
import { PULPA_CONFIG, getPulpaLevel } from './config/pulpa-system.js';

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

    // ⭐ DETECCIÓN MEJORADA DE COMANDOS
    if (content.startsWith('/')) {
      const commandText = content.split(' ')[0];
      const commandMatch = commandText.match(/^\/([a-z]+)/i);
      
      if (commandMatch) {
        const command = commandMatch[1].toLowerCase();
        
        console.log(`🎯 Comando detectado: /${command}`);
        
        saveUser(userId, username, displayName);
        
        // Comando /start
        if (command === 'start') {
          const welcomeMessage = `
🍊 *FRUTERO DATA BOT ACTIVO* 🤖

¡Hola! Estoy recopilando información del grupo para:
- Detectar eventos (hackathons, meetups)
- Calcular PULPA por actividad
- Generar rankings de participación

*Comandos disponibles:*
/stats - Ver estadísticas del bot
/mispulpa - Ver tu PULPA acumulada
/ranking - Ver top 10 usuarios
/eventos - Ver últimos eventos detectados
/start - Mostrar este mensaje

Desarrollado por Anthony 🚀
          `.trim();
          
          await ctx.reply(welcomeMessage, { parse_mode: 'Markdown' });
          console.log('✅ Comando /start ejecutado por:', displayName);
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
          return;
        }
        
        // Comando /mispulpa
        if (command === 'mispulpa' || command === 'pulpa') {
          const pulpa = getUserPulpa(userId);
          const level = getPulpaLevel(pulpa);
          
          const message = `
🍊 *TU PULPA* 🍊

${level.emoji} *Nivel:* ${level.name}
*PULPA actual:* ${pulpa}

${pulpa < 100 ? `Próximo nivel: ${100 - pulpa} PULPA más para 🌿 Brote` : ''}
${pulpa >= 100 && pulpa < 300 ? `Próximo nivel: ${300 - pulpa} PULPA más para 🍊 Fruta` : ''}
${pulpa >= 300 && pulpa < 700 ? `Próximo nivel: ${700 - pulpa} PULPA más para 🌳 Árbol` : ''}
${pulpa >= 700 && pulpa < 1500 ? `Próximo nivel: ${1500 - pulpa} PULPA más para 🏞️ Huerta` : ''}
${pulpa >= 1500 ? '¡Eres una leyenda Frutero! 🎉' : ''}
          `.trim();
          
          await ctx.reply(message, { parse_mode: 'Markdown' });
          console.log('✅ Comando /mispulpa ejecutado por:', displayName);
          return;
        }
        
        // Comando /ranking
        if (command === 'ranking' || command === 'top') {
          console.log('🏆 Ejecutando comando /ranking...');
          
          const topUsers = getTopUsers(10);
          
          if (topUsers.length === 0) {
            await ctx.reply('📊 Aún no hay usuarios con PULPA.');
            console.log('✅ Comando /ranking ejecutado - Sin usuarios');
            return;
          }
          
          let message = '🏆 *TOP 10 FRUTEROS* 🍊\n\n';
          
          topUsers.forEach((user, index) => {
            const level = getPulpaLevel(user.pulpa_score);
            const position = index + 1;
            const userDisplayName = user.display_name || user.username || 'Usuario';
            
            let medal = '';
            if (position === 1) medal = '🥇';
            else if (position === 2) medal = '🥈';
            else if (position === 3) medal = '🥉';
            else medal = `${position}.`;
            
            message += `${medal} ${level.emoji} *${userDisplayName}*\n`;
            message += `   └ ${user.pulpa_score} PULPA (${level.name})\n\n`;
          });
          
          message += '💪 ¡Sigue participando para subir en el ranking!';
          
          await ctx.reply(message, { parse_mode: 'Markdown' });
          console.log('✅ Comando /ranking ejecutado por:', displayName);
          return;
        }
        
        // Comando /eventos
        if (command === 'eventos' || command === 'events') {
          console.log('📅 Ejecutando comando /eventos...');
          
          const events = getRecentEvents(10);
          
          if (events.length === 0) {
            await ctx.reply('📅 Aún no se han detectado eventos.');
            console.log('✅ Comando /eventos ejecutado - Sin eventos');
            return;
          }
          
          let message = '📅 *ÚLTIMOS EVENTOS DETECTADOS* 🎉\n\n';
          
          events.forEach((event, index) => {
            const position = index + 1;
            
            // ⭐ MEJORA: Si el nombre es muy corto, usar tipo
            let eventName = event.name || event.type;
            if (eventName && eventName.length <= 3) {
              eventName = event.type;
            }
            
            const sharedBy = event.display_name || event.username || 'Usuario';
            
            let emoji = '🎪';
            if (event.type === 'Hackathon') emoji = '💻';
            else if (event.type === 'Meetup') emoji = '🤝';
            else if (event.type === 'Workshop') emoji = '🛠️';
            else if (event.type === 'AMA') emoji = '💬';
            
            message += `${position}. ${emoji} *${eventName}*\n`;
            
            if (event.date) message += `   📆 ${event.date}\n`;
            if (event.location) message += `   📍 ${event.location}\n`;
            if (event.link) message += `   🔗 ${event.link}\n`;
            
            message += `   👤 Compartido por: ${sharedBy}\n`;
            message += `   📊 Confianza: ${event.confidence}%\n\n`;
          });
          
          message += '🍊 ¡Comparte eventos para ganar PULPA!';
          
          await ctx.reply(message, { parse_mode: 'Markdown' });
          console.log('✅ Comando /eventos ejecutado por:', displayName);
          return;
        }
        
        console.log(`⚠️  Comando no reconocido: /${command}`);
        return;
      }
    }

    // Si no es un comando, analizar mensaje
    saveUser(userId, username, displayName);
    
    let messageType = 'normal';
    let detectedEventInfo = null;
    
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
      
      saveEvent(
        eventAnalysis.eventType || 'Evento',
        eventAnalysis.eventName || null,
        eventAnalysis.date || null,
        eventAnalysis.location || null,
        eventAnalysis.link || null,
        userId,
        eventAnalysis.confidence
      );
    }
    
    if (messageType !== 'normal') {
      const pulpaGanada = calculatePulpa(messageType);
      const accion = getActionDescription(messageType);
      
      if (pulpaGanada > 0) {
        addPulpaToUser(userId, pulpaGanada, accion);
        
        const pulpaTotal = getUserPulpa(userId);
        const level = getPulpaLevel(pulpaTotal);
        console.log(`   ${level.emoji} PULPA total: ${pulpaTotal}`);
      }
    }
    
    saveMessage(messageId, userId, chatId, content);

    console.log('📨 Nuevo mensaje guardado:');
    console.log(`   👤 Usuario: ${displayName} (@${username || 'sin username'})`);
    console.log(`   💬 Mensaje: ${content || '[sin texto]'}`);
    console.log(`   🆔 Chat ID: ${chatId}`);
    console.log('');

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

process.once('SIGINT', () => {
  console.log('\n👋 Cerrando bot...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('\n👋 Cerrando bot...');
  bot.stop('SIGTERM');
});