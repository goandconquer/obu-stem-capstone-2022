async function LetterFrequency() {

    console.log("The letter frequency function is starting...");

    const response = await fetch('http://localhost:8080/letterFrequency')
    const someJson = await response.json();

    var output = document.getElementById("output");
    output.innerHTML = someJson[1];

}