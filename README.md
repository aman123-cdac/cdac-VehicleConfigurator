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
