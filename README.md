# 🚗 CDAC Vehicle Configuration System

A full-stack vehicle configuration and invoice generation system built using:

- ⚙️ Spring Boot (Backend)
- 🗄️ MySQL Database
- 💻 Vue.js (Frontend)
- 📄 iText PDF (Invoice Generation)
- 🌐 Multi-language Support (English, Hindi, French, Marathi, Sanskrit)

---

## 📌 Project Overview

The Vehicle Configuration System allows users to:

- Register company details
- Login securely
- Configure vehicles (segment, manufacturer, model)
- Customize features (Interior, Exterior, Accessories)
- Generate invoices
- Download / Email PDF invoice
- View dashboard analytics

---

# 🧭 Application Flow (Step-by-Step Guide)

---

## 1️⃣ Registration (4 Steps)

### Step 1 – Company Details
![Registration Step 1](screenshots/registration-step1.png)

- Company Name  
- Holding Type  
- PAN Number  

---

### Step 2 – Personal Details
![Registration Step 2](screenshots/registration-step2.png)

- Authorized Person  
- Designation  
- Mobile Number  

---

### Step 3 – Address Details
![Registration Step 3](screenshots/registration-step3.png)

- Address Line  
- City  
- State  
- Pin Code  

---

### Step 4 – Account Details
![Registration Step 4](screenshots/registration-step4.png)

- Email  
- Username  
- Password  

After successful registration → User can Login.

---

## 2️⃣ Login

### English Login
![Login](screenshots/login.png)



User logs in using:

- Username  
- Password  

Supports:
- Multi-language toggle  
### Hindi Login
![Login Hindi](screenshots/login-hindi.png)

- Google login (optional)  
- Facebook login (optional)  

---

## 3️⃣ Dashboard

![Dashboard](screenshots/dashboard.png)

After login, dashboard shows:

- Total Configurations  
- Pending Invoices  
- Recent Activity  
- Revenue Overview  

Quick Actions:
- New Configuration  
- Browse Templates  
- Upload Excel  

---

## 4️⃣ Configure Vehicle

![Configure Vehicle](screenshots/configure.png)

Steps:

1. Select Segment (SUV, Sedan etc.)
2. Select Manufacturer
3. Select Model
4. Enter Quantity
5. Click Continue

---

## 5️⃣ Default Configuration Page

![Default Config](screenshots/welcome-configure.png)

Shows:

- Default Features  
- Unit Price  
- Quantity  
- Total Amount  

Options:
- Custom Configuration  
- Confirm Selection  

---

## 6️⃣ Custom Configuration

![Components](screenshots/components.png)

User can customize:

- Interior  
- Exterior  
- Accessories  

Selected components are shown on right side with price adjustment.

---

## 7️⃣ Invoice Generation

![Invoice](screenshots/invoice.png)

Invoice page shows:

- Order ID  
- Vehicle Details  
- Configuration Summary  
- Base Amount  
- Tax (18%)  
- Total Payable  

Click:
👉 **Confirm & Generate Invoice**

PDF invoice is generated using iText library.

---

## 8️⃣ Order Confirmation Page

![Thank You](screenshots/thank-you.png)

Shows:

✔ Order Confirmed  
✔ Invoice Generated  
✔ Invoice sent to email  

---

# 🛠️ Technologies Used

## 🔹 Backend
- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL
- iText PDF

## 🔹 Frontend
- Vue.js
- Tailwind CSS
- Axios

---

# 🗄️ Database Configuration

Update `application-dev.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/v_vconf_micro
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update


# ▶️ How to Run the Project
## 🔹 Run Backend
cd v-conf
mvn spring-boot:run


Backend runs on:

http://localhost:8080

 ##🔹 Run Frontend
cd vConfigUi
npm install
npm run dev


Frontend runs on:

http://localhost:5173

📄 Key Features

✔ Multi-step Registration
✔ Multi-language Support
✔ Role-based Authentication
✔ Vehicle Customization
✔ Dynamic Pricing Calculation
✔ Invoice PDF Generation
✔ Email Integration
✔ Dashboard Analytics
✔ Secure Login using Spring Security

# 📊 Project Architecture

Frontend (Vue.js)
⬇
REST API (Spring Boot)
⬇
Service Layer
⬇
JPA / Hibernate
⬇
MySQL Database

## PDF generation handled via iText library.

# 👨‍💻 Author

## Aman Verma
### CDAC Final Project

# 📜 License

This project is developed for educational purposes under CDAC curriculum.


