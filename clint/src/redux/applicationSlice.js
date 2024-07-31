import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
  },
  reducers: {
    setallapplicants: (state, action) => {
      state.applicants = action.payload;
    },
    setstatusupdate: (state, action) => {
      const index = state.applicants.applications.findIndex(
        (item) => item._id === action.payload._id
      );
      state.applicants.applications.splice(index, 1, action.payload)
    },
  },
});

export const { setallapplicants, setstatusupdate } = applicationSlice.actions;
export default applicationSlice;
