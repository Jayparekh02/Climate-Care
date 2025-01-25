// src/components/EventCreateUpdateModal.tsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import {
  createEventThunk,
  updateEventThunk,
} from "../../features/events/eventSlice";
import { EventFormType } from "../../utils/types";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  event: EventFormType | null;
  token: string;
}

const EventCreateUpdateModal: React.FC<EventModalProps> = ({
  open,
  onClose,
  event,
  token,
}) => {
  const [formData, setFormData] = useState<EventFormType>({
    title: "",
    category: "",
    date: "",
    location: "",
    description: "",
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (event) {
      const formattedDate = event.date
        ? new Date(event.date).toISOString().substring(0, 10)
        : "";
      setFormData({
        title: event.title || "",
        category: event.category || "",
        date: formattedDate,
        location: event.location || "",
        description: event.description || "",
      });
    } else {
      setFormData({
        title: "",
        category: "",
        date: "",
        location: "",
        description: "",
      });
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (event && event._id) {
      dispatch(
        updateEventThunk({ eventId: event._id, eventData: formData, token })
      );
    } else {
      dispatch(createEventThunk({ eventData: formData, token }));
    }
    onClose();
  };
  const todayDate = new Date().toISOString().substring(0, 10);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{event ? "Update Event" : "Create Event"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Category"
          name="category"
          fullWidth
          value={formData.category}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          fullWidth
          value={formData.date}
          onChange={handleChange}
          margin="dense"
          InputLabelProps={{ shrink: true }} // Ensures label does not overlap with pre-filled value
          inputProps={{ min: todayDate }} // Restrict past dates
        />
        <TextField
          label="Location"
          name="location"
          fullWidth
          value={formData.location}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>{event ? "Update" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventCreateUpdateModal;
