import jwt from 'jsonwebtoken';

// This stores the invalidated tokens
const tokenBlacklist = new Set();

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Get token from cookie or Authorization header

  if (!token) return res.status(401).send("Unauthorized: No token provided");

  // Check if the token is blacklisted
  if (tokenBlacklist.has(token)) {
    return res.status(401).send("Token is invalidated");
  }

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Forbidden: Invalid token");
    req.user = user; // Add user information to the request object
    next(); // now go to the next middleware or route handler
  });
};

// Function to invalidate a token (can be used on logout)
export const invalidateToken = (token) => {
  tokenBlacklist.add(token); // Add token to blacklist
};
