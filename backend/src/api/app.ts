import express from "express";
import { DBHandler, PendingApprovalEvent } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const app = express();

app.use(express.json());

app.use(express.json());

app.post("/api/admin/login", async (req, res) => {
    const { adminKey } = req.body;

    if (!process.env.ADMIN_KEY || !process.env.JWT_SECRET) {
        return res
            .status(500)
            .json({ error: "Error configuration on the server side." });
    }

    const isMatch = bcrypt.compare(adminKey, process.env.ADMIN_KEY);
    if (!isMatch) {
        return res.status(403).json({ error: "Wrong admin key." });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "72h",
    });
    res.json({ token });
});

app.get("/", (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
        res.status(500).send("Error configuration on the server side.");
        return;
    }
    res.redirect(frontendUrl);
});

app.get("/api", (req, res) => {
    res.status(200).type("text/plain").send("API is up.");
});

app.get("/api/event:id", (req, res) => {
    const eventID = req.params.id;
    const data = DBHandler.getInstance().getEventById(eventID as string);
    if (data === null) {
        res.status(404).send("Invalid event ID.");
    } else {
        res.status(200).json(data);
    }
});

app.get("/api/event", (req, res) => {
    const query = req.query.q;
    const data = DBHandler.getInstance().getEventByName(query as string);
    if (data === null) {
        res.status(404).send("No events found.");
    } else {
        res.status(200).json(data);
    }
});

app.post("/api/event/add", (req, res) => {
    const data = req.body;

    try {
        const event = new PendingApprovalEvent(data);
        event.validateSync();
    } catch (err) {
        res.status(400).json({ error: err });
        return;
    }

    const eventID = DBHandler.getInstance().addPendingApprovalEvent(data);
    res.status(201).json({ id: eventID });
});

app.post(
    "/api/event/approve",
    (req, res, next) => {
        if (!process.env.JWT_SECRET) {
            return res
                .status(500)
                .json({ error: "Error configuration on the server side." });
        }

        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            if (
                !decoded ||
                typeof decoded !== "object" ||
                decoded.role !== "admin"
            )
                return res.sendStatus(403);
            next();
        });
    },
    async (req, res) => {
        const { eventId } = req.body;
        const result = await DBHandler.getInstance().approveEvent(eventId);
        if (result) {
            res.status(200).json({ message: `Event approved, id: ${result}` });
        } else {
            res.status(400).json({ error: "Failed to approve event." });
        }
    }
);
