function handleInput(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, ''); // Autoriser uniquement les chiffres
}
document.addEventListener('DOMContentLoaded', function() {
    const clickableElements = document.querySelectorAll('.clickable');

    function changeColor(element) {
        var currentColor = element.getAttribute('fill');
        if (currentColor === 'red' || currentColor === 'green') {
            element.setAttribute('fill', 'white');
        } else {
            if (element.classList.contains('red-line')) {
                element.setAttribute('fill', 'red');
            } else if (element.classList.contains('green-line')) {
                element.setAttribute('fill', 'green');
            }
        }
    }

    function isFilled(element) {
        return element.getAttribute('fill') === 'white';
    }

    function checkConditions(correctGroups, wrongElements) {
        let allElementsCorrect = true;

        correctGroups.forEach(elements => {
            const filledCount = elements.filter(isFilled).length;
            if (filledCount !== elements.length) {
                allElementsCorrect = false;
            }
        });

        wrongElements.forEach(element => {
            if (isFilled(element)) {
                allElementsCorrect = false;
            }
        });

        return allElementsCorrect;
    }

    // Fonction pour vérifier la réponse de l'utilisateur
    function checkUserAnswer() {
        const userAnswerElement = document.getElementById('response1a');

        // Vérifiez que l'élément existe
        if (!userAnswerElement) {
            console.error("Element with ID 'response1a' not found.");
            return false; // Retourner faux si l'élément n'est pas trouvé
        }

        const userAnswer = userAnswerElement.value.trim(); // Utiliser trim() pour éviter les espaces superflus

        // Bonne réponse
        const correctAnswer = "20"; // Remplacez par la bonne réponse pour votre exercice
        return userAnswer === correctAnswer; 
    }

    // Écouteur d'événements pour le bouton de validation
    document.getElementById('validate-Wrapping-Gifts').addEventListener('click', function() {
    const isUserAnswerCorrect = checkUserAnswer();

    if (isUserAnswerCorrect) {
        document.getElementById('result-Wrapping-Gifts').textContent = "Correct! You got the right answer!";
        document.getElementById('result-Wrapping-Gifts').classList.add('correct');
        document.getElementById('result-Wrapping-Gifts').classList.remove('incorrect');
    } else {
        document.getElementById('result-Wrapping-Gifts').textContent = "Oops! That’s not quite right. Please try again.";
        document.getElementById('result-Wrapping-Gifts').classList.add('incorrect');
        document.getElementById('result-Wrapping-Gifts').classList.remove('correct');
    }
    });

    function displayFinalResult(resultElementId, isCorrect) {
        const resultElement = document.getElementById(resultElementId);
        const explanationAlgo = document.querySelector('.explanationAlgo');
    
        if (!resultElement) {
            console.error(`Element with ID ${resultElementId} not found.`);
            return;
        }
    
        resultElement.classList.remove('correct', 'incorrect', 'visible');
        explanationAlgo.style.display = 'none';
        explanationAlgo.classList.remove('animate');
    
        if (isCorrect) {
            resultElement.textContent = "Well done! You're a math whiz!";
            resultElement.classList.add('correct');
            explanationAlgo.style.display = 'block';
            
            
            explanationAlgo.classList.add('animate');
        } else {
            resultElement.textContent = "Oops! That’s not quite right. Take a look again and give it another try!";
            resultElement.classList.add('incorrect');
            explanationAlgo.style.display = 'block';
            explanationAlgo.classList.add('animate');
        }
        resultElement.classList.add('visible');
    }
    

    function displayFinalResultSection6(resultElementId, isCorrect) {
        const resultElement = document.getElementById(resultElementId);
        

        if (!resultElement) {
            console.error(`Element with ID ${resultElementId} not found.`);
            return;
        }

        resultElement.classList.remove('correct', 'incorrect', 'visible');
        explanationAlgo.style.display = 'none';

        if (isCorrect) {
            resultElement.textContent = "Correct!";
            resultElement.classList.add('correct');
            explanationAlgo.style.display = 'block';
        } else {
            resultElement.textContent = "Oops! That’s not quite right. Take a look again and give it another try!";
            resultElement.classList.add('incorrect');
            explanationAlgo.style.display = 'block';
        }
        resultElement.classList.add('visible');
    }

    function displayFinalResultForRibbons(allElementsCorrect, userAnswerCorrect, resultElementId) {
        const resultElement = document.getElementById(resultElementId);

        if (!resultElement) {
            console.error(`Element with ID ${resultElementId} not found.`);
            return;
        }

        resultElement.classList.remove('correct', 'incorrect', 'visible');

        if (allElementsCorrect && userAnswerCorrect) {
            resultElement.textContent = "Awesome! You cut the ribbons perfectly and got the length just right!";
            resultElement.classList.add('correct');
        } else if (allElementsCorrect && !userAnswerCorrect) {
            resultElement.textContent = "Great job cutting the ribbons! But the length isn’t quite right. Try again!";
            resultElement.classList.add('incorrect');
        } else if (!allElementsCorrect && userAnswerCorrect) {
            resultElement.textContent = "Oops! The ribbons aren't cut quite right, but you nailed the length! Try again!";
            resultElement.classList.add('incorrect');
        } else {
            resultElement.textContent = "Oh no! It looks like both the ribbons and the length need some work. Don't worry, just give it another try!";
            resultElement.classList.add('incorrect');
        }

        resultElement.classList.add('visible');
        console.log(`All elements correct: ${allElementsCorrect}, User answer correct: ${userAnswerCorrect}`);
    }

    const games = [
        {
            correct: [
                [line2r, line4r, line6r, line8r, line2g, line4g],
            ],
            wrong: [line1r, line3r, line5r, line7r, line9r, line1g, line3g, line5g],
            buttonId: 'validate-Wrapping-Gifts',
            resultElementId: 'result-Wrapping-Gifts'
        },
    ];

    games.forEach(game => {
        document.getElementById(game.buttonId).addEventListener('click', function() {
            const isGameCorrect = checkConditions(game.correct, game.wrong);
            const isUserAnswerCorrect = checkUserAnswer();

            displayFinalResultForRibbons(isGameCorrect, isUserAnswerCorrect, game.resultElementId);
        });
    });

    clickableElements.forEach(function(element) {
        element.addEventListener('click', function() {
            changeColor(element);
        });

        element.addEventListener('touchstart', function(event) {
            event.preventDefault();
            changeColor(element);
        });
    });
    function displayEmptyFieldsWarning(resultElementId) {
        const resultElement = document.getElementById(resultElementId);
        const explanationAlgo = document.querySelector('.explanationAlgo');

        if (!resultElement) {
            console.error(`Element with ID ${resultElementId} not found.`);
            return;
        }

        resultElement.classList.remove('correct', 'incorrect', 'visible');
        explanationAlgo.style.display = 'none';

        resultElement.textContent = "Oops! Don’t forget to fill in all the boxes!";
        resultElement.classList.add('incorrect', 'visible');
    }

    function checkUserAnswerPart3() {
        const responses = {
            response2: document.getElementById('response2').value,
            response3: document.getElementById('response3').value,
            response4: document.getElementById('response4').value,
            response5: document.getElementById('response5').value,
            response6: document.getElementById('response6').value,
            response7: document.getElementById('response7').value,
            response8: document.getElementById('response8').value,
            response9: document.getElementById('response9').value,
            response10: document.getElementById('response10').value,
            response11: document.getElementById('response11').value,
            response12: document.getElementById('response12').value,
            response13: document.getElementById('response13').value,
            response28: document.getElementById('response28').value
        };

        const correctAnswers = {
            response2: "100",
            response3: "60",
            response4: "1",
            response5: "40",
            response6: "60",
            response7: "40",
            response8: "1",
            response9: "20",
            response10: "40",
            response11: "20",
            response12: "2",
            response13: "0",
            response28: "20"
        };

        for (let key in responses) {
            if (responses[key] === "") {
                return "empty";
            }
        }

        for (let key in responses) {
            if (responses[key] !== correctAnswers[key]) {
                return false;
            }
        }

        return true;
    }

    document.getElementById('validate-part3').addEventListener('click', function() {
        const result = checkUserAnswerPart3();

        if (result === "empty") {
            displayEmptyFieldsWarning('result-Challenge');
        } else {
            displayFinalResult('result-Challenge', result);
        }
    });
});



