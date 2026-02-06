# 📡 API Documentation

Base URL: `http://localhost:8080/api`

## 🔐 Authentication (`/auth`)

| Method | Endpoint | Description | Request Body | Access |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user | `{ name, email, password, role }` | Public |
| `POST` | `/auth/login` | Login & get JWT | `{ email, password }` | Public |

*Note: Roles can be `STUDENT`, `ADMIN`, or `CHEF`.*

---

## 🍔 Food Menu (`/food`)

| Method | Endpoint | Description | Request Body | Access |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/food` | Get all available food items | - | Public / Auth |
| `GET` | `/food/{id}` | Get food details by ID | - | Public / Auth |
| `POST` | `/food` | Add new food item | `{ name, description, price, category, imageUrl, available }` | **Admin** |
| `PUT` | `/food/{id}` | Update food item | `{ ...fields }` | **Admin** |
| `DELETE` | `/food/{id}` | Delete food item | - | **Admin** |

---

## 🛒 Orders (`/orders`)

| Method | Endpoint | Description | Request Body | Access |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/orders` | Create a new order | `{ items: [{foodId, quantity}], transactionId }` | User/Admin |
| `GET` | `/orders/my-orders` | Get logged-in user's history | - | User/Admin |
| `GET` | `/orders` | Get ALL orders (History) | - | **Admin** |
| `GET` | `/orders/kitchen` | Get active orders (Pending/Preparing) | - | **Admin/Chef** |
| `PUT` | `/orders/{id}/status` | Update order status | Query Param: `?status=PREPARING` | **Admin/Chef** |

*Order Statuses: `PENDING`, `PREPARING`, `READY`, `COMPLETED`, `CANCELLED`*

---

## 📊 Admin Analytics (`/admin`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin/stats` | Get dashboard stats (Revenue, Orders, Top Items) | **Admin** |
| `GET` | `/admin/users` | Get all registered users | **Admin** |
| `PUT` | `/admin/users/{id}/block` | Block/Unblock a user | **Admin** |

---

## ⭐ Reviews (`/reviews`)

| Method | Endpoint | Description | Request Body | Access |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/reviews/food/{foodId}` | Get reviews for a specific item | - | Public |
| `POST` | `/reviews` | Submit a review | `{ foodId, rating, comment }` | User |

---

## 👤 User Profile (`/users`)

| Method | Endpoint | Description | Request Body | Access |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/users/profile` | Get current user profile | - | Auth |
| `PUT` | `/users/profile` | Update profile details | `{ name, email }` | Auth |
| `PUT` | `/users/password` | Change password | `{ oldPassword, newPassword }` | Auth |
