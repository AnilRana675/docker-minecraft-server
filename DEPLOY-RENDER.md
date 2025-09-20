# Deploying Minecraft Server on Render

## Prerequisites
- Render account (free tier available)
- GitHub repository with your Minecraft server configuration
- Basic understanding of Docker and environment variables

## Deployment Steps

### Method 1: Web Service Deployment (Recommended)

1. **Fork or Upload Repository**
   - Fork this repository to your GitHub account
   - Or create a new repository with the Dockerfile.render and render.yaml files

2. **Connect to Render**
   - Go to [Render Dashboard](https://render.com/dashboard)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Service**
   - **Name**: `minecraft-server`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./Dockerfile.render`
   - **Plan**: Choose based on your needs:
     - **Starter ($7/month)**: 512MB RAM, good for 2-5 players
     - **Standard ($25/month)**: 2GB RAM, good for 10-20 players
     - **Pro ($85/month)**: 8GB RAM, good for 20+ players

4. **Environment Variables** (Configure these in Render dashboard):
   ```
   EULA=TRUE
   VERSION=LATEST
   TYPE=PAPER
   MEMORY=2G
   MAX_PLAYERS=20
   DIFFICULTY=easy
   MOTD=A Minecraft Server on Render
   ENABLE_AUTOPAUSE=TRUE
   AUTOPAUSE_TIMEOUT_EST=3600
   RCON_PASSWORD=your_secure_password
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (first deployment takes 5-10 minutes)

### Method 2: Using Render Blueprint

1. **Create render.yaml** (already provided in this repo)
2. **Deploy via Blueprint**:
   - Go to Render Dashboard
   - Click "New +" → "Blueprint"
   - Connect repository and deploy

### Important Considerations for Render

#### 1. **Persistent Storage**
- Render has ephemeral storage by default
- Use Render Disks for persistent world data
- Configure disk size based on your world size needs

#### 2. **Memory Management**
- Set MEMORY environment variable based on your plan
- Use auto-pause to save resources when no players are online
- Consider Paper server type for better performance

#### 3. **Networking**
- Render provides HTTPS endpoints by default
- For Minecraft, you'll get a TCP endpoint
- Note the provided hostname and port for players to connect

#### 4. **Auto-pause Configuration**
- Essential for cloud hosting to save costs
- Server automatically pauses when no players are online
- Resumes when players try to connect

#### 5. **Monitoring and Logs**
- Use Render's built-in logging
- Monitor resource usage in dashboard
- Set up health checks for automatic restarts

### Connecting to Your Server

After deployment, Render will provide:
- **Hostname**: `your-service-name.onrender.com`
- **Port**: Usually `25565`
- **Full address**: `your-service-name.onrender.com:25565`

Players can connect using this address in their Minecraft client.

### Cost Optimization Tips

1. **Use Auto-pause**: Saves significant costs when server is idle
2. **Choose appropriate plan**: Start with Starter plan and upgrade if needed
3. **Monitor usage**: Check Render dashboard for resource usage
4. **Optimize server settings**: Lower view distance and simulation distance

### Troubleshooting

#### Common Issues:
1. **Server won't start**: Check EULA is set to TRUE
2. **Memory issues**: Increase plan or optimize MEMORY setting
3. **Connection issues**: Verify port configuration and firewall settings
4. **World not saving**: Ensure persistent disk is properly configured

#### Debugging Steps:
1. Check Render logs in dashboard
2. Use RCON to connect to server console
3. Monitor resource usage
4. Check environment variables

### Advanced Configuration

#### Custom Modpacks:
```env
TYPE=CURSEFORGE
CF_API_KEY=your_api_key
CF_PAGE_URL=https://www.curseforge.com/minecraft/modpacks/your-pack
```

#### Custom Plugins:
```env
TYPE=PAPER
PLUGINS=https://download.luckperms.net/1515/bukkit/loader/LuckPerms-Bukkit-5.4.102.jar,https://github.com/EssentialsX/Essentials/releases/download/2.20.1/EssentialsX-2.20.1.jar
```

#### World Import:
```env
WORLD=https://your-world-download-url.zip
```

## Support

- [Docker Minecraft Server Documentation](https://docker-minecraft-server.readthedocs.io/)
- [Render Documentation](https://render.com/docs)
- [GitHub Issues](https://github.com/itzg/docker-minecraft-server/issues)

---

**Note**: Always ensure you comply with Minecraft's EULA and Render's terms of service when hosting servers.
