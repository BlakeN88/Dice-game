document.addEventListener('DOMContentLoaded', function() {
    const diceImages = [
        'images/dice1.png',
        'images/dice2.png',
        'images/dice3.png',
        'images/dice4.png',
        'images/dice5.png',
        'images/dice6.png'
    ];

    let playerScores = [];
    let computerScores = [];
    let playerRolls = 0;

    function loadDiceImages() {
        const playerDiceContainer = document.getElementById('player-dice');
        const computerDiceContainer = document.getElementById('computer-dice');
    
        const playerDiceImages = [];
        const computerDiceImages = [];
    
        for (let i = 0; i < 2; i++) {
            const playerImg = new Image();
            const computerImg = new Image();
    
            
            playerImg.src = 'images/dice1.png'; 
            computerImg.src = 'images/dice1.png'; 
    
            playerImg.alt = `Player Dice ${i + 1}`;
            computerImg.alt = `Computer Dice ${i + 1}`;
    
            playerImg.classList.add('dice-image');
            computerImg.classList.add('dice-image');
    
            playerDiceImages.push(playerImg);
            computerDiceImages.push(computerImg);
        }
    
        playerDiceImages.forEach(img => {
            playerDiceContainer.appendChild(img);
        });
    
        computerDiceImages.forEach(img => {
            computerDiceContainer.appendChild(img);
        });
    }

    function animateDice(elements, values) {
        if (!elements || !values) return;
    
        let intervals = [];
        elements.forEach((element, index) => {
            let i = 0;
            const interval = setInterval(() => {
                element.src = diceImages[i];
                i++;
                if (i === 6) i = 0;
            }, 100); 
    
            intervals.push(interval);
    
            setTimeout(() => {
                clearInterval(intervals[index]);
                element.src = diceImages[values[index] - 1]; 
            }, 1000); 
        });
    }

    function rollDice() {
        const playerDiceElements = Array.from(document.getElementById('player-dice').querySelectorAll('.dice-image'));
        const computerDiceElements = Array.from(document.getElementById('computer-dice').querySelectorAll('.dice-image'));
        const resultMessage = document.getElementById('result-message');
    
        if (playerRolls < 3) {
            const randomPlayerDice = [];
            const randomComputerDice = [];
    
            for (let i = 0; i < playerDiceElements.length; i++) {
                randomPlayerDice.push(Math.floor(Math.random() * 6) + 1);
                randomComputerDice.push(Math.floor(Math.random() * 6) + 1);
            }
    
            animateDice(playerDiceElements, randomPlayerDice);
            animateDice(computerDiceElements, randomComputerDice);
    
            calculateScore(randomPlayerDice, randomComputerDice);
            playerRolls++;
        }
    
        if (playerRolls === 3) {
            calculateTotalScore(); 
            
            document.getElementById('roll-button').disabled = true;
        }
    }

    function calculateScore(playerValues, computerValues) {
        playerScores.push(calculateRoundScore(playerValues));
        computerScores.push(calculateRoundScore(computerValues));
    
        displayScores();
    }

    function calculateRoundScore(values) {
        if (values[0] === 1 || values[1] === 1) {
            return 0;
        } else if (values[0] === values[1]) {
            return (values[0] + values[1]) * 2;
        } else {
            return values[0] + values[1];
        }
    }

    function calculateTotalScore() {
        const totalPlayerScore = playerScores.reduce((acc, curr) => acc + curr, 0);
        const totalComputerScore = computerScores.reduce((acc, curr) => acc + curr, 0);

        const resultMessage = document.getElementById('result-message');

        if (totalPlayerScore > totalComputerScore) {
            resultMessage.textContent = `Player wins with a total score of ${totalPlayerScore}!`;
        } else if (totalComputerScore > totalPlayerScore) {
            resultMessage.textContent = `Computer wins with a total score of ${totalComputerScore}!`;
        } else {
            resultMessage.textContent = 'It\'s a tie!';
        }
    }

    function displayScores() {
        const playerScoreText = `Player Scores: ${playerScores.join(', ')}`;
        const computerScoreText = `Computer Scores: ${computerScores.join(', ')}`;
        document.getElementById('player-score').textContent = playerScoreText;
        document.getElementById('computer-score').textContent = computerScoreText;
    }

    function resetGame() {
        playerScores = [];
        computerScores = [];
        playerRolls = 0;
        const playerDiceContainer = document.getElementById('player-dice');
        const computerDiceContainer = document.getElementById('computer-dice');
        const resultMessage = document.getElementById('result-message');
        playerDiceContainer.innerHTML = '';
        computerDiceContainer.innerHTML = '';
        resultMessage.textContent = '';
        document.getElementById('roll-button').disabled = false;
    
        loadDiceImages(); 

        displayScores();
    }
    
    loadDiceImages();
    
    document.getElementById('roll-button').addEventListener('click', rollDice);
    document.getElementById('reset-button').addEventListener('click', resetGame);
});