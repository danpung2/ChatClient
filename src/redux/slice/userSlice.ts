import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin: false,
    user: { id: 0, nickname: 'GUEST', email: '' }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            return {
                isLogin: true,
                user: action.payload.user
            };
        },
        logout() {
            return initialState;
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
