import { useSelector } from "react-redux";
import Notification from "./Notification";
import styles from "./notification.module.scss"


export default function NotificationContainer() {
    const messages = useSelector(
        state => state.notification.messages
    );

    return (
        <div className={styles.notifications}>
            {messages.map(msg => (
                <Notification
                    key={msg.id}
                    id={msg.id}
                    text={msg.text}
                />
            ))}
        </div>
    );
}