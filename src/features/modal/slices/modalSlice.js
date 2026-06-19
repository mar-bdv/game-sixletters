

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeModal: null,

    resultType: null,
    resultClosed: false,
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
            state.resultClosed = true;
        },

        openResultModal(state, action) {
            state.activeModal = "result";
            state.resultType = action.payload;
        },

        resetResult(state) {
            state.resultType = null;
            state.resultClosed = false;
        }
    },
});

export const {
    toggleModal,
    closeModal,
    openResultModal,
    resetResult,
} = modalSlice.actions;

export default modalSlice.reducer;