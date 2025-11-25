import express from "express";
import {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createContact);

router.get("/", getContacts);
router.patch("/:id/read", markAsRead);
router.delete("/:id", deleteContact);

export default router;