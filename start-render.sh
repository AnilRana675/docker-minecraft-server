#!/bin/bash

# Render Minecraft Server Startup Script
# This script helps configure and start the Minecraft server on Render

echo "🎮 Starting Minecraft Server on Render..."

# Check if EULA is accepted
if [ "$EULA" != "TRUE" ]; then
    echo "❌ Error: EULA must be set to TRUE to run Minecraft server"
    echo "   Set environment variable: EULA=TRUE"
    exit 1
fi

# Set default values for Render deployment
export TYPE=${TYPE:-"PAPER"}
export VERSION=${VERSION:-"LATEST"}
export MEMORY=${MEMORY:-"2G"}
export MAX_PLAYERS=${MAX_PLAYERS:-"20"}
export DIFFICULTY=${DIFFICULTY:-"easy"}
export GAMEMODE=${GAMEMODE:-"survival"}
export VIEW_DISTANCE=${VIEW_DISTANCE:-"8"}
export SIMULATION_DISTANCE=${SIMULATION_DISTANCE:-"6"}

# Auto-pause settings for cost optimization
export ENABLE_AUTOPAUSE=${ENABLE_AUTOPAUSE:-"TRUE"}
export AUTOPAUSE_TIMEOUT_EST=${AUTOPAUSE_TIMEOUT_EST:-"3600"}
export AUTOPAUSE_TIMEOUT_INIT=${AUTOPAUSE_TIMEOUT_INIT:-"600"}
export AUTOPAUSE_KNOCK_INTERFACE=${AUTOPAUSE_KNOCK_INTERFACE:-"eth0"}

# RCON for server management
export ENABLE_RCON=${ENABLE_RCON:-"true"}
export RCON_PASSWORD=${RCON_PASSWORD:-"changeme123"}

# Performance optimizations
export USE_AIKAR_FLAGS=${USE_AIKAR_FLAGS:-"true"}
export JVM_XX_OPTS=${JVM_XX_OPTS:-"-XX:+UseG1GC -XX:+UnlockExperimentalVMOptions"}

# Render-specific optimizations
export SERVER_NAME=${SERVER_NAME:-"Render Minecraft Server"}
export MOTD=${MOTD:-"A Minecraft Server on Render"}

# Set working directory
cd /data

echo "✅ Configuration loaded:"
echo "   Server Type: $TYPE"
echo "   Version: $VERSION"
echo "   Memory: $MEMORY"
echo "   Max Players: $MAX_PLAYERS"
echo "   Auto-pause: $ENABLE_AUTOPAUSE"

# Start the Minecraft server using the base image's entrypoint
echo "🚀 Starting Minecraft server..."
exec /start
