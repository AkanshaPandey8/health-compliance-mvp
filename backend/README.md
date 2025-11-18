# Healthcare Compliance Backend API

Complete Node.js + Express + MongoDB backend for the Healthcare Compliance Tracking System.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas cloud database
# Update MONGODB_URI in .env with your Atlas connection string
```

4. **Run the server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will start at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js   # Authentication logic
│   │   ├── patient.controller.js
│   │   ├── provider.controller.js
│   │   ├── goal.controller.js
│   │   └── public.controller.js
│   ├── models/
│   │   ├── User.model.js        # User schema
│   │   ├── Profile.model.js     # Profile schema
│   │   └── Goal.model.js        # Goal schema
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── patient.routes.js
│   │   ├── provider.routes.js
│   │   ├── goal.routes.js
│   │   └── public.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js   # JWT authentication
│   │   ├── role.middleware.js   # Role-based access
│   │   └── error.middleware.js  # Error handling
│   ├── services/
│   │   └── gemini.service.js    # AI summary service
│   ├── utils/
│   │   └── token.utils.js       # JWT utilities
│   └── app.js                   # Express app setup
├── server.js                    # Entry point
├── package.json
├── .env.example
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh access token

### Patient Routes (requires patient role)
- `GET /api/patient/profile` - Get patient profile
- `PUT /api/patient/profile` - Update patient profile

### Provider Routes (requires provider role)
- `GET /api/provider/patients` - Get all patients
- `GET /api/provider/patients/:patientId` - Get patient by ID
- `GET /api/provider/patients/:patientId/goals` - Get patient goals

### Goal Routes (requires patient role)
- `POST /api/goals` - Add new goal
- `GET /api/goals` - Get user goals
- `GET /api/goals/summary` - Get AI-generated summary
- `PUT /api/goals/:goalId` - Update goal
- `DELETE /api/goals/:goalId` - Delete goal

### Public Routes (no authentication)
- `GET /api/public/health-info` - Get health information
- `GET /api/public/privacy-policy` - Get privacy policy

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register/Login** to receive access token and refresh token
2. **Include access token** in Authorization header:
   ```
   Authorization: Bearer <access_token>
   ```
3. **Access token expires in 15 minutes**
4. **Use refresh token** to get new access token when expired

## 📝 Example Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "role": "patient"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Add Goal (with auth token)
```bash
curl -X POST http://localhost:5000/api/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_access_token>" \
  -d '{
    "steps": 10000,
    "sleep": 8,
    "water": 8
  }'
```

## 🗄️ Database Models

### User
- username (unique)
- email (unique)
- password (hashed)
- role (patient/provider)
- refreshToken

### Profile
- userId (reference to User)
- firstName, lastName
- dateOfBirth, phone, address
- medicalHistory (for patients)
- specialization, licenseNumber (for providers)

### Goal
- userId (reference to User)
- date
- steps, sleep, water
- notes

## 🔒 Environment Variables

Required variables in `.env`:

```
MONGODB_URI=mongodb://localhost:27017/healthcare_compliance
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
PORT=5000
FRONTEND_URL=http://localhost:8080
```

## 🤖 Gemini AI Integration

The `gemini.service.js` currently has a **mock implementation**. To integrate real Gemini AI:

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env`: `GEMINI_API_KEY=your-key-here`
3. Update `generateSummary()` function with actual API calls

## 🧪 Testing with Postman

Import this collection to test all endpoints:
- Download Postman
- Create a new collection
- Add requests for each endpoint above
- Use environment variables for tokens

## 📦 Deployment

### Option 1: Heroku
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your-mongodb-uri
git push heroku main
```

### Option 2: Railway
1. Connect GitHub repo
2. Add environment variables
3. Deploy automatically

### Option 3: DigitalOcean/AWS
1. Set up Node.js server
2. Install dependencies
3. Configure MongoDB
4. Use PM2 for process management

## 🛡️ Security Best Practices

✅ Passwords are hashed with bcrypt  
✅ JWT tokens for authentication  
✅ Role-based access control  
✅ Input validation  
✅ CORS configuration  
✅ Environment variables for secrets  

## 📄 License

MIT License - Feel free to use for your projects!
