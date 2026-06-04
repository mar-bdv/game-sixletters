import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/game/gameSlice";
import modalReducer from "../features/modal/slices/modalSlice";
import notificationReducer from "../features/modal/slices/notificationSlice";

const loadGame = () => {
    try {
        const data = localStorage.getItem("wordle-game");

        return data ? JSON.parse(data) : undefined;
    } catch {
        return undefined;
    }
};

export const store = configureStore({
    reducer: {
        game: gameReducer,
        modal: modalReducer,
        notification: notificationReducer,
    },

    preloadedState: {
        game: loadGame(),
    },
});

store.subscribe(() => {
    localStorage.setItem(
        "wordle-game",
        JSON.stringify(store.getState().game)
    );
});