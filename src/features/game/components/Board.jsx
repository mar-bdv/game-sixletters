import Row from "./Row";
import styles from "./board.module.scss";

export default function Board({ board }) {
    return (
        <section className={styles.board}>
            {board.map((row, i) => (
                <Row key={i} row={row} />
            ))}
        </section>
    );
}