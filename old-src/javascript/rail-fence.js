// @TODO: Implement conditional check that prevents encryption/decryption if the corresponding text area is blank.

// @INFO: Textareas.
var plainText = document.getElementById("plaintext");
var cipherText = document.getElementById("ciphertext")
var railKey = document.getElementById("railkey");

// @INFO: Buttons.
var encrypt = document.getElementById("encrypt");
var decrypt = document.getElementById("decrypt");
var reset = document.getElementById("reset");
var grid = document.getElementById("grid");

// @INFO: Table.
var visualGrid = document.getElementById("visualgrid");

// @INFO: Miscellaneous.
let tconcat = "";
let tarray = [];
let tableCreated = false;

grid.addEventListener("click", function() {

    if (checkConditions()) {

        createTableElement();
        createTableRows();
        populateEmptyTable();
        populateWithPlainText();

    }

});

function checkConditions() {

    if (plainText.value == "") {

        alert("Please enter text to be encrypted.");
        return false;

    } else if (railKey.value < 2) {

        alert("Please set the rail key to a value greater than or equal to zero.");
        return false;

    } else if (tableCreated == true) {

        alert("Please reset the application using the provided button before attempting to redraw a grid.")
        return false;

    }

    return true;

}

function createTableElement() {

    let table = document.createElement("table");
    table.setAttribute("id", "visualtable")

    let thead = document.createElement("thead");
    thead.setAttribute("id", "visualtablehead")
    
    let tbody = document.createElement("tbody");
    tbody.setAttribute("id", "visualtablebody")
    
    table.appendChild(thead);
    table.appendChild(tbody);
    visualGrid.appendChild(table);

    tableCreated = true;

}

function createTableRows() {

    for (let i = 0; i < railKey.value; i++) {

        let tbody = document.getElementById("visualtablebody");

        tconcat = tconcat.concat("t", String(i));

        let trow = document.createElement("tr");
        trow.setAttribute("id", tconcat);

        tarray.push(tconcat);

        tbody.appendChild(trow);

    }

}

function populateEmptyTable() {

    let tlength = plainText.value.length;
    let tRailKey = railKey.value;
    let tconcat = "";

    var myArray = document.getElementById("visualtablebody").childNodes;
    iterifyArr(myArray);

    for (let i = 0; i < tRailKey; i++) {

        let current = myArray.currentRecord();

        for (let j = 0; j < tlength; j++) {

            tconcat = tconcat.concat("l" + String(j));
                
            let tdata = document.createElement("td");
            tdata.setAttribute("id", tconcat);
            current.appendChild(tdata);
            document.getElementById(tconcat).innerHTML = "-";

        }

        myArray.nextRecord();

        tconcat = "";

    }

}

function populateWithPlainText() {

    let dir_down = false;
    let mrow = 0;
    let mcol = 0;
    let tbody = document.getElementById("visualtablebody");

    console.log(tbody.childNodes[0]);
    console.log(tbody[0]);

    for (let i = 0; i < plainText.value.length; i++) {

        if (mrow == 0 || mrow == (railKey.value - 1)) {

            dir_down = !dir_down;

        }

        tbody.childNodes[mrow][mcol++] = plainText.value.charAt(i);

        dir_down ? mrow++ : mrow--;

    }

}

reset.addEventListener("click", function() {

    plainText.value = "";
    cipherText.value = "";
    railKey.value = 2;
    tconcat = "";

    while (visualGrid.firstChild) {

        visualGrid.removeChild(visualGrid.firstChild);

    }

    tableCreated = false;

});

function iterifyArr(arr) {

    var index = 0;

    arr.nextRecord = function () {

        return index + 1 < this.length && this[++index];

    };

    arr.prevRecord = function () {

        return index >= 1 && this[--index];

    };

    arr.currentRecord = function () {

        return this[index];

    };

    arr.getIndex = function () {

        return index;

    };

    return arr;

};

