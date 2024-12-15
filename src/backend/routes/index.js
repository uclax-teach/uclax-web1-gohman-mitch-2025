import express from "express";
const apiRouter = express.Router();

// Routes: Public
import publicRoutes from "./public/index.js";
apiRouter.use("/", publicRoutes);

// Routes: Private: Not Currently Used in this App
// import privateRoutes from "./private/index.js";
// apiRouter.use("/private", privateRoutes);

export default apiRouter;
