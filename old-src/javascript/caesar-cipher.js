// @TODO: Display graphical table showing the current alphabet letter pairings based on the current shift value.

var plaintext = document.getElementById("plaintext");
var ciphertext = document.getElementById("ciphertext");
var encrypt = document.getElementById("encrypt");
var decrypt = document.getElementById("decrypt");
var reset = document.getElementById("reset");
var shift = document.getElementById("shift");
var alphabet = "abcdefghijklmnopqrstuvwxyz";

encrypt.addEventListener("click", function() {

    if (shift.value > 26) {

        alert("Please keep the shift value between a range of 0 and 26.");
        return;

    }

    ciphertext.value = "";

    let listOfChars = Array.from(plaintext.value);
    let shiftedLetter = '';
    let shiftByValue = Number(shift.value)

    for (let letter = 0; letter < listOfChars.length; letter++) {

        let currentLetter = listOfChars[letter].charCodeAt();
        shiftedLetter = (currentLetter + shiftByValue);

        if (currentLetter < 65 || (currentLetter > 90 && currentLetter < 97) || currentLetter > 122) {

            shiftedLetter = currentLetter;
            
        } else if (currentLetter >= 65 && currentLetter <= 90 && shiftedLetter > 90) {

            shiftedLetter -= 26;

        } else if (currentLetter >= 97 && currentLetter <= 122 && shiftedLetter > 122) {

            shiftedLetter -= 26;

        }
        
        ciphertext.value += String.fromCharCode(shiftedLetter);

    }

});

decrypt.addEventListener("click", function() {

    if (shift.value > 26) {

        alert("Please keep the shift value between a range of 0 and 26.");
        return;

    }

    plaintext.value = "";

    let listOfChars = Array.from(ciphertext.value);
    let shiftedLetter = '';
    let shiftByValue = Number(shift.value);

    for (let letter = 0; letter < listOfChars.length; letter++) {

        let currentLetter = listOfChars[letter].charCodeAt();
        shiftedLetter = (currentLetter - shiftByValue);

        if (currentLetter < 65 || (currentLetter > 90 && currentLetter < 97) || currentLetter > 122) {

            shiftedLetter = currentLetter;
            
        } else if (currentLetter >= 65 && currentLetter <= 90 && shiftedLetter < 65) {

            shiftedLetter += 26;

        } else if (currentLetter >= 97 && currentLetter <= 122 && shiftedLetter < 97) {

            shiftedLetter += 26;

        }

        plaintext.value += String.fromCharCode(shiftedLetter);

    }

});

reset.addEventListener("click", function() {

    plaintext.value = "";
    ciphertext.value = "";
    shift.value = 0;

});