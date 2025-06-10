# 🔐 User Authentication System

A **full-stack user authentication system** built with **React**, **Express.js**, and a **dual database architecture** using **MySQL** and **MongoDB**.  
This project showcases modern web development practices and serves as a comprehensive **portfolio project** for internship/job applications.

---

## 🚀 Features

### 🧑 Core Authentication
- ✅ **User Registration** — Username, email, password, and role selection
- ✅ **Secure Login** — Credential validation with session management
- ✅ **Password Security** — bcrypt hashing with salt
- ✅ **Role-based Access** — Admin and Student roles with different permissions
- ✅ **Session Management** — localStorage-based authentication state

### 🔐 Enhanced Security
- ✅ **Password Strength Meter** — Real-time validation with visual feedback
- ✅ **Username Availability Check** — AJAX-style real-time validation
- ✅ **Input Validation** — Comprehensive form validation with Zod
- ✅ **Prepared Statements** — SQL injection protection
- ✅ **Secure Sessions** — express-session with memory store

### 💡 User Experience
- ✅ **Responsive Design** — Mobile-first approach with Tailwind CSS
- ✅ **3D Animated Background** — Spline.design integration
- ✅ **Profile Management** — Full CRUD operations for user profiles
- ✅ **Profile Picture Upload** — Base64 encoding with preview
- ✅ **Toast Notifications** — Real-time feedback for all actions
- ✅ **Loading States** — Skeleton loaders and loading indicators

---

## 🧠 Technical Excellence

### 🗃️ Dual Database Architecture
- **MySQL** for authentication data (users, credentials)
- **MongoDB** for profile data (personal info, preferences)

### ⚙️ Type Safety & Error Handling
- Full **TypeScript** implementation
- **Comprehensive error boundaries** and validation

---

## 🛠️ Tech Stack

### 🔧 Frontend
- **React 18.3** — Modern React with hooks and functional components
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **Shadcn/ui** — High-quality component library using Radix primitives
- **React Query** — Server state management
- **React Hook Form** — Form handling with validation
- **Wouter** — Lightweight routing
- **Zod** — Runtime type validation

### 🔧 Backend
- **Node.js** — Runtime environment
- **Express.js** — Web framework
- **TypeScript** — Server-side type safety
- **Passport.js** — Authentication middleware
- **bcrypt** — Password hashing
- **express-session** — Session management

### 🗃️ Databases
- **MySQL** — Stores usernames, emails, hashed passwords, and roles
- **MongoDB** — Stores profile details like age, DOB, contact info, etc.

### 🧰 Development Tools
- **Vite** — Lightning-fast build tool and dev server
- **ESLint** — Code linting
- **Prettier** — Code formatting
- **Git** — Version control

---

## 📁 Project Structure

```bash
project-root/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── utils/
├── server/                  # Express backend
│   ├── routes/
│   ├── db/
│   │   ├── mysql.ts
│   │   └── mongo.ts
│   ├── controllers/
│   └── middleware/
├── uploads/                 # Profile images
├── .env.example             # Environment configuration sample
├── README.md                # Project overview
└── package.json
# securesignin

##LIVE DEMO : https://securesignin-sn2o.onrender.com/
