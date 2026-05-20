// import { createSlice } from "@reduxjs/toolkit";

// const createBoard = () =>
//     Array.from({ length: 5 }, () =>
//         Array.from({ length: 6 }, () => ({
//         letter: "",
//         status: "empty",
//         }))
//     );

// const initialState = {
//     board: createBoard(),
//     currentRow: 0,
//     currentCol: 0,
// };

// const gameSlice = createSlice({
//     name: "game",
//     initialState,
//     reducers: {
//         addLetter(state, action) {
//         if (state.currentCol < 6) {
//             state.board[state.currentRow][state.currentCol].letter =
//             action.payload;
//             state.currentCol += 1;
//         }
//         },

//         removeLetter(state) {
//         if (state.currentCol > 0) {
//             state.currentCol -= 1;
//             state.board[state.currentRow][state.currentCol].letter = "";
//         }
//         },
//     },
// });

// export const { addLetter, removeLetter } = gameSlice.actions;
// export default gameSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const createBoard = () =>
    Array.from({ length: 5 }, () =>
        Array.from({ length: 6 }, () => ({
        letter: "",
        status: "empty",
        }))
    );

const initialState = {
    board: createBoard(),
    currentRow: 0,
    currentCol: 0,

    secretWord: "МАКИЯЖ", // пока хардкод
    gameStatus: "playing", // playing | win | lose
    usedLetters: {}, // для клавиатуры
};

const gameSlice = createSlice({
    name: "game",

    initialState,

    reducers: {
        addLetter(state, action) {
        // защита если строк уже нет
        if (state.currentRow >= 5) return;

        // защита от переполнения строки
        if (state.currentCol >= 6) return;

        state.board[state.currentRow][state.currentCol].letter =
            action.payload;

        state.board[state.currentRow][state.currentCol].status =
        "filled";

        state.currentCol += 1;
    },

    removeLetter(state) {
        if (state.currentCol <= 0) return;

        state.currentCol -= 1;

        state.board[state.currentRow][state.currentCol].letter =
        "";

        state.board[state.currentRow][state.currentCol].status =
        "empty";
    },

    submitGuess(state) {
        if (state.currentCol < 6) return;
        if (state.gameStatus !== "playing") return;

        const row = state.board[state.currentRow];

        const guess = row.map((c) => c.letter).join("");
        const secret = state.secretWord;

        const secretArr = secret.split("");
        const guessArr = guess.split("");

        const secretUsed = Array(6).fill(false);

        // 1. GREEN (правильная позиция)
        guessArr.forEach((letter, i) => {
            if (letter === secretArr[i]) {
                row[i].status = "correct";

                state.usedLetters[letter] = "correct";
                secretUsed[i] = true;
            }
        });

        // 2. YELLOW / GRAY
        guessArr.forEach((letter, i) => {
            if (row[i].status === "correct") return;

            const index = secretArr.findIndex(
                (l, idx) => l === letter && !secretUsed[idx]
            );

            if (index !== -1) {
                row[i].status = "present";
                secretUsed[index] = true;

                if (state.usedLetters[letter] !== "correct") {
                    state.usedLetters[letter] = "present";
                }
            } else {
                row[i].status = "absent";

                if (!state.usedLetters[letter]) {
                    state.usedLetters[letter] = "absent";
                }
            }
        });

        const isWin = guess === secret;

        if (isWin) {
            state.gameStatus = "win";
            setTimeout(() => alert("вы выиграли"), 50);
            return;
        }

        if (state.currentRow === 4) {
            state.gameStatus = "lose";
            setTimeout(() => alert("вы проиграли"), 50);
            return;
        }

        state.currentRow += 1;
        state.currentCol = 0;
    }
    },
});

export const {
    addLetter,
    removeLetter,
    submitGuess,
} = gameSlice.actions;

export default gameSlice.reducer;