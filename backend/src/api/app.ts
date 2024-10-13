import express from "express";
import { DBHandler, PendingApprovalEvent } from "../db";

export const app = express();

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

app.post("/api/event/approve", async (req, res) => {
    const { adminKey, eventId } = req.body;

    if (adminKey !== process.env.ADMIN_KEY) {
        return res.status(403).json({ error: "Wrong admin key." });
    }
    try {
        const result = await DBHandler.getInstance().approveEvent(eventId);
        res.status(200).json({ message: `Event approved (id: ${result})` });
    } catch (err) {
        res.status(400).json({ error: `Faild to approve event (err: ${err})` });
        return;
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
