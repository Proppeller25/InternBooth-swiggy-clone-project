NAIDELIVER – FOOD DELIVERY PLATFORM DOCUMENTATION

1. OVERVIEW
NaiDeliver is a full‑stack food delivery web application inspired by platforms like Swiggy. It allows users to browse restaurants and menu items, add items to a cart, and place orders (checkout). The platform includes user authentication (with email verification), restaurant and menu management (restricted to admins via API key), and a responsive React frontend.

2. TECH STACK
Frontend:
- React 19 – UI library
- Vite 7 – build tool and dev server
- React Router 7 – client‑side routing
- Tailwind CSS 3 – styling
- Axios – HTTP client
- Font Awesome – icons
- ESLint – code linting

Backend:
- Node.js – runtime environment
- Express 5 – web framework
- MongoDB (with Mongoose ODM) – database
- JSON Web Token (JWT) – authentication
- bcrypt – password hashing
- Nodemailer – sending verification emails
- Joi – request validation
- Helmet – security headers
- express‑mongo‑sanitize – NoSQL injection protection
- cookie‑parser – parse cookies
- CORS – cross‑origin resource sharing
- dotenv – environment variables

3. FEATURES
User:
- Registration with username, email, and password (validated via Joi)
- Login – receives a JWT stored in an HTTP‑only cookie
- Logout – clears the authentication cookie
- Email verification (two‑step process: send code → verify code)
- Role‑based access: user (default) or admin
- View own profile, delete own account (admin can delete any user)

Restaurant & Menu (Admin Only):
- Add new restaurants (public for now – no auth required, but could be restricted)
- Add new menu items (protected by an API key)
- Retrieve all restaurants, all menu items, or a specific menu item by ID
- Retrieve restaurants by multiple IDs (for displaying restaurants serving a particular dish)

Cart (Frontend):
- Add items to cart from the order page
- Adjust quantities, remove items
- Cart persists in localStorage
- Subtotal, delivery fee (5%), and grand total calculation

General:
- Responsive design (mobile, tablet, desktop)
- Loading spinner during async operations
- Protected routes (frontend side via AuthContext)

4. PROJECT STRUCTURE
project-root/
├── backend/
│   ├── controllers/         # Request handlers
│   │   ├── menuController.js
│   │   ├── restaurantController.js
│   │   └── userController.js
│   ├── dtos/                 # Data Transfer Objects
│   │   └── userDTO.js
│   ├── middleware/           # Custom middleware
│   │   ├── apiKey.js
│   │   ├── auth.js
│   │   ├── sendMail.js
│   │   └── validate.js
│   ├── models/               # Mongoose schemas
│   │   ├── Menu.js
│   │   ├── restaurant.js
│   │   └── User.js
│   ├── routes/               # Express routes
│   │   ├── menuRoutes.js
│   │   ├── restaurantsRoutes.js
│   │   └── userRoutes.js
│   ├── services/             # Business logic (optional)
│   │   └── userService.js
│   ├── validations/          # Joi schemas
│   │   ├── menuValidation.js
│   │   └── userValidation.js
│   ├── .env                  # Environment variables (not in repo)
│   ├── package.json
│   └── server.js             # Entry point
│
├── frontend/
│   ├── public/
│   │   ├── images/           # Static images (restaurants, menu items)
│   │   └── output.css        # Tailwind output
│   ├── src/
│   │   ├── components/       # Reusable components (Cart.js – plain JS)
│   │   ├── contexts/         # React context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── CheckOutPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   └── OrderPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env                   # Frontend env (optional)
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js

5. INSTALLATION & SETUP
Prerequisites:
- Node.js (v20+ recommended)
- MongoDB instance (local or Atlas)
- Gmail account for sending verification emails (or other SMTP)

Backend Setup:
1. Navigate to the backend folder.
2. Install dependencies: npm install
3. Create a .env file with the following variables:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN_API_KEY=your_admin_api_key
   NODE_CODE_SENDING_EMAIL_ADDRESS=your_gmail_address
   NODE_CODE_SENDING_EMAIL_PASSWORD=your_gmail_app_password
   HMAC_VARIFICATION_CODE=your_hmac_secret_for_verification_codes
