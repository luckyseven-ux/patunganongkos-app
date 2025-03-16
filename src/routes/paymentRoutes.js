import express from "express";
import {authJWT} from "../middlewares/authJWT.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { createPayment, getAllPayments, getUserPayments,getDriverPayments,midtransCallback,confirmCashPayment } from "../controller/paymentController.js";

const router = express.Router();

router.post("/create", authJWT, roleMiddleware(["user"]), createPayment); // Hanya USER
router.post("/midtrans", midtransCallback); // Hanya USER
router.post("/confirm", authJWT, roleMiddleware(["driver"]), confirmCashPayment);
router.get("/all", authJWT, roleMiddleware(["admin", "developer"]), getAllPayments); // Hanya ADMIN & DEVELOPER
router.get("/", authJWT, roleMiddleware(["user"]), getUserPayments); // Hanya USER
router.get("/driver", authJWT, roleMiddleware(["driver"]), getDriverPayments); // Hanya DRIVER bisa melihat pembayaran terkait rutenya


export default router;
