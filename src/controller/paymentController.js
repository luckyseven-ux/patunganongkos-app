import pool from "../db/pg.js";

// ✅ Buat Pembayaran (Hanya untuk USER)
export const createPayment = async (req, res) => {
    const { booking_id, amount, payment_method } = req.body;
  
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Forbidden: Only users can make payments" });
    }
  
    try {
      const orderId = `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
      let paymentUrl = null;
      let status = "pending";
  
      if (payment_method === "digital") {
        // Jika digital, buat transaksi Midtrans
        paymentUrl = await createTransaction(orderId, amount, req.user.email);
      } else if (payment_method === "cash") {
        // Jika cash, langsung set status "waiting for cash payment"
        status = "waiting_cash";
      } else {
        return res.status(400).json({ message: "Invalid payment method" });
      }
  
      // Simpan ke database
      await pool.query(
        "INSERT INTO payments (booking_id, user_id, amount, status, order_id, payment_method) VALUES ($1, $2, $3, $4, $5, $6)",
        [booking_id, req.user.user_id, amount, status, orderId, payment_method]
      );
  
      res.status(201).json({
        message: "Payment created successfully",
        paymentUrl,
        paymentMethod: payment_method
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Error processing payment", error: error.message });
    }
  };
  

// ✅ Lihat Semua Pembayaran (Hanya untuk ADMIN & DEVELOPER)
export const getAllPayments = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "developer") {
    return res.status(403).json({ message: "Forbidden: Only admins and developers can view payments" });
  }

  try {
    const payments = await pool.query("SELECT * FROM payments");
    res.json(payments.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};

export const getDriverPayments = async (req, res) => {
    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "Forbidden: Only drivers can view their payments" });
    }
  
    try {
      const payments = await pool.query(
        "SELECT payments.* FROM payments JOIN bookings ON payments.booking_id = bookings.id JOIN active_routes ON bookings.route_id = active_routes.id WHERE active_routes.driver_id = $1",
        [req.user.username]
      );
      res.json(payments.rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Error fetching driver payments", error: error.message });
    }
  };

  export const confirmCashPayment = async (req, res) => {
    const { order_id } = req.body;
  
    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "Forbidden: Only drivers can confirm cash payments" });
    }
  
    try {
      await pool.query("UPDATE payments SET status = 'paid' WHERE order_id = $1 AND payment_method = 'cash'", [order_id]);
      res.status(200).json({ message: "Cash payment confirmed successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Error confirming cash payment", error: error.message });
    }
  };
  
  

// ✅ Lihat Pembayaran Berdasarkan User (Hanya untuk USER)
export const getUserPayments = async (req, res) => {
  try {
    const userPayments = await pool.query("SELECT * FROM payments WHERE user_id = $1", [req.user.user_id]);
    res.json(userPayments.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Error fetching user payments", error: error.message });
  }
};


// ✅ Callback dari Midtrans (Hanya bisa diakses oleh Midtrans)
export const midtransCallback = async (req, res) => {
    try {
      const { order_id, transaction_status } = req.body;
  
      // Update status pembayaran di database
      await pool.query("UPDATE payments SET status = $1 WHERE order_id = $2", [transaction_status, order_id]);
  
      res.status(200).json({ message: "Payment status updated" });
    } catch (error) {
      console.error("Midtrans callback error:", error);
      res.status(500).json({ message: "Error updating payment status", error: error.message });
    }
  };