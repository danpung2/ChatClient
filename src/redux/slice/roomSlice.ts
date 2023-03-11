import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    room: { id: 0, roomName: '' }
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        enter(state, action){
            return {
                room: action.payload.room
            }
        },
        exit() {
            return initialState;
        },
    },
});

export const roomActions = roomSlice.actions;
export default roomSlice.reducer;
