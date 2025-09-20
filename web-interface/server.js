const express = require('express');
const { Rcon } = require('rcon-client');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configuration
const RCON_HOST = process.env.RCON_HOST || 'localhost';
const RCON_PORT = parseInt(process.env.RCON_PORT) || 25575;
const RCON_PASSWORD = process.env.RCON_PASSWORD || 'changeme123';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// RCON connection
let rcon = null;

async function connectRcon() {
    try {
        if (rcon) {
            await rcon.end();
        }
        rcon = await Rcon.connect({
            host: RCON_HOST,
            port: RCON_PORT,
            password: RCON_PASSWORD,
        });
        console.log('Connected to Minecraft server RCON');
        return true;
    } catch (error) {
        console.error('Failed to connect to RCON:', error.message);
        return false;
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/status', async (req, res) => {
    try {
        if (!rcon) {
            const connected = await connectRcon();
            if (!connected) {
                return res.status(500).json({ error: 'Cannot connect to server' });
            }
        }
        
        const listResponse = await rcon.send('list');
        const tpsResponse = await rcon.send('tps');
        
        res.json({
            online: true,
            players: listResponse,
            tps: tpsResponse,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/command', async (req, res) => {
    try {
        const { command } = req.body;
        
        if (!command) {
            return res.status(400).json({ error: 'Command is required' });
        }
        
        if (!rcon) {
            const connected = await connectRcon();
            if (!connected) {
                return res.status(500).json({ error: 'Cannot connect to server' });
            }
        }
        
        const response = await rcon.send(command);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/players', async (req, res) => {
    try {
        if (!rcon) {
            const connected = await connectRcon();
            if (!connected) {
                return res.status(500).json({ error: 'Cannot connect to server' });
            }
        }
        
        const response = await rcon.send('list');
        res.json({ players: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Minecraft Server Dashboard running on port ${port}`);
    
    // Initial RCON connection
    setTimeout(connectRcon, 5000);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    if (rcon) {
        await rcon.end();
    }
    process.exit(0);
});
