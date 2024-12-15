import express from "express";

// Routes: Private:
const privateRoutes = express.Router();

// Routes: Private: Default for testing
privateRoutes.get("/", (req, res) => {
    res.json({ private: "testing 123" });
});

export default privateRoutes;
