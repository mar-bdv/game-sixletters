
import { useDispatch, useSelector } from "react-redux";
import styles from "./modals.module.scss";
import { closeModal } from "../slices/modalSlice";
import { toggleConfetti, toggleHardMode, toggleSwapEnterDel } from "../../game/gameSlice";

export default function SettingsModal() {
    const dispatch = useDispatch();

    const hardMode = useSelector(
        state => state.game.hardMode
    );

    const swapEnterDel = useSelector(
        state => state.game.swapEnterDel
    );

    const confettiEnabled = useSelector(
        state => state.game.confettiEnabled
    );

    console.log("swapEnterDel in keyboard:", swapEnterDel);

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
                    <h2 className={styles.header}>Настройки</h2>
                </div>

                <div className={styles.settings}>
                    <div className={styles.settings_block}>
                        <p className={styles.settings_name}>Темная тема</p>

                        <img width="44" height="44" src="https://img.icons8.com/ios/50/toggle-off.png" alt="toggle"/>

                        {/* <img width="44" height="44" src="https://img.icons8.com/ios-filled/50/toggle-on.png" alt="toggle-on"/> */}
                    </div>

                    <hr/>

                    <div className={styles.settings_block}>
                        <p className={styles.settings_name}>Анимация конфетти в случае победы</p>

                        <img width="44" height="44" 
                        className={styles.settings_btn}
                        onClick={() => dispatch(toggleConfetti())}
                        src={
                            confettiEnabled
                                ? "https://img.icons8.com/ios-filled/50/toggle-on.png"
                                : "https://img.icons8.com/ios/50/toggle-off.png"
                        } alt="toggle"/>

                        {/* <img width="44" height="44" src="https://img.icons8.com/ios-filled/50/toggle-on.png" alt="toggle-on"/> */}
                    </div>

                    <hr/>

                    <div className={styles.settings_block}>
                        <p className={styles.settings_name}>Поменять местами кнопки “Ввод” и “Удалить”</p>

                        <img
                            onClick={() => dispatch(toggleSwapEnterDel())}
                            className={styles.settings_btn}
                            width="44" height="44" src={
                                swapEnterDel
                                        ? "https://img.icons8.com/ios-filled/50/toggle-on.png"
                                        : "https://img.icons8.com/ios/50/toggle-off.png"
                            } alt="toggle-off"/>

                        {/* <img width="44" height="44" src="https://img.icons8.com/ios-filled/50/toggle-on.png" alt="toggle-on"/> */}
                    </div>

                    <hr/>

                    <div className={styles.settings_block}>
                        <div className={styles.settings_block_descr}>
                            <p className={styles.settings_name}>Сложный мод</p>

                            <ul className={styles.settings_descr}>
                                <li className={styles.settings_descr_one}>Игрок обязан учитывать все найденные буквы.</li>
                                <li className={styles.settings_descr_one}>На игру дается 2 минуты.</li>
                                <li className={styles.settings_descr_one}>Отключена возможность посмотреть подсказку.</li>
                            </ul>

                        </div>

                            <img
                                onClick={() => dispatch(toggleHardMode())}
                                className={styles.settings_btn}
                                width="44"
                                height="44"
                                src={
                                    hardMode
                                        ? "https://img.icons8.com/ios-filled/50/toggle-on.png"
                                        : "https://img.icons8.com/ios/50/toggle-off.png"
                                }
                            />

                        {/* <img width="44" height="44" src="https://img.icons8.com/ios-filled/50/toggle-on.png" alt="toggle-on"/> */}
                    </div>

                    <hr/>

                    <div className={styles.settings_block}>
                        <div className={styles.settings_block_descr}>
                            <p className={styles.settings_name}>Подсказки с количеством букв</p>

                            <ul className={styles.settings_descr}>
                                <li className={styles.settings_descr_one}>Если буква встречается чаще 1 раза в слове, высветится подсказка.</li>
                            </ul>
                        </div>

                        <img width="44" height="44" src="https://img.icons8.com/ios/50/toggle-off.png" alt="toggle-off"/>

                        {/* <img width="44" height="44" src="https://img.icons8.com/ios-filled/50/toggle-on.png" alt="toggle-on"/> */}
                    </div>
                    <hr/>
                </div>


            </div>
        </div>
    );
}