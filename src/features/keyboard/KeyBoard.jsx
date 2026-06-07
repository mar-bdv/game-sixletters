import { useSelector } from "react-redux";
import KeyButton from "./KeyButton";
import styles from "./keyboard.module.scss";

export default function KeyBoard({ onKeyPress }) {

    const swapEnterDel = useSelector(
        state => state.game.swapEnterDel
    );

    const bottomRow = swapEnterDel
    ? ["ENTER","Я","Ч","С","М","И","Т","Ь","Б","Ю","DEL"]
    : ["DEL","Я","Ч","С","М","И","Т","Ь","Б","Ю","ENTER"] ;

    const keyboardRows = [
        ["Й","Ц","У","К","Е","Н","Г","Ш","Щ","З","Х","Ъ"],
        ["Ф","Ы","В","А","П","Р","О","Л","Д","Ж","Э"],
        bottomRow
    ];

    // const keyboardRows = [
    //     ["Й","Ц","У","К","Е","Н","Г","Ш","Щ","З","Х","Ъ"],
    //     ["Ф","Ы","В","А","П","Р","О","Л","Д","Ж","Э"],
    //     ["DEL","Я","Ч","С","М","И","Т","Ь","Б","Ю","ENTER"]

    //     // swapEnterDel
    //     // ? ["DEL","Я","Ч","С","М","И","Т","Ь","Б","Ю","ENTER"]
    //     // : ["ENTER","Я","Ч","С","М","И","Т","Ь","Б","Ю","DEL"]
    // ];
    console.log(bottomRow);
    

    return (
        <section className={styles.keyboard}>
            {keyboardRows.map((row, i) => (
                <div className={styles.keyboard_row} key={i}>
                    {row.map((key, index) => (
                        <KeyButton
                            key={index}
                            value={key}
                            onClick={onKeyPress}
                        />
                    ))}
                </div>
            ))}
        </section>
    );
}