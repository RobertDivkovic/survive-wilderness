document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('resetGame').addEventListener('click', resetGame);

// arrays to track used events
let usedObstacles = [];
let usedEnemies = [];
let lastEventWasWizard = false; // track if last event was wizard event


function startGame() {
    const playerName = document.getElementById('playerName').value;
    const difficulty = document.getElementById('difficulty').value;
    if (!playerName) {
        alert('Please enter your name to begin your journey.');
        return;
    }
    document.querySelector('.game-intro').classList.add('hidden');
    document.querySelector('#gameArea').classList.remove('hidden');
    document.getElementById('resetGame').classList.remove('hidden'); // show reset button

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
    usedObstacles = []; // reset used obstacles
    usedEnemies = []; // reset used enemies
    lastEventWasWizard = false; // reset the wizard event flag
    updateStatus(health, currentTurn, maxTurns);
    nextTurn(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);
}

function updateStatus(health, currentTurn, maxTurns) {
    document.getElementById('playerHealthBar-fill').style.width = `${(health / 1000) * 100}%`;
    document.getElementById('turnCounter').innerText = `Turns: ${currentTurn}/${maxTurns}`;
    document.getElementById('healthValue').innerText = `Health: ${health}`; //update health value display
}

function nextTurn(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier) {
    if (currentTurn >= maxTurns || health <= 0) {
        endGame(health);
        return;
    }
    let eventType;
    if (lastEventWasWizard) {
        // ensure the next event is not wizard
        eventType = 0.3 + Math.random() * 0.7; // adjusting eventType to avoid wizard eveent
    } else {
        eventType = Math.random();
    }

    if (eventType < 0.3) { // there is 30% cnance to stumble upon wizard event
        displayWizardEvent(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);
        lastEventWasWizard = true; // setting event as it happened
    } else if (eventType < 0.75) { // there is 45% chance of obstacle event (0.3 + 0.45 = 0.75)
        displayObstacleEvent(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);
        lastEventWasWizard = false; // event didn't happen
    } else { // the rest is 25% ov enemy event
        displayEnemyEvent(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);
        lastEventWasWizard = false; // event didn't happen
    }
}

