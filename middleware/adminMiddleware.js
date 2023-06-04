const isAdmin = (req, res, next) => {
  // Check if the user is an admin
  if (req.user && req.user.isAdmin) {
    next(); // User is an admin, proceed to the next middleware/route handler
  } else {
    res.status(403).send("Access denied."); // User is not an admin, send a forbidden error response
  }
};

module.exports = isAdmin;
