
import express from "express"
import { checkStatus, newPayment } from "../controllers/phonePayCtrl.js";
const router = express.Router();

router.post('/payment', newPayment);
router.post('/status/:txnId', checkStatus);

export default router;