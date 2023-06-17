import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  craft: [],
  isLoading: false,
  error: null,
};
const apikey = {
  headers: {
    'X-Api-Key': 'qQHVPjqOrMfuPCBMH5srTg==lkmZ7PBjNY8m82Uz',
    'Content-Type': 'application/json',
  },
};
const url = 'https://api.api-ninjas.com/v1/aircraft?engine_type=jet&limit=20';
export const getCrafts = createAsyncThunk('crafts/getCrafts', async () => {
  try {
    const response = await axios.get(url, apikey);
    return response.data.map((craft) => ({
      ...craft,
    }));
  } catch (error) {
    throw new Error('failed to get craft');
  }
});
const craftSlice = createSlice({
  name: 'crafts',
  initialState,
  reducers: {
    findCraftDetails: (state, action) => {
      const craftId = action.payload;
      state.craft = state.craft.map((craft) => (craft.model === craftId
        ? { ...craft, details: true } : craft));
    },
    noCraftDetails: (state, action) => {
      const craftId = action.payload;
      state.craft = state.craft.map((craft) => (craft.model === craftId
        ? { ...craft, details: false } : craft));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCrafts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCrafts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.craft = action.payload;
      })
      .addCase(getCrafts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { findCraftDetails, noCraftDetails } = craftSlice.actions;
export default craftSlice.reducer;
