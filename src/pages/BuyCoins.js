// BuyCoins.js
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function BuyCoins({ amount, coins }) {
  const { currentUser, userData, setUserData } = useAuth();

  return (
    <PayPalButtons
      style={{ layout: "horizontal" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: { value: amount.toString() } // e.g. "7.00"
            }
          ]
        });
      }}
      onApprove={async (data, actions) => {
        const details = await actions.order.capture();

        // ✅ Payment success — update Firestore coins
        const newCoins = userData.coins + coins;
        await updateDoc(doc(db, "users", currentUser.uid), { coins: newCoins });

        setUserData((prev) => ({ ...prev, coins: newCoins }));
        alert(`Success! Added ${coins} coins to your account.`);
      }}
    />
  );
}
