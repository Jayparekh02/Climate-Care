import {
  createAsyncThunk,
  createSlice,
  SerializedError,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchArticles } from "../../api/resources";
import { IResource } from "../../utils/types";
import * as resourceService from "../../api/resources";

interface ResourceState {
  resourcetype: IResource[];
  error: string | null;
  loading: boolean;
}

const initialState: ResourceState = {
  resourcetype: [],
  error: null,
  loading: false,
};

export const createResourceThunk = createAsyncThunk(
  "resources/createResource",
  async (resourceData: any, { rejectWithValue }) => {
    try {
      const data = await resourceService.createResource(resourceData);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as SerializedError).message || "Error registering user"
      );
    }
  }
);

export const fetchArticlesThunk = createAsyncThunk(
  "resources/fetchArticles",
  async (_, { rejectWithValue }) => {
    try {
      const { resources } = await fetchArticles();
      return resources;
    } catch (error) {
      return rejectWithValue(
        (error as SerializedError).message || "Error fetching articles"
      );
    }
  }
);

// export const fetchVideosThunk = createAsyncThunk(
//   "resources/fetchVideos",
//   async (_, { rejectWithValue }) => {
//     try {
//       return await fetchVideos();
//     } catch (error) {
//       return rejectWithValue(
//         (error as SerializedError).message || "Error fetching videos"
//       );
//     }
//   }
// );

const resourceSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch resourcetype
    builder
      .addCase(fetchArticlesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchArticlesThunk.fulfilled,
        (state, action: PayloadAction<IResource[]>) => {
          state.loading = false;
          console.log(action.payload);
          state.resourcetype = action.payload;
        }
      )
      .addCase(fetchArticlesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createResourceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResourceThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.resourcetype.push(action.payload); // Ensure this line correctly updates the state
      })
      .addCase(createResourceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default resourceSlice.reducer;