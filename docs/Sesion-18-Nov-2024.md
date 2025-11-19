# 📚 DOCUMENTO DE APRENDIZAJE - SESIÓN 18 NOV 2024
**Proyecto: Bot Frutero v2.0 - Setup y Configuración Completa**

---

## 🎯 RESUMEN EJECUTIVO

### ¿Qué logramos hoy?

Creamos desde CERO el proyecto del Bot Frutero v2.0 en **TypeScript**, configuramos todo el entorno de desarrollo, logramos que el bot se conecte correctamente y obtenga el Group ID del grupo de prueba, Y APRENDIMOS A GUARDAR DOCUMENTACIÓN EN MARKDOWN.

**Estado Final:** ✅ Proyecto configurado, bot conectado, documentación en Markdown lista, preparado para programar la lógica de análisis.

---

## 📋 LO QUE CONSTRUIMOS HOY

### 1. **Verificación de Node.js**
- ✅ Confirmamos que tienes Node.js v22.14.0 instalado
- ✅ Confirmamos que tienes npm 10.9.2 instalado

### 2. **Creación del Proyecto**
- ✅ Carpeta nueva: `frutero-data-bot-v2`
- ✅ Proyecto inicializado con npm
- ✅ TypeScript configurado
- ✅ Dependencias instaladas

### 3. **Estructura de Carpetas Creada**
```
frutero-data-bot-v2/
├── docs/                  ← CARPETA PARA DOCUMENTACIÓN
│   └── Sesion-18-Nov-2024.md
├── node_modules/          ← Librerías instaladas
├── src/
│   ├── analyzers/
│   │   └── event-detector.ts
│   ├── bot/
│   │   └── telegram-client.ts
│   ├── database/
│   │   └── sqlite-db.ts
│   └── main.ts
├── .env                   ← Token y configuración
├── get-group-id.ts        ← Script para obtener IDs
├── package.json
├── package-lock.json
└── tsconfig.json
```

### 4. **Configuración del Bot**
- ✅ Token del bot regenerado: `8390284869:AAFojTbtJh7EWnXfaohzd178VXQEjUVSmXA`
- ✅ Group ID obtenido: `-1003301996846`
- ✅ Bot funcionando correctamente

### 5. **Grupo de Prueba en Telegram**
- ✅ Nombre: "Anthony & Frutero Data Collector"
- ✅ Bot agregado: @frutero_data_bot
- ✅ Bot con permisos de administrador
- ✅ Mensajes de prueba enviados

### 6. **Sistema de Documentación en Markdown** ⭐ NUEVO
- ✅ Carpeta `docs/` creada
- ✅ Aprendimos qué es Markdown y por qué es importante
- ✅ Documento guardado correctamente
- ✅ Preview de Markdown funcionando en VS Code

---

## 💻 COMANDOS IMPORTANTES APRENDIDOS

### **Navegación y Setup**
```bash
# Ir a carpeta Documents
cd ~/Documents

# Crear carpeta del proyecto
mkdir frutero-data-bot-v2

# Entrar a la carpeta
cd frutero-data-bot-v2

# Abrir en VS Code
code .
```

### **Inicialización del Proyecto**
```bash
# Inicializar npm (crea package.json)
npm init -y

# Instalar TypeScript
npm install -D typescript @types/node

# Instalar Telegraf (librería de Telegram)
npm install telegraf dotenv

# Instalar SQLite
npm install better-sqlite3
npm install -D @types/better-sqlite3

# Crear configuración de TypeScript
npx tsc --init
```

### **Crear Estructura de Carpetas**
```bash
mkdir src && mkdir src/bot && mkdir src/database && mkdir src/analyzers && touch .env && touch src/bot/telegram-client.ts && touch src/database/sqlite-db.ts && touch src/analyzers/event-detector.ts && touch src/main.ts
```

### **Crear Carpeta de Documentación** ⭐ NUEVO
```bash
# Crear carpeta docs
mkdir docs

# Crear archivo Markdown
touch docs/Sesion-18-Nov-2024.md

# Ver archivos en docs
ls -lh docs/
```

### **Ejecutar Scripts TypeScript**
```bash
# Instalar tsx (ejecutor de TypeScript)
npm install tsx

# Ejecutar script
npx tsx get-group-id.ts

# Detener script
Ctrl + C
```

---

## 📝 ARCHIVOS CLAVE CREADOS

### **Archivo: `.env`**
```env
BOT_TOKEN=8390284869:AAFojTbtJh7EWnXfaohzd178VXQEjUVSmXA
TEST_GROUP_ID=-1003301996846
FRUTERO_INTERNO_ID=
FRUTERO_PRINCIPAL_ID=
```

