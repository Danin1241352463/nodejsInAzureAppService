const express = require("express");
const os = require("os");
const app = express();

const PORT = process.env.PORT || 3000;
const MESSAGE = process.env.MESSAGE || "Running locally";
const startTime = Date.now();

// Serve static HTML with modern dashboard
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js auf Azure App Service - Demo</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .status-badge {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 10px;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        .card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: transform 0.3s;
        }
        .card:hover {
            transform: translateY(-5px);
        }
        .card h2 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.3em;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .card-content {
            color: #4b5563;
            line-height: 1.8;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #374151;
        }
        .value {
            color: #667eea;
            font-weight: 500;
        }
        .api-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1em;
            transition: background 0.3s;
            text-decoration: none;
            text-align: center;
        }
        .btn:hover {
            background: #5568d3;
        }
        .uptime {
            font-size: 2em;
            color: #667eea;
            font-weight: bold;
            text-align: center;
            margin: 10px 0;
        }
        .icon {
            font-size: 1.5em;
        }
        #response-output {
            margin-top: 15px;
            padding: 15px;
            background: #f3f4f6;
            border-radius: 8px;
            font-family: monospace;
            font-size: 0.9em;
            max-height: 200px;
            overflow-y: auto;
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Node.js auf Azure App Service</h1>
            <p>Live Demo - Deployment via GitHub Actions</p>
            <span class="status-badge">✓ Online</span>
        </div>

        <div class="grid">
            <div class="card">
                <h2><span class="icon">🌍</span> Environment</h2>
                <div class="card-content">
                    <div class="info-row">
                        <span class="label">Status:</span>
                        <span class="value">${MESSAGE}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Node Version:</span>
                        <span class="value">${process.version}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Platform:</span>
                        <span class="value">${process.platform}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Hostname:</span>
                        <span class="value">${os.hostname()}</span>
                    </div>
                </div>
            </div>

            <div class="card">
                <h2><span class="icon">⏱️</span> Server Uptime</h2>
                <div class="card-content">
                    <div class="uptime" id="uptime">Lädt...</div>
                    <div class="info-row">
                        <span class="label">Gestartet:</span>
                        <span class="value">${new Date(startTime).toLocaleString('de-DE')}</span>
                    </div>
                </div>
            </div>

            <div class="card">
                <h2><span class="icon">💾</span> System Info</h2>
                <div class="card-content">
                    <div class="info-row">
                        <span class="label">CPU Kerne:</span>
                        <span class="value">${os.cpus().length}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Gesamt RAM:</span>
                        <span class="value">${Math.round(os.totalmem() / 1024 / 1024 / 1024)} GB</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Freier RAM:</span>
                        <span class="value">${Math.round(os.freemem() / 1024 / 1024 / 1024)} GB</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Architektur:</span>
                        <span class="value">${os.arch()}</span>
                    </div>
                </div>
            </div>

            <div class="card">
                <h2><span class="icon">🔌</span> API Endpoints</h2>
                <div class="card-content">
                    <div class="api-buttons">
                        <button class="btn" onclick="testAPI('/api/time')">📅 Server Zeit abrufen</button>
                        <button class="btn" onclick="testAPI('/api/info')">ℹ️ System Info abrufen</button>
                        <button class="btn" onclick="testAPI('/api/health')">❤️ Health Check</button>
                    </div>
                    <div id="response-output"></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Uptime Counter
        function updateUptime() {
            fetch('/api/uptime')
                .then(res => res.json())
                .then(data => {
                    document.getElementById('uptime').textContent = data.uptime;
                });
        }
        updateUptime();
        setInterval(updateUptime, 1000);

        // API Testing
        function testAPI(endpoint) {
            const output = document.getElementById('response-output');
            output.style.display = 'block';
            output.textContent = 'Lädt...';
            
            fetch(endpoint)
                .then(res => res.json())
                .then(data => {
                    output.textContent = JSON.stringify(data, null, 2);
                })
                .catch(err => {
                    output.textContent = 'Fehler: ' + err.message;
                });
        }
    </script>
</body>
</html>
  `);
});

// API Endpoints
app.get("/api/time", (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    localTime: new Date().toLocaleString('de-DE', { timeZone: 'Europe/Zurich' }),
    timezone: 'Europe/Zurich',
    environment: MESSAGE,
  });
});

app.get("/api/info", (req, res) => {
  res.json({
    platform: "Azure App Service",
    nodeVersion: process.version,
    hostname: os.hostname(),
    cpus: os.cpus().length,
    totalMemory: `${Math.round(os.totalmem() / 1024 / 1024 / 1024)} GB`,
    freeMemory: `${Math.round(os.freemem() / 1024 / 1024 / 1024)} GB`,
    uptime: `${Math.floor(process.uptime())} Sekunden`,
    environment: MESSAGE,
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memoryUsage: process.memoryUsage(),
  });
});

app.get("/api/uptime", (req, res) => {
  const uptimeSeconds = Math.floor(process.uptime());
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;
  
  res.json({
    uptime: `${hours}h ${minutes}m ${seconds}s`,
    uptimeSeconds: uptimeSeconds,
  });
});

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${MESSAGE}`);
});
