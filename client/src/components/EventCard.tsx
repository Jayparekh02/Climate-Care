import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Event } from "../models/Event";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
interface EventCardProps {
  eventData: Event;
  onEdit: () => void;
  onDelete: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  eventData,
  onEdit,
  onDelete,
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: { xs: 560, sm: 360 },
        height: 350,
        bgcolor: "rgb(153, 204, 204,0.6)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          //   padding: 1,
        }}
      >
        <Tooltip title="Edit Event">
          <IconButton onClick={onEdit} color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Event">
          <IconButton onClick={onDelete} color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          gap: 2,
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          fontSize={"2.5rem"}
          sx={{ wordWrap: "break-word" }}
          height={100}
        >
          {eventData.title}
        </Typography>
        <Typography variant="h5">
          Category: <strong>{eventData.category}</strong>
        </Typography>
        <Typography
          variant="body1"
          maxHeight={80}
          height={50}
          sx={{ wordWrap: "break-word" }}
        >
          <strong>{eventData.description}</strong>
        </Typography>
        <Typography color="text.primary">
          Volunteers: {eventData.volunteers.length}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {eventData.volunteers.map((volunteer) => (
            <Chip
              key={volunteer._id}
              label={volunteer.name}
              variant="outlined"
              sx={{ bgcolor: "#f9f6ee", color: "black", fontSize: 16 }}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
};