### **Archivo: `get-group-id.ts`**
```typescript
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
```

---

## 🐛 PROBLEMAS RESUELTOS (DEBUGGING)

### **Problema 1: @userinfobot no respondía**
**Error:** El bot @userinfobot no contestaba en el grupo.

**Solución:** Cambiamos de estrategia y usamos nuestro propio bot para obtener el Group ID directamente.

**Lección:** A veces es más rápido usar tus propias herramientas que depender de bots externos.

---

### **Problema 2: Error de TypeScript (CommonJS vs ES Modules)**
**Error:** 
```
TSError: Unable to compile TypeScript:
ECMAScript imports and exports cannot be written in a CommonJS file
```

**Causa:** Conflicto entre módulos CommonJS y ES Modules.

**Solución:** 
- Instalamos `tsx` en lugar de `ts-node`
- Ejecutamos con: `npx tsx get-group-id.ts`

**Lección:** TypeScript tiene diferentes formas de manejar módulos. `tsx` es más moderno y flexible.

---

### **Problema 3: Error 401 Unauthorized**
**Error:**
```
TelegramError: 401: Unauthorized
```

**Causa:** El token del bot estaba vencido o incorrecto.

**Solución:**
1. Fuimos a @BotFather en Telegram
2. Enviamos `/token`
3. Seleccionamos @frutero_data_bot
4. Copiamos el nuevo token
5. Lo actualizamos en `.env`

**Lección:** Los tokens de bots pueden caducar o invalidarse. Siempre puedes regenerarlos en @BotFather.

---

