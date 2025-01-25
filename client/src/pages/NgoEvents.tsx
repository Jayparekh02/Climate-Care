// src/pages/NgoEvents.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  deleteEventThunk,
  fetchMyEventsWithVolunteersThunk,
} from "../features/events/eventSlice";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { EventCard } from "../components/EventCard";
import EventCreateUpdateModal from "../components/modals/EventCreateUpdateModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import { EventFormType } from "../utils/types";

const NgoEvents = () => {
  const { user, token } = useAppSelector((state) => state.login);
  const { myEvents, lastUpdated } = useAppSelector((state) => state.events);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventFormType | null>(null);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(fetchMyEventsWithVolunteersThunk({ token, searchTerm }));
    }
  }, [dispatch, token, searchTerm, lastUpdated]);

  const handleOpenCreateModal = () => {
    setCurrentEvent(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (event: EventFormType) => {
    setCurrentEvent(event);
    setModalOpen(true);
  };

  const handleOpenDeleteModal = (event: EventFormType) => {
    setCurrentEvent(event);
    setDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setModalOpen(false);
    setDeleteModalOpen(false);
    setCurrentEvent(null);
  };

  const handleConfirmDelete = () => {
    if (currentEvent && currentEvent._id && token) {
      dispatch(deleteEventThunk({ eventId: currentEvent._id, token }));
    }
    handleCloseModals();
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    dispatch(fetchMyEventsWithVolunteersThunk({ token, searchTerm }));
  };

  return (
    <Box sx={{ width: "100%", height: "auto" }}>
      <Container>
        <Box
          sx={{ mt: 4, mb: 2 }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h3">Manage Your Events</Typography>

          <Button
            variant="outlined"
            size="large"
            sx={{
              color: "black",
              fontSize: 16,
              borderColor: "black",
            }}
            onClick={handleOpenCreateModal}
          >
            Create New Event
          </Button>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="Search by Title or Category"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
          />
          {/* <Button variant="contained" onClick={handleSearch}>
            Search
          </Button> */}
        </Box>
        <Grid container spacing={4} mt={2}>
          {myEvents.map((event) => (
            <Grid item md={6} lg={4} sm={6} key={event._id}>
              <EventCard
                eventData={event}
                onEdit={() => handleOpenEditModal(event)}
                onDelete={() => handleOpenDeleteModal(event)}
              />
            </Grid>
          ))}
        </Grid>
        {isModalOpen && (
          <EventCreateUpdateModal
            open={isModalOpen}
            onClose={handleCloseModals}
            event={currentEvent}
            token={token}
          />
        )}
        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            open={isDeleteModalOpen}
            onClose={handleCloseModals}
            onConfirm={handleConfirmDelete}
          />
        )}
      </Container>
    </Box>
  );
};

export default NgoEvents;