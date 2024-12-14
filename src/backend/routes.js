import express from "express";
const apiRouter = express.Router();

// data
import { tabs } from "./data/tabs.js";
import { staff } from "./data/staff.js";
import { slideshowSlides } from "./data/slideshowSlides.js";

// Public Routes
const publicRoutes = express.Router();

// Default for testing
publicRoutes.get("/", (req, res) => {
    res.json({ public: "testing 123" });
});

// Tabs
publicRoutes.get("/tabs", (req, res) => {
    res.json(tabs);
});

// Staff
publicRoutes.get("/staff", (req, res) => {
    res.json(staff);
});

publicRoutes.get("/staff/:staffId", (req, res) => {
    const staffId = req.params.staffId;
    const member = staff.find((s) => s.id === Number(staffId)) || {};
    res.json(member);
});

// Slideshow Slides
publicRoutes.get("/slideshowSlides", (req, res) => {
    res.json(slideshowSlides);
});

apiRouter.use("/", publicRoutes);

export default apiRouter;
