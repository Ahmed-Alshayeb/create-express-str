#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appName = process.argv[2] || "."; // "." or folder name
const root = path.resolve(process.cwd(), appName);
const isCurrentDir = appName === ".";

// Helper to write files
const writeFile = (filePath, content = "") => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
};

try {
  // Check if we're creating in a named folder
  if (!isCurrentDir && fs.existsSync(root)) {
    console.error(
      `❌ Directory "${appName}" already exists. Choose a different name.`
    );
    process.exit(1);
  }

  // Create target directory if needed
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
    console.log(`📁 Created folder: ${appName}`);
  } else {
    console.log(`📁 Using current folder: ${process.cwd()}`);
  }

  console.log(`📦 Scaffolding project at ${root} ...`);

  // Folder structure
  const structure = {
    ["/DB/models/test.model.js"]: "",
    ["/DB/db.connection.js"]: "",
    ["/src/middlewares/auth.middleware.js"]: "",
    ["/src/modules/test/test.controller.js"]: `export const testController = (req, res) => {\n  res.json({ message: "Test route working ✅" });\n};\n`,
    ["/src/modules/test/test.routes.js"]: `import { Router } from "express";\nimport * as TC from "./test.controller.js";\n\nconst testRouter = Router();\n\ntestRouter.get("/", TC.testController);\n\nexport default testRouter;\n`,
    ["/src/modules/test/test.validation.js"]: "",
    ["/src/services/test.service.js"]: "",
    ["/src/utils/test.js"]: "",
    ["/src/index.routes.js"]: `import testRouter from "./modules/test/test.routes.js";\n\nexport {\n  testRouter,\n};\n`,
    ["/src/initApp.js"]: `import { config } from "dotenv";\nimport * as Router from "./index.routes.js";\n\nexport const initApp = (app, express) => {\n  // Environment variables\n  config();\n  const port = +process.env.PORT || 4000;\n\n  // parsing of JSON\n  app.use(express.json());\n\n  // Connect to the database\n  // call connection function...\n\n  // Mount all routers\n  app.use("/api/v1/test", Router.testRouter);\n\n  // Default home route\n  app.get("/", (req, res) => {\n    res.status(200).json({\n      msg: "🚀 Express.js REST API app scaffolded using \`create-express-str\` CLI.",\n    });\n  });\n\n  // Route not found\n  app.use((req, res) => {\n    res.status(404).json({ msg: \`Route \${req.originalUrl} Not Found\` });\n  });\n\n  // Global error handler middleware\n  app.use((err, req, res, next) => {\n    res.status(err.statusCode || 500).json({\n      status: err.status || "error",\n      error: err,\n      message: err.message,\n      stack: err.stack,\n    });\n  });\n\n  // Start the server\n  app.listen(port, () => {\n    console.log(\`Server running on port \${port} 🚀!...\`);\n  });\n};\n`,
    ["/index.js"]: `import express from "express";\nimport { initApp } from "./src/initApp.js";\n\nconst app = express();\n\napp.set("case sensitive routing", true);\ninitApp(app, express);\n`,
    ["/.gitignore"]: `.env\nnode_modules\n`,
    ["/.env"]: `PORT=3000\n`,
    ["/README.md"]: `# ${appName}\n\nThis is a boilerplate Express.js REST API app scaffolded using \`create-express-str\` CLI.\n\n## 📁 Folder Structure\n\n\`\`\`\nDB/\n  ├── models/\n  │     └── test.model.js\n  └── db.connection.js\n\nsrc/\n  ├── middlewares/\n  │     └── auth.middleware.js\n  ├── modules/\n  │     └── test/\n  │           ├── test.controller.js\n  │           ├── test.routes.js\n  │           └── test.validation.js\n  ├── services/\n  │     └── test.service.js\n  ├── utils/\n  │     └── test.js\n  ├── index.routes.js\n  └── initApp.js\n\nindex.js\n.env\n.gitignore\npackage.json\n\`\`\`\n\n## 🚀 Getting Started\n\n\`\`\`bash\nnpm install\nnpm start\n\`\`\`\n\nServer will start on \`http://localhost:4000\`.\n`,
  };

  // Write files
  for (const [relativePath, content] of Object.entries(structure)) {
    const fullPath = path.join(root, relativePath);
    writeFile(fullPath, content);
  }

  // Init npm
  console.log("🛠 Initializing npm and installing packages...");
  execSync("npm init -y", { cwd: root, stdio: "inherit" });

  // Modify package.json
  const pkgPath = path.join(root, "package.json");
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkgJson.main = "index.js";
  pkgJson.type = "module";
  pkgJson.scripts = {
    start: "node index.js",
    dev: "nodemon index.js",
  };
  fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2));

  // Install dependencies
  execSync("npm install express dotenv", { cwd: root, stdio: "inherit" });
  execSync("npm install --save-dev nodemon", { cwd: root, stdio: "inherit" });

  console.log("✅ Project created successfully!");
} catch (error) {
  console.error("❌ Something went wrong:", error.message);
  process.exit(1);
}
