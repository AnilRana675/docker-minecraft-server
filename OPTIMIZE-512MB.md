# 🚀 Optimizing Minecraft Server for Render Starter Plan (512MB)

If you're using Render's **Starter Plan (512MB RAM)**, here are the optimal settings to get the best performance:

## ⚙️ Recommended Environment Variables for 512MB

```bash
# Essential
EULA=TRUE
TYPE=PAPER                   # Paper is more efficient than Vanilla
VERSION=LATEST

# Memory & Performance
MEMORY=512M                  # Use all available memory
MAX_PLAYERS=5               # Conservative limit for 512MB
VIEW_DISTANCE=4             # Reduced for better performance
SIMULATION_DISTANCE=3       # Reduced for better performance

# Server Settings
DIFFICULTY=easy
GAMEMODE=survival
SPAWN_PROTECTION=0          # Disable to save memory
ENABLE_COMMAND_BLOCK=false  # Disable to save memory

# Auto-pause (Essential for cost saving)
ENABLE_AUTOPAUSE=TRUE
AUTOPAUSE_TIMEOUT_EST=1800  # 30 minutes (shorter for 512MB)
AUTOPAUSE_TIMEOUT_INIT=300  # 5 minutes initial

# JVM Optimizations for 512MB
JVM_OPTS=-XX:+UseG1GC -XX:+UnlockExperimentalVMOptions -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M
```

## 📊 Performance Comparison by Plan

| Plan | Memory | Recommended Settings |
|------|--------|---------------------|
| **Starter** | 512MB | `MEMORY=512M`, `MAX_PLAYERS=5`, `VIEW_DISTANCE=4` |
| **Standard** | 2GB | `MEMORY=2G`, `MAX_PLAYERS=15`, `VIEW_DISTANCE=8` |
| **Pro** | 8GB | `MEMORY=6G`, `MAX_PLAYERS=25+`, `VIEW_DISTANCE=10` |

## 🎯 512MB Optimization Tips

### 1. **Use Paper Server Type**
```bash
TYPE=PAPER
```
Paper is significantly more optimized than Vanilla Minecraft and uses less memory.

### 2. **Reduce World Generation Load**
```bash
LEVEL_TYPE=FLAT           # Use superflat world (optional)
GENERATE_STRUCTURES=false # Disable villages, dungeons, etc.
SPAWN_ANIMALS=false      # Reduce entity count
SPAWN_MONSTERS=true      # Keep for gameplay
```

### 3. **Limit Players and View Distance**
```bash
MAX_PLAYERS=5            # 3-5 players max for 512MB
VIEW_DISTANCE=4          # Essential for performance
SIMULATION_DISTANCE=3    # Reduce server-side calculations
```

### 4. **Aggressive Auto-pause**
```bash
ENABLE_AUTOPAUSE=TRUE
AUTOPAUSE_TIMEOUT_EST=1800   # Pause after 30 min
AUTOPAUSE_TIMEOUT_INIT=300   # Quick initial pause
```

### 5. **Disable Heavy Features**
```bash
ENABLE_COMMAND_BLOCK=false
SPAWN_PROTECTION=0
BROADCAST_CONSOLE_TO_OPS=false
BROADCAST_RCON_TO_OPS=false
```

## 🔧 Complete 512MB Configuration

Copy this configuration for your Render environment variables:

```bash
EULA=TRUE
TYPE=PAPER
VERSION=LATEST
MEMORY=512M
MAX_PLAYERS=5
VIEW_DISTANCE=4
SIMULATION_DISTANCE=3
DIFFICULTY=easy
GAMEMODE=survival
MOTD=Optimized 512MB Server
ENABLE_AUTOPAUSE=TRUE
AUTOPAUSE_TIMEOUT_EST=1800
AUTOPAUSE_TIMEOUT_INIT=300
SPAWN_PROTECTION=0
ENABLE_COMMAND_BLOCK=false
GENERATE_STRUCTURES=false
SPAWN_ANIMALS=false
JVM_OPTS=-XX:+UseG1GC -XX:+UnlockExperimentalVMOptions -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M
```

## 📈 Expected Performance

With these optimizations on 512MB:
- **✅ Smooth gameplay** for 2-5 players
- **✅ Fast world loading** with reduced view distance
- **✅ Stable server** with proper memory management
- **✅ Cost effective** with auto-pause

## ⚠️ Limitations of 512MB Plan

- **Max 5 players** recommended
- **Smaller worlds** due to memory constraints
- **No heavy plugins** or mods
- **Limited to simple gameplay** (survival/creative)

## 🆙 When to Upgrade

Consider upgrading to Standard (2GB) if you need:
- More than 5 players
- Larger view distances
- Plugins and mods
- Complex redstone contraptions
- Multiple worlds

---

**Pro Tip**: Start with 512MB and monitor performance. You can always upgrade later while keeping your world data! 🎮
