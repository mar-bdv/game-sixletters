
// const initialState = {
//     activeModal: null,
// };

// const modalSlice = createSlice({
//     name: "modal",
//     initialState,
//     reducers: {
//         toggleModal(state, action) {
//             const modalName = action.payload;

//             if (state.activeModal === modalName) {
//                 state.activeModal = null;
//             } else {
//                 state.activeModal = modalName;
//             }
//         },

//         closeModal(state) {
//             state.activeModal = null;
//         },
//     },
// });

// export const { 
//     toggleModal,
//     closeModal,
// } = modalSlice.actions;
// export default modalSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

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