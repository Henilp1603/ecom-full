import React from 'react';

const Return = () => {
  return (
    <div className="container p-8 mx-auto my-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Return Policy for Gujarat Sales</h2>

      <p className="mb-4"><strong>Effective Date:</strong> [Insert Date]</p>

      <p className="mb-4">
        Thank you for shopping at Gujarat Sales. We hope you are delighted with your
        purchase, but if you are not entirely satisfied, here's our return policy.
      </p>

      <h3 className="mb-2 text-xl font-bold">1. Returns:</h3>
      <p className="mb-4">
        - You have [insert number] calendar days to return an item from the date you
        received it.
      </p>

      <h3 className="mb-2 text-xl font-bold">2. To be eligible for a return, your item must be:</h3>
      <ul className="pl-8 mb-4 list-disc">
        <li>New and unused</li>
        <li>In the original packaging</li>
        <li>With all tags attached</li>
      </ul>

      <h3 className="mb-2 text-xl font-bold">3. Refunds:</h3>
      <p className="mb-4">
        - Once we receive your item, we will inspect it and notify you that we have
        received your returned item. We will immediately notify you on the status of
        your refund after inspecting the item.
      </p>

      <h3 className="mb-2 text-xl font-bold">4. Shipping:</h3>
      <p className="mb-4">
        - You will be responsible for paying for your shipping costs for returning your item.
        Shipping costs are non­refundable.
      </p>

      {/* Continue with the rest of the content... */}

      <h3 className="mb-2 text-xl font-bold">8. Contact Information:</h3>
      <p className="mb-4">
        - If you have any questions or concerns about our return policy, please contact our
        customer support team at [insert email address or phone number].
      </p>

      <h3 className="mb-2 text-xl font-bold">9. Changes to Return Policy:</h3>
      <p className="mb-4">
        - Gujarat Sales reserves the right to update or modify this Return Policy at any time
        without prior notice. Please check our website for the latest information.
      </p>

      <p>
        By making a purchase at Gujarat Sales, you agree to and accept the terms outlined
        in this Return Policy. Thank you for choosing Gujarat Sales—we value your business!
      </p>
    </div>
  );
};

export default Return;