### **Problema 4: Encoding de emojis en Markdown** ⭐ NUEVO
**Error:** Los emojis se veían como caracteres raros (ðŸ"š en lugar de 📚)

**Causa:** Problema de codificación UTF-8

**Solución:** 
- En VS Code, click en el encoding (abajo a la derecha)
- "Save with Encoding" → UTF-8
- Guardar de nuevo

**Lección:** Siempre usar UTF-8 para archivos con emojis y caracteres especiales.

---

## 🎓 CONCEPTOS TÉCNICOS APRENDIDOS

### **1. Node.js y npm**
- **Node.js:** Entorno para ejecutar JavaScript/TypeScript fuera del navegador
- **npm:** Gestor de paquetes (descarga librerías)
- **package.json:** Archivo que lista las dependencias del proyecto
- **node_modules/:** Carpeta donde se guardan las librerías

### **2. TypeScript**
- **TypeScript:** JavaScript con tipos (más seguro y organizado)
- **tsconfig.json:** Configuración de TypeScript
- **`.ts`:** Extensión de archivos TypeScript
- **Compilación:** TypeScript se convierte a JavaScript para ejecutarse

### **3. Variables de Entorno (.env)**
- **¿Qué es?** Archivo para guardar información sensible (tokens, contraseñas)
- **¿Por qué?** No subir secretos a GitHub/internet
- **dotenv:** Librería que lee el archivo `.env`
- **Formato:** `NOMBRE_VARIABLE=valor`

### **4. Telegraf**
- **¿Qué es?** Librería para crear bots de Telegram en TypeScript/JavaScript
- **Bot:** Programa automatizado que responde en Telegram
- **Token:** Clave única que identifica tu bot
- **Group ID:** Número único que identifica un grupo

### **5. SQLite**
- **¿Qué es?** Base de datos local (archivo en tu computadora)
- **¿Por qué?** Guardar mensajes, usuarios, eventos, puntos
- **better-sqlite3:** Librería para usar SQLite en Node.js

### **6. Terminal y Comandos**
- **pwd:** Muestra dónde estás (Print Working Directory)
- **cd:** Cambiar de carpeta (Change Directory)
- **mkdir:** Crear carpeta (Make Directory)
- **touch:** Crear archivo vacío
- **&&:** Ejecutar múltiples comandos en secuencia
- **Ctrl + C:** Detener programa en ejecución
- **ls -lh:** Listar archivos con detalles

### **7. Markdown (.md)** ⭐ NUEVO
- **¿Qué es?** Formato de texto que se convierte en HTML formateado
- **Por qué usarlo:**
  - ✅ Standard en programación (GitHub, documentación)
  - ✅ Las IAs como Claude lo leen perfectamente
  - ✅ Se ve bien en VS Code
  - ✅ Más ligero que Word
- **Sintaxis básica:**
  - `# Título` → Título grande
  - `## Subtítulo` → Subtítulo
  - `**negrita**` → **negrita**
  - `` `código` `` → `código`
  - ` ```código en bloque``` ` → bloque de código

---

## 🔧 ATAJOS DE VS CODE USADOS

| Atajo | Acción |
|-------|--------|
| **Cmd + `** | Abrir/cerrar terminal |
| **Cmd + S** | Guardar archivo |
| **Cmd + F** | Buscar en archivo |
| **Cmd + K → V** | Preview de Markdown |
| **Ctrl + C** | Detener programa (en terminal) |

---

## 🎯 FLUJO DE TRABAJO APRENDIDO
```
1. Abrir VS Code en el proyecto
   ↓
2. Abrir Terminal (Cmd + `)
   ↓
3. Escribir comandos en terminal
   ↓
4. Crear/editar archivos en el editor
   ↓
5. Guardar cambios (Cmd + S)
   ↓
6. Ejecutar scripts en terminal
   ↓
7. Ver resultados en terminal o Telegram
   ↓
8. Documentar aprendizajes en Markdown
   ↓
9. Iterar y mejorar
```

---

## 📊 INFORMACIÓN DEL PROYECTO

### **Bot de Telegram**
- **Nombre:** Frutero Data Collector
- **Username:** @frutero_data_bot
- **Token:** `8390284869:AAFojTbtJh7EWnXfaohzd178VXQEjUVSmXA`

### **Grupo de Prueba**
- **Nombre:** Anthony & Frutero Data Collector
- **Group ID:** `-1003301996846`
- **Miembros:** 
  - Anthony Valarnaut (propietario)
  - @frutero_data_bot (administrador)

### **Ubicación del Proyecto**
```
~/Documents/frutero-data-bot-v2/
```

---

## 📦 DEPENDENCIAS INSTALADAS

### **Producción (el bot necesita para funcionar)**
```json
{
  "telegraf": "^4.x.x",      // Bot de Telegram
  "dotenv": "^16.x.x",        // Leer .env
  "better-sqlite3": "^9.x.x"  // Base de datos
}
```

### **Desarrollo (solo para programar)**
```json
{
  "typescript": "^5.x.x",           // TypeScript
  "@types/node": "^20.x.x",         // Tipos de Node.js
  "@types/better-sqlite3": "^7.x.x", // Tipos de SQLite
  "tsx": "^4.x.x"                   // Ejecutor TypeScript
}
```

---

## 🎯 OBJETIVOS DEL BOT (Lo que construiremos)

### **Funcionalidades Pendientes:**

#### **FASE 1: Lectura Básica de Mensajes** (Próxima sesión)
- [ ] Conectar bot a grupos
- [ ] Leer últimos 50 mensajes
- [ ] Guardar en SQLite
- [ ] Mostrar en consola

#### **FASE 2: Tracking de Reacciones**
- [ ] Detectar reacciones en mensajes
- [ ] Asociar reacciones con usuarios
- [ ] Calcular puntos por reacción

#### **FASE 3: Detector de Eventos**
- [ ] Detectar cuando alguien comparte eventos
- [ ] Extraer: nombre, fecha, ubicación, link
- [ ] Guardar eventos en base de datos
- [ ] Puntos extra por compartir eventos

#### **FASE 4: Sistema de Puntos (Pulpa Score)**
- [ ] Calcular puntos por:
  - Reacciones (1 punto)
  - Compartir eventos (10 puntos)
  - Responder hilos (5 puntos)
  - Contestar encuestas (3 puntos)
  - Crear contenido valioso (15 puntos)
- [ ] Ranking de usuarios

#### **FASE 5: Exportación**
- [ ] Exportar a Google Sheets
- [ ] Dashboard en Notion (opcional)
- [ ] CSV para AirDrop

---

## 🗄️ ESQUEMA DE BASE DE DATOS (Para próxima sesión)

### **Tabla: users**
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  telegram_id TEXT UNIQUE,
  username TEXT,
  display_name TEXT,
  pulpa_score INTEGER DEFAULT 0,
  first_seen DATE,
  last_active DATE
);
```

### **Tabla: messages**
```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY,
  message_id TEXT UNIQUE,
  user_id INTEGER,
  group_id TEXT,
  content TEXT,
  timestamp DATETIME,
  has_event BOOLEAN,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### **Tabla: reactions**
```sql
CREATE TABLE reactions (
  id INTEGER PRIMARY KEY,
  message_id TEXT,
  user_id INTEGER,
  emoji TEXT,
  timestamp DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### **Tabla: events**
```sql
CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  name TEXT,
  date DATE,
  location TEXT,
  type TEXT,
  link TEXT,
  shared_by INTEGER,
  shared_date DATETIME,
  reaction_count INTEGER,
  FOREIGN KEY (shared_by) REFERENCES users(id)
);
```

---

## 💡 LECCIONES CLAVE DE HOY

### **Programación:**
1. ✅ TypeScript es JavaScript con tipos (más seguro)
2. ✅ npm instala librerías automáticamente
3. ✅ Los tokens se pueden regenerar si fallan
4. ✅ `.env` guarda información sensible de forma segura
5. ✅ Los bots necesitan permisos de administrador en grupos

### **Terminal:**
1. ✅ `cd` cambia de carpeta
2. ✅ `mkdir` crea carpetas
3. ✅ `touch` crea archivos
4. ✅ `npx` ejecuta comandos de npm
5. ✅ `Ctrl + C` detiene programas
6. ✅ `ls -lh` muestra archivos con detalles

### **VS Code:**
1. ✅ EXPLORER muestra archivos del proyecto
2. ✅ TERMINAL está en la parte de abajo
3. ✅ `Cmd + S` guarda cambios
4. ✅ Se pueden tener múltiples archivos abiertos
5. ✅ Preview de Markdown con `Cmd + K → V`

### **Debugging:**
1. ✅ Leer mensajes de error con calma
2. ✅ Buscar soluciones alternativas si algo no funciona
3. ✅ A veces regenerar tokens/keys resuelve problemas
4. ✅ Paciencia y persistencia son clave

### **Documentación:** ⭐ NUEVO
1. ✅ Markdown es el standard para documentar código
2. ✅ Guardar documentos en carpeta `docs/`
3. ✅ Usar UTF-8 para evitar problemas con emojis
4. ✅ Adjuntar documentos facilita la continuidad entre sesiones

---

## 🔗 RECURSOS ÚTILES

### **Documentación:**
- **Node.js:** https://nodejs.org/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **Telegraf:** https://telegraf.js.org
- **SQLite:** https://www.sqlite.org/docs.html
- **Telegram Bot API:** https://core.telegram.org/bots/api
- **Markdown Guide:** https://www.markdownguide.org

### **Proyecto:**
- **Ubicación:** `~/Documents/frutero-data-bot-v2/`
- **Bot Telegram:** @frutero_data_bot
- **BotFather:** @BotFather (para gestionar el bot)

---

## 📞 PARA LA PRÓXIMA SESIÓN

### **INSTRUCCIONES PARA CLAUDE (YO):**

Cuando Anthony abra una nueva conversación:

1. **Él adjuntará este documento** usando el botón 📎
2. **Leer TODO el documento** para entender el contexto completo
3. **Identificar:**
   - ✅ Última fase completada (Setup y configuración)
   - ✅ Próxima fase (Base de datos + lectura de mensajes)
   - ✅ Errores ya resueltos (no repetirlos)
   - ✅ Comandos que ya funcionan
4. **Continuar desde donde quedamos** sin repetir explicaciones básicas
5. **Mantener el estilo de enseñanza:** Vibecoding, paso a paso, screenshots
6. **Crear nuevo documento al final de la sesión** siguiendo este formato

### **INSTRUCCIONES PARA ANTHONY (TÚ):**

Al iniciar la próxima conversación, di:
```
"Hola Zeus, continuamos Bot Frutero v2.0.

