import CryptoJS from "crypto-js";

    var message = 'Message';
    var key = '38346591';
    
    var ciphertext = "ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDyF5QrvLtDHxpLnF8+OVU91+d5uIMVD1F2lyRnvX+kiQnX/yrCF3lJThw7tS9a8Gtq";

    function encryptByDES(message, key) {

        var keyHex = CryptoJS.enc.Utf8.parse(key);

        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        return encrypted.toString();
    }
    
    function decryptByDES(ciphertext, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);
    
        // direct decrypt ciphertext
        var decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    
    
    //console.info('ciphertext:', ciphertext);
    
    //var plaintext = decryptByDES(ciphertext, key);

    //console.info('plaintext :', plaintext);