function displayObstacleEvent(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier) {
    const events = [
        {
            description: "As you walk through narrow path in forest, you stumble upon a fallen tree. This fallen tree is huge and covered in moss. What do you do?",
            image: "/survive-wilderness/assets/images/fallen-tree.jpg",
            options: [
                { text: "Jump over the fallen tree.", damage: 20 * damageMultiplier, alert: "You slipped while jumping over the fallen tree and took 20 damage." },
                { text: "Go around the fallen tree.", damage: 0, alert: "You safely went around the fallen tree without taking any damage." },
                { text: "Climb over the fallen tree.", damage: 20 * damageMultiplier, alert: "Climbing over the slippery fallen tree caused you to lose your balance and fall from it, you take 20 damage." },
                { text: "Crawl under the fallen tree.", damage: 20 * damageMultiplier, alert: "Crawling under the tree was tricky and tree ended up crushing you, you take 20 damage." }
            ]
        },
        {
            description: "You can hear gurgling water nearby and you see a mighty river in front of you, it has strong currents and slippery banks. What do you do?",
            image: "/survive-wilderness/assets/images/mighty-river.jpg",
            options: [
                { text: "Swim across the river.", damage: 40 * damageMultiplier, alert: "You struggled against the strong currents and took 40 damage." },
                { text: "Reinforce nearby bridge with rope and cross it.", damage: 0, alert: "You found a bridge and crossed the river safely." },
                { text: "Build a raft to float across.", damage: 40 * damageMultiplier, alert: "The raft you built was unstable and you took 40 damage." },
                { text: "Jump from stone to stone.", damage: 40 * damageMultiplier, alert: "You slipped while jumping from stone to stone and took 40 damage." }
            ]
        },
        {
            description: "You went out into the clearing and saw something strange. Below you is steep canyon that is carved by river and has a lot of loose rocks. What do you do?",
            image: "/survive-wilderness/assets/images/canyon.jpg",
            options: [
                { text: "Climb down the canyon without equipment.", damage: 80 * damageMultiplier, alert: "Loose rocks made you fall while climbing down, taking 80 damage." },
                { text: "Use parachute to go down.", damage: 80 * damageMultiplier, alert: "Strong winds crashed you on the side of canyon, dealing you 80 damage." },
                { text: "Use a rope and climbing gear to descend.", damage: 0, alert: "You managed to descend safely." },
                { text: "Jump across the canyon.", damage: 80 * damageMultiplier, alert: "You didn't make the jump and fell, taking 80 damage." }
            ]
        },
        {
            description: "As you walk further, you feel like there isn’t much of air flow, like there is a wall in front of you. You see huge cliff before you. The cliff is high with jagged rocks below. What do you do?",
            image: "/survive-wilderness/assets/images/cliff.jpg",
            options: [
                { text: "Climb up the cliff using climbing pickaxe.", damage: 100 * damageMultiplier, alert: "You lost your grip while climbing up and took 100 damage." },
                { text: "Take climbing gear from poor climbers skeleton nearby and climb up.", damage: 0, alert: "You found poor climbers skeleton, took his gear and climbed cliff safely." },
                { text: "Climb up carefully.", damage: 100 * damageMultiplier, alert: "Climbing up carefully but without proper equipment still resulted in a fall, taking 100 damage." },
                { text: "Use a makeshift rope.", damage: 100 * damageMultiplier, alert: "The makeshift rope broke and you fell, taking 100 damage." }
            ]
        },
        {
            description: "You feel stale air nearby and all of the sudden a colony of bats fly out of a huge hole from the ground. The cave is dark and dangerous. What do you do?",
            image: "/survive-wilderness/assets/images/cave.jpg",
            options: [
                { text: "Enter the cave without a torch.", damage: 30 * damageMultiplier, alert: "You stumbled in the dark cave and took 30 damage." },
                { text: "Light a torch before entering.", damage: 0, alert: "You lit a torch and entered the cave safely." },
                { text: "Enter cave safely.", damage: 30 * damageMultiplier, alert: "Even tho you entered cave safely, you fell because you can’t see where are you stepping, taking 30 damage." },
                { text: "Shout to scare away the bats.", damage: 30 * damageMultiplier, alert: "Shouting startled the bats and they attacked, causing 30 damage." }
            ]
        },
        {
            description: "As you walk through forest you see extinguished fire, but the ashes are still warm. The camp has remnants of activity and scattered supplies. What do you do?",
            image: "/survive-wilderness/assets/images/abandoned-camp.png",
            options: [
                { text: "Rummage through the camp recklessly.", damage: 20 * damageMultiplier, alert: "Rummaging recklessly caused you to get injured on rusty nail, taking 20 damage." },
                { text: "Search the camp cautiously without much noise.", damage: 0, alert: "You searched the camp cautiously and avoided injury." },
                { text: "Set up camp nearby.", damage: 20 * damageMultiplier, alert: "Setting up camp nearby was a mistake, a goblin attacked you and you took 20 damage." },
                { text: "Burn the camp to avoid danger.", damage: 20 * damageMultiplier, alert: "Burning the camp caused an uncontrolled fire and you took 20 damage." }
            ]
        },
        {
            description: "Before you, you see mossy castle, and it seems to be abandoned. The castle is old, with collapsing walls, hidden traps and perhaps hidden treasure. What do you do?",
            image: "/survive-wilderness/assets/images/abandoned-castle.jpg",
            options: [
                { text: "Look for hidden treasure.", damage: 60 * damageMultiplier, alert: "Driven by lust, you explore hastily triggering trap, causing 60 damage." },
                { text: "Investigate the castle room by room.", damage: 0, alert: "You carefully investigated the castle and avoided traps. Sadly you didn’t find anything interesting." },
                { text: "Run through quickly.", damage: 60 * damageMultiplier, alert: "Running quickly caused you to fall into a trap, taking 60 damage." },
                { text: "Shout to check for response from potential residents.", damage: 60 * damageMultiplier, alert: "Shouting disturbed the castle's structure, and made it fall on you, causing 60 damage." }
            ]
        },
        {
            description: "In the middle of night you hear scary sounds. You see graveyard and only way is through it. The graveyard is eerie with a lot of open graves and evil ghosts that seek revenge. What do you do?",
            image: "/survive-wilderness/assets/images/graveyard.jpg",
            options: [
                { text: "Walk casually through the graveyard, trying to assert dominance over ghosts.", damage: 40 * damageMultiplier, alert: "Walking through the graveyard full of pride, trying to make ghost submissive caused ghosts to attack, taking 40 damage." },
                { text: "Be respectful to evil ghosts and ask them kindly for a safe pass through.", damage: 0, alert: "You managed to calm down evil ghosts, and pass freely through graveyard." },
                { text: "Run through the graveyard, shouting that you aren’t afraid of ghosts.", damage: 40 * damageMultiplier, alert: "Running and shouting taunts through the graveyard made evil ghosts angry, resulting in attack, taking 40 damage." },
                { text: "Hide behind memorial to avoid ghosts.", damage: 40 * damageMultiplier, alert: "Hiding behind a memorial was a bad idea, ghosts found you resulting in attack, causing 40 damage." }
            ]
        },
        {
            description: "Upon reaching misty and smelly swamp, you see old house in the middle of it. That is a witch house. The house is filled with magical traps and curses. What do you do?",
            image: "/survive-wilderness/assets/images/witch-house.png",
            options: [
                { text: "Enter the house without protection.", damage: 50 * damageMultiplier, alert: "Entering without protection triggered traps, causing 50 damage." },
                { text: "Use a protective charm before entering.", damage: 0, alert: "You used a protective charm that you found in your backpack and safely entered the house." },
                { text: "Sneak in through the window.", damage: 50 * damageMultiplier, alert: "Sneaking in through the window triggered a curse, causing 50 damage." },
                { text: "Cast a spell to enter safely.", damage: 50 * damageMultiplier, alert: "The spell backfired, causing 50 damage." }
            ]
        },
        {
            description: "You hear something rustle behind you. Weird silhouette approaches you, without speaking. It is a strange looking man, stranger appears suspicious and unpredictable. What do you do?",
            image: "/survive-wilderness/assets/images/stranger.png",
            options: [
                { text: "Confront the stranger.", damage: 40 * damageMultiplier, alert: "Confronting the stranger resulted in a fight, stranger called for help of his companions, causing 40 damage." },
                { text: "Act like a mad lad, like you are out of your mind.", damage: 0, alert: "Stranger thought that he should avoid crazy people like you. You continue with your journey safely." },
                { text: "Ask the stranger for help.", damage: 40 * damageMultiplier, alert: "Asking the stranger for help was a mistake, he saw your weakness and attacked you, causing 40 damage." },
                { text: "Follow the stranger quietly.", damage: 40 * damageMultiplier, alert: "Following the stranger quietly led to an ambush from strangers companions, causing 40 damage." }
            ]
        },
        {
            description: "As you tread deeper into the forest, you encounter a murky swamp with treacherous mud and hidden dangers. What do you do?",
            image: "/survive-wilderness/assets/images/swamp.jpg",
            options: [
                { text: "Wade through the swamp directly.", damage: 30 * damageMultiplier, alert: "You got stuck in the mud and took 30 damage while trying to free yourself." },
                { text: "Find a solid path and use a stick to check the ground.", damage: 0, alert: "You found a solid path and safely navigated through the swamp." },
                { text: "Jump from one dry spot to another.", damage: 30 * damageMultiplier, alert: "You missed a jump and fell into the swamp, taking 30 damage." },
                { text: "Run quickly through the swamp.", damage: 30 * damageMultiplier, alert: "Running quickly caused you to trip and fall, taking 30 damage." }
            ]
        },
        {
            description: "You come across a dense patch of thorny bushes blocking your path. The thorns are sharp and can easily cause injury. What do you do?",
            image: "/survive-wilderness/assets/images/thorny-bushes.png",
            options: [
                { text: "Push through the bushes.", damage: 20 * damageMultiplier, alert: "You got scratched by the thorns and took 20 damage." },
                { text: "Cut through the bushes with a machete.", damage: 0, alert: "You used a machete to safely cut through the bushes." },
                { text: "Crawl under the bushes.", damage: 20 * damageMultiplier, alert: "Crawling under the bushes resulted in scratches, taking 20 damage." },
                { text: "Jump over the bushes.", damage: 20 * damageMultiplier, alert: "You landed poorly and got scratched, taking 20 damage." }
            ]
        },
        {
            description: "You stumble upon a many ant colonies in your path. The ground is covered with dangerous ants. What do you do?",
            image: "/survive-wilderness/assets/images/ant-colonies.png",
            options: [
                { text: "Run across ants.", damage: 40 * damageMultiplier, alert: "Even tho you ran fast, ants still bit you many times, taking 40 damage." },
                { text: "Use a long stick to poke ant hills.", damage: 40 * damageMultiplier, alert: "Enraged ants bit you many times." },
                { text: "Jump across ant hills.", damage: 50 * damageMultiplier, alert: "You didn't make the jump and fell onto ants that merecelessly bit you many times, taking 50 damage." },
                { text: "Climb on a tree and jump to another trees.", damage: 0, alert: "Your ingenuity saved you from ants." }
            ]
        },
        {
            description: "You encounter an area filled with poisonous plants. The air is thick with toxic pollen. What do you do?",
            image: "/survive-wilderness/assets/images/poisonous-plants.png",
            options: [
                { text: "Walk through the plants normally.", damage: 40 * damageMultiplier, alert: "You inhaled the toxic pollen and took 40 damage." },
                { text: "Cover your mouth and nose and move quickly.", damage: 0, alert: "You covered your mouth and nose and safely passed through the area." },
                { text: "Crawl under the plants.", damage: 40 * damageMultiplier, alert: "Crawling stirred up more pollen, causing 40 damage." },
                { text: "Burn the plants.", damage: 40 * damageMultiplier, alert: "Burning the plants released toxic smoke, causing 40 damage." }
            ]
        },
        {
            description: "You find an old abandoned mine shaft. It looks unstable and dangerous. What do you do?",
            image: "/survive-wilderness/assets/images/abandoned-mine.png",
            options: [
                { text: "Walk through the mine without any support.", damage: 70 * damageMultiplier, alert: "The mine shaft collapsed on you, causing 70 damage." },
                { text: "Use sturdy wooden beams to support your path.", damage: 0, alert: "You used wooden beams to safely navigate the mine." },
                { text: "Run quickly through the mine.", damage: 70 * damageMultiplier, alert: "Running caused the unstable mine to collapse, taking 70 damage." },
                { text: "Shout to check for echoes.", damage: 70 * damageMultiplier, alert: "Shouting caused a cave-in, taking 70 damage." }
            ]
        },
        {
            description: "As you journey through the forest, you suddenly find yourself surrounded by a spreading wildfire. The heat is intense and the smoke is choking. What do you do?",
            image: "/survive-wilderness/assets/images/wildfire.png",
            options: [
                { text: "Run through the fire to the other side.", damage: 60 * damageMultiplier, alert: "You got burned while trying to run through the fire, taking 60 damage." },
                { text: "Find a nearby river and stay low to avoid smoke.", damage: 0, alert: "You found a river and stayed low, safely avoiding the fire and smoke." },
                { text: "Climb a tree to escape the fire.", damage: 60 * damageMultiplier, alert: "Climbing a tree didn't help, and you got burned, taking 60 damage." },
                { text: "Hide under a rock ledge.", damage: 60 * damageMultiplier, alert: "Hiding under a rock ledge didn't protect you from the smoke, causing 60 damage." }
            ]
        },
        {
            description: "You hear a rumbling sound and see a rockslide barreling down the mountain towards you. Large rocks and debris are crashing down. What do you do?",
            image: "/survive-wilderness/assets/images/rockslide.png",
            options: [
                { text: "Run downhill away from the rockslide.", damage: 70 * damageMultiplier, alert: "Running downhill didn't save you, and you got hit by rocks, taking 70 damage." },
                { text: "Find cover behind a large boulder.", damage: 0, alert: "You found cover behind a large boulder and safely avoided the rockslide." },
                { text: "Climb up a tree.", damage: 70 * damageMultiplier, alert: "Climbing up a tree didn't protect you from the falling rocks, causing 70 damage." },
                { text: "Stand still and brace yourself.", damage: 70 * damageMultiplier, alert: "Standing still was a bad idea, and you got hit by the rockslide, taking 70 damage." }
            ]
        },
        {
            description: "The path ahead is overgrown with thick, thorny vines that seem to move on their own. They can easily ensnare and injure you. What do you do?",
            image: "/survive-wilderness/assets/images/thorny-vines.png",
            options: [
                { text: "Walk through the vines quickly.", damage: 50 * damageMultiplier, alert: "The thorny vines ensnared and cut you, causing 50 damage." },
                { text: "Carefully cut through the vines with a sharp blade.", damage: 0, alert: "You carefully cut through the vines and avoided injury." },
                { text: "Burn the vines with fire.", damage: 50 * damageMultiplier, alert: "Burning the vines caused them to thrash wildly, injuring you, taking 50 damage." },
                { text: "Try to climb over the vines.", damage: 50 * damageMultiplier, alert: "Climbing over the vines resulted in you getting entangled and cut, causing 50 damage." }
            ]
        },
        {
            description: "You come across an old, rickety bridge with obvious signs of booby traps. It looks like crossing could be perilous. What do you do?",
            image: "/survive-wilderness/assets/images/booby-trapped-bridge.png",
            options: [
                { text: "Run quickly across the bridge.", damage: 60 * damageMultiplier, alert: "Running quickly triggered the traps, causing 60 damage." },
                { text: "Disarm the traps and cross slowly.", damage: 0, alert: "You disarmed the traps and crossed the bridge safely." },
                { text: "Jump into the water below and swim across.", damage: 60 * damageMultiplier, alert: "Jumping into the water below resulted in injury from hidden rocks, causing 60 damage." },
                { text: "Try to swing across on a rope.", damage: 60 * damageMultiplier, alert: "Swinging across on a rope caused you to fall, taking 60 damage." }
            ]
        },
        {
            description: "While traversing a snowy mountain, you hear the ominous sound of an avalanche roaring down the slope towards you. What do you do?",
            image: "/survive-wilderness/assets/images/avalanche.png",
            options: [
                { text: "Run downhill to escape the avalanche.", damage: 80 * damageMultiplier, alert: "Running downhill wasn't fast enough, and you got buried, taking 80 damage." },
                { text: "Find a sturdy structure or overhang to shelter under.", damage: 0, alert: "You found a sturdy structure and safely sheltered from the avalanche." },
                { text: "Dig a hole in the snow to hide.", damage: 80 * damageMultiplier, alert: "Digging a hole took too long, and you got buried, taking 80 damage." },
                { text: "Climb a tree to avoid the snow.", damage: 80 * damageMultiplier, alert: "Climbing a tree didn't protect you from the avalanche, causing 80 damage." }
            ]
        },
        {
            description: "A fierce lightning storm is approaching, and you are in an open field with no immediate shelter. What do you do?",
            image: "/survive-wilderness/assets/images/lightning-storm.png",
            options: [
                { text: "Run to the nearest tree for shelter.", damage: 50 * damageMultiplier, alert: "You got struck by lightning while running to the tree, taking 50 damage." },
                { text: "Lie flat on the ground away from tall objects.", damage: 0, alert: "You lay flat on the ground and avoided the lightning safely." },
                { text: "Stand still and hope for the best.", damage: 50 * damageMultiplier, alert: "Standing still made you an easy target for lightning, taking 50 damage." },
                { text: "Hold up a metal object to attract the lightning away.", damage: 50 * damageMultiplier, alert: "Holding up a metal object was a bad idea, taking 50 damage." }
            ]
        },
        {
            description: "You stumble upon a giant beehive in your path. The bees seem agitated and ready to attack. What do you do?",
            image: "/survive-wilderness/assets/images/beehive.png",
            options: [
                { text: "Throw a rock at the beehive.", damage: 30 * damageMultiplier, alert: "Throwing a rock angered the bees, and you got stung, taking 30 damage." },
                { text: "Slowly back away and find an alternative route.", damage: 0, alert: "You backed away slowly and avoided the bees." },
                { text: "Run past the beehive quickly.", damage: 30 * damageMultiplier, alert: "Running past the beehive agitated the bees, and you got stung, taking 30 damage." },
                { text: "Climb a tree to get away from the bees.", damage: 30 * damageMultiplier, alert: "Climbing a tree didn't help, and you got stung, taking 30 damage." }
            ]
        },
        {
            description: "You come across a frozen lake with a thin layer of ice. Crossing it could be dangerous. What do you do?",
            image: "/survive-wilderness/assets/images/frozen-lake.png",
            options: [
                { text: "Run across the ice quickly.", damage: 60 * damageMultiplier, alert: "Running caused the ice to crack, and you fell in, taking 60 damage." },
                { text: "Test the ice with a stick and move cautiously.", damage: 0, alert: "You tested the ice and moved cautiously, crossing safely." },
                { text: "Jump across the ice patches.", damage: 60 * damageMultiplier, alert: "Jumping caused the ice to break, and you fell in, taking 60 damage." },
                { text: "Crawl across the ice.", damage: 60 * damageMultiplier, alert: "Crawling didn't distribute your weight evenly, and you fell in, taking 60 damage." }
            ]
        },
        {
            description: "A slow-moving lava flow blocks your path. The heat is intense, and the ground is unstable. What do you do?",
            image: "/survive-wilderness/assets/images/lava-flow.png",
            options: [
                { text: "Jump over the lava flow.", damage: 70 * damageMultiplier, alert: "You didn't make the jump and got burned, taking 70 damage." },
                { text: "Find a path around the lava flow.", damage: 0, alert: "You found a path around the lava flow and safely navigated it." },
                { text: "Run quickly across the hot ground.", damage: 70 * damageMultiplier, alert: "Running quickly wasn't fast enough, and you got burned, taking 70 damage." },
                { text: "Climb a nearby tree to escape the heat.", damage: 70 * damageMultiplier, alert: "Climbing the tree didn't help with the heat, and you got burned, taking 70 damage." }
            ]
        },
        {
            description: "A fierce sandstorm approaches, reducing visibility to zero and pelting you with sand. What do you do?",
            image: "/survive-wilderness/assets/images/sandstorm.png",
            options: [
                { text: "Walk through the sandstorm blindly.", damage: 50 * damageMultiplier, alert: "Walking through the sandstorm caused you to get lost and hurt, taking 50 damage." },
                { text: "Cover your face and find shelter.", damage: 0, alert: "You covered your face and found shelter, avoiding the sandstorm." },
                { text: "Stand still and wait for the storm to pass.", damage: 50 * damageMultiplier, alert: "Standing still left you exposed to the sandstorm, causing 50 damage." },
                { text: "Run through the sandstorm as fast as you can.", damage: 50 * damageMultiplier, alert: "Running through the sandstorm caused you to get lost and hurt, taking 50 damage." }
            ]
        },
        {
            description: "You discover ancient ruins with hidden traps and collapsing structures. They seem both intriguing and dangerous. What do you do?",
            image: "/survive-wilderness/assets/images/ancient-ruins.png",
            options: [
                { text: "Run through the ruins quickly.", damage: 40 * damageMultiplier, alert: "Running quickly triggered a trap, causing 40 damage." },
                { text: "Move slowly and use a stick to probe for traps.", damage: 0, alert: "You moved slowly and probed for traps, avoiding damage." },
                { text: "Shout to check for structural integrity.", damage: 40 * damageMultiplier, alert: "Shouting caused a collapse, causing 40 damage." },
                { text: "Climb on top of the ruins to get a better view.", damage: 40 * damageMultiplier, alert: "Climbing on top caused a fall, taking 40 damage." }
            ]
        },
        {
            description: "You find yourself enveloped in a dense fog, making it difficult to see more than a few feet ahead. What do you do?",
            image: "/survive-wilderness/assets/images/dense-fog.png",
            options: [
                { text: "Walk through the fog at a normal pace.", damage: 30 * damageMultiplier, alert: "Walking through the fog at a normal pace caused you to trip, taking 30 damage." },
                { text: "Use a stick to feel your way and move slowly.", damage: 0, alert: "You used a stick to feel your way and safely navigated the fog." },
                { text: "Shout for help to find your way.", damage: 30 * damageMultiplier, alert: "Shouting didn't help and you walked into a trap, taking 30 damage." },
                { text: "Run through the fog quickly.", damage: 30 * damageMultiplier, alert: "Running quickly caused you to trip and fall, taking 30 damage." }
            ]
        },
        {
            description: "You come across what looks like solid ground but is actually hidden quicksand. It looks deceptive and dangerous. What do you do?",
            image: "/survive-wilderness/assets/images/hidden-quicksand.png",
            options: [
                { text: "Walk through the area normally.", damage: 50 * damageMultiplier, alert: "You got stuck in the quicksand and took 50 damage while escaping." },
                { text: "Use a long stick to test the ground and move cautiously.", damage: 0, alert: "You tested the ground with a stick and moved cautiously, avoiding the quicksand." },
                { text: "Run quickly across the area.", damage: 50 * damageMultiplier, alert: "Running quickly caused you to get stuck in the quicksand, taking 50 damage." },
                { text: "Jump across the area.", damage: 50 * damageMultiplier, alert: "Jumping didn't work, and you got stuck in the quicksand, taking 50 damage." }
            ]
        },
        {
            description: "A volcanic eruption starts nearby, spewing ash and lava. The ground shakes, and the air is filled with toxic fumes. What do you do?",
            image: "/survive-wilderness/assets/images/volcanic-eruption.png",
            options: [
                { text: "Run downhill to escape the lava.", damage: 80 * damageMultiplier, alert: "Running downhill wasn't fast enough, and you got caught by the lava, taking 80 damage." },
                { text: "Find a cave or shelter to hide from the ash and lava.", damage: 0, alert: "You found a cave and sheltered safely from the eruption." },
                { text: "Climb a tree to escape the lava.", damage: 80 * damageMultiplier, alert: "Climbing a tree didn't protect you from the lava and ash, causing 80 damage." },
                { text: "Stand still and cover your face.", damage: 80 * damageMultiplier, alert: "Standing still exposed you to the toxic fumes and ash, causing 80 damage." }
            ]
        },
        {
            description: "You are confronted by a wild animal, such as a bear or a wolf, that looks aggressive and ready to attack. What do you do?",
            image: "/survive-wilderness/assets/images/wild-animal-attack.png",
            options: [
                { text: "Run away as fast as you can.", damage: 70 * damageMultiplier, alert: "Running away provoked the animal to attack, causing 70 damage." },
                { text: "Use a deterrent like loud noise or pepper spray.", damage: 0, alert: "You used a deterrent and scared the animal away, avoiding damage." },
                { text: "Climb a tree to escape the animal.", damage: 70 * damageMultiplier, alert: "Climbing a tree didn't stop the animal from attacking, causing 70 damage." },
                { text: "Stand your ground and try to look big.", damage: 70 * damageMultiplier, alert: "Standing your ground and trying to look big didn't work, causing 70 damage." }
            ]
        }
    ];
    // filter out used obstacles
    let availableEvents = events.filter((event, index) => !usedObstacles.includes(index));
    if (availableEvents.length === 0) {
        // reset usedObstales if all events have been used
        usedObstacles = [];
        availableEvents = events;
    }

    const event = availableEvents[Math.floor(Math.random() * availableEvents.length)];
    displayEvent(event, health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);
}

