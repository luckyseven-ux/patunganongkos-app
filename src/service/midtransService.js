import midtransClient from "midtrans-client";
import dotenv from "dotenv";

dotenv.config();

// Konfigurasi Midtrans
const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_ENV === "production",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

// Fungsi untuk membuat transaksi
export const createTransaction = async (orderId, amount, userEmail) => {
  const transactionDetails = {
    transaction_details: {
      order_id: orderId,
      gross_amount: amount,
    },
    customer_details: {
      email: userEmail,
    },
  };

  try {
    const transaction = await snap.createTransaction(transactionDetails);
    return transaction.redirect_url;
  } catch (error) {
    console.error("Midtrans Error:", error);
    throw new Error("Failed to create transaction");
  }
};
