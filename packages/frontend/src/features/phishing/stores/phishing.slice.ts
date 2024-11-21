import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PhishingAttempt,  } from "../types";
import { phishingService } from "../services/phishing.service";
import type { CreatePhishingAttemptDto } from "../types";

interface PhishingState {
  attempts: PhishingAttempt[];
  loading: boolean;
  error: string | null;
}

const initialState: PhishingState = {
  attempts: [],
  loading: false,
  error: null,
};

export const fetchAttempts = createAsyncThunk(
  "phishing/fetchAttempts",
  async () => {
    const response = await phishingService.getAttempts();
    if (!response.success) {
      throw new Error(response.error);
    }
    return response.data;
  }
);

export const createPhishingAttempt = createAsyncThunk(
  "phishing/createAttempt",
  async (attemptData: CreatePhishingAttemptDto) => {
    const response = await phishingService.createAttempt(attemptData);
    if (!response.success) {
      throw new Error(response.error);
    }
    return response.data;
  }
);

const phishingSlice = createSlice({
  name: "phishing",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAttempts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttempts.fulfilled, (state, action) => {
        state.loading = false;
        state.attempts = action.payload ?? [];
      })
      .addCase(fetchAttempts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch attempts";
      })
      

      .addCase(createPhishingAttempt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPhishingAttempt.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.attempts = [action.payload, ...state.attempts];
        }
      })
      .addCase(createPhishingAttempt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create attempt";
      });
  },
});

export const { clearError } = phishingSlice.actions;
export default phishingSlice.reducer;
