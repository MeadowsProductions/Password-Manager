// Obfuscated code for original created "Base64Key Cipher" or "B64KC"
// Please do not copy this, or atleast ask before doing so (for19958@gmail.com)
// And give credits! :D

export default {
    keyCodeToChar: function(keyCode) {
        return String.fromCharCode(Number(keyCode));
    },
    
    keyCodesToOriginalString: function(keyCodes) {
        const chars = keyCodes.split(',').map(this.keyCodeToChar);
        return chars.join('');
    },
    
    decode: function(encodedString) {
        const decodedKeyCodes = atob(encodedString);
        return this.keyCodesToOriginalString(decodedKeyCodes);
    },
    
    charToKeyCode: function(char) {
        return char.charCodeAt(0).toString();
    },
    
    stringToKeyCodes: function(inputString) {
        const keyCodes = inputString.split('').map(this.charToKeyCode);
        return keyCodes.join(',');
    },
    
    keyCodesToBase64: function(keyCodes) {
        const keyCodesString = keyCodes;
        const encoded = btoa(keyCodesString);
        return encoded;
    },
    
    encode: function(inputString) {
        const keyCodes = this.stringToKeyCodes(inputString);
        const encoded = this.keyCodesToBase64(keyCodes);
        return encoded;
    },
}