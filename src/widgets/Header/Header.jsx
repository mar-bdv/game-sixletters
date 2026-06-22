import { useDispatch, useSelector } from 'react-redux';
import styles from './header.module.scss'
import { toggleModal } from '../../features/modal/slices/modalSlice';
import { restartGame } from '../../features/game/gameSlice';

function Header() {
    const dispatch = useDispatch();

    const hintAvailable = useSelector(
        state => state.game.hintAvailable
    );

    const hintLetter = useSelector(
        state => state.game.hintLetter
    );

    const gameStatus = useSelector(
        (state) => state.game.gameStatus
    );

    const handleRestart = () => {
        const confirmed = window.confirm(
            "Начать новую игру? Текущий прогресс будет потерян."
        );

        if (confirmed) {
            dispatch(restartGame());
        }
    };

    return (
        <div className={styles.header}>
            
            <div className={styles.header_icons}>
                <button className={styles.header_btn} onClick={() => dispatch(toggleModal("rules"))}>
                    <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADoElEQVR4nO2Zy0tVURTGf5WvsgZ2nQQ1KYuofNJt0AudRw8oGwXRuD+gBpUSTUq7DSp0EFSjJuYrEQqaRNAkkzS1QbMaWGpkRektb2z4DmxEz737PK4N7gcbvJ611t77nG+tvdbaUEAB/wVKgSagFegGxoAZYB6Y09/v9MzINEpnxdEAdAJfgYzjMDodQP1KLLwOGFy0oCGgDTgJ1AAVQLFGhf5nnrUDbyy9BWBAz2PHWiAF/NHks8B1YGcAW0bnhmwYW2ltroyYsB0Y1mTzetvmzYbFRuCmNpDR16kiYuwDvmgC46C1MdFyXHN8BpJRLv67DJsoUk58WA/0WPRMRkEb783fB9YQP4qAB9aX2BbGYYetN5+Pxdub6LWiWyDHTlmcj5M2fnSa0BpMwHB2qLRGbQDamajyEvgEfAReABeBSkdb9dY6ql0UBwPu/ALw1zqkfi76PQ0cCciEfpf0wCh8c4zzl6T3C7gGbLF86QDwVM9NbrTf8ZyY1YltmJEVnZrInJK5YhPwW5OcWkZmNfBEtl/hhjbp3c0mWGolZi7pwXnpPMsit8ei02YH+7ssCpb4CTZZocsFV6V3OovcKn2pjGjlgrfSO+wn1BrQeQ1Pj+ZwVpSLZmaOHQGd+YqfkHeMm7Q3DpyV/Uml2S5olu5jP6ExCTnFXAceT8u+CbeuqJXuqJ/QlIQMJaLEMSs49AZMSyqlb3KzZTEnIV9Pd0CxTmWP96kA1LEjZEZBIG8buCd7U/oKYVCaywY8CiUIDy8k/4iocK/MhUJROnGHbN0mGtTm4sTdEYbRAdk6RzRolr2uOA6ypdAvW8eJBinZu+wn1Gh1BsLCZLUtwDqiwYjWdiibp88ESObixm4rmhXn6nwu6XTcaM81nUYhb0FFRNQnchAk1NZZcClvvQhiTtEgMGnzI6UPZwiHW1pLn4tSjVVM51TGLfHWvMLlOeECQVqtTFMMBeLduFocrjB8/QCcIBg2AO+1BtNAdkaZ1QbvUbMpXygSZczcr8NchlSpvZdRuy8fmygCHlqFz9awBpNWD783IJ1caNNnNXf3RmU4aX2JiZiuhRoszk9GuXibTkPWbUoqorQ7oVCZtjgfmjZ+jt1mTTar36beDZIetFt3D/OKNnm5vaxWtumVihn1bVJKe+t0ipdoJPS/ZsmMLLrk69OG8o46xXuv2+AyTGJ2J6brKmeUKM1tUcExqgXOaUzprXepMXUwRHFfQAFEiH99ijpJqkxAQgAAAABJRU5ErkJggg==" 
                    alt="rules"
                    className={styles.header_icon}
                    title="Правила игры"></img>
                </button>
                
                {(hintAvailable || hintLetter) && gameStatus === "playing" && (
                    <button
                        className={styles.header_btn}
                        onClick={() => dispatch(toggleModal("hint"))}
                    >
                        <img
                            src="https://img.icons8.ru/windows/32/idea--v1.png"
                            alt="hint"
                            className={styles.header_icon}
                            title="Посмотреть подсказку"
                        />
                    </button>
                )}

            </div>


            <h1 className={styles.header_heading}>Угадай слово</h1>

        
        
            <div className={styles.header_icons}>
                <button
                    className={styles.header_btn}
                    onClick={() => dispatch(handleRestart)}
                >
                    <img
                        width="32"
                        height="32"
                        src="https://img.icons8.ru/sf-regular/48/repeat.png"
                        alt="restart"
                        className={styles.header_icon}
                        title="Начать заново"
                    />
                </button>
                
                <button
                    className={styles.header_btn}
                    onClick={() => dispatch(toggleModal("stats"))}
                >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAALklEQVR4nGNgGAXDBfzHgkctoL4F//EYMmoB9Swg15D/oxaAwKgFw8SCUUB/AADyuLNNAycSaQAAAABJRU5ErkJggg==" 
                    alt="statistics"
                    className={styles.header_icon}
                    title="Статистика"></img>
                </button>
            
            
                <button
                    className={styles.header_btn}
                    onClick={() => dispatch(toggleModal("settings"))}
                >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE00lEQVR4nO2aWWhdVRSGP6xJixm01qoYW4fYwRSxILGtig8VfFD0QWlFELHUJ/tisaDUAaR1qm2ijU8OLxWHN4cHp6JWwfqirVAFFa1DakUQ1CQ114yy4D+wPDl373PPPTdytT9ccnPX2sPaZ++1/rX2geP4f+AxYBKYTn3GgS00EQYzjEg+B2gSdAJTwCgwx/3eod8rwIk0AVZr5Q9myL6XbDn/Is4BNgMLI3obNNkXM2SvS7Yu0sdC4E5gESVjCXBEk/gFuDag+7j07suQPSzZg4H2a4GfpPcj0E1JuMAZ8bv+2l7vA+amdFuA96RzQ0ZfN0v2Zur8GFqBHc7b/VGmMd6IfTqw9wBj+u0zoAc4H3gK+NV5J2ubxnIn/1lP7yxgKfCJc9Fb5TQ+LMOYs1NGtDlZL/C1ZKMa3L5PAO8Dtwb6vR34WE91Wl5sRN+/AVY53faUMV1FDEkO7Z/AqRlyG+Q56QwDjwJn1Og8BmSI9bFHTyGNBZqD6dxWxBB7Al+pg50BvYs1WFF0pZ5CGrs0hy9Tu6ImXKLzMClvMtu4UmOPR4zNhQe0IkeqbLFG4RTgh4ArrxlGJ/arwxeYPbykMT/KcNV1BcTkwK2k8bjCOZHSAiLy8xMKUvNz6K8A+oHP5VpH9L1fshgW62za4p1OiXhGK7QtotcqlzoRoPEm2y3dEJ6W/vayjJinJ2ErdFrEiL0uSD4BXCqX2Sav86SLG3sjxiyVnh34E4pM/GRgjSLwLhdZ3460G3AR+KJI3EkSL3syIRyQ3jviYRu0OFmB8x/pabXMbipCvVdoy4xGjPDGVNTGuFo13BHYorZgj2Q1SljnMRG4PSKI1+vwhdCvtvY3L3arjbHomMe8EbhXOc5BLdi05jwDiaVF9uMXamtkMi9Wqc2hAuPNcfOdgaqCHBhWWyOSedGuNkMFx5xuhCFDBQzpdAlUQwzpqGNrmUeptUhRZGt1hAwZdx7qW+AVBcB1OWhCctgtTuRF4q7NxYewDLgJeAh4DTjskjKb8wxskd+u1OF+K3KtMRhf+yuH+91UxfVWNNe7Ymy3x63Cu2r8Vk53OhgxZqVLoS365wmIb2h3rAcuLFrgm6fqyVgkE2xxFKUiw1bLAbSLLQzoSSQUxdo0jKLUQ+BaZUCINI7rSbTkHHMbJWKJJjdUA43vk0ca1ueQDnboTCRY1Cga3+NoQR4uVS8u01gj2mKlYK74jXX8LLOH5zXmpzlyl1zod8WzIsGyKNpdEdAofF24WjGklHJMAfTqrNgcrinaiZX2j2pF7o4MFsoc8xTo7ExUw1bN4WiOK41MbFYHv1XJyOa7ks2IErMza+j/XBW+EybxchWP2OluAezOpGYsdhnjB6ly5VplaEki5ovYVvC+JdDvxowidpIGDAJXOd02jZ1khIUvfrqdMfsU2Xe6bHK/dM5TIEyuFaZUpM6KR/5aYYeuFbpdEXBS8WaBxqz7WiHLmKRIN6YyZroC2OIGvy6jr/WumJBua//f7+5ekrEGyyzS2ep+p46N4l8e0O0LOIjtOWhHryrviRFZF0Z1oUv3EydF9Da6+440XpXMmHUIbSr9FLrYKQtrNFmrxKRxWDKj4k3zwsCxFP1uuhcGcIlTU7/Cge4Tq71UE0xPj4P/CP4GdM3Fkxh1C08AAAAASUVORK5CYII=" 
                    alt="settings--v1"
                    className={styles.header_icon}
                    title="Настройки"></img>
                </button>
            </div>

            
        
        </div>
    )

}

export default Header;