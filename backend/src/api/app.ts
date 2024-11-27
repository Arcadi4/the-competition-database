import express from "express";
import { DBHandler, PendingApprovalEvent } from "../db";
import jwt from "jsonwebtoken";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/admin/login", async (req, res) => {
    const { adminKey } = req.body;

    // Temporary disabling the admin login

    return res.status(403);

    // if (!process.env.ADMIN_KEY || !process.env.JWT_SECRET) {
    //     return res
    //         .status(500)
    //         .json({ error: "Error configuration on the server side." });
    // }
    //
    // const isMatch = bcrypt.compare(adminKey, process.env.ADMIN_KEY);
    // if (!isMatch) {
    //     return res.status(403).json({ error: "Wrong admin key." });
    // }
    //
    // const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    //     expiresIn: "72h",
    // });
    //
    // res.json({ token });
});

app.get("/", (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
        res.status(500).send(
            "This is the API server. You were supposed to be redirected to the frontend."
        );
        return;
    }
    res.redirect(frontendUrl);
});

app.get("/api", (req, res) => {
    res.status(200).type("text/plain").send("API is up.");
});

app.get("/api/event/all", async (req, res) => {
    // TODO: IMPORTANT: Disable this api in later versions
    const data = await DBHandler.getInstance().getAllEvents();
    res.status(200).json(data);
});

app.get("/api/event", async (req, res) => {
    const eventId = req.query.id as string;

    if (eventId) {
        const data = await DBHandler.getInstance().getEventById(eventId);
        if (data === null) {
            res.status(404).send("Invalid event ID.");
        } else {
            res.status(200).json(data);
        }
    } else {
        const query = req.query.q as string;
        if (!query) {
            res.status(200).json([]);
            return;
        }
        const data = await DBHandler.getInstance().queryEvents(
            query.split(" ")
        );
        res.status(200).json(data);
    }
});

app.post("/api/event/add", (req, res) => {
    const data = req.body;

    console.log(`Frontent attempted adding an event: ${data}`);

    try {
        const event = new PendingApprovalEvent(data);
        event.validateSync();
    } catch (err) {
        console.error(`Event not added: ${err}`);
        return res.status(400).json({ error: "Invalid event data." });
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
