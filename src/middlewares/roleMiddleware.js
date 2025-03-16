const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: You do not have the required role" });
      }
  
      next();
    };
  };
  
  export default roleMiddleware;
  