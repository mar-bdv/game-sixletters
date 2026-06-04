import { Outlet } from "react-router-dom";
import Header from "../../widgets/Header/Header";
import Footer from "../../widgets/Footer/Footer";
import styles from "./main.module.scss"
import { useSelector } from "react-redux";
import RulesModal from "../../features/modal/components/RulesModal";
import { useEffect } from "react";
import StatsModal from "../../features/modal/components/StatsModal";
import SettingsModal from "../../features/modal/components/SettingsModal";
import GameResultModal from "../../features/modal/components/GameResultModal";
import NotificationContainer from "../../features/modal/components/Notifications/NotificationContainer";

export default function MainLayout() {
    const activeModal = useSelector(
        (state) => state.modal.activeModal
    );


    console.log("activeModal", activeModal);

    useEffect(() => {
        document.body.style.overflow =
            activeModal ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [activeModal]);

    


    return (
        <>
            <div className={styles.mainLayout}>
                
                <Header />
                <hr className={styles.mainLayout_hr}></hr>
                <NotificationContainer />
                
            </div>

            <main>
                <Outlet />
            </main>

            <Footer />

            {activeModal === "rules" && <RulesModal />}
            {activeModal === "stats" && <StatsModal />}
            {activeModal === "settings" && <SettingsModal />}
            {activeModal === "result" && <GameResultModal />}
        </>
    );
}