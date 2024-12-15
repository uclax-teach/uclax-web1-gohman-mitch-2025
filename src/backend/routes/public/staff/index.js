import express from "express";

// data
import { staffData } from "./staffData.js";

const staffRoutes = express.Router();

staffRoutes.get("/", (req, res) => {
    res.json(staffData);
});

staffRoutes.get("/:staffId", (req, res) => {
    const staffId = req.params.staffId;
    const member = staffData.find((s) => s.id === Number(staffId)) || {
        resp: "Could Not Find Requested Staff Member.",
    };
    res.json(member);
});

export default staffRoutes;
