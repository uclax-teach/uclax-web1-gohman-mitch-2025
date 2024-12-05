import express from "express";
const apiRouter = express.Router();

// Public Routes
const publicRoutes = express.Router();

// Default for testing
publicRoutes.get("/", (req, res) => {
    res.json({ public: "testing 123" });
});

// Staff
publicRoutes.get("/staff", (req, res) => {
    res.json({ staff: "staff data" });
});

// Tabs
publicRoutes.get("/tabs", (req, res) => {
    res.json({ tabs: "tabs data" });
});

// Slideshow Slides
publicRoutes.get("/slideshowSlides", (req, res) => {
    res.json({ slideshowSlides: "slideshowSlides data" });
});

apiRouter.use("/", publicRoutes);

export default apiRouter;
