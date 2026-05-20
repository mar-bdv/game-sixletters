import styles from "./board.module.scss";

export default function Tile({ letter, status, animated, index }) {


    return (
        <div
            className={`${styles.tile} ${styles[status]} ${
                animated ? styles.flip : ""
            }`}
            style={{
                animationDelay: `${index * 0.20}s`,
            }}
        >
            {letter}
        </div>
    );
}