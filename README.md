# System View Info API 🚀

**The System View Info API** is a lightweight, independent Node.js HTTP service that provides detailed information about system metrics and runtime in JSON format. And this is my first nodejs project

## 🌟 Features

- ⚡ **Zero External Dependencies**: Built using Node.js core modules (`http`, `os`, `process`).

- 📊 **Real-Time System Metrics**: Exposes metrics for CPU, Memory, Operating System, User, Network, and Node.js process info.

- 🛠️ **Formatted Output**: Automatically converts byte metrics (KB/MB/GB) and uptime values into human-readable strings.

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Execution

1. **Clone or Download the Repository**

   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd <YOUR_PROJECT_FOLDER>
   ```

2. **Run the Application**

   ```bash
   node app.js
   ```

3. The server will start at:

   ```
   http://localhost:3000
   ```

## 📡 API Endpoints Documentation

All endpoints return data in `application/json` format.

| Endpoint   | Method | Description                                                                  |
| :--------- | :----- | :--------------------------------------------------------------------------- |
| `/`        | `GET`  | Returns an overview of available API routes.                                 |
| `/cpu`     | `GET`  | Information regarding CPU model, core count, architecture, and load average. |
| `/memory`  | `GET`  | Memory statistics including total, free, and percentage usage.               |
| `/os`      | `GET`  | Operating system details (Type, Hostname, Release, Uptime).                  |
| `/user`    | `GET`  | Information about the current system user.                                   |
| `/process` | `GET`  | Node.js process runtime info (PID, Uptime, Memory Usage, Environment).       |
| `/network` | `GET`  | Loopback network interface details.                                          |

## 🧪 Usage Example

You can query the endpoints using a browser, Postman, or `curl`:

```bash
# Query memory statistics
curl http://localhost:3000/memory
```

**Example Response (`/memory`):**

```json
{
  "total": "16.00 GB",
  "free": "8.25 GB",
  "usage": "48.44%"
}
```

## 📝 License

This project is created for educational and lightweight monitoring purposes. Feel free to use and modify it.
