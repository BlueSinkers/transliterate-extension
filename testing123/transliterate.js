const { Sanscript } = require('@indic-transliteration/sanscript');

const inputDevanagari = "बदले उसकी मुस्कान के, आसां का क़तरा जो मिला, वे कमलिया, वे कमलिया";

const schemes = ['iast', 'itrans', 'hk', 'velthuis', 'slp1'];

console.log("🔤 Input (Devanagari):", inputDevanagari);
console.log("");

schemes.forEach((scheme) => {
    const output = Sanscript.t(inputDevanagari, 'devanagari', scheme);
    console.log(`🔠 ${scheme.toUpperCase()} Transliteration:`);
    console.log(output);
    console.log("--------------------------------------------------");
});
