import express from "express";

// data
import { tabsData } from "./tabsData.js";

const tabsRoutes = express.Router();

tabsRoutes.get("/", (req, res) => {
    res.json(tabsData);
});

export default tabsRoutes;
