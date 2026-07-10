import PolicyLayout from "@/components/ui/PolicyLayout";

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy" lastUpdated="October 2023">
      <section>
        <h2 className="text-2xl font-bold text-[#0f172a] mb-4">1. Order Processing Time</h2>
        <p>
          All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped. 
        </p>
        <p className="mt-4 text-sm bg-blue-50 text-blue-800 p-4 rounded-lg border border-blue-100">
          <strong>Note:</strong> High volume periods or unforeseen circumstances may cause slight delays. We will communicate any significant delays directly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-[#0f172a] mb-4">2. Domestic Shipping Rates and Estimates</h2>
        <p>
          Shipping charges for your order will be calculated and displayed at checkout. We offer several shipping options to ensure your package arrives when you need it:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Standard Shipping:</strong> 3-5 business days.</li>
          <li><strong>Expedited Shipping:</strong> 1-2 business days.</li>
          <li><strong>Free Shipping:</strong> Available on orders over $150.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-[#0f172a] mb-4">3. International Shipping</h2>
        <p>
          We offer international shipping to select countries. Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. BuySial is not responsible for these charges if they are applied and are your responsibility as the customer.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-[#0f172a] mb-4">4. How do I check the status of my order?</h2>
        <p>
          When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available. 
        </p>
      </section>
    </PolicyLayout>
  );
}
