# 🎮 Minecraft Server Deployment on Render

This repository contains everything you need to deploy a Minecraft server on [Render](https://render.com) cloud platform using the popular `itzg/minecraft-server` Docker image.

## ✨ Features

- **Easy Deployment**: One-click deployment on Render
- **Auto-pause**: Automatically pauses when no players are online to save costs
- **Multiple Server Types**: Vanilla, Paper, Spigot, Forge, Fabric, and more
- **Web Dashboard**: Optional web interface for server management
- **Persistent Storage**: World data persistence across deployments
- **Performance Optimized**: Pre-configured for cloud hosting

## 🚀 Quick Start

### Method 1: Direct Deployment

1. **Fork this repository** to your GitHub account

2. **Connect to Render**:
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Service**:
   - **Name**: `minecraft-server`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./Dockerfile.render`
   - **Plan**: Choose based on your needs (see pricing below)

4. **Set Environment Variables** (⚠️ **CRITICAL** - Must be set before deployment):
   ```
   EULA=TRUE
   TYPE=PAPER
   VERSION=LATEST
   MEMORY=2G
   MAX_PLAYERS=20
   DIFFICULTY=easy
   MOTD=My Render Minecraft Server
   ENABLE_AUTOPAUSE=TRUE
   ```
   
   > ⚠️ **IMPORTANT**: `EULA=TRUE` is **REQUIRED** or the server will not start!

5. **Deploy**: Click "Create Web Service"

### Method 2: Using Render Blueprint

1. Fork this repository
2. In Render dashboard: "New +" → "Blueprint"
3. Connect your repository
4. Deploy automatically using `render.yaml`

## 💰 Pricing & Plans

| Plan | RAM | Storage | Monthly Cost | Recommended For |
|------|-----|---------|--------------|-----------------|
| Starter | 512MB | 1GB | $7 | 2-5 players |
| Standard | 2GB | 10GB | $25 | 10-20 players |
| Pro | 8GB | 50GB | $85 | 20+ players |

> **Cost Optimization**: Auto-pause feature can reduce costs by up to 80% when server is idle!

## 🔧 Configuration Options

### Essential Environment Variables

```bash
# Required
EULA=TRUE                    # Accept Minecraft EULA

# Server Type & Version
TYPE=PAPER                   # VANILLA, PAPER, SPIGOT, FORGE, FABRIC
VERSION=LATEST               # LATEST, 1.20.4, 1.19.4, etc.

# Performance
MEMORY=2G                    # RAM allocation
MAX_PLAYERS=20               # Maximum players
VIEW_DISTANCE=8              # Render distance
SIMULATION_DISTANCE=6        # Simulation distance

# Auto-pause (Cost Saving)
ENABLE_AUTOPAUSE=TRUE        # Enable auto-pause
AUTOPAUSE_TIMEOUT_EST=3600   # Pause after 1 hour
AUTOPAUSE_TIMEOUT_INIT=600   # Initial timeout

# Server Properties
DIFFICULTY=easy              # peaceful, easy, normal, hard
GAMEMODE=survival            # survival, creative, adventure
MOTD=My Server              # Server description
PVP=true                    # Enable PvP
```

### Advanced Configuration

#### Custom Modpacks (CurseForge)
```bash
TYPE=CURSEFORGE
CF_API_KEY=your_api_key
CF_PAGE_URL=https://www.curseforge.com/minecraft/modpacks/your-pack
```

#### Plugins (Paper/Spigot)
```bash
TYPE=PAPER
PLUGINS=https://download.luckperms.net/1515/bukkit/loader/LuckPerms-Bukkit-5.4.102.jar
```

#### Custom World
```bash
WORLD=https://your-world-download-url.zip
```

## 🌐 Connecting to Your Server

After deployment, Render provides:
- **Hostname**: `your-service-name.onrender.com`
- **Port**: `25565`
- **Full Address**: `your-service-name.onrender.com:25565`

Players connect using this address in their Minecraft client.

## 📊 Web Dashboard (Optional)

Deploy an optional web dashboard for server management:

1. Create additional web service in Render
2. Use `Dockerfile.web` 
3. Set environment variables:
   ```
   RCON_HOST=your-minecraft-service-name
   RCON_PORT=25575
   RCON_PASSWORD=your_rcon_password
   ```

Features:
- Real-time server status
- Player list
- Console commands
- Performance metrics

## 🔒 Security Best Practices

1. **RCON Password**: Always set a strong `RCON_PASSWORD`
2. **Whitelist**: Enable whitelist for private servers
3. **Backups**: Regular world backups (manual or automated)
4. **Updates**: Keep server software updated

## 📁 File Structure

```
├── Dockerfile.render          # Main Dockerfile for Render
├── Dockerfile.web            # Web dashboard Dockerfile
├── render.yaml               # Render Blueprint configuration
├── docker-compose-render.yml # Alternative Docker Compose
├── start-render.sh           # Startup script
├── DEPLOY-RENDER.md          # Detailed deployment guide
└── web-interface/            # Web dashboard files
    ├── server.js
    └── public/
        └── index.html
```

## 🛠️ Troubleshooting

### Common Issues

1. **🚨 EULA Error - Server won't start with "Please accept the Minecraft EULA"**
   ```
   [ERROR] Please accept the Minecraft EULA at
   [ERROR]   https://account.mojang.com/documents/minecraft_eula
   [ERROR] by adding the following immediately after 'docker run':
   [ERROR]   -e EULA=TRUE
   ```
   
   **Solution**:
   - Go to your Render service dashboard
   - Click on "Environment" tab
   - Add environment variable: `EULA` = `TRUE`
   - Click "Save Changes" and redeploy
   
   **Alternative**: Add to `render.yaml`:
   ```yaml
   envVars:
     - key: EULA
       value: "TRUE"
   ```

2. **Server won't start (other reasons)**
   - Ensure `EULA=TRUE` is set
   - Check memory allocation matches your plan
   - Verify Dockerfile path is correct

2. **Can't connect**
   - Verify server address and port
   - Check if server is running (not auto-paused)
   - Ensure firewall isn't blocking connection

3. **Performance issues**
   - Upgrade to higher plan
   - Reduce view distance
   - Enable auto-pause when idle
   - Use Paper instead of Vanilla

4. **World not saving**
   - Ensure persistent disk is configured
   - Check volume mounting in Dockerfile

### Debug Commands

Check logs in Render dashboard or use RCON:
```bash
# Connect via web dashboard or RCON client
/list                    # Show online players
/tps                     # Show server performance
/save-all               # Force save world
/whitelist list         # Show whitelisted players
```

## 📈 Monitoring

Monitor your server through:
- **Render Dashboard**: Resource usage, logs, metrics
- **Web Interface**: Real-time status and commands
- **Minecraft Client**: In-game performance

## 🔄 Updates & Maintenance

### Updating Server Version
1. Change `VERSION` environment variable
2. Redeploy service
3. Server will download new version automatically

### Backup Strategy
1. Download world data from Render disk
2. Store backups externally (GitHub, cloud storage)
3. Consider automated backup solutions

## 🤝 Support & Community

- **Documentation**: [Docker Minecraft Server Docs](https://docker-minecraft-server.readthedocs.io/)
- **Issues**: [GitHub Issues](https://github.com/itzg/docker-minecraft-server/issues)
- **Discord**: [Community Discord](https://discord.gg/DXfKpjB)
- **Render Support**: [Render Documentation](https://render.com/docs)

## 📄 License

This project uses the [itzg/minecraft-server](https://github.com/itzg/docker-minecraft-server) Docker image. Please comply with Minecraft's EULA and Render's terms of service.

---

**Ready to play?** 🎮 Deploy your server and start your Minecraft adventure in the cloud!
