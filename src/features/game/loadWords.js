export async function loadWords() {
    const res = await fetch("/rus_words_new.txt");
    const text = await res.text();

    return text
        .split("\n")
        .map(w => w.trim().toUpperCase())
        .filter(Boolean);
}

export async function loadSixLetterWords() {
    const words = await loadWords();
    return words.filter(w =>
        w.length === 6 &&
        /^[А-ЯЁ]+$/.test(w)
    );
}