function displayEnemyEvent(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier) {
    const enemies = [
        {
            description: "Even with a bright light of the day, you seem to barely see mystique creature. A dark, shapeless creature that lurks in the shadows and dark parts of the forest. What do you do?",
            image: "/survive-wilderness/assets/images/shadow-beast.png",
            options: [
                { text: "Fight the Shadow Beast without a light source.", damage: 50 * damageMultiplier, alert: "You fought the Shadow Beast without a light source and took 50 damage." },
                { text: "Use a torch or lantern to scare it away.", damage: 0, alert: "You used a torch to scare away the Shadow Beast and avoided damage." },
                { text: "Shout loudly to scare it away.", damage: 50 * damageMultiplier, alert: "Shouting had no effect and the Shadow Beast attacked, causing 50 damage." },
                { text: "Throw a rock at it.", damage: 50 * damageMultiplier, alert: "Throwing a rock did nothing and the Shadow Beast attacked, causing 50 damage." }
            ]
        },
        {
            description: "As you are walking in woods, you can feel weird sensation that something is looking at you. You look above, and there, in tree branches you see bright orange snake, probably 10 meters long. It has poisonous fangs. What do you do?",
            image: "/survive-wilderness/assets/images/venomous-serpant.png",
            options: [
                { text: "Attack the serpent head-on.", damage: 40 * damageMultiplier, alert: "Attacking the serpent head-on resulted in a venomous bite, causing 40 damage." },
                { text: "Use a ranged weapon.", damage: 0, alert: "You used a ranged weapon and defeated the serpent safely." },
                { text: "Try to catch the serpent by hand.", damage: 40 * damageMultiplier, alert: "Catching the serpent by hand was a bad idea, you got bit, causing 40 damage." },
                { text: "Run past the serpent quickly.", damage: 40 * damageMultiplier, alert: "Running past the serpent quickly resulted in a bite, causing 40 damage." }
            ]
        },
        {
            description: "You can hear terrible howls in a distance, and they seem to get closer every second. Before you, there it is . A ghostly wolf that can phase in and out of reality. What do you do?",
            image: "/survive-wilderness/assets/images/phantom-wolf.png",
            options: [
                { text: "Fight the wolf with a magic silver sword.", damage: 30 * damageMultiplier, alert: "Fighting the wolf directly resulted in injuries, causing 30 damage." },
                { text: "Use a magic spell to banish it.", damage: 0, alert: "You used a magic spell and banished the Phantom Wolf to underground realm safely." },
                { text: "Climb a tree to escape it.", damage: 30 * damageMultiplier, alert: "Climbing a tree didn't help and the wolf attacked, causing 30 damage." },
                { text: "Throw magic water at it.", damage: 30 * damageMultiplier, alert: "Throwing water had no effect and the wolf attacked, causing 30 damage." }
            ]
        },
        {
            description: "Through binocular you see a large green ogre with spiky thorns covering its back is walking in your direction. He will be here soon. You cannon escape it. What do you do?",
            image: "/survive-wilderness/assets/images/thornback-ogre.png",
            options: [
                { text: "Engage the ogre in close combat.", damage: 60 * damageMultiplier, alert: "Engaging the ogre in close combat resulted in serious injuries, causing 60 damage." },
                { text: "Set a trap.", damage: 0, alert: "You set a trap and safely immobilize the Thornback Ogre." },
                { text: "Throw a net over it.", damage: 60 * damageMultiplier, alert: "Throwing a net was ineffective and the ogre attacked, causing 60 damage." },
                { text: "Distract it with enchanted song.", damage: 60 * damageMultiplier, alert: "Singing didn’t work, you are a terrible singer, which angered Ogre and it attacked, causing 60 damage." }
            ]
        },
        {
            description: "As you walk down the path, you hear someone crying. You think it is a lost child and want to help it but, you find something terrifying. A ghostly figure whose scream can paralyze its victims. What do you do?",
            image: "/survive-wilderness/assets/images/banshee.jpg",
            options: [
                { text: "Confront the banshee without ear protection.", damage: 50 * damageMultiplier, alert: "Confronting the banshee without ear protection paralyzed you, causing 50 damage." },
                { text: "Use earplugs and hit banshee with a branch.", damage: 0, alert: "You used earplugs and confronted the banshee safely." },
                { text: "Cover your ears with your hands and run fast.", damage: 50 * damageMultiplier, alert: "Covering your ears with your hands and running fast wasn't enough to escape banshee, causing 50 damage." },
                { text: "Scream back at banshee.", damage: 50 * damageMultiplier, alert: "Screaming back at banshee at first made her laugh, then really angry, causing 50 damage." }
            ]
        },
        {
            description: "Down the path you see something that resembles a green bush, but realise that it’s a blob of slime that can dissolve anything it touches. What do you do?",
            image: "/survive-wilderness/assets/images/acidic-slime.png",
            options: [
                { text: "Fight the slime directly.", damage: 35 * damageMultiplier, alert: "Fighting the slime directly resulted in burns, causing 35 damage." },
                { text: "Use freezing magic to solidify it.", damage: 0, alert: "You used freezing magic and safely solidified the Acidic Slime." },
                { text: "Step on it to squash it.", damage: 35 * damageMultiplier, alert: "Stepping on the slime caused it to burn you, causing 35 damage." },
                { text: "Try to capture it in a trap.", damage: 35 * damageMultiplier, alert: "Trying to capture the slime in a trap was dangerous, causing 35 damage." }
            ]
        },
        {
            description: "The section of the forest that you are walking right now is scorched. You see a small dragon that breathes fire. Fun fact about dragons: a small dragon in dragon world is still 12 meters high and weights around 10 tonnes. What do you do?",
            image: "/survive-wilderness/assets/images/inferno-fury.png",
            options: [
                { text: "Attack the dragon without fire protection.", damage: 100 * damageMultiplier, alert: "Attacking the Fury without fire protection resulted in burns, causing 100 damage." },
                { text: "Use a fire-resistant shield, frozen sword and magic spell to banish it.", damage: 0, alert: "You used a fire-resistant shield, frozen sword and spell and safely banish the Inferno Fury to mountains." },
                { text: "Throw water at the dragon.", damage: 100 * damageMultiplier, alert: "Throwing water was ineffective and made dragon laugh, the enraged Fury attacked, causing 100 damage." },
                { text: "Hide behind a rock.", damage: 100 * damageMultiplier, alert: "Hiding behind a rock didn't protect you from the fiery breath of the dragon, causing 100 damage." }
            ]
        },
        {
            description: "Near a path that you are walking is a huge cave entrance. A swarm of bats that drain blood from their victims fly right at you. What do you do?",
            image: "/survive-wilderness/assets/images/bloodsucking-bat-swarm.png",
            options: [
                { text: "Swat at the bats.", damage: 25 * damageMultiplier, alert: "Swatting at the bats aggravated them, causing 25 damage." },
                { text: "Use a bat repellant and light a fire.", damage: 0, alert: "You used a repellant and lit a fire and the bats fled safely." },
                { text: "Run through the swarm.", damage: 25 * damageMultiplier, alert: "Running through the swarm got you bitten, causing 25 damage." },
                { text: "Cover yourself with a cloak.", damage: 25 * damageMultiplier, alert: "Covering yourself with a cloak didn't protect you from the bats, causing 25 damage." }
            ]
        },
        {
            description: "As you are resting and gathering energy for continuation of your journey on a nearby pile of boulders, suddenly boulders start moving and you realise that you were sitting on a stone golem covered in sharp spikes. Fun fact: stone gollems are very slow and weight up to 30 tonnes. What do you do?",
            image: "/survive-wilderness/assets/images/spiked-golem.png",
            options: [
                { text: "Attack the golem with sword and magic spell.", damage: 50 * damageMultiplier, alert: "Attacking the golem with sword and spells didn’t work and resulted in injuries, causing 50 damage." },
                { text: "Use a hammer to break its legs and spikes.", damage: 0, alert: "You used a hammer and safely broke the golem's legs and spikes so it can’t harm anyone anymore." },
                { text: "Try to push the golem over.", damage: 50 * damageMultiplier, alert: "Trying to push the golem over didn't work, and it attacked, causing 50 damage." },
                { text: "Shout to distract it.", damage: 50 * damageMultiplier, alert: "Shouting didn't distract the golem, it just woke up more stone golems from pile of boulders and they attacked, causing 50 damage." }
            ]
        },
        {
            description: "In a colder biome, you stumble on a frozen beast. A towering giant that emanates a freezing aura. What do you do?",
            image: "/survive-wilderness/assets/images/frost-giant.png",
            options: [
                { text: "Engage the giant without warm clothing or heat sources.", damage: 55 * damageMultiplier, alert: "Engaging the giant without protection resulted in frostbite, causing 55 damage." },
                { text: "Use fire magic and a heat source to counter the cold beast.", damage: 0, alert: "You used fire magic and torch and safely countered the Frost Giant's cold aura." },
                { text: "Try to climb the giant and stick burning torch in his ear.", damage: 55 * damageMultiplier, alert: "Climbing the giant was dangerous and you fell, causing 55 damage." },
                { text: "Throw fire ball at the giant.", damage: 55 * damageMultiplier, alert: "Throwing fire ball at the giant had no effect and it attacked, causing 55 damage." }
            ]
        },
    ];
    // filter out used enemies
    let availableEnemies = enemies.filter((enemy, index) => !usedEnemies.includes(index));
    if (availableEnemies.lengts === 0) {
        // reset usedEnemies if all events have been used
        usedEnemies = [];
        availableEnemies = enemies;
    }

    const enemy = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
    usedEnemies.push(enemies.indexOf(enemy)); // trackking used enemy
    displayEvent(enemy, health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);
}

