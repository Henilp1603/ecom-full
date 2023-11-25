import {useState} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useCartContext } from '../../Contexts/CartContext';

export default function Invoice() {

    const [loader, setLoader] = useState(false);

    const {cart,total_price}=useCartContext()
  
  const downloadPDF = () =>{
    const capture = document.querySelector('.actual-receipt');
    setLoader(true);
    html2canvas(capture).then((canvas)=>{
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save('receipt.pdf');
    })
  }


  return (
    <div className="wrapper">

      <div className="receipt-box">

          {/* actual receipt */}
          <div className="actual-receipt">

            {/* organization logo */}
            <div className="receipt-organization-logo">
              <img alt="logo" src="./gs.svg" />
            </div>

            {/* organization name */}
            <h5>Gujarat Sales</h5>

            {/* street address and unit number */}
            <h6>
              B 5, Rustam Park,
              {' '}
              Maruti Nagar Chowk
            </h6>

            {/* city province postal code */}
            <h6>
              Surat
              {' '}
              Guajart
              {' '}
              394210
            </h6>

            {/* email-phone-and-website */}
            <div className="phone-and-website">
              <p>
                <a href={`mailto:anwarhamza919@gmail.com`}>
                  rajehspandey0410@gmail.com
                </a>
              </p>
              <p></p>
              +91 98250 25769
              <p>
                <a
                  href="https://www.youtube.com/@jsSolutions"
                  target="blank"
                >
                  www.gujaratsales.store
                </a>
              </p>
                  
            </div>

            <div className="colored-row first">
              <span>Payment Method</span>
              <span>Card Number</span>
            </div>

            <div className="data-row">
              <span className="font-weight">CREDIT</span>
              <span>************4444</span>
            </div>

            <div className="colored-row">
              <span>Item</span>
              <span>Quantity</span>
              <span>Amount</span>
            </div>
            {
              cart.map((item)=>(
                <div className="data-row">
              <span className="font-weight">{item.title}</span>
              <span>{item.quantity}</span>
              <span>
              ₹
                {item.price}
              </span>
            </div>
              ))
            }
            
            <div className="mb-1 colored-row">
              <span>Total</span>
              <span>₹{total_price}</span>
            </div>
            <div className="colored-row">
              <span>Transaction Details - Donations</span>
              <span />
            </div>

            <div className="data-row border-bottom">
              <span>
                <span className="font-weight">
                  MID
                  :
                </span>
                {' '}
                1234567
              </span>
              <span>
                <span className="font-weight">
                  Sequence
                  {' '}
                  #:
                </span>
                {' '}
                SSSSSSSS
              </span>
            </div>

            <div className="data-row border-bottom">
              <span>
                <span className="font-weight">
                  Invoice
                  {' '}
                  #:
                </span>
                {' '}
                AX1234ZVB5671234
              </span>
              <span>
                <span className="font-weight">
                  Created
                  :
                </span>
                {' '}
                2023-02-14 02:21:37
              </span>
            </div>
            <div className="data-row border-bottom">
              <span>
                <span className="font-weight">
                  Authentication
                  {' '}
                  #:
                </span>
                {' '}
                TEST
              </span>
              <span>
                <span className="font-weight">
                  Batch
                  {' '}
                  #:
                </span>
                {' '}
                1234
              </span>
            </div>
            <div className="data-row border-bottom">
              <span className="font-weight">
                Transaction:
                {' '}
                APPROVED - 00
              </span>
              <span />
            </div>
            <div className="colored-row">
              <span>Thank You For Shopping.</span>
              <span />
            </div>

          </div>
          {/* end of actual receipt */}

          {/* receipt action */}
          <div className="receipt-actions-div">
            <div className="actions-right">
              <button
                className="receipt-modal-download-button"
                onClick={downloadPDF}
                disabled={!(loader===false)}
              >
                {loader?(
                  <span>Downloading</span>
                ):(
                  <span>Download</span>
                )}

              </button> 
            </div>
          </div>

      </div>
      
    </div>
  )
}
