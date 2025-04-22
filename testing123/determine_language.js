function isIndic(text) {
    // Unicode ranges for major Indic scripts
    const indicRanges = [
        [0x0900, 0x097F],  // Devanagari
        [0x0980, 0x09FF],  // Bengali
        [0x0A00, 0x0A7F],  // Gurmukhi
        [0x0A80, 0x0AFF],  // Gujarati
        [0x0B00, 0x0B7F],  // Oriya
        [0x0B80, 0x0BFF],  // Tamil
        [0x0C00, 0x0C7F],  // Telugu
        [0x0C80, 0x0CFF],  // Kannada
        [0x0D00, 0x0D7F],  // Malayalam
        [0x0D80, 0x0DFF],  // Sinhala
    ];

    for (let char of text) {
        const code = char.charCodeAt(0);
        for (let [start, end] of indicRanges) {
            if (code >= start && code <= end) {
                return true;
            }
        }
    }
    return false;
}

// 🔤 Sample usage
const sampleInputs = [
    "बदले उसकी मुस्कान के", // Hindi
    "hello how are you",     // English
    "எப்படி இருக்கிறீர்கள்",    // Tamil
    "你好"                   // Chinese
];

for (let input of sampleInputs) {
    const result = isIndic(input);
    console.log(`"${input}" ➝ ${result ? "Indic script ✅" : "Not Indic ❌"}`);
}
