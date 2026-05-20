import Tile from "./Tile";
import styles from "./board.module.scss";

export default function Row({ row }) {
    return (
        <div className={styles.board_row}>
            {row.map((cell, i) => (
                <Tile 
                key={i} 
                {...cell} 
                index={i}
                />
            ))}
        </div>
    );
}