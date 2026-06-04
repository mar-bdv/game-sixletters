import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../../modal/slices/notificationSlice";
import styles from "./notification.module.scss"

export default function Notification({
    id,
    
}) {
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeNotification(id));
        }, 2000);

        return () => clearTimeout(timer);
    }, [id, dispatch]);

    return (
        <div className={styles.notification_block}>
            <p className={styles.notification_text}>В словаре нет такого слова!<br/>Попробуйте другое, например "макияж"</p>
        </div>
    );
}