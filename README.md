# 🍔 Smart College Cafeteria - Food Ordering System

A full-stack web application designed to streamline food ordering in college cafeterias. It features role-based access (Student, Admin, Chef), real-time order tracking, UPI payment integration, and a modern glassmorphism UI with Dark/Light themes.

---

## 🚀 Features

### 👤 User (Student/Faculty)
- **Browse Menu**: Categorized menu (Starters, Breakfast, Lunch) with search functionality.
- **Cart & Ordering**: Add items, adjust quantities, and place orders.
- **Payment Integration**: Real-world UPI payment flow with dynamic QR codes and Transaction ID verification.
- **Order Tracking**: Real-time status updates (Pending -> Preparing -> Ready -> Completed).
- **Reviews**: Rate and review food items.
- **Profile**: Manage profile details and password.
- **Dark/Light Mode**: Toggle between Neon Dark and Clean Light themes.

### 👨‍💼 Admin
- **Dashboard**: View analytics (Total Revenue, Total Orders, Top Selling Items).
- **Menu Management**: Add, update (price/image), and delete food items.
- **User Management**: View all users and block/unblock accounts.
- **Order Management**: View all orders and update their status.

### 👨‍🍳 Chef / Kitchen
- **Kitchen View**: Dedicated dashboard to see "Pending" and "Preparing" orders.
- **Workflow**: Mark orders as "Preparing" and then "Ready" to notify users.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Pure CSS (Glassmorphism Design, Animations, responsive Flex/Grid layouts)
- **State Management**: Context API (Auth, Cart, Theme)
- **Routing**: React Router DOM

### Backend
- **Framework**: Spring Boot (Java 21)
- **Database**: MySQL
- **Security**: Spring Security + JWT (JSON Web Tokens)
- **Persistence**: Spring Data JPA
- **Notifications**: JavaMailSender (Email)

---

## ⚙️ Setup & Installation

### Prerequisites
- Java Development Kit (JDK) 21
- Node.js & npm
- MySQL Server
- Maven

### 1. Database Setup
Create a MySQL database named `cafeteria_db`:
```sql
CREATE DATABASE cafeteria_db;
```
*Note: The application will automatically create the necessary tables on the first run.*

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd cafeteria-backend
```
Configure `src/main/resources/application.properties` with your MySQL credentials if they differ from default (`root`/`password`).

Run the application:
```bash
mvn spring-boot:run
```
*Server runs on: `http://localhost:8080`*

### 3. Frontend Setup
Navigate to the frontend directory:
```bash
cd cafeteria-frontend
```
Install dependencies:
```bash
npm install
```
Run the development server:
```bash
npm run dev
```
*Client runs on: `http://localhost:5173`*

---

## 🔐 Default Credentials

**Pre-seeded Admin Account:**
- **Email**: `admin@cafeteria.com`
- **Password**: *(Check `DataSeeder.java` or `application.properties` to set your own secure password)*

> **Security Warning**: Please change these default credentials immediately upon deployment!

*You can register new student accounts via the "Register" page.*

---

## 📸 Usage Highlights

- **Admin Login**: Access the Admin Portal via the "Admin & Staff" card on the landing page.
- **Secret Admin Mode**: Add `?mode=admin` to the URL to enable persistent admin registration mode.
- **Kitchen View**: Accessible to Admins and Chefs to manage active kitchen tickets.

---

## 📧 Notifications
The system simulates email notifications. When an order is marked as **READY**, the backend logs the email content to the console (unless a real SMTP server is configured).

---

Made with ❤️ by the Smart Cafeteria Team.
