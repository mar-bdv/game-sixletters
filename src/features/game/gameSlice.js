
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadSixLetterWords } from "./loadWords";

const createBoard = () =>
    Array.from({ length: 5 }, () =>
        Array.from({ length: 6 }, () => ({
            letter: "",
            status: "empty",
            animate: false,
        }))
    );

// const initialState = {
//     board: createBoard(),
//     currentRow: 0,
//     currentCol: 0,

//     secretWord: "МАКИЯЖ", // пока хардкод
//     gameStatus: "playing", // playing | win | lose
//     usedLetters: {}, // для клавиатуры

//     animationRow: null,

// };

const initialState = {
    board: createBoard(),
    currentRow: 0,
    currentCol: 0,

    words: [],
    secretWord: "",
    gameStatus: "playing",
    usedLetters: {},

    animationRow: null,
};

const gameSlice = createSlice({
    name: "game",

    initialState,

    reducers: {
        addLetter(state, action) {
            if (state.currentRow >= 5) return;

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

        setAnimationRow(state, action) {
            state.animationRow = action.payload;
        },

        submitGuess(state) {
            // const row = state.board[state.currentRow];
            // const guess = row.map((c) => c.letter).join("");
            
            // // if (state.currentCol < 6) return;

        
            // if (state.gameStatus !== "playing") return;


            // const secret = state.secretWord;
            
            if (state.currentCol < 6) return;
            if (state.gameStatus !== "playing") return;

            const row = state.board[state.currentRow];

            const guess = row.map((c) => c.letter).join("");
            const secret = state.secretWord;

            const secretArr = secret.split("");
            const guessArr = guess.split("");

            const secretUsed = Array(6).fill(false);

            // if (!state.words.includes(guess)) {
            //     return; // или показать ошибку
            // }

            if (!state.words.includes(guess)) {
                setTimeout(() => alert("такого слова нет в словаре"), 50);
                return;
            }

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

            // const isWin = guess === secret;

            // if (isWin) {
            //     state.gameStatus = "win";
            //     return;
            // }

            // if (state.currentRow === 4) {
            //     state.gameStatus = "lose";
            //     return;
            // }

            
            // // if (state.currentRow === 4) {
            // //     state.gameStatus = "lose";
            // //     const secret = state.secretWord;
            // //     setTimeout(() => alert(`вы проиграли, загаданное слово было: ${secret}`), 50);
            // //     return;
            // // }

            
            
            // state.animationRow = state.currentRow;

            // state.currentRow += 1;
            // state.currentCol = 0;

            const isWin = guess === secret;

            if (isWin) {
                state.gameStatus = "win";
                return;
            }

            state.animationRow = state.currentRow;

            if (state.currentRow === 4) {
                state.gameStatus = "lose";
                return;
            }

            state.currentRow += 1;
            state.currentCol = 0;
        
        },
        restartGame(state) {
            state.board = createBoard();
            state.currentRow = 0;
            state.currentCol = 0;
            state.gameStatus = "playing";
            state.usedLetters = {};
            state.animationRow = null;

            state.secretWord =
                state.words[
                    Math.floor(Math.random() * state.words.length)
                ];
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(initWords.fulfilled, (state, action) => {
        //     state.words = action.payload;

        //     state.secretWord =
        //         action.payload[
        //             Math.floor(Math.random() * action.payload.length)
        //         ];
        // });

        builder.addCase(initWords.fulfilled, (state, action) => {
            state.words = action.payload;

            if (!state.secretWord) {
                state.secretWord =
                    action.payload[
                        Math.floor(Math.random() * action.payload.length)
                    ];
            }
        });
    }
});

export const initWords = createAsyncThunk(
    "game/initWords",
    async () => {
        const words = await loadSixLetterWords();
        return words;
    }
);

export const {
    addLetter,
    removeLetter,
    submitGuess,
    setAnimationRow,
    restartGame
} = gameSlice.actions;

export default gameSlice.reducer;