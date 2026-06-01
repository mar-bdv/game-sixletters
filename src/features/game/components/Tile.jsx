import styles from "./board.module.scss";


export default function Tile({ letter, status, animate }) {
    return (
        <div
            className={`${styles.tile} ${styles[status]} ${
                animate ? styles.flip : ""
            }`}
            //style={{ animationDelay: `${index * 0.12}s` }}
        >
            {letter}
        </div>
    );
}