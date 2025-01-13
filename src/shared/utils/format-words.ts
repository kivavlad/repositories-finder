export const transformWords = (num: number, words: string[]): string => {
    if (words.length !== 3) {
        throw new Error("Массив должен содержать три варианта слов");
    }

    const n = num % 10;
    const n10 = num % 100;

    if (n10 > 10 && n10 < 20) {
        return `${num} ${words[2]}`;
    }

    if (n === 1) {
        return `${num} ${words[0]}`;
    }
    
    if (n > 1 && n < 5) {
        return `${num} ${words[1]}`;
    }

    return `${num} ${words[2]}`;
}