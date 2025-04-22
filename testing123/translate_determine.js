const { Sanscript } = require('@indic-transliteration/sanscript');

// Check if the text contains Indic script
function isIndic(text) {
    const indicRanges = [
        [0x0900, 0x097F], [0x0980, 0x09FF], [0x0A00, 0x0A7F],
        [0x0A80, 0x0AFF], [0x0B00, 0x0B7F], [0x0B80, 0x0BFF],
        [0x0C00, 0x0C7F], [0x0C80, 0x0CFF], [0x0D00, 0x0D7F],
        [0x0D80, 0x0DFF]
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

// Remove diacritics (macrons, dots, etc.) for simplified output
function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// MAIN
function transliterateIfIndic(text) {
    console.log(`📥 Input: ${text}\n`);

    if (!isIndic(text)) {
        console.log("❌ Not an Indic script. No transliteration performed.");
        return;
    }

    const iast = Sanscript.t(text, 'devanagari', 'iast');
    const simplified = removeDiacritics(iast);

    console.log("✅ Detected Indic script.");
    console.log("\n🔡 IAST Transliteration (with marks):");
    console.log(iast);
    console.log("\n🔡 Simplified Latin (no diacritics):");
    console.log(simplified);
}

// 👇 Example usage
const inputText = "बदले उसकी मुस्कान के, आसां का क़तरा जो मिला, वे कमलिया, वे कमलिया";
transliterateIfIndic(inputText);
