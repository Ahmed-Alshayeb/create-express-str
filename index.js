#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appName = process.argv[2] || ".";
const root = path.join(process.cwd(), appName);

// Helper to write files
const writeFile = (filePath, content = "") => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
};

try {
  // Prevent overwriting existing folder
  if (fs.existsSync(root)) {
    console.error(
      `❌ Directory "${appName}" already exists. Choose a different name.`
    );
    process.exit(1);
  }

  // Start creating project
  console.log(`📦 Creating project at ${root} ...`);
  fs.mkdirSync(root);

  // Folder structure and contents
  const structure = {
    ["/config/models/test.model.js"]: "",
    ["/config/db.connection.js"]: "",
    ["/src/middlewares/auth.middleware.js"]: "",
    ["/src/modules/test/test.controller.js"]: "",
    ["/src/modules/test/test.routes.js"]: "",
    ["/src/modules/test/test.validation.js"]: "",
    ["/src/services/test.service.js"]: "",
    ["/src/utils/test.js"]: "",
    ["/src/index.routes.js"]: `import testRouter from "./modules/test/test.routes.js";\n\nexport {\n  testRouter,\n};\n`,
    ["/src/initApp.js"]: `import { config } from "dotenv";\nimport * as Router from "./index.routes.js";\n\nexport const initApp = (app, express) => {\n  config();\n  const port = +process.env.PORT || 4000;\n\n  app.use(express.json());\n\n  // DB Connection\n  // call connection function...\n\n  app.use("/api/v1/test", Router.testRouter);\n\n  app.use("*", (req, res) => {\n    res.status(404).json({ msg: \`Route \${req.originalUrl} Not Found\` });\n  });\n\n  app.use((err, req, res, next) => {\n    res.status(err.statusCode || 500).json({\n      status: err.status || "error",\n      error: err,\n      message: err.message,\n      stack: err.stack,\n    });\n  });\n\n  app.listen(port, () => {\n    console.log(\`Server running on port \${port} 🚀!...\`);\n  });\n};\n`,
    ["/index.js"]: `import express from "express";\nimport { initApp } from "./src/initApp.js";\n\nconst app = express();\n\napp.set("case sensitive routing", true);\ninitApp(app, express);\n`,
    ["/.gitignore"]: `.env\nnode_modules\n`,
    ["/.env"]: `PORT=3000\n`,
    ["/README.md"]: `# ${appName}\n\nThis is a boilerplate Express.js REST API app scaffolded using \`create-express-app\` CLI.\n\n## 📁 Folder Structure\n\n\`\`\`\nconfig/\n  ├── models/\n  │     └── test.model.js\n  └── db.connection.js\n\nsrc/\n  ├── middlewares/\n  │     └── auth.middleware.js\n  ├── modules/\n  │     └── test/\n  │           ├── test.controller.js\n  │           ├── test.routes.js\n  │           └── test.validation.js\n  ├── services/\n  │     └── test.service.js\n  ├── utils/\n  │     └── test.js\n  ├── index.routes.js\n  └── initApp.js\n\nindex.js\n.env\n.gitignore\npackage.json\n\`\`\`\n\n## 🚀 Getting Started\n\n\`\`\`bash\nnpm install\nnpm start\n\`\`\`\n\nServer will start on \`http://localhost:4000\`.\n`,
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
    start: "nodemon index.js",
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