encrypt.addEventListener("click", function() {

    // Javascript does not have native support for multidimensional arrays, so
    // we have to use an alternative technique to achieve the same function. To
    // accomplish this, we nest array literals (denoted as "railrow") inside of
    // a parent array (denoted as "rail").

    // We use nested for loops to impress a new line code into each column-row
    // pair to give it a semblence of content. Any value could be substituted
    // as long as that value is the same across the entire table.

    // After populating the columns of the row with our filler value, we push
    // it to the parent until the number of rows and columns corresponds to
    // the value of the rail key and the length of the plain text, respectively.

    var rail = [];
    let railrow = [];
    
    for (let i = 0; i < railKey.value; i++) {

        for (let j = 0; j < plainText.value.length; j++) {

            railrow.push('\n');

        }

        rail.push(railrow);
        railrow = [];

    }

    // Now that our matrix is constructed, we can begin actually
    // encrypting the ciphertext. We use a boolean (denoted as "dir_down")
    // to keep track of what direction we need to traverse when writing along
    // the matrix. If we have reached the floor ("mrow == 0") or
    // or ceiling ("mrow = (railKey.value - 1)"), we toggle the value of the
    // boolean that then determines whether we increment or decrement from the
    // value of the current row.

    // During this process, we fill the value of the correct column-row pair
    // with a letter from the plain text.

    let dir_down = false;
    let mrow = 0;
    let mcol = 0;

    for (let i = 0; i < plainText.value.length; i++) {

        if (mrow == 0 || mrow == (railKey.value - 1)) {

            dir_down = !dir_down;

        }

        rail[mrow][mcol++] = plainText.value.charAt(i);

        dir_down ? mrow++ : mrow--;

    }

    // Finally, we perform the same for loop traversal, this time looking
    // to form the ciphertext by adding only non-generic characters to an
    // output variable that can then be displayed in the ciphertext area
    // on the site.

    let result = [];

    for (let i = 0; i < railKey.value; i++) {

        for (let j = 0; j < plainText.value.length; j++) {

            if (rail[i][j] != '\n') {

                result.push(rail[i][j]);

            }

        }

    }

    cipherText.value = result.join("");

});

decrypt.addEventListener("click", function() {

    // The process of decryption starts out the same. We declare a blank
    // multidimensional array using our work-around discussed before.

    var rail = [];
    let railrow = [];
    let res = "";
    let iter = "";
    
    for (let i = 0; i < railKey.value; i++) {

        for (let j = 0; j < cipherText.value.length; j++) {

            railrow.push("-");

        }

        rail.push(railrow);
        railrow = [];

    }

    // And, like before, the same agents that helped us traverse the
    // matrix make an appearance.

    let dir_down = true;
    let mrow = 0;
    let mcol = 0;

    // And, like before, we follow the associated pattern of movement
    // across the matrix, instead leaving a trail of generic crumbs to
    // aid in the replacement of the letters of the cipher text in the
    // pattern of the rail fence algorithm.

    for (let i = 0; i < cipherText.value.length; i++) {

        if (mrow == 0) {

            dir_down = true;

        } else if (mrow == (railKey.value - 1)) {

            dir_down = false;

        }

        rail[mrow][mcol++] = "*";

        dir_down ? mrow++ : mrow--;

    }

    // Now, we replace the generic matrix values with the
    // actual cipher text.

    let index = 0;

    for (let i = 0; i < railKey.value; i++) {

        for (let j = 0; j < cipherText.value.length; j++) {

            if (rail[i][j] == "*" && index < cipherText.value.length) {

                rail[i][j] = cipherText.value.charAt(index++);

            }

        }

    }

    // Then, we can read across the matrix in the zig-zag fashion
    // to reconstruct the plain text.

    let result = [];

    let nrow = 0;
    let ncol = 0;

    for (let i = 0; i < cipherText.value.length; i++) {

        if (nrow == 0) {

            dir_down = true;

        } else if (nrow == (railKey.value - 1)) {

            dir_down = false;

        }
        
        if (rail[nrow][ncol] != "*") {

            result.push(rail[nrow][ncol++]);

        }

        dir_down ? nrow++ : nrow--;

    }

    plainText.value = result.join("");

});