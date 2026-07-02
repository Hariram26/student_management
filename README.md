# 🎓 Student Management — Frontend

A Next.js frontend for the Student Management Portal with registration, login, and a protected home page.

## 🚀 Features
- User Registration form with validation
- User Login with JWT authentication
- Protected Home page displaying user details
- Logout functionality
- Responsive UI with Tailwind CSS

## 🛠️ Tech Stack
| Technology | Purpose |
|-----------|---------|
| Next.js 14 | React framework (App Router) |
| Tailwind CSS | Styling |
| localStorage | Token storage |

## 📁 Folder Structure
```
student_management/
├── app/
│   ├── register/
│   │   └── page.jsx    # Registration form
│   ├── login/
│   │   └── page.jsx    # Login form
│   └── home/
│       └── page.jsx    # Protected home page
└── package.json
```

## ⚙️ Setup & Installation

1. Clone the repo
```bash
git clone https://github.com/Hariram26/student_management.git
cd student_management
```

2. Install dependencies
```bash
npm install
```

3. Make sure backend is running on `http://localhost:3000`

4. Start the development server
```bash
npm run dev
```
App runs on `http://localhost:3001`

## 📸 Pages

| Page | Route | Description |
|------|-------|-------------|
| Register | `/register` | Create a new account |
| Login | `/login` | Login with email & password |
| Home | `/home` | Protected page with user details |

## 🔗 Backend Repo
[student_register](https://github.com/Hariram26/student_register) — Express + MongoDB backend

## 👨‍💻 Author
**Hariram26** — [GitHub](https://github.com/Hariram26)
