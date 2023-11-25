import express from "express"
import PaytmChecksum from "../paytmChecksum.js";
import { v4 as uuidv4 } from 'uuid';


const router=express.Router();

router.post("/",(req,res)=>{
    /* import checksum generation utility */

const {amount,email}=req.body;
var paytmParams = {};
const total_amount=JSON.stringify(amount)

/* initialize an array */

/*For example: \mid\":"\YOUR_MID_HERE\","\orderId\":"\YOUR_ORDER_ID_HERE\*/
paytmParams["MID"] = 'DIY12386817555501617';
paytmParams["ORDERID"] = uuidv4();
paytmParams["TXN_AMOUNT"]=total_amount,
paytmParams["EMAIL"]=email

/**
* Generate checksum by parameters we have
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, 'bKMfNxPPf_QdZppa');
paytmChecksum.then(function(checksum){
	console.log("generateSignature Returns: " + checksum);
    let paymentParams={
        ...paytmParams,
        "checksumHash":checksum
    }

    res.json(paymentParams)
}).catch(function(error){
	console.log(error);
});
})


export default router