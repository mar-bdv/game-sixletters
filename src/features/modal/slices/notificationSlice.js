import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",

    initialState: {
        messages: [],
    },

    reducers: {
        addNotification(state, action) {
            state.messages.push({
                id: Date.now(),
                text: action.payload,
            });

            if (state.messages.length > 5) {
                state.messages.shift();
            }
        },

        removeNotification(state, action) {
            state.messages = state.messages.filter(
                msg => msg.id !== action.payload
            );
        },
    },
});

export const {
    addNotification,
    removeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;