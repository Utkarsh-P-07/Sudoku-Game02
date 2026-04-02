# Premium Sudoku Web Application

A full-stack, production-ready Sudoku web application featuring an elegant minimal design, robust puzzle generation algorithms, and a complete gamification engine.

## 🚀 Features

- **Dynamic Puzzle Generation**: Algorithmic generation guaranteeing a single unique solution per board across three difficulties (Easy, Medium, Hard).
- **Advanced Gamification**:
  - Global Leaderboards tracking the fastest completions cleanly split by difficulty.
  - Comprehensive point system (awarding precision and speed).
  - Achievement Badges powered by `framer-motion` for fluid micro-animations (e.g., "Lightning", "No Hint", "10 wins").
- **Modern UI/UX**:
  - Built with a purely mobile-first philosophy using Tailwind CSS v4.
  - Contextual Smart Board styling highlighting connected cells, errors, and matching numbers.
  - Native Light/Dark Mode toggle adhering to modern premium app aesthetics.
- **Player Profiles**: Sign up securely with email/password or play instantly in "Guest Mode".

## 🛠 Tech Stack

This project is separated structurally into a modern **MERN** stack layout:

- **Frontend (`/client`)**: 
  - React (via Vite)
  - Tailwind CSS v4
  - Framer Motion
  - Lucide Icons
- **Backend (`/server`)**: 
  - Node.js & Express
  - MongoDB (via Mongoose)
  - JSON Web Tokens (JWT) & bcryptjs for Authentication
- **Orchestraion**: `concurrently` (monorepo command streaming)

## 📁 Project Structure

```
├── client/                 # React Frontend environment
│   ├── src/components/     # UI Building Blocks (Board, Controls)
│   ├── src/pages/          # Routing Pages (Home, Game, Profile)
│   ├── src/services/       # API Fetch logic for the local REST backend
│   └── src/game/           # Core algorithmic backtracking (Solver/Generator)
│
├── server/                 # Express Backend environment
│   ├── models/             # Mongoose schemas (User)
│   ├── routes/             # Authentication & Data endpoints
│   ├── middleware/         # Security & JWT protection blocks
│   └── .env                # Backend Configuration
│
└── package.json            # Root configuration for concurrent execution
```

## ⚙️ Getting Started

Follow these exact steps securely set up and run the application on your local machine.

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)
- Local MongoDB installation (like MongoDB Compass) or an Atlas Cloud DB.

### 2. Clone the Repository
```bash
git clone https://github.com/yourusername/sudoku.git
cd sudoku
```

### 3. Install Dependencies
Run the built-in orchestrator script that automatically installs root packages, navigates into the `client/` folder to install React dependencies, and navigates into the `server/` folder to install Express dependencies.
```bash
npm run install:all
```

### 4. Configure Environment Variables
You need to set up the backend environment connection for MongoDB. Create a `.env` file inside the `server/` folder:

**Windows (PowerShell):**
```powershell
echo "PORT=5000`nMONGO_URI=mongodb://127.0.0.1:27017/sudoku`nJWT_SECRET=super_secret_jwt_key_sudoku_12345" > server\.env
```

**Mac/Linux (Bash):**
```bash
cat <<EOT > server/.env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sudoku
JWT_SECRET=super_secret_jwt_key_sudoku_12345
EOT
```
*(If you are deploying to production, replace the `MONGO_URI` with your official Atlas Connection String, and change `JWT_SECRET` to a cryptographically secure key.)*

### 5. Running the Application
Spin up both the Backend API and the Frontend UI simultaneously using the root orchestrator:
```bash
npm run dev
```

- **Client Server:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000`

## 🧩 Game Logic Highlights
The engine relies on a robust `generator.js` and `solver.js` model. It randomly fills 3x3 diagonal grids mathematically instantly, then initiates standard backtracking. Once a valid template exists, it randomly "pokes holes" based on user difficulty preferences while constantly checking mathematical uniqueness to guarantee exactly 1 path to victory.
