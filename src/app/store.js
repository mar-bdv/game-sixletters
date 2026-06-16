import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/game/gameSlice";
import modalReducer from "../features/modal/slices/modalSlice";
import notificationReducer from "../features/modal/slices/notificationSlice";
import statsReducer from "../features/modal/slices/statsSlice";

const loadGame = () => {
    try {
        const data = localStorage.getItem("wordle-game");

        return data ? JSON.parse(data) : undefined;
    } catch {
        return undefined;
    }
};

const loadStats = () => {
    try {
        const data = localStorage.getItem("wordle-stats");

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
        stats: statsReducer,
    },

    preloadedState: {
        game: loadGame(),
        stats: loadStats(),
    },
});

store.subscribe(() => {
    localStorage.setItem(
        "wordle-game",
        JSON.stringify(store.getState().game)
    );
    localStorage.setItem(
        "wordle-stats",
        JSON.stringify(store.getState().stats)
    );
});