# Smart College Cafeteria Food Ordering System - Project Documentation

## 1. Project Overview
The **Smart College Cafeteria Food Ordering System** is a full-stack web application designed to streamline the food ordering process. It solves the problem of long queues and manual errors by digitalizing the entire workflow from student ordering to kitchen preparation.

---

## 2. In-Depth Technology Stack Analysis

### Backend: Java Spring Boot
*   **Version**: Spring Boot 3.2.2 (JDK 21)
*   **Why we chose it**:
    *   **Robustness**: Spring Boot is industry-standard for enterprise applications due to its reliability and dependency injection.
    *   **Scalability**: Changes backend logic to be easily extended without breaking existing features.
    *   **Security**: Comes with 'Spring Security', a powerful framework for handling authentication and authorization out-of-the-box.
*   **What we implemented**:
    *   **REST API**: Created endpoints (`/api/orders`, `/api/auth`) to communicate with the frontend.
    *   **Business Logic**: Handled complex rules like "Students can place orders" but "Only Admins can add menu items".
    *   **Data Validation**: Ensured no invalid data (like negative prices or empty emails) enters the database.

### Frontend: React.js
*   **Framework**: React (using Vite for fast build tool)
*   **Why we chose it**:
    *   **Component-Based**: Allows us to reuse UI parts like the `Navbar`, `Footer`, and `FoodCard` across multiple pages.
    *   **Single-Page Application (SPA)**: Provides a smooth user experience where the page doesn't reload on every click, feeling like a mobile app.
    *   **State Management**: React Hooks (`useState`, `useContext`) make it easy to manage live data like the Shopping Cart.
*   **What we implemented**:
    *   **Dynamic UI**: The Menu page automatically updates when Admin adds a new item.
    *   **Cart System**: Managed adding/removing items and calculating totals instantly in the browser.
    *   **Role-Based Views**: The UI changes depending on who is logged in (Top Navbar shows "Kitchen" only for Chefs).

### Database: MySQL
*   **Type**: Relational Database Management System (RDBMS)
*   **Why we chose it**:
    *   **ACID Compliance**: Crucial for financial transactions (Orders). We cannot afford to lose order data if the server crashes.
    *   **Structured Relationships**: Our data naturally relates: A `User` *has many* `Orders`, and an `Order` *has many* `OrderItems`. Relational databases handle this best.
*   **What we implemented**:
    *   **Tables**: Designed `users`, `foods`, `orders`, and `order_items` tables.
    *   **Foreign Keys**: Linked `orders` to `users` so we always know exactly who placed which order.

### Security: JWT (JSON Web Tokens)
*   **Why we chose it**:
    *   **Stateless**: The server doesn't need to remember "sessions". The token itself proves who the user is. This is faster and cheaper for the server.
    *   **Cross-Domain**: Since our Front-End (Vercel) and Back-End (Railway) are on different servers, cookies are hard to manage. JWTs work perfectly across domains.
*   **What we implemented**:
    *   **Token Generation**: When a user logs in, we generate a secure encrypted string containing their ID and Role.
    *   **Authorization Filter**: Every request to a protected route (like `Place Order`) checks this token to prevent hackers from faking orders.

### Deployment: Railway & Vercel
*   **Why we chose them**:
    *   **Continuous Deployment**: They automatically re-deploy the new version whenever we push code to GitHub.
    *   **Separation of Concerns**: Hosting Frontend and Backend separately scales better.
*   **What we implemented**:
    *   **Live Production Environment**: The application is live and accessible via public URLs, not just on `localhost`.

---

## 3. Database Schema
The database consists of the following key entities:

*   **User**: `id`, `email` (Unique), `password` (Encrypted), `role` (STUDENT/ADMIN).
*   **Food**: `id`, `name`, `description`, `price`, `imageUrl`, `available`.
*   **Order**: `id`, `user_id` (FK), `totalPrice`, `status` (PENDING/READY), `createdAt`.
*   **OrderItem**: `id`, `order_id` (FK), `food_id` (FK), `quantity`.

---

## 4. System Flow (The "Story" of an Order)
1.  **Registration**: Student registers -> Backend hashes password -> Saves to MySQL.
2.  **Login**: Student logs in -> Backend verifies hash -> Returns JWT Token.
3.  **Browsing**: Frontend requests `/api/foods` -> Backend queries MySQL -> Returns JSON list of foods.
4.  **Ordering**: Student clicks "Checkout" -> Frontend sends JSON Order -> Backend saves Order & OrderItems -> Returns "Success".
5.  **Preparation**: Chef views "Kitchen Dashboard" -> Sees new order -> Marks as "Preparing".
6.  **Notification**: Backend sends an email to the Student: "Your order is being prepared!".

---

## 5. Future Enhancements
*   **Payment Gateway**: Integration with Razorpay for real payments.
*   **WebSocket**: For "Instant" status updates without refreshing the page.
*   **Mobile App**: Building a React Native version for iOS/Android.
