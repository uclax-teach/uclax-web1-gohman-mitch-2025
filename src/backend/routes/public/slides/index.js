import express from "express";

// data
import { slidesData } from "./slidesData.js";

const slidesdRoutes = express.Router();

slidesdRoutes.get("/", (req, res) => {
    res.json(slidesData);
});

export default slidesdRoutes;
