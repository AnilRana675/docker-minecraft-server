# 🚨 EULA Error Fix - Minecraft Server Won't Start

If you're seeing this error in your Render deployment logs:

```
[ERROR] Please accept the Minecraft EULA at
[ERROR]   https://account.mojang.com/documents/minecraft_eula
[ERROR] by adding the following immediately after 'docker run':
[ERROR]   -e EULA=TRUE
```

## 🔧 Quick Fix Steps

### Step 1: Access Render Dashboard
1. Go to [render.com](https://render.com)
2. Log into your account
3. Click on your Minecraft server service

### Step 2: Add Environment Variable
1. Click on the **"Environment"** tab in your service dashboard
2. Click **"Add Environment Variable"**
3. Set:
   - **Key**: `EULA`
   - **Value**: `TRUE`
4. Click **"Save Changes"**

### Step 3: Redeploy
1. Go to the **"Events"** tab
2. Click **"Manual Deploy"** → **"Deploy Latest Commit"**
3. Wait for deployment to complete (usually 3-5 minutes)

## ✅ Expected Result

After fixing, you should see logs like:
```
[init] Starting the Minecraft server...
[init] Accepted EULA
[init] Downloading Minecraft server...
```

## 🛠️ Alternative: Environment Variables via render.yaml

If you're using the blueprint method, ensure your `render.yaml` includes:

```yaml
services:
  - type: web
    name: minecraft-server
    env: docker
    dockerfilePath: ./Dockerfile.render
    envVars:
      - key: EULA
        value: "TRUE"
      - key: TYPE
        value: "PAPER"
      - key: VERSION
        value: "LATEST"
      # ... other variables
```

## 📋 Complete Environment Variables Checklist

Make sure you have these essential variables set:

- ✅ `EULA=TRUE` (Required)
- ✅ `TYPE=PAPER` (Recommended)
- ✅ `VERSION=LATEST`
- ✅ `MEMORY=2G` (Adjust based on plan)
- ✅ `MAX_PLAYERS=20`
- ✅ `ENABLE_AUTOPAUSE=TRUE` (Cost saving)

## 🎮 Ready to Play!

Once the EULA is accepted and the server starts successfully, you can connect using:
- **Address**: `your-service-name.onrender.com:25565`

---

**Still having issues?** Check the [main troubleshooting guide](README-RENDER.md#troubleshooting) or [contact support](https://render.com/docs).
