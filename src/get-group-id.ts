import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

console.log('🤖 Bot iniciado. Esperando mensajes...');
console.log('📝 Escribe cualquier cosa en tu grupo de Telegram');

bot.on('message', (ctx) => {
  console.log('\n✅ ¡MENSAJE RECIBIDO!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 GROUP ID:', ctx.chat.id);
  console.log('📋 Tipo de chat:', ctx.chat.type);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
    console.log('🎉 ¡Este es tu GROUP ID!');
    console.log('📌 Copia este número:', ctx.chat.id);
  }
});

bot.launch();