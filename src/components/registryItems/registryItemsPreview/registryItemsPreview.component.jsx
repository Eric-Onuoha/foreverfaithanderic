import "./registryItems.styles.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduceItemQuantity } from "../../../redux/reducers/registryItems";
import { reduceRegistryItemQuantity } from "../../../firestore/postToFirestore";
import CountDown from "../../countdown/countdown.component";

const RegistryItemsPreview = () => {
  const dispatch = useDispatch();
  const registryItems = useSelector((state) => state.registryitems.registryitems || {});
  const userMail = useSelector((state) => state.registryusers.currentUser) || "guest@example.com";

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  // ✅ Use environment key or fallback
  const paystackPublicKey =
    process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const products = Object.entries(registryItems)
    .map(([key, item]) => ({
      id: key,
      ...item,
      image: item.image
        ? `https://drive.google.com/thumbnail?id=${item.image}`
        : "https://placehold.co/300x200?text=No+Image",
      isCustom:
        item.name.toLowerCase().includes("direct contribution") ||
        item.name.toLowerCase().includes("honeymoon")
    }))
    .sort((a, b) => (a.isCustom ? -1 : 1));

  const handlePayment = (e, product) => {
    e.preventDefault();

    const amountToPay = product.isCustom
      ? Number(customAmount)
      : Number(product.cost);

    if (product.isCustom && (!customAmount || customAmount < 1000)) {
      setStatusMessage("Please enter a valid contribution (₦1,000 minimum).");
      return;
    }

    setIsProcessing(true);
    setStatusMessage(`Initializing payment for ${product.name}...`);

    // ✅ Safely access PaystackPop
    if (!window.PaystackPop) {
      setIsProcessing(false);
      setStatusMessage("Error: Paystack SDK not loaded.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,
      email: userMail,
      amount: amountToPay * 100,
      metadata: {
        itemName: product.name,
        itemId: product.id
      },
      onClose: function () {
        setIsProcessing(false);
        setStatusMessage("Payment window closed.");
      },
      callback: function (response) {
        // ✅ callback must NOT be async
        console.log("✅ Paystack Transaction Details:");
        console.log("Reference:", response.reference);
        console.log("Amount:", amountToPay);
        console.log("Status: success");

        setIsProcessing(false);
        setStatusMessage(`Payment successful for ${product.name}!`);

        if (!product.isCustom) {
          reduceRegistryItemQuantity(product.id)
            .then(() => dispatch(reduceItemQuantity(product.id)))
            .catch((error) => console.error("Error updating quantity:", error));
        }
      }
    });

    handler.openIframe();
  };

  return (
    <div className="registry-container">
      <h2 className="registry-title">Gift Registry Items</h2>

      <div className="registry-items">
        {products.map((product) => {
          const isPaidOut = Number(product.quantity) <= 0;

          return (
            <div
              key={product.id}
              className={`item-card ${product.isCustom ? "direct-card" : ""} ${
                isPaidOut ? "paid-out" : ""
              }`}
            >
              <div className="image-wrapper">
                <img src={product.image} alt={product.name} />
                {isPaidOut && <div className="paid-overlay">Paid For</div>}
              </div>
              <h3 className={product.isCustom ? "custom-title" : ""}>
                {product.name}
              </h3>
              <p className="description">{product.description}</p>

              {!product.isCustom && (
                <p className="amount">₦{Number(product.cost).toLocaleString()}</p>
              )}

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
                    disabled={isPaidOut}
                  />
                  <button
                    onClick={(e) => handlePayment(e, product)}
                    disabled={isProcessing || isPaidOut}
                  >
                    {isProcessing ? "Processing..." : "Contribute Now"}
                  </button>
                </>
              ) : (
                <button
                  onClick={(e) => handlePayment(e, product)}
                  disabled={isProcessing || isPaidOut}
                >
                  {isProcessing ? "Processing..." : `Pay for this`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {statusMessage && <p className="status-message">{statusMessage}</p>}
      <br />
      <br />
      <br />
      <br />
      <br />
      <CountDown></CountDown>
    </div>
  );
};

export default RegistryItemsPreview;
