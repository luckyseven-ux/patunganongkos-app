import pool from "../db/pg.js";

// ✅ Buat Rute Baru (Hanya untuk USER & ADMIN)
export const createRoute = async (req, res) => {
    const { pickup, dropoff, seats_available } = req.body;
    const userRole = req.user.role;
  
    if (!["user", "admin", "driver"].includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: Only users, drivers, and admins can create routes" });
    }
  
    try {
      const newRoute = await pool.query(
        "INSERT INTO active_routes (driver_id, pickup, dropoff, seats_available) VALUES ($1, $2, $3, $4) RETURNING *",
        [req.user.username, pickup, dropoff, seats_available]
      );
  
      res.status(201).json({ message: "Route created successfully", route: newRoute.rows[0] });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Error creating route", error: error.message });
    }
  };
  
  export const getDriverRoutes = async (req, res) => {
    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "Forbidden: Only drivers can view their routes" });
    }
  
    try {
      const driverRoutes = await pool.query("SELECT * FROM active_routes WHERE driver_id = $1", [req.user.username]);
      res.json(driverRoutes.rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Error fetching driver routes", error: error.message });
    }
  };
  

// ✅ Lihat Semua Rute (Bisa diakses oleh semua role)
export const getRoutes = async (req, res) => {
  try {
    const routes = await pool.query("SELECT * FROM active_routes");
    res.json(routes.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Error fetching routes", error: error.message });
  }
};

// ✅ Hapus Rute (Hanya untuk ADMIN)
export const deleteRoute = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Only admins can delete routes" });
  }

  try {
    await pool.query("DELETE FROM active_routes WHERE id = $1", [id]);
    res.json({ message: "Route deleted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Error deleting route", error: error.message });
  }
};
