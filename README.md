# 🚗 CDAC Vehicle Configurator Project

A full-stack **Vehicle Configuration System** developed as part of the **CDAC final project**, enabling users to configure vehicles, manage components, authenticate using OAuth, and generate invoices.

This repository follows a **monorepo structure** and contains **backend (Java + .NET)** and **frontend (React)** applications in a single GitHub repository.

---

## 📌 Project Overview

The Vehicle Configurator allows users to:
- Register and authenticate (JWT + OAuth)
- Select vehicle segments, models, and components
- Configure vehicles dynamically
- Generate invoices and PDFs
- Manage users and configurations securely

---

## 🧱 Tech Stack

### 🔙 Backend
- **Java (Spring Boot)**
  - Spring Security (JWT + OAuth2)
  - REST APIs
  - Maven
- **.NET (ASP.NET Core Web API)**
  - Entity Framework
  - RESTful services

### 🎨 Frontend
- **React.js**
  - Vite
  - Tailwind CSS
  - Axios
  - React Router

### 🛢️ Database
- MySQL / PostgreSQL (configurable)

---

## 📂 Repository Structure

```text
cdac-VehicleConfigurator/
│
├── v-conf-java/          # Spring Boot backend
│   └── v-conf/
│
├── v-conf-c#/            # ASP.NET Core backend
│   └── vehicle_config_c#/
│
├── v-conf-frontend/      # React frontend
│   └── finalui/
│
├── .gitignore
├── README.md
└── .env.example

------------------------------------------------------------------------
------------------------------------------------------------------------

🔐 Security & Configuration

⚠️ Secrets are NOT committed to this repository

OAuth credentials and sensitive values are managed using environment variables.

Required Environment Variables
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
JWT_SECRET=your_jwt_secret
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password


---------------------------------------------------------

▶️ How to Run the Project
1️⃣ Backend – Spring Boot
cd v-conf-java/v-conf/v-conf
mvn spring-boot:run


Runs on:

http://localhost:8080

2️⃣ Backend – .NET API
cd v-conf-c#/vehicle_config_c#/project_vc#
dotnet run


Runs on:

https://localhost:5001

3️⃣ Frontend – React
cd v-conf-frontend/finalui/FinalVconfigUi
npm install
npm run dev


Runs on:

http://localhost:5173

---------------------------------------------

🧪 Features

🔐 Secure Authentication (JWT + OAuth2)

🚘 Vehicle Configuration Engine

🧩 Dynamic Component Selection

🧾 Invoice Generation (PDF)

🌐 Multi-language Support

📊 Admin & User Dashboards

📁 Clean Monorepo Structure

📸 Screenshots

(Add screenshots here if needed)

👨‍💻 Contributors

Aman Verma – Full Stack Developer (CDAC)

📜 License

This project is developed for academic purposes (CDAC).
Feel free to explore and learn from the code.

⭐ Acknowledgements

CDAC Faculty & Mentors

Spring Boot & React Open Source Community


---

## ✅ What I recommend next (quick wins)

If you want, I can now:
- **Add `.env.example`** for contributors
- **Improve README with screenshots**
- **Refactor repo into clean monorepo style**
- **Add GitHub Actions CI**
- **Review project for interview questions**

Just reply with the number:
**2, 3, 4, or 5** 🚀