function displayEvent(event, health, currentTurn, maxTurns, healthMultiplier, damageMultiplier) {
    const eventArea = document.getElementById('eventArea');
    //set the inner HTML of 'eventArea' to display the event description and image with a class
    eventArea.innerHTML = `<img src="${event.image}" alt="Event Image" class="event-image"><p>${event.description}</p>`;
    //iterate through each option in the event options array
    event.options.forEach((option, index) => {
        // create a new button element
        const button = document.createElement('button');
        button.innerText = option.text;
        button.addEventListener('click', () => {
            //decrease health by the option's damage value
            health -= option.damage;
            //show an alert with the option text and the damage caused if any
            alert(option.alert);
            currentTurn++;
            updateStatus(health, currentTurn, maxTurns);
            nextTurn(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);

        });
        //append the button to the eventArea element
        eventArea.appendChild(button);
    });
}

function displayWizardEvent(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier) {
    //generate a new wizard question
    const wizardQuestion = generateWizardQuestion();
    const eventArea = document.getElementById('eventArea');
    const wizardImage = "/survive-wilderness/assets/images/wizard.jpg";
    //set the inner HTML of 'eventArea' to display the wizard's question and image
    eventArea.innerHTML = `<img src="${wizardImage}" alt="Wizard Image" class="event-image"><p>The Wandering Wizard approaches you and asks: "${wizardQuestion.question}"</p>`;

    //ccreate an input element for the player's answer
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Your answer';
    eventArea.appendChild(input); //append the input element to the eventArea

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit answer';
    submitButton.addEventListener('click', () => {
        //get the player's answer from the input field and parse it as an integer
        const playerAnswer = parseInt(input.value, 10);
        if (playerAnswer === wizardQuestion.answer) {
            const healthPack = getRandomHealthPack();
            //increase health, considering the health pack and multiplier, ensuring it doesn't exceed 1000
            health = Math.min(1000, health + healthPack.health * healthMultiplier);
            alert(`Correct! You recived a ${healthPack.name} that restored ${healthPack.health * healthMultiplier} health.`);
        } else {
            //if incorrect, reduce health by 50 multiplied by the damage multiplier
            health -= 50 * damageMultiplier;
            alert(`Wrong answer! The wizard scolds you and you lose 50 health.`);
        }
        currentTurn++;
        updateStatus(health, currentTurn, maxTurns);
        //proceed to the next turn with updated values
        nextTurn(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);
    });
    //append the submit button to the eventArea element
    eventArea.appendChild(submitButton);
}