4. Start the server: npm run server (or node server.js)
   The server runs on http://localhost:5000.

Frontend Setup:
1. Navigate to the frontend folder.
2. Install dependencies: npm install
3. Create a .env file (optional) if you need to change the backend URL. The current code hardcodes http://localhost:5000.
4. Start the development server: npm run dev
   The app will be available at http://localhost:3000.
5. To also run Tailwind in watch mode, use: npm run tailwind
   Or use the combined script: npm run start (runs tailwind, frontend dev server, and backend concurrently)

6. API DOCUMENTATION
All endpoints are prefixed with /swiggy.

User Routes:
- POST   /signUp              Register a new user (Public) – Body: { username, email, password }
- POST   /login               Login – sets JWT cookie (Public) – Body: { email, password }
- POST   /logout              Logout – clears cookie (JWT)
- GET    /loggedInUser        Get current user info (JWT)
- GET    /users               Get all users (JWT + Admin)
- DELETE /deleteUser/:id      Delete a user (self or admin) (JWT)
- PATCH  /sendVerCode         Send email verification code (JWT) – Body: { email }
- PATCH  /verifyCode          Verify email code (JWT) – Body: { email, providedCode }

Restaurant Routes:
- POST   /registerRestaurant  Create a new restaurant (Public – should be protected)
- GET    /restaurants         Get all restaurants (Public)
- GET    /restaurantsById     Get restaurants by comma‑separated IDs (Public)

Menu Routes:
- GET    /fullMenu            Get all menu items (Public)
- GET    /findMenuById/:id    Get a single menu item by ID (Public)
- POST   /registerFood        Add a new menu item (API Key – X-API-Key header)

7. FRONTEND DETAILS
Routing (React Router):
- / – Home page (displays restaurants and menu items)
- /order/:foodId – Order page for a specific food item
- /CheckOut – Cart checkout page

State Management:
- Authentication: AuthContext provides user, isLoggedIn, loading, and login methods. It checks the logged‑in user on initial load via /loggedInUser.
- Cart: A plain JavaScript module (Cart.js) manages cart state using localStorage. Functions like calculateTotal and alterQuantity are used in components.

Key Components:
- HomePage: Displays a hero section, food categories, and a list of restaurants. Includes login/signup modals.
- OrderPage: Shows details of a selected food item and lists restaurants that serve it. Allows adding to cart.
- CheckOutPage: Displays cart items, quantity controls, and price breakdown.

Styling:
- Tailwind CSS for utility‑first styling.
- Custom scrollbar hiding (.hide-scrollbar class).
- Responsive breakpoints (sm, md, lg, xl).

8. SECURITY MEASURES
- JWT stored in HTTP‑only cookies – prevents XSS attacks.
- bcrypt for password hashing.
- Joi validation on all user inputs to prevent malformed data.
- Helmet sets secure HTTP headers.
- express‑mongo‑sanitize prevents NoSQL injection.
- API key for admin menu creation – limits access.
- Email verification ensures valid user emails.
- CORS configured to allow only the frontend origin (http://localhost:3000) with credentials.
- X-Powered-By header disabled to reduce fingerprinting.

9. FUTURE IMPROVEMENTS / KNOWN ISSUES
- Logout functionality – The frontend logout button is present but not yet implemented (commented code). The backend /logout endpoint exists and clears the cookie.
- Order placement – No actual order creation endpoint; checkout button currently does nothing.
- Admin routes – Restaurant creation should be protected (e.g., with API key or admin role).
- Error handling – Some responses lack proper status codes (e.g., in getMenu after !menu).
- Cart merging – Cart does not sync with a user’s account; it’s purely client‑side.
- Image handling – Images are served statically from public/images; no upload mechanism.
- Environment variables – Frontend hardcodes backend URL; should be configurable.
- TypeScript – Not used; could be added for better type safety.

