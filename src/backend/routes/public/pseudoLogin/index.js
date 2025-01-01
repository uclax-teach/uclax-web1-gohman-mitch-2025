import express from "express";

const pseudoLoginRoutes = express.Router();

pseudoLoginRoutes.post("/", (req, res) => {
    res.status(200).json({
        success: true,
        response: req.body,
    });
});

export default pseudoLoginRoutes;