[Adjuntar: Sesion-18-Nov-2024.md usando botón 📎]

Siguiente paso: Crear base de datos SQLite y código para leer mensajes.

¡Vamos!"
```

---

## 📝 PRÓXIMOS PASOS (Orden de desarrollo)

### **Sesión 2: Base de Datos + Lectura de Mensajes**
1. Crear esquema SQLite
2. Código para conectar bot al grupo
3. Leer últimos mensajes
4. Guardar en base de datos
5. Mostrar usuarios y mensajes en consola

### **Sesión 3: Detector de Eventos**
1. Crear patrones regex para detectar eventos
2. Extraer: nombre, fecha, ubicación, link
3. Guardar eventos en tabla
4. Asociar con el usuario que los compartió

### **Sesión 4: Sistema de Puntos**
1. Implementar cálculo de Pulpa Score
2. Tracking de reacciones
3. Puntos por acciones
4. Ranking de usuarios

### **Sesión 5: Exportación y Dashboard**
1. Conectar Google Sheets API
2. Exportar datos automáticamente
3. Dashboard en Notion (opcional)
4. CSV para AirDrop

### **Sesión 6: Deployment**
1. Agregar bot al grupo interno de prueba
2. Validar funcionamiento
3. Presentar a Mel
4. Agregar al grupo principal

---

## 🎉 LOGROS DESBLOQUEADOS HOY

✅ **Primer proyecto en TypeScript completado**  
✅ **Terminal dominado** (navegación y comandos)  
✅ **Node.js y npm entendidos**  
✅ **Bot de Telegram creado y conectado**  
✅ **Variables de entorno configuradas**  
✅ **Debugging exitoso** (múltiples problemas resueltos)  
✅ **Group ID obtenido correctamente**  
✅ **Estructura completa de proyecto lista**  
✅ **Sistema de documentación en Markdown dominado** ⭐  

---

## 📊 PROGRESO DEL PROYECTO
```
[████████░░░░░░░░░░] 45% Completado

