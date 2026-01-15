# Leads Dashboard Backend Setup Script
A robust backend API for the Leads Dashboard built with Node.js, Express, and MongoDB. Provides endpoints for managing leads, analytics, user authentication, and more. Fully integrated with the frontend for seamless data flow.

# 1️⃣ Clone the repository
```
git clone https://github.com/gritik418/leads-dashboard-backend.git
cd leads-dashboard-backend
```

# 2️⃣ Install dependencies
```
npm install
```

# 3️⃣ Run build command
```
npm run build
```

# 4️⃣ Create .env file
```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
CLIENT_URL=<frontend-url>
```

# 5️⃣ Start development server
```
npm run dev
```

# 6️⃣ Start production server
```
npm run start
```

# 🗂 Seed Sample Leads

You can populate the database with sample leads using the provided seed script. This is useful for development and testing.

### Run the seed script

```bash
npm run seed:leads
```

# 📌 Stack & Tools
- Framework: Express.js + TypeScript
- Database: MongoDB + Mongoose
- Auth: JWT + HttpOnly Cookies

# Live Backend API
[https://leads-dashboard-backend-6tk7.onrender.com](https://leads-dashboard-backend-6tk7.onrender.com)