function checkUserAnswerSquareSize() {
    const userAnswer = document.getElementById('response14').value;
    return userAnswer === "9";
}

document.getElementById('validate-square-size').addEventListener('click', function() {
    const isUserAnswerCorrect = checkUserAnswerSquareSize();

    if (document.getElementById('response14').value === "") {
        displayEmptyFieldsWarning('result-Square-Size');
    } else {
        displayFinalResultSection6('result-Square-Size', isUserAnswerCorrect);
    }
});


function displayFinalResultSection6(resultElementId, isCorrect) {
    const resultElement = document.getElementById(resultElementId);
    const explanationAlgo2 = document.querySelector('.explanationAlgo2');

    if (!resultElement) {
        console.error(`Element with ID ${resultElementId} not found.`);
        return;
    }

    
    resultElement.classList.remove('correct', 'incorrect', 'visible');
    explanationAlgo2.style.display = 'none';
    explanationAlgo2.classList.remove('animate');

    if (isCorrect) {
        resultElement.textContent = "Amazing work!";
        resultElement.classList.add('correct');
        explanationAlgo2.style.display = 'block';
            
            
        explanationAlgo2.classList.add('animate');
       
    } else {
        resultElement.textContent = "Oops! That’s not quite right. Take a look again and give it another try!";
        resultElement.classList.add('incorrect');
        explanationAlgo2.style.display = 'block';
        explanationAlgo2.classList.add('animate');
       
    }

    // Afficher le résultat avec la classe "visible"
    resultElement.classList.add('visible'); // Make the result visible
    //resultElement.scrollIntoView({ behavior: 'smooth' });
}

