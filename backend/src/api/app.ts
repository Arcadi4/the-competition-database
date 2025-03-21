import express from "express";
import { DBHandler, PendingApprovalEvent } from "../db";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors());

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

app.get("/api/event/pending", async (req, res) => {
    const data = await DBHandler.getInstance().getPendingApprovalEvents();
    res.status(200).json(data);
});

app.post("/api/event/approve", async (req, res) => {
    try {
        const { eventId } = req.body;
        if (!eventId) {
            return res.status(400).json({ error: "Event ID is required." });
        }

        const result = await DBHandler.getInstance().approveEvent(eventId);
        if (result) {
            res.status(200).json({ message: `Event approved, id: ${result}` });
        } else {
            res.status(400).json({ error: "Failed to approve event." });
        }
    } catch (error) {
        console.error("Error approving event:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.post("/api/event/reject", async (req, res) => {
    try {
        const { eventId } = req.body;
        if (!eventId) {
            return res.status(400).json({ error: "Event ID is required." });
        }

        const result = await DBHandler.getInstance().rejectEvent(eventId);
        if (result) {
            res.status(200).json({ message: `Event rejected, id: ${result}` });
        } else {
            res.status(400).json({ error: "Failed to reject event." });
        }
    } catch (error) {
        console.error("Error rejecting event:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.get("/api/event/rejected", async (req, res) => {
    const data = await DBHandler.getInstance().getRejectedEvents();
    res.status(200).json(data);
});

app.post("/api/event/restore", async (req, res) => {
    try {
        const { eventId } = req.body;
        if (!eventId) {
            return res.status(400).json({ error: "Event ID is required." });
        }

        const result = await DBHandler.getInstance().restoreEvent(eventId);
        if (result) {
            res.status(200).json({ message: `Event restored, id: ${result}` });
        } else {
            res.status(400).json({ error: "Failed to restore event." });
        }
    } catch (error) {
        console.error("Error restoring event:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
