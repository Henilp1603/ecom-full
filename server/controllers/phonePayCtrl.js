

import crypto from "crypto"
import axios from "axios"


const newPayment = async (req, res) => {
    const merchant_id=process.env.PAYTM_MERCHANT_ID
    const salt_key=process.env.PAYTM_SALT_KEY
  console.log(req.body);
  
    try {
        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:8080/api/status/${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        console.log(data);
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const SaltIndex =1
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;


        
        const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        const test_URL="https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
        const options = {
            method: 'POST',
            url: test_URL,
            headers:{
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };
        
         
        try {
            axios.request(options).then(function (response) {
                console.log(response.data)
                return res.send(response.data.data.instrumentResponse.redirectInfo.url)
            })
         
    
        } catch (error) {
            res.json({error})
            console.log(error);
        }


        // console.log(res)
        

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}

const checkStatus = async(req, res) => {
    console.log(req.body);
    const merchantTransactionId = res.req.body.transactionId
    console.log(merchantTransactionId);
    const merchantId = res.req.body.merchantId
    console.log(merchantId);

    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
    method: 'GET',
    url: `https://api.phonepe.com/apis/hermes/pg/v1/pay/status/${merchantId}/${merchantTransactionId}`,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `${merchantId}`
    }
    };

    // CHECK PAYMENT TATUS
    axios.request(options).then(async(response) => {
        if (response.data.success === true) {
            const url = `http://localhost:5173/success`
            
            return res.redirect(url)
        } else {
            const url = `http://localhost:5173/failure`
            return res.redirect(url)
        }
    })
    .catch((error) => {
        console.error(error);
    });
};

export  {
    newPayment,
    checkStatus
}
