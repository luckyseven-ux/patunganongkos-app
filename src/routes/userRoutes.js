import express from "express";
import { register, login, logout } from "../controller/userController.js";
import {authJWT} from "../middlewares/authJWT.js";

const router = express.Router();

router.post("/create", register);
router.post("/login", login);
router.post("/logout", authJWT, logout); // Logout hanya bisa dilakukan oleh user yang sudah login

export default router;
