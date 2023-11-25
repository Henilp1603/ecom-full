import React from 'react';

const Shipping = () => {
  return (
    <div className="container p-8 mx-auto my-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Shipping Policy for Gujarat Sales</h2>

      <p className="mb-4"><strong>Effective Date:</strong> [Insert Date]</p>

      <p className="mb-4">
        Thank you for choosing Gujarat Sales for your shopping needs. We are committed
        to providing you with a seamless and enjoyable shopping experience. Please take
        a moment to review our Shipping Policy, outlining the terms and conditions related
        to the shipment of your orders.
      </p>

      <h3 className="mb-2 text-xl font-bold">1. Processing Time:</h3>
      <p className="mb-4">
        - All orders are processed within 1-2 business days (excluding weekends and
        holidays) after receiving payment confirmation. We strive to dispatch your order
        as quickly as possible to ensure timely delivery.
      </p>

      <h3 className="mb-2 text-xl font-bold">2. Shipping Methods:</h3>
      <p className="mb-4">
        - Gujarat Sales offers various shipping methods to cater to your preferences.
        During the checkout process, you can choose from standard, expedited, or express
        shipping options, depending on your needs and location.
      </p>

      <h3 className="mb-2 text-xl font-bold">3. Shipping Costs:</h3>
      <p className="mb-4">
        - Shipping costs are calculated based on the weight of your order and the shipping
        method selected during checkout. The total shipping cost will be displayed before
        you complete your purchase.
      </p>

      <h3 className="mb-2 text-xl font-bold">4. Shipping Destinations:</h3>
      <p className="mb-4">
        - We currently ship within [list the countries or regions you ship to]. If your
        location is not listed during the checkout process, please contact our customer
        support for assistance.
      </p>

      {/* Continue with the rest of the content... */}

      <h3 className="mb-2 text-xl font-bold">12. Changes to Shipping Policy:</h3>
      <p className="mb-4">
        - Gujarat Sales reserves the right to update or modify this Shipping Policy at any
        time without prior notice. Please check our website for the latest information.
      </p>

      <p>
        By placing an order with Gujarat Sales, you agree to and accept the terms outlined
        in this Shipping Policy. Thank you for choosing Gujarat Sales—we appreciate your
        business!
      </p>
    </div>
  );
};

export default Shipping;
