import "./registryItems.styles.scss";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reduceRegistryItemQuantity } from "../../../firestore/postToFirestore";
import { reduceItemQuantity } from "../../../redux/reducers/registryItems";

const PaystackPop = window.PaystackPop;

const RegistryItemsPreview = ({ email = "plipsd@gmail.com" }) => {
  const dispatch = useDispatch();
  const registryItems = useSelector((state) => state.registryitems.registryitems || {});
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const paystackPublicKey =
    process.env.REACT_APP_PAYSTACK_PUBLIC_KEY ||
    "pk_live_71221614db8ca1640b87bba15f41c9344c1cc481";

  if (!paystackPublicKey) {
    console.error(
      "Missing Paystack public key. Please set REACT_APP_PAYSTACK_PUBLIC_KEY."
    );
  }

  // Convert registry object to an array, placing the direct contribution first
  const products = Object.entries(registryItems)
    .map(([key, value]) => ({
      id: key,
      ...value,
      isCustom:
        value.name?.toLowerCase().includes("direct contribution") ||
        value.cost === "",
    }))
    .sort((a, b) => (a.isCustom ? -1 : b.isCustom ? 1 : 0));

  const handlePayment = (e, product) => {
    e.preventDefault();

    const amountToPay = product.isCustom
      ? Number(customAmount)
      : Number(product.cost);

    if (product.isCustom && (!customAmount || customAmount < 1000)) {
      setStatusMessage("Please enter a valid contribution (₦1,000 minimum).");
      return;
    }

    if (product.quantity <= 0) {
      setStatusMessage("This item has already been paid for.");
      return;
    }

    setIsProcessing(true);
    setStatusMessage(`Initializing payment for ${product.name}...`);

    const handler = PaystackPop.setup({
      key: paystackPublicKey,
      email,
      amount: amountToPay * 100, // Paystack expects amount in kobo
      metadata: {
        itemName: product.name,
        itemId: product.id,
      },
      onClose: function () {
        setIsProcessing(false);
        setStatusMessage("Payment window closed.");
        console.log("🧾 Paystack: Payment window closed without completion.");
      },
      callback: function (response) {
        console.log("✅ Paystack Transaction Details:");
        console.log("Reference:", response.reference);
        console.log("Amount:", amountToPay);
        console.log("Status: success");

        setIsProcessing(false);
        setStatusMessage(`Payment successful for ${product.name}!`);

        if (!product.isCustom) {
          // Reduce item quantity in Firebase and Redux
          reduceRegistryItemQuantity("registryItems", product.id)
            .then(() => {
              dispatch(reduceItemQuantity(product.id));
            })
            .catch((err) =>
              console.error("Failed to reduce item quantity:", err)
            );
        }
      },
    });

    handler.openIframe();
  };

  return (
    <div className="registry-container">
      <h2 className="registry-title">Gift Registry</h2>

      <div className="registry-items">
        {products.map((product) => (
          <div
            key={product.id}
            className={`item-card ${product.isCustom ? "direct-card" : ""} ${
              product.quantity <= 0 ? "paid-out" : ""
            }`}
          >
            <div className="image-wrapper">
              <img
                src={
                  product.image.startsWith("http")
                    ? product.image
                    : `https://drive.google.com/thumbnail?id=${product.image}`
                }
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/300x200?text=No+Image";
                }}
              />
              {product.quantity <= 0 && (
                <div className="overlay">Paid for</div>
              )}
            </div>

            <h3 className={product.isCustom ? "custom-title" : ""}>
              {product.name}
            </h3>
            <p className="description">{product.description}</p>

            {product.isCustom ? (
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
              <>
                <p className="amount">
                  ₦{Number(product.cost).toLocaleString()}
                </p>
                <button
                  onClick={(e) => handlePayment(e, product)}
                  disabled={isProcessing || product.quantity <= 0}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Pay for ${product.name.split(" ")[0]}`}
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {statusMessage && (
        <p className="status-message">{statusMessage}</p>
      )}
    </div>
  );
};

export default RegistryItemsPreview;
