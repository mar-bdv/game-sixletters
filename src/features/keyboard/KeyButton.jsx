import { useSelector } from "react-redux";
import styles from "./keyboard.module.scss";


export default function KeyButton({ value, onClick }) {
    const isWide = value === "ENTER" || value === "DEL";

    const status = useSelector(
        (state) => state.game.usedLetters[value]
    );

    const getLabel = () => {
        if (value === "ENTER") return "Ввод";

        if (value === "DEL")
            return (
                <img
                    src="https://img.icons8.com/?size=100&id=37422&format=png&color=000000"
                    alt="Delete"
                    width={50}
                    height={50}
                />
            );

        return value;
    };

    return (
        <button
            className={`${styles.key} ${styles[status]} ${isWide ? styles.wide : ""}`}
            onClick={() => onClick(value)}
        >
            {getLabel()}
        </button>
    );
}