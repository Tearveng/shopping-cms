export const detectLang = (text: string) => {
    const khmerRegex = /[\u1780-\u17FF]/;
    return khmerRegex.test(text) ? "kh" : "en";
}