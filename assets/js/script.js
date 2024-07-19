document.getElementById('startGame').addEventListener('click', startGame);

function startGame() {
    const playerName = document.getElementById('playerName').value;
    const difficulty = document.getElementById('difficulty').value;
    if (!playerName) {
        alert('Please enter your name to begin your journey.');
        return;
    }
    document.querySelector('.game-intro').classList.add('hidden');
    document.querySelector('#gameArea').classicList.remove('hidden');

    document.getElementById('playerNameDisplay').innerText = `Name: ${playerName}`;
    let maxTurns;
    let health = 1000;
    let healthMultiplier = 1;
    let damageMultiplier = 1;

    switch (difficulty) {
        case 'easy':
            maxTurns = 20;
            healthMultiplier = 2;
            damageMultiplier = 0.5;
            break;
        case 'moderate':
            maxTurns = 25;
            break;
        case 'hard':
            maxTurns = 30;
            healthMultiplier = 0.5;
            damageMultiplier = 2;
            break;
        case 'custom':
            maxTurns = prompt("Enter the number of turns (1-50):", 25);
            if (maxTurns < 1 || maxTurns > 50) maxTurns = 25;
            break;
    }
    let currentTurn = 0;
    updateStatus(health, currentTurn, maxTurns)
    nextTurn(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier)
}

function updateStatus(health, currentTurn, maxTurns) {
    document.getElementById('playerHealthBar-fill').style.width = `${(health / 1000) * 100}%`;
    document.getElementById('turnCounter').innerText = `Turns: ${currentTurn}/${maxTurns}`;

}

function nextTurn() {

}

function displayeObstacleEvent() {

}

function displayEnemyEvent() {

}

function displayeEvent() {

}

function displayWizardEvent() {

}

function generateWizardQuestion() {

}

function getRandomHealthPack() {

}

function endGame() {

}