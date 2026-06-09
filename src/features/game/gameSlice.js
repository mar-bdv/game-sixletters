
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


const initialState = {
    board: createBoard(),
    currentRow: 0,
    currentCol: 0,

    words: [],
    secretWord: "",
    gameStatus: "playing",
    usedLetters: {},
    error: null,
    startedAt: Date.now(),
    finishedTime: null,

    requiredLetters: [],
    hardMode: false,
    hardModeTimeLimit: 120, 
    swapEnterDel: false,

    animationRow: null,

    gameModeAtFinish: null,

    hintAvailable: false,
    hintPosition: null,
    hintLetter: null,
};

const gameSlice = createSlice({
    name: "game",

    initialState,

    reducers: {
        toggleSwapEnterDel(state) {
            state.swapEnterDel = !state.swapEnterDel;
        },
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
            
            if (state.currentCol < 6) return;
            if (state.gameStatus !== "playing") return;

            const row = state.board[state.currentRow];

            const guess = row.map((c) => c.letter).join("");
            const secret = state.secretWord;

            const secretArr = secret.split("");
            const guessArr = guess.split("");

            const secretUsed = Array(6).fill(false);

            if (state.hardMode) {
                const missingLetter = Object.keys(state.usedLetters)
                    .filter(letter => state.usedLetters[letter] === "present" || state.usedLetters[letter] === "correct")
                    .find(letter => !guess.includes(letter));

                if (missingLetter) {
                    state.error =
                        "Пожалуйста, учитывайте ВСЕ найденные буквы! Выбран режим «Сложный мод»";
                    return;
                }
            }

            if (!state.words.includes(guess)) {
                state.error =
                    "В словаре игры нет такого слова! Попробуйте другое, например «МАКИЯЖ»";

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

            guessArr.forEach((letter, i) => {
                if (
                    row[i].status === "correct" ||
                    row[i].status === "present"
                ) {
                    if (
                        !state.requiredLetters.includes(letter)
                    ) {
                        state.requiredLetters.push(letter);
                    }
                }
            });

            const isWin = guess === secret;

            if (isWin) {
                state.gameStatus = "win";

                state.finishedTime = Math.floor((Date.now() - state.startedAt) / 1000);

                state.gameModeAtFinish = state.hardMode
                    ? "hard"
                    : "normal";
                    
                return;
            }

            state.animationRow = state.currentRow;

            if (state.currentRow === 4) {
                state.gameStatus = "lose";
                return;
            }

            if (
                !state.hardMode &&
                state.currentRow === 2 &&
                !state.hintAvailable &&
                !state.hintLetter
            ) {
                state.hintAvailable = true;
            }

            state.currentRow += 1;
            state.currentCol = 0;

        
        
        },

        clearError(state) {
            state.error = null;
        },

        restartGame(state) {
            state.board = createBoard();
            state.currentRow = 0;
            state.currentCol = 0;
            state.gameStatus = "playing";
            state.usedLetters = {};
            state.animationRow = null;

            state.finishedTime = null;
            state.startedAt = Date.now();

            state.hintAvailable = false;
            state.hintPosition = null;
            state.hintLetter = null;


            state.requiredLetters = [];

            state.secretWord =
                state.words[
                    Math.floor(Math.random() * state.words.length)
                ];
        },

        toggleHardMode(state) {
            state.hardMode = !state.hardMode;
        },

        forceLose(state) {
            state.gameStatus = "lose";
        },

        selectHint(state, action) {
            const position = action.payload;

            state.hintPosition = position;
            state.hintLetter = state.secretWord[position - 1];
            state.hintAvailable = false;
        },
    },
    extraReducers: (builder) => {
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
    restartGame,
    clearError,
    toggleHardMode,
    forceLose,
    toggleSwapEnterDel,
    selectHint,
} = gameSlice.actions;

export default gameSlice.reducer;