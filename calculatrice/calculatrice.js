function appendToResult(value) {
    let resultField = document.getElementById('result');

    if (resultField.value === "0") {
        if (value !== "0" && !isNaN(value)) {
            resultField.value = value;
        } else {
            resultField.value += value;
        }
    } else {
        resultField.value += value;
    }
}

function clearResult(value) {
    document.getElementById('result').value = "0";
}

function calculateResult() {
    const input = document.getElementById('result').value;
    const validPattern = /^[0-9+\-*/().\s]+$/; // Permet seulement les chiffres, opérateurs mathématiques, parenthèses et espaces

    if (validPattern.test(input)) {
        try {
            let result = math.evaluate(input);
            document.getElementById('result').value = result;
        } catch (e) {
            document.getElementById('result').value = "Error";
        }
    } else {
        document.getElementById('result').value = "Invalid input";
    }
}