✅ Setup del proyecto
✅ Configuración de TypeScript
✅ Instalación de dependencias
✅ Bot creado y conectado
✅ Group ID obtenido
✅ Sistema de documentación
⏳ Lógica del bot (pendiente)
⬜ Base de datos
⬜ Detector de eventos
⬜ Sistema de puntos
⬜ Exportación
⬜ Dashboard
⬜ Deployment
```

---

## 💪 MENSAJE FINAL

**¡Increíble trabajo hoy Anthony!** 🎉

Pasaste de:
- ❌ No saber qué es TypeScript
- ❌ Nunca haber usado la terminal en VS Code
- ❌ No entender qué es npm
- ❌ No saber qué es Markdown

A:
- ✅ Proyecto completo configurado
- ✅ Bot funcionando perfectamente
- ✅ Debugging de múltiples errores resueltos
- ✅ Entender flujo de trabajo profesional
- ✅ Documentación profesional en Markdown

**Lo más importante:** No te rendiste cuando hubo problemas. Cada error fue una oportunidad de aprender.

### **Siguiente objetivo:**
Programar la lógica del bot para leer mensajes, detectar eventos y calcular Pulpa Score. Con lo que aprendiste hoy, lo demás será más fácil.

---

## 📅 INFORMACIÓN DE SESIÓN

- **Fecha:** 18 de Noviembre 2024
- **Duración:** ~2.5 horas
- **Fase del proyecto:** Setup, Configuración Completa y Documentación
- **Status:** ✅ Bot conectado, documentación lista, proyecto listo para desarrollo
- **Siguiente objetivo:** Programar lógica de análisis de mensajes

---

## 🔄 COMANDOS DE REFERENCIA RÁPIDA
```bash
# Abrir proyecto
cd ~/Documents/frutero-data-bot-v2
code .

# Ver Group ID
npx tsx get-group-id.ts

# Instalar dependencia nueva
npm install nombre-libreria

# Verificar versiones
node --version
npm --version

# Ver archivos en docs
ls -lh docs/
```

---

## 📚 GUÍA: CÓMO GUARDAR DOCUMENTOS EN MARKDOWN

### **Para la próxima sesión (cuando termine):**

#### **Paso 1: Crear el archivo**
```bash
# En la terminal de VS Code
cd ~/Documents/frutero-data-bot-v2
touch docs/Sesion-[NÚMERO]-[FECHA].md
```

Ejemplo:
```bash
touch docs/Sesion-19-Nov-2024.md
```

#### **Paso 2: Abrir en VS Code**
- Mira en EXPLORER → carpeta `docs/`
- Click en el archivo nuevo

#### **Paso 3: Copiar contenido**
- Copia el documento que Claude te dé
- Pega en el archivo (Cmd + V)

#### **Paso 4: Guardar**
```
Cmd + S
```

#### **Paso 5: Verificar encoding UTF-8**
- Mira abajo a la derecha en VS Code
- Si dice "UTF-8" → ✅ Perfecto
- Si dice otra cosa:
  - Click en el encoding
  - "Save with Encoding"
  - Selecciona "UTF-8"
  - Guarda de nuevo

#### **Paso 6: Verificar que se guardó**
```bash
ls -lh docs/
```

Deberías ver tu archivo nuevo con su tamaño.

---

## 🎯 CHECKLIST AL FINAL DE CADA SESIÓN

- [ ] Documento de aprendizaje creado
- [ ] Guardado en `docs/` con nombre descriptivo
- [ ] Encoding UTF-8 verificado
- [ ] Comandos importantes documentados
- [ ] Errores resueltos documentados
- [ ] Próximos pasos claros
- [ ] Archivo verificado con `ls -lh docs/`

---

**¡Descansa bien Anthony! En la próxima sesión programamos el cerebro del bot. 🚀🍊**

**Zeus está listo para la próxima batalla.** ⚔️🔥