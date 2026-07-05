# 🎓 Student Management — Frontend

A Next.js frontend for the Student Management Portal with user authentication and complete student record management.

## 🚀 Features
- User Registration with form validation
- User Login with JWT authentication
- Protected routes — redirects to login if not authenticated
- View all student records in a table
- Add new student with a form
- Edit existing student details
- Delete student with confirmation
- Responsive UI with Tailwind CSS

## 🛠️ Tech Stack
| Technology | Purpose |
|-----------|---------|
| Next.js 14 | React framework (App Router) |
| Tailwind CSS | Styling |
| localStorage | Token & user storage |

## 📁 Folder Structure
```
student_management/
├── app/
│   ├── register/
│   │   └── page.jsx         # Register form
│   ├── login/
│   │   └── page.jsx         # Login form
│   ├── home/
│   │   └── page.jsx         # Home page with user details
│   └── students/
│       ├── page.jsx         # View all students
│       ├── add/
│       │   └── page.jsx     # Add new student
│       └── edit/
│           └── [id]/
│               └── page.jsx # Edit student
├── lib/
│   └── api.js               # Base API URL config
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

3. Make sure backend is running on `http://localhost:3001`

4. Start the development server
```bash
npm run dev
```
App runs on `http://localhost:3000`

## 📸 Pages & Routes

| Page | Route | Protected |
|------|-------|-----------|
| Register | `/register` | ❌ Public |
| Login | `/login` | ❌ Public |
| Home | `/home` | ✅ Login required |
| All Students | `/students` | ✅ Login required |
| Add Student | `/students/add` | ✅ Login required |
| Edit Student | `/students/edit/:id` | ✅ Login required |

## 🔄 App Flow
```
/register → /login → /students → /students/add
                              → /students/edit/:id
```

## 🔗 Backend Repo
[student_register](https://github.com/Hariram26/student_register) — Express + MongoDB backend

## 👨‍💻 Author
**Hariram26** — [GitHub](https://github.com/Hariram26)
