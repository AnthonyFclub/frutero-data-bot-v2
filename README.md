# 🍊 Bot Frutero v2.0 - Sistema de PULPA Automático

Bot de Telegram que detecta automáticamente actividad comunitaria y asigna recompensas (PULPA) para incentivar participación en Frutero Club.

[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)](https://github.com/AnthonyFclub/frutero-data-bot-v2)

---

## 🎯 Características Principales

- ✅ **Detección automática de eventos** - Identifica hackathons, meetups y workshops sin intervención manual
- ✅ **Sistema de recompensas (PULPA)** - Asigna puntos automáticamente por participación
- ✅ **Ranking en tiempo real** - Clasificación actualizada de usuarios más activos
- ✅ **Base de datos persistente** - SQLite guardando toda la actividad comunitaria
- ✅ **6 comandos interactivos** - Interfaz completa para usuarios y administradores
- ✅ **Sistema de niveles** - Progresión visual de 🌱 Semilla a 🏞️ Huerta
- ✅ **Configuración modular** - Fácil de personalizar sin tocar código core

---

## 🏆 Sistema de PULPA

### Acciones que ganan PULPA:

| Acción | PULPA | Descripción |
|--------|-------|-------------|
| 🌅 GM (buenos días) | +5 | Saludo diario en el grupo |
| 🎉 Compartir evento | +25 | Hackathons, meetups, workshops |
| 👋 Dar bienvenida | +8 | Recibir nuevos miembros |
| 📚 Compartir recurso | +15 | Documentos, tutoriales, links |
| 🆘 Pedir ayuda | +5 | Iniciar conversación |
| 💬 Responder hilo | +12 | Engagement profundo |
| 🎤 Mensaje de voz | +10 | Contenido personal |
| 📊 Contestar encuesta | +8 | Feedback para el equipo |
| 🤝 Ayudar a alguien | +20 | Responder preguntas |
| 🎭 Meme/GIF | +3 | Cultura de grupo |

### Acciones Premium:

| Acción | PULPA | Descripción |
|--------|-------|-------------|
| 🎪 Asistir evento IRL | +60 | La acción más valiosa |
| 🎯 Organizar evento | +50 | Liderazgo comunitario |
| 📖 Thread educativo | +35 | Compartir conocimiento |
| 🌟 Invitar builder activo | +30 | Crecimiento orgánico |

### Bonificaciones Especiales:

| Bonificación | PULPA | Condición |
|-------------|-------|-----------|
| 🏅 Top contributor | +100 | Reconocimiento manual |
| 🔥 Streak 7 días | +75 | Consistencia extrema |
| ⚡ Activo 5+ días/semana | +40 | Miembro comprometido |
| 🚀 Primer en responder | +8 | Velocidad de respuesta |

---

## 📊 Sistema de Niveles

| Nivel | PULPA Requerida | Emoji | Estado |
|-------|-----------------|-------|--------|
| **Semilla** | 0-99 | 🌱 | Nuevo en la comunidad |
| **Brote** | 100-299 | 🌿 | Participante ocasional |
| **Fruta** | 300-699 | 🍊 | Miembro activo |
| **Árbol** | 700-1499 | 🌳 | Pilar de la comunidad |
| **Huerta** | 1500+ | 🏞️ | Leyenda Frutero |

---

## 🚀 Instalación

### Requisitos previos:
- Node.js v20+ ([Descargar](https://nodejs.org/))
- npm (incluido con Node.js)
- Cuenta de Telegram
- Bot Token de [@BotFather](https://t.me/BotFather)

### Setup:
```bash
# 1. Clonar repositorio
git clone https://github.com/AnthonyFclub/frutero-data-bot-v2.git
cd frutero-data-bot-v2

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
touch .env
```

### Agregar en `.env`:
```bash
BOT_TOKEN=tu_token_de_botfather_aqui
TEST_GROUP_ID=tu_group_id_aqui
```

### Obtener Group ID:
1. Agregar [@userinfobot](https://t.me/userinfobot) a tu grupo
2. Copiar el Group ID (incluye el `-` inicial)
3. Remover @userinfobot del grupo

### Ejecutar bot:
```bash
npx tsx src/main.ts
```

**El bot estará operativo y detectando mensajes en tiempo real.** ✅

---

## 📝 Comandos del Bot

| Comando | Descripción | Ejemplo de Respuesta |
|---------|-------------|---------------------|
| `/start` | Mensaje de bienvenida | Muestra todos los comandos disponibles |
| `/stats` | Estadísticas generales | Total usuarios, mensajes, eventos |
| `/mispulpa` | Ver tu PULPA acumulada | "🌱 Nivel: Semilla - 65 PULPA" |
| `/ranking` | Top 10 usuarios | Lista con medallas 🥇🥈🥉 |
| `/eventos` | Últimos eventos detectados | Hackathons, meetups con detalles |

---

## 🔧 Personalización

### Modificar cantidades de PULPA:

Editar `src/config/pulpa-system.ts`:
```typescript
export const PULPA_CONFIG = {
  GM_MESSAGE: 5,        // 👈 Cambiar aquí
  SHARE_EVENT: 25,      // 👈 Cambiar aquí
  WELCOME_MESSAGE: 8,   // 👈 Cambiar aquí
  // ... más acciones
};
```

**Guardar y reiniciar el bot. No se requiere compilación adicional.**

### Agregar nueva acción con PULPA:
```typescript
// 1. En pulpa-system.ts
PULPA_CONFIG = {
  // ... existentes
  NUEVA_ACCION: 15,  // 👈 Nueva recompensa
}

// 2. Agregar keywords
KEYWORDS = {
  // ... existentes
  NUEVA_ACCION: ['keyword1', 'keyword2'],
}

// 3. Detector en event-detector.ts
export function detectaNuevaAccion(message: string): boolean {
  const lower = message.toLowerCase();
  return KEYWORDS.NUEVA_ACCION.some(kw => lower.includes(kw));
}

// 4. Integrar en main.ts
else if (detectaNuevaAccion(content)) {
  messageType = 'Nueva Acción';
  console.log('   ✨ Nueva acción detectada!');
}
```

---

## 📁 Estructura del Proyecto
```
frutero-data-bot-v2/
├── src/
│   ├── analyzers/              # Detectores de patrones
│   │   ├── event-detector.ts   # Detecta eventos (hackathons, meetups)
│   │   └── points-calculator.ts # Calcula PULPA por acción
│   ├── config/
│   │   └── pulpa-system.ts     # ⭐ Configuración central de PULPA
│   ├── database/
│   │   └── sqlite-db.ts        # Lógica de base de datos
│   └── main.ts                 # 🧠 Punto de entrada del bot
├── docs/                       # Documentación de sesiones
├── .env                        # Variables de entorno (NO SUBIR)
├── .gitignore                  # Archivos a ignorar en Git
├── package.json                # Dependencias del proyecto
├── tsconfig.json               # Configuración de TypeScript
└── README.md                   # Este archivo
```

---

## 🛠️ Stack Tecnológico

- **[TypeScript](https://www.typescriptlang.org/)** - Lenguaje principal con tipado fuerte
- **[Node.js](https://nodejs.org/)** - Runtime de JavaScript
- **[Telegraf](https://telegraf.js.org/)** - Framework para bots de Telegram
- **[SQLite](https://www.sqlite.org/)** - Base de datos embebida
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)** - Driver SQLite para Node.js

---

## 🗄️ Base de Datos

### Schema:

#### Tabla: `users`
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_id TEXT UNIQUE NOT NULL,
  username TEXT,
  display_name TEXT,
  pulpa_score INTEGER DEFAULT 0,
  first_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_active DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabla: `messages`
```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message_id TEXT UNIQUE NOT NULL,
  user_telegram_id TEXT NOT NULL,
  group_id TEXT NOT NULL,
  content TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  has_event BOOLEAN DEFAULT 0,
  event_detected TEXT,
  FOREIGN KEY (user_telegram_id) REFERENCES users(telegram_id)
);
```

#### Tabla: `events`
```sql
CREATE TABLE events (
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
);
```

---

## 🤖 Replicar a Otras Plataformas

### WhatsApp Bot:
```bash
# Instalar librería
npm install whatsapp-web.js qrcode-terminal

# Reemplazar main.ts con lógica de WhatsApp
# Los detectores (event-detector.ts) funcionan sin cambios
```

### Discord Bot:
```bash
# Instalar librería
npm install discord.js

# Adaptar main.ts a eventos de Discord
# La lógica de PULPA (pulpa-system.ts) se reutiliza 100%
```

**Arquitectura modular permite cambiar de plataforma sin reescribir la lógica core.**

---

## 🚀 Deployment

### Opción 1: Railway.app (Recomendada)
1. Push código a GitHub
2. Conectar Railway con el repositorio
3. Configurar variables de entorno
4. Deploy automático

### Opción 2: Heroku
```bash
heroku create frutero-bot
git push heroku main
heroku config:set BOT_TOKEN=tu_token
```

### Opción 3: VPS (DigitalOcean, AWS)
```bash
# En el servidor
git clone https://github.com/AnthonyFclub/frutero-data-bot-v2.git
cd frutero-data-bot-v2
npm install
# Configurar .env
# Ejecutar con PM2 para que corra 24/7
npm install -g pm2
pm2 start "npx tsx src/main.ts" --name frutero-bot
pm2 save
```

---

## 📈 Roadmap Futuro

### Fase 6: Deployment en Producción ✅
- [x] Bot funcional al 100%
- [ ] Agregar al grupo Frutero Club principal
- [ ] Monitoreo 24/7
- [ ] Logs centralizados

### Fase 7: Exportación Avanzada
- [ ] Google Sheets API integration
- [ ] CSV automático para AirDrop
- [ ] Reportes semanales por email

### Fase 8: Dashboard Visual
- [ ] Notion dashboard con métricas
- [ ] Gráficas de participación
- [ ] Estadísticas en tiempo real

### Fase 9: Funcionalidades Premium
- [ ] Comando `/mihistorial` - Tu actividad completa
- [ ] Comando `/topevento` - Evento más popular
- [ ] Notificaciones de nivel subido
- [ ] Sistema de badges/insignias
- [ ] Integración con wallets para AirDrop on-chain

---

## 🐛 Troubleshooting

### Bot no responde a comandos:
```bash
# Verificar que el bot está corriendo
# Terminal debe mostrar: "🤖 Bot conectado correctamente!"

# Verificar Group ID correcto en .env
# Debe incluir el - inicial: -1003301996846
```

### Error de base de datos:
```bash
# Recrear base de datos
rm frutero-bot.db
npx tsx src/main.ts
# Se crea automáticamente con schema correcto
```

### Comandos se guardan como mensajes:
```bash
# Verificar detección de comandos en main.ts
# Debe detectar tanto /comando como /comando@bot
```

---

## 📚 Documentación Completa

Ver carpeta `docs/` para documentación detallada de cada sesión de desarrollo:

- [Sesión 18 Nov - Parte 1](docs/Sesion-18-Nov-2024-Parte-1.md) - Setup inicial
- [Sesión 18 Nov - Parte 2](docs/Sesion-18-Nov-2024-Parte-2.md) - Base de datos
- [Sesión 18 Nov - Parte 3](docs/Sesion-18-Nov-2024-Parte-3.md) - Comandos básicos
- [Sesión 19 Nov](docs/Sesion-19-Nov-2024.md) - Detector de eventos
- [Sesión 28 Nov](docs/Sesion-28-Nov-2024.md) - Sistema completo de PULPA

---

## 👤 Autor

**Anthony Valarnaut**
- GitHub: [@AnthonyFclub](https://github.com/AnthonyFclub)
- Proyecto desarrollado con metodología **Vibecoding**
- Para [Frutero Club](https://frutero.club) - Comunidad blockchain Argentina

---

## 🙏 Agradecimientos

- **Frutero Club community** - Por ser la razón de este proyecto
- **Mel** (Project Manager) - Por la dirección y requirements
- **Claude (Zeus)** - Mentor de código y arquitectura

---

## 📄 Licencia

MIT License - Úsalo libremente

---

## 🔗 Enlaces Útiles

- [Documentación de Telegram Bots](https://core.telegram.org/bots)
- [Telegraf Framework](https://telegraf.js.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**Desarrollado con 🍊 por Anthony usando Vibecoding** 🚀

---

## 📊 Estado del Proyecto
```
Fase 1: Setup ........................... ✅ 100%
Fase 2: Base de Datos ................... ✅ 100%
Fase 3: Comandos Básicos ................ ✅ 100%
Fase 4: Detector de Eventos ............. ✅ 100%
Fase 5: Sistema de PULPA ................ ✅ 100%
─────────────────────────────────────────────────
PROYECTO COMPLETADO ..................... ✅ 100%
```

**🎉 Bot listo para producción - Deployment ready**