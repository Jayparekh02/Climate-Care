import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
  volunteerForEvent,
  getMyEventsWithVolunteers,
  fetchRegisteredEvents,
} from "../../api/eventService";

interface EventState {
  events: any[];
  registeredEvents: any[];
  myEvents: any[];
  loading: boolean;
  error: string | null;
  lastUpdated: number;
}

const initialState: EventState = {
  events: [],
  registeredEvents: [],
  myEvents: [],
  loading: false,
  error: null,
  lastUpdated: 0,
};

interface FetchEventsParams {
  category?: string;
  limit?: number;
  token: string;
}

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (params: FetchEventsParams, { rejectWithValue }) => {
    try {
      return await getEvents(params.token, params.category, params.limit);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEventThunk = createAsyncThunk(
  "events/createEvent",
  async (data: { eventData: any; token: string }, { rejectWithValue }) => {
    try {
      return await createEvent(data.eventData, data.token);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEventThunk = createAsyncThunk(
  "events/deleteEvent",
  async (data: { eventId: string; token: string }, { rejectWithValue }) => {
    try {
      await deleteEvent(data.eventId, data.token);
      return data.eventId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEventThunk = createAsyncThunk(
  "events/updateEvent",
  async (
    data: { eventId: string; eventData: any; token: string },
    { rejectWithValue }
  ) => {
    try {
      return await updateEvent(data.eventId, data.eventData, data.token);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const volunteerForEventThunk = createAsyncThunk(
  "events/volunteerForEvent",
  async (payload: { eventId: string; token: string }, { rejectWithValue }) => {
    try {
      const { data } = await volunteerForEvent(payload.eventId, payload.token);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMyEventsWithVolunteersThunk = createAsyncThunk(
  "events/fetchMyEventsWithVolunteers",
  async (
    payload: { token: string; searchTerm: string },
    { rejectWithValue }
  ) => {
    try {
      return await getMyEventsWithVolunteers(payload.token, payload.searchTerm);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRegisteredEventsThunk = createAsyncThunk(
  "events/fetchRegisteredEvents",
  async (token: string, { rejectWithValue }) => {
    try {
      return await fetchRegisteredEvents(token);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        createEventThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.events.push(action.payload.data); // Assumes the response includes the created event
          state.loading = false;
          state.lastUpdated = Date.now();
        }
      )
      .addCase(createEventThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEventThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        updateEventThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          const index = state.events.findIndex(
            (event) => event._id === action.payload._id
          );
          if (index !== -1) {
            state.events[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(
        deleteEventThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.events = state.events.filter(
            (event) => event.id !== action.payload
          ); // Using payload directly
          state.loading = false;
          state.lastUpdated = Date.now();
        }
      )
      .addCase(
        fetchMyEventsWithVolunteersThunk.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.myEvents = action.payload;
          state.loading = false;
        }
      )
      .addCase(volunteerForEventThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        volunteerForEventThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // Assuming the response includes details about the event and volunteer registration
          const { eventId } = action.payload;
          const eventIndex = state.events.findIndex(
            (event) => event._id === eventId
          );
          if (eventIndex !== -1) {
            state.events[eventIndex].volunteers = [
              ...state.events[eventIndex].volunteers,
              action.payload,
            ];
          }
        }
      )
      .addCase(volunteerForEventThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRegisteredEventsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchRegisteredEventsThunk.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.registeredEvents = action.payload; // Store the fetched registered events
        }
      )
      .addCase(fetchRegisteredEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.lastUpdated = Date.now();
      });
  },
});

export default eventSlice.reducer;