function generateWizardQuestion() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let question, answer;

    switch (operation) {
        case '+':
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            question = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
        case '*':
            question = `${num1} * ${num2}`;
            answer = num1 * num2;
            break;
        case '/':
            question = `${num1} / ${num2}`;
            answer = Math.floor(num1 / num2); // round down and return largest integer
            break;
    }
    return { question, answer };
}

function getRandomHealthPack() {
    const healthPacks = [
        { name: 'Basic Health Pack', health: 35},
        { name: 'Advanced Health Pack', health: 45},
        { name: 'Medical Kit', health: 55},
        { name: 'Herbal Remedy Pack', health: 75},
        { name: 'Regeneration Elixir', health: 100}
    ];
    return healthPacks[Math.floor(Math.random() * healthPacks.length)];
}

function endGame(health) {
    const eventArea = document.getElementById('eventArea');
    eventArea.innerHTML = health > 0 ? `<p>Congratulations! You survived with ${health} health remaining.</p>` : `<p>Game Over! You ran out of health.</p>`;
    document.getElementById('resetGame').classList.remove('hidden'); // show reset button when game ends
}

function resetGame() {
    document.querySelector('.game-intro').classList.remove('hidden');
    document.querySelector('#gameArea').classList.add('hidden');
    document.getElementById('resetGame').classList.add('hidden'); // hide reset button
    document.getElementById('eventArea').innerHTML = ''; // clear event area
    document.getElementById('playerHealthBar-fill').style.width = '100%'; // reset health bar
    document.getElementById('healthValue').innerText = 'Health 1000'; // reset health value display
    document.getElementById('turnCounter').innerText = 'Turns: 0/0'; // reset turn counter display
    
}