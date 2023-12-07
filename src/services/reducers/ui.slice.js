import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  snackbar: null
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSnackbar: (state, action) => {
      state.snackbar = action.payload;
    },
  },
});

export const { setLoading, setSnackbar } = uiSlice.actions;

export default uiSlice.reducer;