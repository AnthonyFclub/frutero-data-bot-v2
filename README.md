# 🍊 Bot Frutero v2.0 - Sistema de PULPA Automático

Bot de Telegram que detecta automáticamente actividad comunitaria y asigna recompensas (PULPA) para incentivar participación en Frutero Club.

## 🎯 Características

- ✅ **Detección automática de eventos** (hackathons, meetups, workshops)
- ✅ **Sistema de recompensas (PULPA)** por actividad
- ✅ **Ranking de usuarios** con niveles visuales
- ✅ **Base de datos SQLite** guardando toda la información
- ✅ **6 comandos funcionando** (`/start`, `/stats`, `/mispulpa`, `/ranking`, `/eventos`)

## 🏆 Sistema de PULPA

| Acción | PULPA | Descripción |
|--------|-------|-------------|
| 🌅 GM | +5 | Saludo buenos días |
| 🎉 Evento | +25 | Compartir hackathon/meetup |
| 👋 Bienvenida | +8 | Dar bienvenida a nuevos |
| 📚 Recurso | +15 | Compartir links útiles |
| 🆘 Ayuda | +5 | Pedir ayuda en el grupo |

## 📊 Niveles

- 🌱 Semilla (0-99 PULPA)
- 🌿 Brote (100-299 PULPA)
- 🍊 Fruta (300-699 PULPA)
- 🌳 Árbol (700-1499 PULPA)
- 🏞️ Huerta (1500+ PULPA)

## 🚀 Instalación

### Requisitos previos:
- Node.js v20+ 
- npm
- Cuenta de Telegram
- Bot Token de @BotFather

### Setup:

1. **Clonar repositorio:**
```bash
git clone https://github.com/TU_USUARIO/frutero-data-bot-v2.git
cd frutero-data-bot-v2
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
# Crear archivo .env
touch .env
```

Agregar en `.env`:
```
BOT_TOKEN=tu_token_aqui
TEST_GROUP_ID=tu_group_id_aqui
```

4. **Ejecutar bot:**
```bash
npx tsx src/main.ts
```

## 📝 Comandos del Bot

| Comando | Descripción |
|---------|-------------|
| `/start` | Mensaje de bienvenida |
| `/stats` | Estadísticas del bot |
| `/mispulpa` | Ver tu PULPA acumulada |
| `/ranking` | Top 10 usuarios con más PULPA |
| `/eventos` | Últimos eventos detectados |

## 🔧 Modificar cantidades de PULPA

Para cambiar puntos, edita `src/config/pulpa-system.ts`:
```typescript
export const PULPA_CONFIG = {
  GM_MESSAGE: 5,        // Cambiar aquí
  SHARE_EVENT: 25,      // Cambiar aquí
  WELCOME_MESSAGE: 8,   // Cambiar aquí
  // ...
};
```

## 📁 Estructura del Proyecto
```
frutero-data-bot-v2/
├── src/
│   ├── analyzers/         # Detectores (eventos, mensajes)
│   ├── bot/              # (vacío por ahora)
│   ├── config/           # Configuración de PULPA
│   ├── database/         # Lógica de SQLite
│   └── main.ts           # Punto de entrada
├── docs/                 # Documentación de sesiones
├── .env                  # Variables de entorno (NO SUBIR)
├── package.json          # Dependencias
└── README.md            # Este archivo
```

## 🛠️ Stack Tecnológico

- **TypeScript** - Lenguaje principal
- **Node.js** - Runtime
- **Telegraf** - Framework de bots Telegram
- **SQLite** - Base de datos
- **better-sqlite3** - Driver de SQLite

## 🎯 Roadmap Futuro

### Fase 6: Deployment en Grupo Principal
- [ ] Agregar bot al grupo Frutero Club
- [ ] Validar con usuarios reales
- [ ] Monitoreo 24/7

### Fase 7: Exportación Avanzada
- [ ] Google Sheets API integration
- [ ] CSV para AirDrop con addresses
- [ ] Reportes automáticos

### Fase 8: Dashboard Visual
- [ ] Notion dashboard
- [ ] Gráficas de participación
- [ ] Estadísticas en tiempo real

### Posibles Mejoras:
- [ ] Comando `/mihistorial` - Ver tu actividad completa
- [ ] Comando `/topevento` - Evento más popular
- [ ] Notificaciones cuando subes de nivel
- [ ] Sistema de badges/insignias
- [ ] Integración con wallets para AirDrop on-chain
- [ ] Detección de hilos importantes
- [ ] Análisis de sentiment en mensajes
- [ ] Predicción de eventos trending

## 🤖 Replicar a Otros Bots

### WhatsApp Bot:
Cambiar de Telegraf a **whatsapp-web.js**:
```bash
npm install whatsapp-web.js qrcode-terminal
```

La lógica de detección (`event-detector.ts`) y PULPA (`pulpa-system.ts`) se puede reutilizar sin cambios.

### Discord Bot:
Usar **discord.js**:
```bash
npm install discord.js
```

Adaptar `src/main.ts` a eventos de Discord.

### Slack Bot:
Usar **@slack/bolt**:
```bash
npm install @slack/bolt
```

## 📚 Documentación Completa

Revisa la carpeta `docs/` para documentación detallada de cada sesión de desarrollo.

## 👤 Autor

**Anthony Valarnaut**
- Proyecto desarrollado con metodología **Vibecoding**
- Para Frutero Club (comunidad blockchain Argentina)

## 📄 Licencia

MIT License - Úsalo libremente

## 🙏 Agradecimientos

- Frutero Club community
- Mel (Project Manager)
- Claude (Zeus) - Mentor de código

---

**Desarrollado con 🍊 por Anthony**