# 🌟 create-express-str

✨ A CLI tool to instantly scaffold a modern, clean, and scalable Express.js project structure.

---

## 📌 Why use `create-express-str`?

- 🚀 Kickstart Express.js apps in **seconds**
- 📁 Pre-built clean **project architecture**
- 🔧 Pre-configured for `.env`, `nodemon`, and modular routes
- 👨‍💻 Perfect for **backend developers**, students, and professionals

---

## 🛠 Installation & Usage

### ▶️ Run directly with `npx` (no need to install globally):
npx create-express-str my-app

#### 📂 Want to generate in the current folder?

npx create-express-str .
#### 🌍 Or install it globally:

npm install -g create-express-str

create-express-str my-app

## 🧱 Project Structure

```bash
my-app/
├── config/
│   ├── db.connection.js
│   └── models/
│       └── test.model.js
│
├── src/
│   ├── initApp.js
│   ├── index.routes.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── modules/
│   │   └── test/ 
│   │       ├── test.controller.js
│   │       ├── test.routes.js
│   │       └── test.validation.js
│   ├── services/
│   │   └── test.service.js
│   └── utils/
│       └── test.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
```
---

### 🚦 Usage Example
Once scaffolded, navigate to your new project:

cd my-app
npm start
You should see:


Server running on port 3000 🚀!...
Try accessing the default test route:


http://localhost:4000/api/v1/test
---

### 💡 Tips & Recommendations
✅ Use .env for environment variables <br>
✅ Write all logic in modules, separating controllers, routes, and validation<br>
✅ Add custom logic in services/ for reusable business functions<br>
✅ Global error handling is already pre-configured<br>
✅ Supports Express Middleware (middlewares/ folder)<br>
✅ Use utils/ for helper functions<br>

---

### 🔄 Scripts

"scripts": {<br>
  "start": "nodemon index.js"<br>
}<br><br>
Starts the server using nodemon for hot reload


---

### 📦 Dependencies (pre-installed)
express - minimal and flexible Node.js web application framework

dotenv - loads environment variables from .env

nodemon - auto-restarts the server on file changes
---

### 📌 Requirements
Node.js v14+

npm v6+
---

### 🧪 Built With
Node.js

Express

JavaScript (ES Modules)
---

## 🙌 Contributing
Contributions are welcome!


1. Fork the repo
2. Make your changes
3. Submit a Pull Request
---

## 📄 License
MIT © 2025 — Ahmed Alshayeb

## 🔗 Connect with Me <br>
GitHub: <a href="https://github.com/Ahmed-Alshayeb">@Ahmed-Alshayeb</a>

LinkedIn: <a href="www.linkedin.com/in/ahmed-alshayeb-5843322a2">Ahmed Alshayeb</a>


### ✅ You can copy this `README.md` and paste it directly into your project folder.

Let me know if you want:

- A **dark mode-friendly markdown version**
- Translation into **Arabic**
- **GitHub Actions** workflow to automate testing or publishing

