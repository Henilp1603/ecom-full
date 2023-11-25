import React from 'react';

const Refund = () => {
  return (
    <div className="container p-8 mx-auto my-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Refund Policy for Gujarat Sales</h2>

      <p className="mb-4"><strong>Effective Date:</strong> [Insert Date]</p>

      <p className="mb-4">
        At Gujarat Sales, we want to ensure you are completely satisfied with your purchase.
        If for any reason you are not satisfied, we offer a refund under the following conditions.
      </p>

      <h3 className="mb-2 text-xl font-bold">1. Eligibility for Refund:</h3>
      <p className="mb-4">
        - To be eligible for a refund, the item must be in its original condition, unused, and
        in the same packaging as you received it.
      </p>

      <h3 className="mb-2 text-xl font-bold">2. Refund Process:</h3>
      <p className="mb-4">
        - Once your return is received and inspected, we will send you an email to notify you
        that we have received your returned item. We will also notify you of the approval or
        rejection of your refund.
      </p>

      <h3 className="mb-2 text-xl font-bold">3. Refund Timeframe:</h3>
      <p className="mb-4">
        - If your refund is approved, it will be processed, and a credit will automatically
        be applied to your original method of payment within [insert number] days.
      </p>

      <h3 className="mb-2 text-xl font-bold">4. Exclusions:</h3>
      <p className="mb-4">
        - Certain items are non-refundable, including [list any specific items that are
        non-refundable].
      </p>

      {/* Continue with the rest of the content... */}

      <h3 className="mb-2 text-xl font-bold">8. Contact Information:</h3>
      <p className="mb-4">
        - If you have any questions or concerns about our refund policy, please contact our
        customer support team at [insert email address or phone number].
      </p>

      <h3 className="mb-2 text-xl font-bold">9. Changes to Refund Policy:</h3>
      <p className="mb-4">
        - Gujarat Sales reserves the right to update or modify this Refund Policy at any time
        without prior notice. Please check our website for the latest information.
      </p>

      <p>
        By making a purchase at Gujarat Sales, you agree to and accept the terms outlined
        in this Refund Policy. Thank you for choosing Gujarat Sales—we appreciate your business!
      </p>
    </div>
  );
};

export default Refund;
