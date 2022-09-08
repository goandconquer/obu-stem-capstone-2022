var chooseFile = document.getElementById("choosefile");

chooseFile.addEventListener("change", function() {

    var fileReader = new FileReader();
    var fileOutput = document.getElementById("fileoutput");

    console.log(fileOutput);

    fileReader.onload = async function(event) {

        fileOutput.textContent = fileReader.result;

        if (event.target.readyState == FileReader.DONE) {

            var data = event.target.result;
            console.log(data);

        }

        var total = data.length;

        var alphabet = [];
        var counts = [];
        var frequencies = [];

        // @CONSIDER: 97-122 is the range for lower-cass ascii letters. This does not support capitalization or punctuation.

        console.log("Testing letter frequency")
        const response = await fetch('http://localhost:8080/letterFrequency');
        const myJson = await response.json();
        console.log(myJson)

        let letterfrequency = document.getElementById("letterfrequency");

        for (let letter in myJson) {

            letterfrequency.append(letter + " frequency : " + myJson[letter] + " |  ");

        }

        for (let i = 97; i < 123; i++) {

            let letter = String.fromCharCode(i);
            alphabet.push(letter);
            counts.push(data.split(letter).length - 1);
            frequencies.push(counts[i - 97] / total);

        }

        createLetterFrequencyTable(alphabet, counts, frequencies);

    }

    fileReader.readAsText(this.files[0]);

});

function createLetterFrequencyTable(someAlphabet, someCounts, someFrequncies) {

    let alphabet = someAlphabet;
    let counts = someCounts;
    let frequencies = someFrequncies;

    let table = document.createElement("table");
    table.setAttribute("id", "letterFrequencyTable")

    let thead = document.createElement("thead");
    thead.setAttribute("id", "letterFrequencyTableHead")
    
    let tbody = document.createElement("tbody");
    tbody.setAttribute("id", "letterFrequencyTableBody")

    // let talphabet = document.createElement("tr");
    // talphabet.setAttribute("id", "letterAlphabet");

    // let tcount = document.createElement("tr");
    // tcount.setAttribute("id", "letterCount");

    // let tfrequency = document.createElement("tr");
    // tfrequency.setAttribute("id", "letterFrequncy");

    table.appendChild(thead);
    table.appendChild(tbody);

    let letterfrequency = document.getElementById("letterfrequency");
    letterfrequency.appendChild(table);

    console.log(letterfrequency);

    // @SECTION
    //
    // This section of the program populates the rows of the table with the data collected from the letter frequency function.
    // It does this row by row. First, it populates the header "alphabet" row. Then, the body "letter count" row and finally
    // the body "frequency" row.

    for (let m = 0; m < 26; m++) {

        let trow = document.createElement("tr");
        trow.setAttribute("id", "tableRow");
        tbody.appendChild(trow);

    }

    for (let i = 0; i < 26; i++) {

        let tdata = document.createElement("td");
        tdata.textContent = alphabet[i];
        table.rows[i].appendChild(tdata);

    }

    for (let j = 0; j < 26; j++) {

        let tdata = document.createElement("td");
        tdata.textContent = counts[j];
        table.rows[j].appendChild(tdata);

    }

    for (let k = 0; k < 26; k++) {

        let tdata = document.createElement("td");
        tdata.textContent = Math.round(frequencies[k] * 100) / 100;
        table.rows[k].appendChild(tdata);

    }

};

let submit = document.getElementById("submit");

let isFirstPressed = true;

let newCipherText = "";

submit.addEventListener("click", function() {

    let find = document.getElementById("find").value;
    let replace = document.getElementById("replace").value;
    let fileoutput = document.getElementById("fileoutput").textContent

    let sandboxtext = document.createElement("p");
    sandboxtext.setAttribute("id", "sandboxtext");

    if (isFirstPressed) {

        // @CONSIDER: Is it the first time that the submit button has been pressed?

        newCipherText = computeReplacementText(find, replace, fileoutput);
        sandboxtext.textContent = newCipherText;

        isFirstPressed = false;

    } else {

        newCipherText = computeReplacementText(find, replace, newCipherText);
        sandboxtext.textContent = newCipherText;

    }

    var solve = document.getElementById("solve")

    if (solve.hasChildNodes) {
        
        solve.removeChild(solve.firstChild)

    }

    document.getElementById("solve").appendChild(sandboxtext);

    let lastReplacement = document.createElement("p");
    lastReplacement.textContent = (find + " was replaced by " + replace);

    document.getElementById("previousReplacements").appendChild(lastReplacement);

});

function computeReplacementText(find, replace, text) {

    let result = "";

    result = text.replaceAll(find, replace);

    return result; 

}