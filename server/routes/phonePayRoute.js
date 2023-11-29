
import express from "express"
import { checkStatus, newPayment } from "../controllers/phonePayCtrl.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/payment',authMiddleware, newPayment);
router.post('/status/:txnId', checkStatus);

export default router;