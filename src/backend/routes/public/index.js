import express from "express";

// Public Routes
const publicRoutes = express.Router();

// Routes: Public: Default for testing
publicRoutes.get("/", (req, res) => {
    res.json({ public: "testing 123" });
});

// Routes: Public: Slides
import slidesRoutes from "./slides/index.js";
publicRoutes.use("/slides", slidesRoutes);

// Routes: Public: Staff
import staffRoutes from "./staff/index.js";
publicRoutes.use("/staff", staffRoutes);

// Routes: Public: Slides
import tabsRoutes from "./tabs/index.js";
publicRoutes.use("/tabs", tabsRoutes);

// Routes: Public: Sendmail
import sendmailRoutes from "./sendmail/index.js";
publicRoutes.use("/sendmail", sendmailRoutes);

// Routes: Public: pseudo Login
import pseudoLoginRoutes from "./pseudoLogin/index.js";
publicRoutes.use("/pseudoLogin", pseudoLoginRoutes);

export default publicRoutes;
