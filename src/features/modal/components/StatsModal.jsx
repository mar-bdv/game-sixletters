import { useDispatch } from "react-redux";

import { closeModal } from "../slices/modalSlice";

import styles from "./modals.module.scss";

export default function StatsModal() {
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
                    <h2 className={styles.header}>Статистика</h2>
                </div>

                <div className={styles.stats_container}>
                    <div className={styles.stats_row}>
                        <div className={styles.stats_oneblock}>
                            <p className={styles.stats_oneblock_number}>0</p>
                            <p className={styles.stats_oneblock_descr}>игр сыграно в общем</p>
                        </div>

                        <div className={styles.stats_oneblock}>
                            <p className={styles.stats_oneblock_number}>0</p>
                            <p className={styles.stats_oneblock_descr}>побед в общем</p>
                        </div>
                    </div>

                    <hr/>

                    <div className={styles.stats_row}>
                        <div className={styles.stats_oneblock}>
                            <p className={styles.stats_oneblock_number}>0%</p>
                            <p className={styles.stats_oneblock_descr}>процент выигрышей</p>
                        </div>

                        <div className={styles.stats_oneblock}>
                            <p className={styles.stats_oneblock_number}>0</p>
                            <p className={styles.stats_oneblock_descr}>дней подряд вы играли в эту игру</p>
                        </div>
                    </div>

                    <hr/>

                    <div className={styles.stats_row}>
                        <div className={styles.stats_oneblock}>
                            <p className={styles.stats_oneblock_number}>0</p>
                            <p className={styles.stats_oneblock_descr}>игр сыграно в сложном моде</p>
                        </div>

                        <div className={styles.stats_oneblock}>
                            <p className={styles.stats_oneblock_number}>0</p>
                            <p className={styles.stats_oneblock_descr}>побед в сложном моде</p>
                        </div>
                    </div>
                </div>

                <div className={styles.stats_reset_block}>
                    <button className={styles.stats_reset}>Сбросить статистику</button>
                </div>

            </div>
        </div>
    );
}