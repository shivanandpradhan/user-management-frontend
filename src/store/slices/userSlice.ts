import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProfileDto } from "../../types/user";

interface UserState {
  profile: UserProfileDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchProfileStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess(state, action: PayloadAction<UserProfileDto>) {
      state.profile = action.payload;
      state.loading = false;
    },
    fetchProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileSuccess(state, action: PayloadAction<UserProfileDto>) {
      state.profile = action.payload;
    },
    clearUserError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileSuccess,
  clearUserError,
} = userSlice.actions;
export default userSlice.reducer;
