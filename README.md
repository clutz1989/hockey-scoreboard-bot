# 🏒 Central Florida Hockey Discord Bot

A dedicated Discord bot for the Central Florida Hockey community. Handles server setup, reaction-based role assignment, and channel permission management automatically.

---

## Features

- `/setup` — Creates all roles, categories, channels, and reaction role posts in one command
- `/status` — Shows current bot configuration for the server
- Reaction roles — Members self-assign position, rink, skill level, and team status
- Auto Member role — New members get the `Member` role on join
- Role-gated channels — Rink, skill level, and team channels are only visible to the right roles

---

## Setup

### 1. Create a Discord Application & Bot

1. Go to https://discord.com/developers/applications
2. New Application → name it (e.g. "CFL Hockey Bot")
3. Go to **Bot** tab → **Add Bot**
4. Under **Privileged Gateway Intents**, enable:
   - **Server Members Intent**
   - **Message Content Intent**
5. Copy your **Bot Token**

### 2. Invite the Bot to Your Server

Use this URL (replace `YOUR_CLIENT_ID`):
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
```
Permission `8` = Administrator (required for channel/role management during setup).

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env and paste your DISCORD_TOKEN
```

### 4. Deploy with Portainer

1. Push this project to your Git repo (or upload directly)
2. In Portainer → **Stacks** → **Add Stack**
3. Use the `docker-compose.yml`, set the `DISCORD_TOKEN` env variable
4. Deploy

### 5. Run Setup

In your Discord server, run:
```
/setup
```

This will create everything. Takes ~30 seconds.

---

## Customization

Edit `src/config/serverConfig.js` to:
- Add/remove roles
- Add/remove channels or categories
- Change reaction role emojis
- Update channel visibility rules

After any config change, re-run `/setup` in Discord to apply.

---

## Project Structure

```
src/
  index.js                  # Bot entry point
  config/
    serverConfig.js         # All roles, channels, reaction roles defined here
  commands/
    setup.js                # /setup command
    status.js               # /status command
  events/
    ready.js                # Registers slash commands on startup
    interactionCreate.js    # Routes slash commands
    guildMemberAdd.js       # Auto-assigns Member role on join
    messageReactionAdd.js   # Assigns role on reaction
    messageReactionRemove.js# Removes role on un-react
  utils/
    configStore.js          # JSON flat-file persistence
data/
  guild_config.json         # Auto-generated, persisted via Docker volume
```

---

## Scoreboard Integration (Future)

This bot is intentionally scoped to server setup and roles for MVP. The next phase will add:
- Score reporting commands
- Scheduled game reminders
- Stats/standings integration from the website
