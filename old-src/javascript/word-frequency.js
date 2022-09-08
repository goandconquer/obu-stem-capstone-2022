function calculateWordFrequency(someString) {

    var words = someString.replace(/[.0123456789]/g, "").split(/\s/);
    var frequencyMap = {};

    words.forEach( function(w) {

        if (!frequencyMap[w]) {

            frequencyMap[w] = 0;

        }

        frequencyMap[w] += 1;

    })
    
    return frequencyMap;

}

document.getElementById("choosefile").addEventListener("change", function() {

    var fileReader = new FileReader();

    fileReader.onload = function(event) {

        if (event.target.readyState == FileReader.DONE) {

            var data = event.target.result;

        }

        var wordCount = calculateWordFrequency(data);
        var sortable = [];

        for (var words in wordCount) {

            sortable.push([words, wordCount[words]]);

        }

        sortable.sort(function(a, b) {

            return b[1] - a[1];

        });

        var wordCountSorted = {};

        sortable.forEach(function(item) {

            wordCountSorted[item[0]] = item[1];

        });

        var frequencyTable = document.createElement("table");
        document.getElementById("wordfrequency").append(frequencyTable);

        Object.keys(wordCountSorted).forEach(function(word) {

            var ftRow = document.createElement("tr");
            frequencyTable.append(ftRow);

            var ftWord = document.createElement("td");
            ftWord.textContent = word;
            frequencyTable.append(ftWord);

            var ftCount = document.createElement("td");
            ftCount.textContent = wordCountSorted[word];
            frequencyTable.append(ftCount);

        });

    }

    fileReader.readAsText(this.files[0]);

});