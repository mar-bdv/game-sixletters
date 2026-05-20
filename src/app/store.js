import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/game/gameSlice";
import modalReducer from "../features/modal/slices/modalSlice";

export const store = configureStore({
    reducer: {
        game: gameReducer,
        modal: modalReducer,
    },
});