function displayEmptyFieldsWarning(resultElementId) {
    const resultElement = document.getElementById(resultElementId);
    const explanationAlgo = document.querySelector('.explanationAlgo');

    if (!resultElement) {
        console.error(`Element with ID ${resultElementId} not found.`);
        return;
    }

    // Réinitialiser les classes avant d'ajouter la nouvelle
    resultElement.classList.remove('correct', 'incorrect', 'visible');
    explanationAlgo.style.display = 'none'; // Masquer l'explication si des champs sont vides

    resultElement.textContent = "Oops! Don’t forget to fill in all the boxes!";
    resultElement.classList.add('incorrect', 'visible'); // Affiche comme une erreur et visible
}

function checkUserAnswerPart5() {
    const responses = {
        response15: document.getElementById('response15').value,
        response16: document.getElementById('response16').value,
        response17: document.getElementById('response17').value,
        response18: document.getElementById('response18').value,
        response19: document.getElementById('response19').value,
        response20: document.getElementById('response20').value,
        response21: document.getElementById('response21').value,
        response22: document.getElementById('response22').value,
        response23: document.getElementById('response23').value,
        response24: document.getElementById('response24').value,
        response25: document.getElementById('response25').value,
        response26: document.getElementById('response26').value,
        response27: document.getElementById('response27').value
    };

    const correctAnswers = {
        response15: "45",
        response16: "27",
        response17: "1",
        response18: "18",
        response19: "27",
        response20: "18",
        response21: "1",
        response22: "9",
        response23: "18",
        response24: "9",
        response25: "2",
        response26: "0",
        response27: "9" 
    };

    // Vérifier si tous les champs sont remplis
    for (let key in responses) {
        if (responses[key] === "") {
            return "empty";
        }
    }

    // Vérification des réponses
    for (let key in responses) {
        if (responses[key] !== correctAnswers[key]) {
            return false;
        }
    }

    return true;
}

document.getElementById('validate-part5').addEventListener('click', function() {
    const result = checkUserAnswerPart5();

    if (result === "empty") {
        displayEmptyFieldsWarning('result-Challenge2');
    } else {
        displayFinalResultSection6('result-Challenge2', result);
    }
});

// Correct answers for all the steps
const correctAnswers = {
    response1b: "1",
    response1c: "60",
    response1d: "40",
    response1e: "1",
    response1f: "40",
    response1g: "20",
    response1h: "2",
    response1i: "20",
    response1j: "0",

    response2b: "1",
    response2c: "27",
    response2d: "27",
    response2e: "18",
    response2f: "1",
    response2g: "18",
    response2h: "9",
    response2i: "18",
    response2j: "2",
    response2k: "9",
    response2l: "0"
};

