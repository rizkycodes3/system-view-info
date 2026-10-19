const http = require("http");
const os = require("os");

function formatBytes(bytes, decimal = 2) {
  if (bytes === 0) return "0 byte";
  const k = 1024;
  const sizes = ["Byte", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat(bytes / Math.pow(k, i)).toFixed(decimal) + " " + sizes[i];
}

function formatTime(sec) {
  const days = Math.floor(sec / (3600 * 24));
  const hours = Math.floor((sec % (3600 * 24)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = Math.floor(sec % 60);
  return `${days} Day ${hours} Hour ${minutes} Minute ${seconds} Second`;
}

const getCpuInfo = {
  model: os.cpus()[0].model,
  core: os.availableParallelism(),
  architecture: os.arch(),
  loadavg: os.loadavg(),
};

const getMemoryInfo = {
  total: formatBytes(os.totalmem()),
  free: formatBytes(os.freemem()),
  usage: ((1 - os.freemem() / os.totalmem()) * 100).toFixed(2) + "%",
};

const getOsInfo = {
  type: os.type(),
  hostname: os.hostname(),
  release: os.release(),
  uptime: formatTime(os.uptime()),
};

const getUserInfo = {
  user: os.userInfo(),
};

const getNetworkInfo = {
  network: os.networkInterfaces().lo,
};

const getProcess = {
  pid: process.pid,
  title: process.title,
  nodeVersion: process.version,
  upTime: formatTime(process.uptime()),
  cwd: process.cwd(),
  memoryUsage: {
    rss: formatBytes(process.memoryUsage().rss),
    heapTotal: formatBytes(process.memoryUsage().heapTotal),
    heapUsed: formatBytes(process.memoryUsage().heapUsed),
    external: formatBytes(process.memoryUsage().external),
  },
  env: {
    NODE_ENV: process.env.NODE_ENV || "Not Set",
  },
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`).pathname;
  res.setHeader("Content-Type", "application/json");

  switch (parsedUrl) {
    case "/":
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          name: "System View Info API",
          description: "Access system stats via simple json route",
          routes: ["/cpu", "/memory", "/os", "/user", "/process", "/network"],
        }),
      );
      break;

    case "/cpu":
      res.statusCode = 200;
      res.end(JSON.stringify(getCpuInfo));
      break;

    case "/memory":
      res.statusCode = 200;
      res.end(JSON.stringify(getMemoryInfo));
      break;

    case "/os":
      res.statusCode = 200;
      res.end(JSON.stringify(getOsInfo));
      break;

    case "/user":
      res.statusCode = 200;
      res.end(JSON.stringify(getUserInfo));
      break;

    case "/process":
      res.statusCode = 200;
      res.end(JSON.stringify(getProcess));
      break;

    case "/network":
      res.statusCode = 200;
      res.end(JSON.stringify(getNetworkInfo));
      break;

    default:
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "404 - page not found" }));
      break;
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`system is running at http://localhost:${port}`);
});
