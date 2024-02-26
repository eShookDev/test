import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    username: string
    password: string
}

interface AuthState {
    user: User | null
    isLoggedIn: boolean
    isLoading: boolean
    isError: string | null
}

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    isError: null
}

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (userData) => {
        try {
            const response = await fetch("api/login", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userData)
            })

            // Error data check

            // OK
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        onLoginStart(state) { state.isLoading = true },
        onLoginSuccess(state, action: PayloadAction<User>) { state.isLoading = false; state.user = action.payload; state.isLoggedIn = true },
        onLoginFailure(state, action: PayloadAction<string>) { state.isLoading = false; state.isError = action.payload }
    }

})

export const { onLoginStart, onLoginSuccess, onLoginFailure } = authSlice.actions;

export default authSlice.reducer;