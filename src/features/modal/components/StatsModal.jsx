import { useDispatch, useSelector } from "react-redux";

import { closeModal } from "../slices/modalSlice";

import styles from "./modals.module.scss";
import { resetStats } from "../slices/statsSlice";

export default function StatsModal() {
    const dispatch = useDispatch();
    
    const {
        totalGames,
        totalWins,
        hardGames,
        hardWins,
        streak,
    } = useSelector(
        state => state.stats
    );


    const handleReset = () => {
        const confirmed = window.confirm(
            "Вы уверены, что хотите сбросить статистику? Это действие необратимо."
        );

        if (!confirmed) return;

        dispatch(resetStats());
        dispatch(closeModal());
    };

    const winRate =
        totalGames === 0
            ? 0
            : Math.round(
                (totalWins / totalGames) * 100
            );

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
                    <h2 className={styles.header}>Статистика</h2>
                </div>

                <div className={styles.stats_container}>
                    <div className={styles.stats_row}>
                        <div className={styles.stats_oneblock}>
                            <p className={styles.stats_oneblock_number}>{totalGames}</p>
                            <p className={styles.stats_oneblock_descr}>игр сыграно в общем</p>
                        </div>

                        <div className={styles.stats_oneblock}>
                            <p className={styles.stats_oneblock_number}>{totalWins}</p>
                            <p className={styles.stats_oneblock_descr}>побед в общем</p>
                        </div>
                    </div>

                    <hr/>

                    <div className={styles.stats_row}>
                        <div className={styles.stats_oneblock}>
                            <p className={styles.stats_oneblock_number}>{winRate}%</p>
                            <p className={styles.stats_oneblock_descr}>процент выигрышей</p>
                        </div>

                        <div className={styles.stats_oneblock}>
                            <p className={styles.stats_oneblock_number}>{streak}</p>
                            <p className={styles.stats_oneblock_descr}>дней подряд вы играли в эту игру</p>
                        </div>
                    </div>

                    <hr/>

                    <div className={styles.stats_row}>
                        <div className={styles.stats_oneblock}>
                            <p className={styles.stats_oneblock_number}>{hardGames}</p>
                            <p className={styles.stats_oneblock_descr}>игр сыграно в сложном моде</p>
                        </div>

                        <div className={styles.stats_oneblock}>
                            <p className={styles.stats_oneblock_number}>{hardWins}</p>
                            <p className={styles.stats_oneblock_descr}>побед в сложном моде</p>
                        </div>
                    </div>
                </div>

                <div 
                    className={styles.stats_reset_block}
                    onClick={handleReset}
                >
                    <button className={styles.stats_reset}>Сбросить статистику</button>
                </div>

            </div>
        </div>
    );
}