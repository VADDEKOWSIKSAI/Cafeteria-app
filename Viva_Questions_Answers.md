# Smart Cafeteria Project - Viva Voce Questions & Answers

## 1. System Architecture & Spring Boot

### Q1: Why did you choose a "Microservices-like" architecture (separate Frontend/Backend) instead of a Monolith (JSP/Thymeleaf)?
**Student Answer:**
"We chose a decoupled architecture to separate concerns. The React frontend handles the UI/UX, while the Spring Boot backend creates a robust REST API. This allows us to scale them independently—for example, we could replace the React web app with a Mobile App later without changing a single line of Backend code."

**Deep Dive Explanation:**
*   **Separation of Concerns:** Frontend devs don't need to know Java, Backend devs don't need to know CSS.
*   **Scalability:** If the UI is heavy, we can add more Vercel instances. If the DB is heavy, we scale Railway.
*   **JSON Standard:** They communicate via JSON, which is the universal language of the web.

### Q2: What is "Dependency Injection" in Spring Boot and where did you use it?
**Student Answer:**
"Dependency Injection (DI) is where Spring manages our objects (Beans) for us. Instead of creating `new UserRepository()` everywhere, we use `@Autowired`. This makes the code loosely coupled and easier to test."

**Deep Dive Explanation:**
*   **Inversion of Control (IoC):** You give control of object creation to the Spring Container.
*   **Example in Code:** In `AuthController.java`, we `@Autowired` the `AuthenticationManager` and `UserRepository`. We didn't instantiate them manually.

---

## 2. Database & Data Integrity

### Q3: How do you handle "Concurrency" in the kitchen? (e.g., Two chefs updating the same order)
**Student Answer:**
"Currently, our database uses the 'Last Commit Wins' strategy. If two chefs update an order at the exact same millisecond, the MySQL database will process them sequentially. Since the status update is atomic (updating a single field), the database ensures the row is locked exclusively during the write operation."

**Deep Dive Explanation:**
*   **Atomic Transactions:** Databases are ACID compliant. The 'I' stands for Isolation.
*   **Pessimistic Locking:** You lock the row so no one else can read/write until you finish.
*   **Optimistic Locking:** You check a `@Version` number column. If it changed since you read it, you throw an error.

### Q4: Why use a Relational Database (MySQL) instead of MongoDB?
**Student Answer:**
"Our data is highly structured and relational. An Order *must* belong to a User. An OrderItem *must* link to a Food. SQL enforces these relationships (Foreign Keys), ensuring we never have an 'orphan' order with no owner. MongoDB is better for unstructured data, which doesn't fit our case."

---

## 3. Security (JWT)

### Q5: Explain how the Login flow works securely. Do you store the password?
**Student Answer:**
"No, we never store plain text passwords. When a user registers, we use `BCrypt` to hash the password before saving it to the database. When they login, the server compares the hash. If valid, we issue a **JWT (JSON Web Token)**. The frontend stores this token and sends it in the `Authorization` header for every subsequent request."

**Deep Dive Explanation:**
*   **Hashing vs Encryption:** Encryption can be reversed (decrypted). Hashing is one-way. You cannot get "password123" back from a BCrypt hash.
*   **Stateless:** The server doesn't keep a "session file". The Token *is* the session. It contains the UserID and Expiry signed digitally.

---

## 4. Frontend (React)

### Q6: What is the "Virtual DOM" in React and why is it fast?
**Student Answer:**
"The Virtual DOM is a lightweight copy of the real browser DOM. When data changes (like adding an item to the cart), React updates the Virtual DOM first, compares it to the previous version (Diffing), and then only updates the specific elements that changed in the real DOM. This implies faster performance than reloading the whole page."

### Q7: How do you manage State (like the Shopping Cart) across different pages?
**Student Answer:**
"We use the React Context API (`CartContext`). It acts like a global store that wraps our application. Any component (Menu, Cart Page, Navbar) can access and update the cart data without passing props down manually through every level."

---

## 5. Deployment

### Q8: You deployed on Vercel and Railway. How do they talk to each other?
**Student Answer:**
"They communicate over the public internet using HTTP. The React app on Vercel sends requests to the Railway URL (e.g., `https://.../api`). We configured **CORS (Cross-Origin Resource Sharing)** in the Spring Boot backend to explicitly allow requests from the Vercel domain; otherwise, the browser would block the connection for security."

**Deep Dive Explanation:**
*   **CORS:** A security feature in browsers. It prevents a site at `evil.com` from reading data from your bank API. You must explicitly whitelist `vercel.app` in your backend `SecurityConfig`.

---

## 6. Advanced Technical & Situation-Based Questions

### Q9: What is the difference between `@Controller` and `@RestController`?
**Student Answer:**
"`@Controller` is used for traditional Spring MVC where you return a View (like a JSP or HTML page). `@RestController` is a specialized version for REST APIs; it automatically assumes that every method returns **Data** (JSON/XML) instead of a View. It implies `@ResponseBody` on every method."

### Q10: How does your application assume roles? I see `@PreAuthorize("hasRole('ADMIN')")`. How does that work?
**Student Answer:**
"When the User logs in, the JWT token contains a 'claim' called `role`. When the backend receives a request with that token, the `AuthTokenFilter` extracts this role and tells Spring Security Context who the user is. The `@PreAuthorize` annotation then checks this Context before allowing the method to run."

### Q11: (Trick Question) "If I have 1000 orders, and I call `getAllOrders()`, will it crash your server?"
**Student Answer:**
"It might cause performance issues if the dataset is huge. In a real production scenario, I would implement **Pagination** (using `Pageable` in Spring Data JPA) to fetch only 20 or 50 records at a time. For this project scope, fetching all is acceptable, but pagination is the correct enterprise solution."

---

## 7. The "Soft Skill" Question (The most important one)

### Q12: What was the most challenging bug you faced while building this?
**Student Answer:** (Choose one of these true stories from your development)
*   **Option A (CORS):** "Connecting the Vercel Frontend to the Railway Backend was tough. I faced many CORS errors because the browser blocked the request. I had to carefully configure the `CorsConfigurationSource` bean in Spring Security to allow the specific Vercel domain."
*   **Option B (State Management):** "Managing the Shopping Cart state was tricky. When I refreshed the page, the cart would disappear. I had to implement `localStorage` in React to persist the cart items so they survive a page reload."
