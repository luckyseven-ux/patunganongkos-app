import express from "express";
import {authJWT} from "../middlewares/authJWT.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { createRoute, getRoutes, deleteRoute,getDriverRoutes } from "../controller/routeController.js";

const router = express.Router();

router.post("/", authJWT, roleMiddleware(["user", "admin","driver"]), createRoute); // Hanya USER & ADMIN
router.get("/", authJWT, getRoutes); // Semua user bisa akses
router.delete("/:id", authJWT, roleMiddleware(["admin"]), deleteRoute); // Hanya ADMIN
router.get("/driver", authJWT, roleMiddleware(["driver"]), getDriverRoutes); // Hanya Driver bisa melihat rute sendiri


export default router;
