import { useDispatch } from "react-redux";
import { closeModal } from "../slices/modalSlice";
import styles from "./modals.module.scss"

export default function RulesModal() {
    const dispatch = useDispatch();

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                
                <button
                    className={styles.close}
                    onClick={() => dispatch(closeModal())}
                >
                    ✕
                </button>
                
                <div className={styles.modal_header}>
                    <h2 className={styles.header}>Правила игры</h2>
                </div>

                <div className={styles.modal_info}>
                    <p className={styles.modal_info_top}>
                        Нужно угадать слово из 6 букв за 5 попыток.
                    </p>
                    
                    <p className={styles.modal_info_top}>
                        После каждого введённого слова цвет букв <strong>меняется</strong> и подсказывает, 
                        насколько ты близко к ответу:
                    </p>

                </div>

                

                <hr className={styles.modal_hr}/>

                <div className={styles.modal_letters}>

                    <div className={styles.modal_letter}>
                        <div className={styles.letter_tile}>
                            <p className={`${styles.letter_char} ${styles.letter_correct}`}>А</p>
                        </div>

                        <p className={styles.modal_letter_text}>буква <strong>есть</strong> в слове и стоит на <strong>своём</strong> месте.</p>
                    </div>

                    <div className={styles.modal_letter}>
                        <div className={styles.letter_tile}>
                            <p className={`${styles.letter_char} ${styles.letter_present}`}>Б</p>
                        </div>

                        <p className={styles.modal_letter_text}>буква <strong>есть</strong> в слове, но находится в <strong>другой позиции.</strong></p>
                    </div>

                    <div className={styles.modal_letter}>
                        <div className={styles.letter_tile}>
                            <p className={`${styles.letter_char} ${styles.letter_absent}`}>В</p>
                        </div>

                        <p className={styles.modal_letter_text}>такой буквы в загаданном слове <strong>нет.</strong></p>
                    </div>

                    <p className={styles.modal_letter_info}>Если ты угадаешь слово полностью, все буквы станут зелёными.</p>

                </div>

                <hr className={styles.modal_hr}/>

                <div className={styles.modal_questions}>
                    <div className={styles.modal_questions_header}>
                        <p><strong>Что важно знать?</strong></p>
                    </div>

                    
                    <div className={styles.questions_one}>
                        <p className={styles.question_first}><strong>Как работают подсказки с количеством букв?</strong></p>
                        <p className={styles.question_answer}><i>Данную функцию можно включить в настройках.</i></p>
                        <p className={styles.question_answer}>
                            Если в слове есть повторяющиеся буквы и вы нашли не все из них, 
                            над буквой появится число, показывающее, сколько таких букв ещё осталось найти.
                        </p>
                    </div>

                    <div className={styles.questions_one}>
                        <p className={styles.question_first}><strong>Какие слова используются?</strong></p>
                        <p className={styles.question_answer}>Загаданное слово всегда состоит из фиксированного количества букв и является реальным словом.</p>
                    </div>


                </div>

                <div className={styles.modal_bottom}>
                    <p>Удачи и приятной игры!</p>
                </div>
            </div>
        </div>
    );
}