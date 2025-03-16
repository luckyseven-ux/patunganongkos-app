import express from "express";
import dotenv from 'dotenv';
import session from "express-session";  // ✅ Tambahkan import ini
import MongoStore from 'connect-mongo';
import { mongo } from './db/mongo.js';
import "./db/pg.js";     // Load PostgreSQL
import "./db/mongo.js";  // Load MongoDB
import cors from "cors";
import userRoutes from "../src/routes/userRoutes.js"
import paymentRoutes from "../src/routes/paymentRoutes.js"
import routeRoutes from "../src/routes/routeRoutes.js"
dotenv.config();
console.log('mongo url :',process.env.MONGO_URL);

const app = express();
const port = 3000;
app.use(cors());

// Pastikan koneksi MongoDB berjalan sebelum membuat sessionStore
mongo().then(() => {
  console.log('MongoDB Connected, setting up session store...');
  
  const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URL, // ✅ Pastikan URL ini benar
    collectionName: 'sessions'
  });

  app.use(express.json());
  app.use('/user',userRoutes)
  app.use('/payment',paymentRoutes)
  app.use('/route',routeRoutes)

  app.use(session({
    secret: process.env.JWT_SECRET || "default-secret", // ✅ Cegah error jika JWT_SECRET tidak ada
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 3600000
    }
  }));


  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => {
  console.error("MongoDB Connection Error:", err);
});
