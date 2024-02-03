import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserResponse } from "@/types/auth/userCredential";

interface AuthState {
  user: UserResponse | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponse | null>) => {
      state.user = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setError, setLoading } = authSlice.actions;

export default authSlice.reducer;
