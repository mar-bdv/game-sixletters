import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnimationRow } from "../gameSlice";
import Row from "./Row";
import styles from "./board.module.scss";

export default function Board({ board }) {
    const dispatch = useDispatch();

    const animationRow = useSelector(
        (state) => state.game.animationRow
    );

    useEffect(() => {
        if (animationRow === null) return;

        const t = setTimeout(() => {
            dispatch(setAnimationRow(null));
        }, 600);

        return () => clearTimeout(t);
    }, [animationRow, dispatch]);

    

    return (
        <section className={styles.board}>
            {board.map((row, i) => (
                <Row
                    key={i}
                    row={row}
                    rowIndex={i}
                />
            ))}
        </section>

    );
}