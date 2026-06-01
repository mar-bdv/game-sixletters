import { useSelector } from "react-redux";
import Tile from "./Tile";
import styles from "./board.module.scss";


export default function Row({ row, rowIndex }) {
    const animationRow = useSelector(
        (state) => state.game.animationRow
    );

    return (
        <div className={styles.board_row}>
            {row.map((cell, i) => (
                <Tile
                    key={i}
                    {...cell}
                    index={i}
                    animate={animationRow === rowIndex}
                />
            ))}
        </div>
    );
}