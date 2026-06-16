import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalGames: 0,
    totalWins: 0,

    hardGames: 0,
    hardWins: 0,

    streak: 0,
    lastPlayedAt: null,
    lastStreakDate: null,
};

const statsSlice = createSlice({
    name: "stats",

    initialState,

    reducers: {
        registerGame(state, action) {
            const {
                isWin,
                hardMode,
            } = action.payload;

            state.totalGames += 1;

            if (isWin) {
                state.totalWins += 1;
            }

            if (hardMode) {
                state.hardGames += 1;

                if (isWin) {
                    state.hardWins += 1;
                }
            }

            // const now = Date.now();

            // if (!state.lastPlayedAt) {
            //     state.streak = 1;
            // } else {
            //     const diff =
            //         now - state.lastPlayedAt;

            //     const hours =
            //         diff / (1000 * 60 * 60);

            //     if (hours <= 25) {
            //         state.streak += 1;
            //     } else {
            //         state.streak = 1;
            //     }
            // }

            // state.lastPlayedAt = now;

            const now = Date.now();

            if (!state.lastPlayedAt) {
                state.streak = 1;
                state.lastPlayedAt = now;
                state.lastStreakDate = now;
                return;
            }

            const hours =
                (now - state.lastPlayedAt) /
                (1000 * 60 * 60);


            if (hours > 25) {
                state.streak = 1;
                state.lastStreakDate = now;
            }
            else {
                const lastDate = new Date(state.lastStreakDate);
                const currentDate = new Date(now);

                const isSameDay =
                    lastDate.toDateString() ===
                    currentDate.toDateString();


                if (!isSameDay) {
                    state.streak += 1;
                    state.lastStreakDate = now;
                }
            }

            state.lastPlayedAt = now;
        },

        resetStats() {
            return initialState;
        },
    },
});

export const {
    registerGame,
    resetStats,
} = statsSlice.actions;

export default statsSlice.reducer;