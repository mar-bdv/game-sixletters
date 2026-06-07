

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeModal: null,

    resultType: null, // "win" | "lose"
};

const modalSlice = createSlice({
    name: "modal",

    initialState,

    reducers: {
        toggleModal(state, action) {
            state.activeModal =
                state.activeModal === action.payload
                    ? null
                    : action.payload;
        },

        closeModal(state) {
            state.activeModal = null;
        },

        openResultModal(state, action) {
            state.activeModal = "result";
            state.resultType = action.payload;
        },
    },
});

export const {
    toggleModal,
    closeModal,
    openResultModal,
} = modalSlice.actions;

export default modalSlice.reducer;