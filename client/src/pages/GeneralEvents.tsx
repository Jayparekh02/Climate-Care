import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchEvents,
  fetchRegisteredEventsThunk,
  volunteerForEventThunk,
} from "../features/events/eventSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Event } from "../models/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
interface EventCardProps {
  eventData: Event;
  showSnackbar: (message: string) => void;
  showRegisterButton?: boolean; // Optional prop to control the display of the Register button
}
const EventCard: React.FC<EventCardProps> = ({
  eventData,
  showSnackbar,
  showRegisterButton = true, // Default to true if not specified
}) => {
  const { token } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const handleRegister = async () => {
    // This should ideally come from state or context
    if (token) {
      await dispatch(volunteerForEventThunk({ eventId: eventData._id, token }));
    }
    showSnackbar("Registered for event successfully!");
  };
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: { xs: 560, sm: 360 },
        height: 300,
        bgcolor: "rgb(153, 204, 204,0.6)", // Dynamically set card color based on emission score
        // padding: 2,
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"start"}
        gap={2}
        px={2}
        pt={2}
        // height="100%"
      >
        <Typography variant="h3" fontSize={"2.5rem"} height={100}>
          {eventData.title}
        </Typography>
        <Typography variant="h5">
          Category: <strong>{eventData.category}</strong>
        </Typography>
      </Box>
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="body1" maxHeight={80} height={50}>
          <strong> {eventData.description}</strong>
        </Typography>
        {showRegisterButton ? (
          <Button
            type="submit"
            variant="outlined"
            size="large"
            sx={{ mt: 2, color: "black", fontSize: 16, borderColor: "black" }}
            fullWidth
            onClick={handleRegister}
          >
            Register
          </Button>
        ) : (
          <Typography
            variant="h5"
            display={"flex"}
            gap={2}
            alignItems={"center"}
          >
            <strong>Registered</strong>
            <CheckCircleIcon fontSize={"medium"} />
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const GeneralEvents = () => {
  const { user, token } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { events, registeredEvents } = useAppSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents({ token, category: "", limit: 10 }));
    if (token) {
      dispatch(fetchRegisteredEventsThunk(token));
    }
  }, [dispatch, token, registeredEvents.length]);

  const filteredEvents =
    value === 0
      ? events.filter((event) =>
          registeredEvents.length > 0
            ? !registeredEvents.some((re) => re && re._id === event._id)
            : event != null
        )
      : registeredEvents.filter((re) => re != null);

  // console.log(filteredEvents, "filteredEvents");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Example fu
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%", height: "auto" }} alignContent={"center"}>
      <Container>
        <Button
          type="submit"
          variant="outlined"
          size="large"
          sx={{ mt: 2 }}
          startIcon={<KeyboardBackspaceIcon fontSize={"large"} />}
          onClick={() => navigate("/")}
        ></Button>
        <Typography py={4} variant="h2" fontWeight={500} textAlign={"left"}>
          Hi, {user?.name}
          <Divider />
        </Typography>
        <Typography variant="h4" textAlign={"left"} gutterBottom>
          Here's a list of upcoming events for you to volunteer!
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Upcoming" {...a11yProps(0)} />
              <Tab label="Registered" {...a11yProps(1)} />
            </Tabs>
          </Box>
          {/* <DashBoardTabs value={value} index={0} type="line">
            Item One
          </DashBoardTabs>
          <DashBoardTabs value={value} index={1} type="scatter">
            Item Two
          </DashBoardTabs> */}
        </Box>
        <Grid container spacing={4} mt={2}>
          {filteredEvents.length > 0 &&
            filteredEvents.map((event) => {
              // Ensure that the event is not null or undefined before trying to access its properties
              if (!event) return null;

              return (
                <Grid item key={event._id} md={6} lg={4} sm={6}>
                  <EventCard
                    eventData={event}
                    showSnackbar={showSnackbar}
                    showRegisterButton={value === 0} // Only show the Register button on the "Upcoming" tab
                  />
                </Grid>
              );
            })}
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Container>
    </Box>
  );
};

export default GeneralEvents;
