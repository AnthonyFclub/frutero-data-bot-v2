import Database from 'better-sqlite3';
import * as path from 'path';

// Crear o abrir la base de datos
const dbPath = path.join(__dirname, '../../frutero-bot.db');
const db = new Database(dbPath);

console.log('📊 Base de datos conectada en:', dbPath);

// CREAR TABLAS
export function initDatabase() {
  console.log('🔧 Creando tablas de la base de datos...');

  // Tabla: users
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      telegram_id TEXT UNIQUE NOT NULL,
      username TEXT,
      display_name TEXT,
      pulpa_score INTEGER DEFAULT 0,
      first_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_active DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Tabla "users" creada');

  // Tabla: messages
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message_id TEXT UNIQUE NOT NULL,
      user_telegram_id TEXT NOT NULL,
      group_id TEXT NOT NULL,
      content TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      has_event BOOLEAN DEFAULT 0,
      event_detected TEXT,
      FOREIGN KEY (user_telegram_id) REFERENCES users(telegram_id)
    )
  `);
  console.log('✅ Tabla "messages" creada');

  // Tabla: reactions
  db.exec(`
    CREATE TABLE IF NOT EXISTS reactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message_id TEXT NOT NULL,
      user_telegram_id TEXT NOT NULL,
      emoji TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_telegram_id) REFERENCES users(telegram_id)
    )
  `);
  console.log('✅ Tabla "reactions" creada');

  // Tabla: events
  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      date DATE,
      location TEXT,
      type TEXT,
      link TEXT,
      shared_by_telegram_id TEXT,
      shared_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      reaction_count INTEGER DEFAULT 0,
      confidence INTEGER DEFAULT 0,
      FOREIGN KEY (shared_by_telegram_id) REFERENCES users(telegram_id)
    )
  `);
  console.log('✅ Tabla "events" creada');

  console.log('🎉 Base de datos inicializada correctamente\n');
}

// FUNCIONES PARA GUARDAR DATOS

// Guardar o actualizar usuario
export function saveUser(telegramId: string, username: string | null, displayName: string) {
  const stmt = db.prepare(`
    INSERT INTO users (telegram_id, username, display_name)
    VALUES (?, ?, ?)
    ON CONFLICT(telegram_id) DO UPDATE SET
      username = excluded.username,
      display_name = excluded.display_name,
      last_active = CURRENT_TIMESTAMP
  `);

  stmt.run(telegramId, username, displayName);
}

// Guardar mensaje
export function saveMessage(
  messageId: string,
  userTelegramId: string,
  groupId: string,
  content: string
) {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO messages (message_id, user_telegram_id, group_id, content)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(messageId, userTelegramId, groupId, content);
}

// Obtener estadísticas
export function getStats() {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  const messageCount = db.prepare('SELECT COUNT(*) as count FROM messages').get() as { count: number };
  
  return {
    users: userCount.count,
    messages: messageCount.count
  };
}

// Guardar evento detectado
export function saveEvent(
  eventType: string,
  eventName: string | null,
  date: string | null,
  location: string | null,
  link: string | null,
  sharedByTelegramId: string,
  confidence: number
): void {
  try {
    const stmt = db.prepare(`
      INSERT INTO events (name, date, location, type, link, shared_by_telegram_id, confidence)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(eventName, date, location, eventType, link, sharedByTelegramId, confidence);
    
    console.log('   ✅ Evento guardado en base de datos');
  } catch (error) {
    console.error('   ❌ Error guardando evento:', error);
  }
}

// Actualizar PULPA de un usuario
export function addPulpaToUser(
  telegramId: string,
  pulpa: number,
  action: string
): void {
  try {
    const stmt = db.prepare(`
      UPDATE users 
      SET pulpa_score = pulpa_score + ?
      WHERE telegram_id = ?
    `);
    
    stmt.run(pulpa, telegramId);
    
    console.log(`   🍊 +${pulpa} PULPA por: ${action}`);
  } catch (error) {
    console.error('   ❌ Error actualizando PULPA:', error);
  }
}

// Obtener PULPA de un usuario
export function getUserPulpa(telegramId: string): number {
  try {
    const result = db.prepare(`
      SELECT pulpa_score FROM users WHERE telegram_id = ?
    `).get(telegramId) as { pulpa_score: number } | undefined;
    
    return result?.pulpa_score || 0;
  } catch (error) {
    console.error('   ❌ Error obteniendo PULPA:', error);
    return 0;
  }
}

// ⭐ NUEVA FUNCIÓN: Obtener ranking de usuarios
export function getTopUsers(limit: number = 10) {
  try {
    const results = db.prepare(`
      SELECT 
        telegram_id,
        username,
        display_name,
        pulpa_score
      FROM users
      WHERE pulpa_score > 0
      ORDER BY pulpa_score DESC
      LIMIT ?
    `).all(limit);
    
    return results as Array<{
      telegram_id: string;
      username: string | null;
      display_name: string;
      pulpa_score: number;
    }>;
  } catch (error) {
    console.error('   ❌ Error obteniendo ranking:', error);
    return [];
  }
}

// ⭐ NUEVA FUNCIÓN: Obtener últimos eventos detectados
export function getRecentEvents(limit: number = 10) {
  try {
    const results = db.prepare(`
      SELECT 
        e.name,
        e.date,
        e.location,
        e.type,
        e.link,
        e.shared_date,
        e.confidence,
        u.display_name,
        u.username
      FROM events e
      LEFT JOIN users u ON e.shared_by_telegram_id = u.telegram_id
      ORDER BY e.shared_date DESC
      LIMIT ?
    `).all(limit);
    
    return results as Array<{
      name: string | null;
      date: string | null;
      location: string | null;
      type: string;
      link: string | null;
      shared_date: string;
      confidence: number;
      display_name: string;
      username: string | null;
    }>;
  } catch (error) {
    console.error('   ❌ Error obteniendo eventos:', error);
    return [];
  }
}

// Exportar la instancia de la base de datos
export default db;
