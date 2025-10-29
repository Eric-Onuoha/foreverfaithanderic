import "./registryItems.styles.scss";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reduceItemQuantity } from "../../../redux/reducers/registryItems";
import { reduceRegistryItemQuantity } from "../../../firestore/postToFirestore";

const PaystackPop = window.PaystackPop;

const RegistryItemsPreview = ({ registryItems }) => {
  const dispatch = useDispatch();

  // ✅ Pull email from Redux (linked to access code)
  const userEmail = useSelector((state) => state.registryusers?.email);
  const email = userEmail || "plipsd@gmail.com";

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  // ✅ Use environment variable or fallback
  const paystackPublicKey =
    process.env.REACT_APP_PAYSTACK_PUBLIC_KEY ||
    "pk_live_71221614db8ca1640b87bba15f41c9344c1cc481";

  // ✅ Convert registryItems object to array
  const products = Object.entries(registryItems || {}).map(([id, item]) => ({
    id,
    ...item,
  }));

  // ✅ Move the "Direct Contribution" item to the top
  const sortedProducts = [
    ...products.filter((item) =>
      item.name?.toLowerCase().includes("direct contribution")
    ),
    ...products.filter(
      (item) => !item.name?.toLowerCase().includes("direct contribution")
    ),
  ];

  const handlePayment = (e, product) => {
    e.preventDefault();

    const amountToPay = product.name.includes("Direct")
      ? Number(customAmount)
      : Number(product.cost);

    if (product.name.includes("Direct") && (!customAmount || customAmount < 1000)) {
      setStatusMessage("Please enter a valid contribution (₦1,000 minimum).");
      return;
    }

    setIsProcessing(true);
    setStatusMessage(`Initializing payment for ${product.name}...`);

    const handler = PaystackPop.setup({
      key: paystackPublicKey,
      email: email, // ✅ Dynamic email
      amount: amountToPay * 100,
      metadata: {
        itemName: product.name,
        itemId: product.id,
      },
      onClose: function () {
        setIsProcessing(false);
        setStatusMessage("Payment window closed.");
      },
      callback: function (response) {
        console.log("✅ Paystack Transaction Details:");
        console.log("Reference:", response.reference);
        console.log("Amount:", amountToPay);
        console.log("Email:", email);
        console.log("Status: success");

        setIsProcessing(false);
        setStatusMessage(`Payment successful for ${product.name}!`);

        if (product.quantity && product.quantity > 0) {
          dispatch(reduceItemQuantity(product.id));
          reduceRegistryItemQuantity(product.id);
        }
      },
    });

    handler.openIframe();
  };

  return (
    <div className="registry-container">
      <h2 className="registry-title">Gift Registry</h2>

      <div className="registry-items">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className={`item-card ${
              product.name?.toLowerCase().includes("direct contribution")
                ? "direct-card"
                : ""
            } ${product.quantity === "0" ? "paid-out" : ""}`}
          >
            <img
              src={
                product.image?.startsWith("http")
                  ? product.image
                  : `https://drive.google.com/thumbnail?id=${product.image}`
              }
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/300x200?text=No+Image";
              }}
            />
            <h3
              className={
                product.name?.toLowerCase().includes("direct contribution")
                  ? "custom-title"
                  : ""
              }
            >
              {product.name}
            </h3>

            <p>{product.description}</p>

            {!product.name?.toLowerCase().includes("direct contribution") && (
              <p className="amount">
                ₦{Number(product.cost).toLocaleString()}
              </p>
            )}

            {product.name?.toLowerCase().includes("direct contribution") ? (
              <>
                <p className="custom-desc">
                  Enter the amount you’d like to contribute (₦)
                </p>
                <input
                  type="number"
                  min="1000"
                  placeholder="e.g. 5000"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="custom-input"
                />
                <button
                  onClick={(e) => handlePayment(e, product)}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Contribute Now"}
                </button>
              </>
            ) : (
              <button
                onClick={(e) => handlePayment(e, product)}
                disabled={isProcessing || product.quantity === "0"}
              >
                {product.quantity === "0"
                  ? "Paid For"
                  : isProcessing
                  ? "Processing..."
                  : "Pay Now"}
              </button>
            )}
          </div>
        ))}
      </div>

      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default RegistryItemsPreview;
