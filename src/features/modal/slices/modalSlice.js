import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeModal: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleModal(state, action) {
            const modalName = action.payload;

            if (state.activeModal === modalName) {
                state.activeModal = null;
            } else {
                state.activeModal = modalName;
            }
        },

        closeModal(state) {
            state.activeModal = null;
        },
    },
});

export const { 
    toggleModal,
    closeModal,
} = modalSlice.actions;
export default modalSlice.reducer;