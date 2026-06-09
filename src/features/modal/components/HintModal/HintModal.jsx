import { useDispatch, useSelector } from "react-redux";
import { selectHint } from "../../../game/gameSlice";
import styles from "./hintmodal.module.scss"
import { closeModal } from "../../slices/modalSlice";

export default function HintModal() {
    const dispatch = useDispatch();

    const hintLetter = useSelector(
        state => state.game.hintLetter
    );

    const hintAvailable = useSelector(
        state => state.game.hintAvailable
    );

    const hintPosition = useSelector(
        state => state.game.hintPosition
    );

    const handleChoose = (num) => {
        dispatch(selectHint(num));
    };

    return (
        <div className={styles.overlay} onClick={() => dispatch(closeModal())}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {!hintLetter && hintAvailable && (
                    <>
                        <button
                            className={styles.close}
                            onClick={() => dispatch(closeModal())}
                        >
                            ✕
                        </button>
                        <h3 className={styles.modal_heading}>Подсказка</h3>
                        <p className={styles.modal_text}>Выберите номер буквы,которую хотите узнать</p>

                        <div className={styles.hints_container}>
                            {[1,2,3,4,5,6].map(num => (
                                <button
                                    key={num}
                                    onClick={() => handleChoose(num)}
                                    className={styles.hints_btn}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>

                    </>
                )}

                {hintLetter && (
                    <>
                        <button
                            className={styles.close}
                            onClick={() => dispatch(closeModal())}
                        >
                            ✕
                        </button>
                        <h3 className={styles.hint_text}>
                            Буква под номером {hintPosition}
                        </h3>

                        <div className={styles.hint_letter_container}>
                            <p className={styles.hint_letter}>{hintLetter}</p>

                        </div>

                    </>
                )}
            </div>
        </div>
    );
}