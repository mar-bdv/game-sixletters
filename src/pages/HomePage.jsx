import { useSelector, useDispatch } from "react-redux";

import Board from "../features/game/components/Board";

import { addLetter, clearError, forceLose, initWords, removeLetter, submitGuess } from "../features/game/gameSlice";
import KeyBoard from "../features/keyboard/Keyboard";

import styles from "./homepage.module.scss";
import { useEffect, useRef, useState } from "react";
import { openResultModal } from "../features/modal/slices/modalSlice";
import { addNotification } from "../features/modal/slices/notificationSlice";
import { registerGame } from "../features/modal/slices/statsSlice";

const KEY_MAP = {
    Backquote: "Ё",
    
    KeyQ: "Й",
    KeyW: "Ц",
    KeyE: "У",
    KeyR: "К",
    KeyT: "Е",
    KeyY: "Н",
    KeyU: "Г",
    KeyI: "Ш",
    KeyO: "Щ",
    KeyP: "З",

    BracketLeft: "Х",
    BracketRight: "Ъ",

    KeyA: "Ф",
    KeyS: "Ы",
    KeyD: "В",
    KeyF: "А",
    KeyG: "П",
    KeyH: "Р",
    KeyJ: "О",
    KeyK: "Л",
    KeyL: "Д",

    Semicolon: "Ж",
    Quote: "Э",


    KeyZ: "Я",
    KeyX: "Ч",
    KeyC: "С",
    KeyV: "М",
    KeyB: "И",
    KeyN: "Т",
    KeyM: "Ь",

    Comma: "Б",
    Period: "Ю",
};

function HomePage() {
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(120);
    const gameStatus = useSelector(
        (state) => state.game.gameStatus
    );

    const hardMode = useSelector(
        state => state.game.hardMode
    );

    // const startedAt = useSelector(
    //     state => state.game.startedAt
    // );

    const hintAvailable = useSelector(
        state => state.game.hintAvailable
    );

    const hardModeStartedAt = useSelector(
        state => state.game.hardModeStartedAt
    );


    const error = useSelector(
        (state) => state.game.error
    );

    const board = useSelector((state) => state.game.board);

    const pageRef = useRef(null);

    useEffect(() => {
        pageRef.current?.focus();
    }, []);

    useEffect(() => {
        dispatch(initWords());
    }, [dispatch]);

    useEffect(() => {
        if (!hintAvailable) return;

        dispatch(
            addNotification("Вам доступна подсказка")
        );
    }, [hintAvailable, dispatch]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // useEffect(() => {
    //     if (!hardMode) return;

    //     const interval = setInterval(() => {
    //         const passed = Math.floor((Date.now() - startedAt) / 1000);
    //         const left = 120 - passed;

    //         if (left <= 0) {
    //             setTimeLeft(0);

    //             if (gameStatus === "playing") {
    //                 dispatch(forceLose());
    //             }

    //             return;
    //         }

    //         setTimeLeft(left);
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [hardMode, startedAt, gameStatus, dispatch]);

    useEffect(() => {
        if (!hardMode || !hardModeStartedAt) return;

        const interval = setInterval(() => {
            const passed = Math.floor(
                (Date.now() - hardModeStartedAt) / 1000
            );

            const left = 120 - passed;

            if (left <= 0) {
                setTimeLeft(0);

                if (gameStatus === "playing") {
                    dispatch(forceLose());
                }

                clearInterval(interval);
                return;
            }

            setTimeLeft(left);
        }, 1000);

        return () => clearInterval(interval);

    }, [
        hardMode,
        hardModeStartedAt,
        gameStatus,
        dispatch
    ]);


    useEffect(() => {
        if (gameStatus === "win") {
            dispatch(
                registerGame({
                    isWin: true,
                    hardMode,
                })
            );
        }

        if (gameStatus === "lose") {
            dispatch(
                registerGame({
                    isWin: false,
                    hardMode,
                })
            );
        }
    }, [gameStatus, hardMode, dispatch]);


    useEffect(() => {
        if (gameStatus === "win") {
            dispatch(openResultModal("win"));
        }

        if (gameStatus === "lose") {
            dispatch(openResultModal("lose"));
        }
    }, [gameStatus, dispatch]);

    useEffect(() => {
        if (!error) return;

        dispatch(addNotification(error));

        dispatch(clearError());
    }, [error, dispatch]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyPress = (key) => {
        console.log("handleKeyPress called with:", key); // ← дебаг
        
        if (key === "DEL") {
            dispatch(removeLetter());
            return;
        }

        if (key === "ENTER") {
            dispatch(submitGuess());
            return;
        }

        dispatch(addLetter(key));
    };



    useEffect(() => {
        const handleKeyDown = (event) => {
            const code = event.code;

            if (code === "Backspace") {
                handleKeyPress("DEL");
                return;
            }

            if (code === "Enter") {
                handleKeyPress("ENTER");
                return;
            }

            const letter = KEY_MAP[code];

            if (letter) {
                handleKeyPress(letter);
            }
        };
        window.addEventListener("keydown", handleKeyDown); 
        

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyPress]);
        

    return (
        <div 
            
            // ref={pageRef}
            // tabIndex={0}
        >
            {hardMode && (
                <p
                    className={
                        timeLeft <= 15
                            ? styles.timerDanger
                            : styles.timer
                    }
                >
                    До конца игры: {minutes}:{seconds < 10 ? "0" : ""}{seconds}
                </p>
            )}
            <Board board={board} />

            <div className={styles.keyboard}>
                <KeyBoard onKeyPress={handleKeyPress} />
            </div>
        </div>
    );
}

export default HomePage;