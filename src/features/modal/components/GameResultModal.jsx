import { useDispatch, useSelector } from "react-redux";
// import { closeModal } from "../slices/modalSlice";
import styles from "./gameresultmodal.module.scss"
import { closeModal } from "../slices/modalSlice";
import { restartGame } from "../../game/gameSlice";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

export default function GameResultModal() {
    const dispatch = useDispatch();
    const { width, height } = useWindowSize();

    const resultType = useSelector(
        (state) => state.modal.resultType
    );

    const secretWord = useSelector(
        (state) => state.game.secretWord
    );

    const gameModeAtFinish = useSelector(
        state => state.game.gameModeAtFinish
    );

    const handlePlayAgain = () => {
        dispatch(restartGame());
        dispatch(closeModal());
    };
    const finishedTime = useSelector(
        (state) => state.game.finishedTime ?? 0
    );

    const minutes = Math.floor(finishedTime / 60);
    const seconds = finishedTime % 60;

    const isWin = resultType === "win";

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {/* <button
                    className={styles.close}
                    onClick={() => dispatch(closeModal())}
                >
                    ✕
                </button> */}

                
                {isWin && (
                    <>
                        <Confetti
                            width={width}
                            height={height}
                            numberOfPieces={250}
                            spread={450}
                            gravity={0.05}
                        />
                        <div className={styles.result_heading_block}>
                            <h2 className={styles.result_congrats}>Поздравляю :)</h2>

                            <h2 className={styles.result_heading_congrats}>Вы выиграли!</h2>
                        </div>

                        <div className={styles.result_secretword_block}>
                            <p className={styles.result_secretword}>Загаданное слово:</p>

                            <p className={styles.result_secretword_word}> {secretWord}</p>
                        </div>

                        <div className={styles.result_info}>
                            <div className={styles.result_info_block}>
                                <p className={styles.result_info_one}>Выбранный режим:</p>
                                <p className={styles.result_info_result}>{gameModeAtFinish === "hard" ? "Сложный" : "Нормальный"}</p>
                            </div>

                            <div className={styles.result_info_block}>
                                <p className={styles.result_info_one}>Вы прошли игру за:</p>
                                <p className={styles.result_info_result}>{minutes} мин {seconds} сек</p>
                            </div>

                        </div>
                    
                        <div className={styles.result_playagain_block}>
                            <button 
                            className={styles.result_playagain_btn}
                            onClick={handlePlayAgain}>
                                Играть
                            </button>

                            <p className={styles.result_playagain_text}>Попробуйте снова!</p>

                        </div>
                    </>
                )}

                {!isWin && (
                    <>
                        <div className={styles.result_heading_block}>
                            <h2 className={styles.result_heading}>Вы проиграли :(</h2>
                        </div>

                        <div className={styles.result_secretword_block}>
                            <p className={styles.result_secretword}>Загаданное слово:</p>

                            <p className={styles.result_secretword_word}> {secretWord}</p>
                        </div>
                    
                        <div className={styles.result_playagain_block}>
                            <button 
                            className={styles.result_playagain_btn}
                            onClick={handlePlayAgain}>
                                Играть
                            </button>

                            <p className={styles.result_playagain_text}>Попробуйте снова!</p>

                        </div>

                    </>
                )}

            
            </div>
        </div>
    );
}