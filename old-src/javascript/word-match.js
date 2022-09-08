//var fs = require("fs");
//var text = fs.readFileSync("./wordlist.txt", "utf-8");
//var textByLine = text.split("\n")
//var word =document.getElementById("name");

// REWRITTEN (NOT WORKING)

// var url = window.location.search.split("=");
// var word = url[1];

// document.getElementById("inputfile").addEventListener("change", function() {

//     const regex = RegExp("" + word + "");

//     var possibleWords = [];
//     var fileReader = new FileReader();

//     fileReader.onload = function(event) {

//         var fileContentArray = this.result.split(/\r\r|\n/);

//         for (let line = 0; line < fileContentArray.length - 1; line++) {

//             var object = regex.exec(fileContentArray[line]);

//             if (object == fileContentArray[line]) {

//                 possibleWords.push(fileContentArray[line]);

//             }

//         }

//         console.log(possibleWords.length);

//         for (let line = 0; line < possibleWords.length - 1; line++) {

//             console.log(line);

//             let output = document.getElementById("output");
//             output.textContent += ("Possible word: " + (line + 1) + " = " + possibleWords[line] + "<br>");

//         }

//     }

//     fileReader.readAsText(this.files[0]);

// });

var url=window.location.search.split('=');
var word= url[1];

document.getElementById('inputfile').onchange=function() {
        //console.log(word)
        const regex1= RegExp(''+word+'')
        //console.log(regex1)
        var possible_words=[];
        var fr=new FileReader();
        fr.onload=function(event){
            var fileContentArray = this.result.split(/\r\n|\n/);
            for(var line = 0; line < fileContentArray.length-1; line++){
                var obj= regex1.exec(fileContentArray[line])
                console.log(obj)
                if(obj==fileContentArray[line]){
                    possible_words.push(fileContentArray[line])
                }
                
                //console.log(line + " --> "+ fileContentArray[line]);
            }
            for(var line = 0; line < possible_words.length-1; line++){
                //console.log("Possible "+line+" "+possible_words[line])
                //document.write("Possible word "+(line+1)+"="+possible_words[line]+"<br>")

                var output = document.createElement("p");

                var result = ("Possible word " + (line + 1) + ": " + possible_words[line]);
                output.textContent += result;
    
                document.getElementById("output").appendChild(output);
                result = "";

            }
        

        }
        //var nopunc=fr.replace(/[^\w\s]|_/g,"");
        //var finalString=nopunc.replace(/\s{2,}/g," ");
        fr.readAsText(this.files[0]);
    }   

//to add something to array use push()