// Function to validate Step 1
function validateStep1() {
    // Retrieve the user's answers for Step 1
    const response1b = document.getElementById('response1b').value;
    const response1c = document.getElementById('response1c').value;
    const response1d = document.getElementById('response1d').value;

    const resultStep1 = document.getElementById('result-Step1');
    const explanation1 = document.querySelector('.explanation1');
    const saisirChampsMessage = document.getElementById('warningMessage1');

    // Check if all fields are filled
    if (response1b === "" || response1c === "" || response1d === "") {
        saisirChampsMessage.style.display = 'block';
        resultStep1.classList.remove('visible');
        explanation1.style.display = 'none';
        return;
    } else {
        saisirChampsMessage.style.display = 'none';
    }

    // Make the explanation container visible
    explanation1.style.display = 'block';

    // Display result for Step 1
    if (response1b === correctAnswers.response1b &&
        response1c === correctAnswers.response1c &&
        response1d === correctAnswers.response1d) {
        resultStep1.textContent = "Correct! You got Step 1 right.";
        resultStep1.classList.add('correct', 'visible');
        resultStep1.classList.remove('incorrect');
    } else {
        resultStep1.textContent = "Almost there! Give it another try, you’re doing great!";
        resultStep1.classList.add('incorrect', 'visible');
        resultStep1.classList.remove('correct');
        explanation1.style.display = 'none';   
    }
}
// Function to validate Step 2
function validateStep2() {
    // Retrieve the user's answers for Step 2
    const response1e = document.getElementById('response1e').value;
    const response1f = document.getElementById('response1f').value;
    const response1g = document.getElementById('response1g').value;

    const resultStep2 = document.getElementById('result-Step2');
    const explanation2 = document.querySelector('.explanation2');
    const saisirChampsMessage = document.getElementById('warningMessage2');

    // Check if all fields are filled
    if (response1e === "" || response1f === "" || response1g === "") {
        saisirChampsMessage.style.display = 'block'; // Show warning message
        resultStep2.classList.remove('visible'); // Hide result
        explanation2.style.display = 'none'; // Hide explanation
        return; // Stop the function here
    } else {
        saisirChampsMessage.style.display = 'none'; // Hide warning message
    }

    // Make the explanation container visible
    explanation2.style.display = 'block';

    // Display result for Step 2
    if (response1e === correctAnswers.response1e &&
        response1f === correctAnswers.response1f &&
        response1g === correctAnswers.response1g) {
        resultStep2.textContent = "Correct! You got Step 2 right.";
        resultStep2.classList.add('correct', 'visible');
        resultStep2.classList.remove('incorrect');
    } else {
        resultStep2.textContent = "Almost there! Give it another try, you’re doing great!";
        resultStep2.classList.add('incorrect', 'visible');
        resultStep2.classList.remove('correct');
        explanation2.style.display = 'none'; // Hide explanation if the answer is incorrect
    }
}
// Function to validate Step 3
function validateStep3() {
    // Retrieve the user's answers for Step 3
    const response1h = document.getElementById('response1h').value;
    const response1i = document.getElementById('response1i').value;
    const response1j = document.getElementById('response1j').value;

    const resultStep3 = document.getElementById('result-Step3');
    const explanation3 = document.querySelector('.explanation3');
    const saisirChampsMessage = document.getElementById('warningMessage3');

    // Check if all fields are filled
    if (response1h === "" || response1i === "" || response1j === "") {
        saisirChampsMessage.style.display = 'block'; // Show warning message
        resultStep3.classList.remove('visible'); // Hide result
        explanation3.style.display = 'none'; // Hide explanation
        return; // Stop the function here
    } else {
        saisirChampsMessage.style.display = 'none'; // Hide warning message
    }

    // Make the explanation container visible
    explanation3.style.display = 'block';

    // Display result for Step 3
    if (response1h === correctAnswers.response1h &&
        response1i === correctAnswers.response1i &&
        response1j === correctAnswers.response1j) {
        resultStep3.textContent = "Correct! You got Step 3 right.";
        resultStep3.classList.add('correct', 'visible');
        resultStep3.classList.remove('incorrect');
    } else {
        resultStep3.textContent = "Almost there! Give it another try, you’re doing great!";
        resultStep3.classList.add('incorrect', 'visible');
        resultStep3.classList.remove('correct');
        explanation3.style.display = 'none'; // Hide explanation if the answer is incorrect
    }
}
// Function to validate Step 4
function validateStep4() {
    const response2b = document.getElementById('response2b').value;
    const response2c = document.getElementById('response2c').value;
    const response2d = document.getElementById('response2d').value;
    const response2e = document.getElementById('response2e').value;

    const resultStep4 = document.getElementById('result-Step4');
    //const explanation4 = document.querySelector('.explanation4');
    const saisirChampsMessage = document.getElementById('warningMessage4');

    // Check if all fields are filled
    if (response2b === "" || response2c === "" || response2d === ""|| response2e === "") {
        saisirChampsMessage.style.display = 'block'; // Show warning message
        resultStep4.classList.remove('visible');
        //explanation4.style.display = 'none'; 
        return; // Stop the function here
    } else {
        saisirChampsMessage.style.display = 'none';
    }

    
    //explanation4.style.display = 'block';

    
    if (response2b === correctAnswers.response2b &&
        response2c === correctAnswers.response2c &&
        response2d === correctAnswers.response2d &&
        response2e === correctAnswers.response2e) {
        resultStep4.textContent = "Correct! You got Step 1 right.";
        resultStep4.classList.add('correct', 'visible');
        resultStep4.classList.remove('incorrect');
    } else {
        resultStep4.textContent = "Almost there! Give it another try, you’re doing great!";
        resultStep4.classList.add('incorrect', 'visible');
        resultStep4.classList.remove('correct');
        //explanation4.style.display = 'none'; // Hide explanation if the answer is incorrect
    }
}
// Function to validate Step 5
function validateStep5() {
    const response2f = document.getElementById('response2f').value;
    const response2g = document.getElementById('response2g').value;
    const response2h = document.getElementById('response2h').value;
    const response2i = document.getElementById('response2i').value;

    const resultStep5 = document.getElementById('result-Step5');
    //const explanation5 = document.querySelector('.explanation5');
    const saisirChampsMessage = document.getElementById('warningMessage5');

    // Check if all fields are filled
    if (response2f === "" || response2g === "" || response2h === ""|| response2i === "") {
        saisirChampsMessage.style.display = 'block'; // Show warning message
        resultStep5.classList.remove('visible');
        //explanation5.style.display = 'none'; 
        return; // Stop the function here
    } else {
        saisirChampsMessage.style.display = 'none';
    }

    //explanation4.style.display = 'block';

    if (response2f === correctAnswers.response2f &&
        response2g === correctAnswers.response2g &&
        response2h === correctAnswers.response2h &&
        response2i === correctAnswers.response2i) {
        resultStep5.textContent = "Correct! You got Step 2 right.";
        resultStep5.classList.add('correct', 'visible');
        resultStep5.classList.remove('incorrect');
    } else {
        resultStep5.textContent = "Almost there! Give it another try, you’re doing great!";
        resultStep5.classList.add('incorrect', 'visible');
        resultStep5.classList.remove('correct');
        //explanation5.style.display = 'none'; // Hide explanation if the answer is incorrect
    }
}
// Function to validate Step 6
function validateStep6() {
    const response2j = document.getElementById('response2j').value;
    const response2k = document.getElementById('response2k').value;
    const response2l = document.getElementById('response2l').value;

    const resultStep6 = document.getElementById('result-Step6');
    //const explanation6 = document.querySelector('.explanation6');
    const saisirChampsMessage = document.getElementById('warningMessage6');

    // Check if all fields are filled
    if (response2j === "" || response2k === "" || response2l === "") {
        saisirChampsMessage.style.display = 'block'; // Show warning message
        resultStep6.classList.remove('visible');
        //explanation5.style.display = 'none'; 
        return; // Stop the function here
    } else {
        saisirChampsMessage.style.display = 'none';
    }

    //explanation6.style.display = 'block';

    if (response2j === correctAnswers.response2j &&
        response2k === correctAnswers.response2k &&
        response2l === correctAnswers.response2l) {
        resultStep6.textContent = "Correct! You got Step 3 right.";
        resultStep6.classList.add('correct', 'visible');
        resultStep6.classList.remove('incorrect');
    } else {
        resultStep6.textContent = "Almost there! Give it another try, you’re doing great!";
        resultStep6.classList.add('incorrect', 'visible');
        resultStep6.classList.remove('correct');
        //explanation5.style.display = 'none'; // Hide explanation if the answer is incorrect
    }
}
// Event listeners for the buttons
document.getElementById('validate-Step1').addEventListener('click', validateStep1);
document.getElementById('validate-Step2').addEventListener('click', validateStep2);
document.getElementById('validate-Step3').addEventListener('click', validateStep3);

document.getElementById('validate-Step4').addEventListener('click', validateStep4);
document.getElementById('validate-Step5').addEventListener('click', validateStep5);
document.getElementById('validate-Step6').addEventListener('click', validateStep6);


