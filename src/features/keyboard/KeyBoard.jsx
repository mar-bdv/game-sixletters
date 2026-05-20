import KeyButton from "./KeyButton";
import styles from "./keyboard.module.scss";

export default function KeyBoard({ onKeyPress }) {
    const keyboardRows = [
        ["Й","Ц","У","К","Е","Н","Г","Ш","Щ","З","Х","Ъ"],
        ["Ф","Ы","В","А","П","Р","О","Л","Д","Ж","Э"],
        ["DEL","Я","Ч","С","М","И","Т","Ь","Б","Ю","ENTER"]

        // swapEnterDel
        // ? ["DEL","Я","Ч","С","М","И","Т","Ь","Б","Ю","ENTER"]
        // : ["ENTER","Я","Ч","С","М","И","Т","Ь","Б","Ю","DEL"]
    ];

    return (
        <section className={styles.keyboard}>
            {keyboardRows.map((row, i) => (
                <div className={styles.keyboard_row} key={i}>
                    {row.map((key) => (
                        <KeyButton
                            key={key}
                            value={key}
                            onClick={onKeyPress}
                        />
                    ))}
                </div>
            ))}
        </section>
    );
}