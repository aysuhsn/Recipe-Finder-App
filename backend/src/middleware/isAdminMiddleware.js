export const isAdminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Yalnız admin icazəlidir" });
  }
};
