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

function nextTurn(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier) {
    if (currentTurn >= maxTurns || health <= 0) {
        endGame(health);
        return;
    }
    const eventType = Math.random();
    if (eventType < 0.3) { // there is 30% cnance to stumble upon wizard event
        displayWizardEvent(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);
    } else if (eventType < 0.75) { // there is 45% chance of obstacle event (0.3 + 0.45 = 0.75)
        displayeObstacleEvent(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);
    } else { // the rest is 25% ov enemy event
        displayEnemyEvent(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);
    }
}

function displayeObstacleEvent(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier) {
    const events = [
        {
            description: "You encounter a fallen tree.",
            options: [
                { text: "Jump over", damage: 20 * damageMultiplier, alert: "You slipped while jumping over the fallen tree and took 20 damage." },
                { text: "Go around", damage: 0, alert: "You safely went around the fallen tree without taking any damage." },
                { text: "Climb over", damage: 20 * damageMultiplier, alert: "Climbing over the slippery fallen tree caused you to lose your balance and fall from it you take 20 damage." },
                { text: "Crawl under", damage: 20 * damageMultiplier, alert: "Crawling under the tree was tricky and tree ended up crushing you you take 20 damage." }
            ]
        },
        {
            description: "You can hear gurgling water nearby and you see a mighty river in front of you. It has strong currents and slippery banks. What do you do?",
            options: [
                { text: "Swim across the river", damage: 40 * damageMultiplier, alert: "You struggled against the strong currents and took 40 damage." },
                { text: "Reinforce nearby bridge with rope and cross it", damage: 0, alert: "You found a bridge and crossed the river safely." },
                { text: "Build a raft to float across", damage: 40 * damageMultiplier, alert: "The raft you built was unstable and you took 40 damage." },
                { text: "Jump from stone to stone", damage: 40 * damageMultiplier, alert: "You slipped while jumping from stone to stone and took 40 damage." }
            ]
        },
        {
            description: "You went out into the clearing and saw something strange. Below you is a steep canyon that is carved by a river and has a lot of loose rocks. What do you do?",
            options: [
                { text: "Climb down the canyon without equipment", damage: 80 * damageMultiplier, alert: "Loose rocks made you fall while climbing down taking 80 damage." },
                { text: "Use parachute to go down", damage: 80 * damageMultiplier, alert: "Strong winds crashed you on the side of canyon dealing you 80 damage." },
                { text: "Use a rope and climbing gear to descend", damage: 0, alert: "You managed to descend safely." },
                { text: "Jump across the canyon", damage: 80 * damageMultiplier, alert: "You didn't make the jump and fell taking 80 damage." }
            ]
        },
        {
            description: "As you walk further you feel like there isn’t much of air flow like there is a wall in front of you. You see a huge cliff before you. The cliff is high with jagged rocks below. What do you do?",
            options: [
                { text: "Climb up the cliff using climbing pickaxe", damage: 100 * damageMultiplier, alert: "You lost your grip while climbing up and took 100 damage." },
                { text: "Take climbing gear from poor climbers skeleton nearby and climb up", damage: 0, alert: "You found poor climbers skeleton took his gear and climbed cliff safely." },
                { text: "Climb up carefully", damage: 100 * damageMultiplier, alert: "Climbing up carefully but without proper equipment still resulted in a fall taking 100 damage." },
                { text: "Use a makeshift rope", damage: 100 * damageMultiplier, alert: "The makeshift rope broke and you fell taking 100 damage." }
            ]
        },
        {
            description: "You feel stale air nearby and all of the sudden a colony of bats fly out of a huge hole from the ground. The cave is dark and dangerous. What do you do?",
            options: [
                { text: "Enter the cave without a torch", damage: 30 * damageMultiplier, alert: "You stumbled in the dark cave and took 30 damage." },
                { text: "Light a torch before entering", damage: 0, alert: "You lit a torch and entered the cave safely." },
                { text: "Enter cave safely", damage: 30 * damageMultiplier, alert: "Even tho you entered cave safely you fell because you can’t see where are you stepping taking 30 damage." },
                { text: "Shout to scare away the bats", damage: 30 * damageMultiplier, alert: "Shouting startled the bats and they attacked causing 30 damage." }
            ]
        },
        {
            description: "As you walk through forest you see extinguished fire but the ashes are still warm. The camp has remnants of activity and scattered supplies. What do you do?",
            options: [
                { text: "Rummage through the camp recklessly", damage: 20 * damageMultiplier, alert: "Rummaging recklessly caused you to get injured on rusty nail taking 20 damage." },
                { text: "Search the camp cautiously without much noise", damage: 0, alert: "You searched the camp cautiously and avoided injury." },
                { text: "Set up camp nearby", damage: 20 * damageMultiplier, alert: "Setting up camp nearby was a mistake a goblin attacked you and you took 20 damage." },
                { text: "Burn the camp to avoid danger", damage: 20 * damageMultiplier, alert: "Burning the camp caused an uncontrolled fire and you took 20 damage." }
            ]
        },
        {
            description: "Before you, you see a mossy castle and it seems to be abandoned. The castle is old with collapsing walls, hidden traps, and perhaps hidden treasure. What do you do?",
            options: [
                { text: "Look for hidden treasure", damage: 60 * damageMultiplier, alert: "Driven by lust you explore hastily triggering trap causing 60 damage." },
                { text: "Investigate the castle room by room", damage: 0, alert: "You carefully investigated the castle and avoided traps. Sadly you didn’t find anything interesting." },
                { text: "Run through quickly", damage: 60 * damageMultiplier, alert: "Running quickly caused you to fall into a trap taking 60 damage." },
                { text: "Shout to check for response from potential residents", damage: 60 * damageMultiplier, alert: "Shouting disturbed the castle's structure and made it fall on you causing 60 damage." }
            ]
        },
        {
            description: "In the middle of night you hear scary sounds. You see graveyard and only way is through it. The graveyard is eerie with a lot of open graves and evil ghosts that seek revenge. What do you do?",
            options: [
                { text: "Walk casually through the graveyard trying to assert dominance over ghosts", damage: 40 * damageMultiplier, alert: "Walking through the graveyard full of pride trying to make ghost submissive caused ghosts to attack taking 40 damage." },
                { text: "Be respectful to evil ghosts and ask them kindly for a safe pass through", damage: 0, alert: "You managed to calm down evil ghosts and pass freely through graveyard." },
                { text: "Run through the graveyard shouting that you aren’t afraid of ghosts", damage: 40 * damageMultiplier, alert: "Running and shouting taunts through the graveyard made evil ghosts angry resulting in attack taking 40 damage." },
                { text: "Hide behind memorial to avoid ghosts", damage: 40 * damageMultiplier, alert: "Hiding behind a memorial was a bad idea ghosts found you resulting in attack causing 40 damage." }
            ]
        },
        {
            description: "Upon reaching misty and smelly swamp you see old house in the middle of it. That is a witch house. The house is filled with magical traps and curses. What do you do?",
            options: [
                { text: "Enter the house without protection", damage: 50 * damageMultiplier, alert: "Entering without protection triggered traps causing 50 damage." },
                { text: "Use a protective charm before entering", damage: 0, alert: "You used a protective charm that you found in your backpack and safely entered the house." },
                { text: "Sneak in through the window", damage: 50 * damageMultiplier, alert: "Sneaking in through the window triggered a curse causing 50 damage." },
                { text: "Cast a spell to enter safely", damage: 50 * damageMultiplier, alert: "The spell backfired causing 50 damage." }
            ]
        },
        {
            description: "You hear something rustle behind you. A weird silhouette approaches you without speaking. It is a strange-looking man; stranger appears suspicious and unpredictable. What do you do?",
            options: [
                { text: "Confront the stranger", damage: 40 * damageMultiplier, alert: "Confronting the stranger resulted in a fight stranger called for help of his companions causing 40 damage." },
                { text: "Act like a mad lad like you are out of your mind", damage: 0, alert: "Stranger thought that he should avoid crazy people like you. You continue with your journey safely." },
                { text: "Ask the stranger for help", damage: 40 * damageMultiplier, alert: "Asking the stranger for help was a mistake he saw your weakness and attacked you causing 40 damage." },
                { text: "Follow the stranger quietly", damage: 40 * damageMultiplier, alert: "Following the stranger quietly led to an ambush from strangers companions causing 40 damage." }
            ]
        },
        {
            description: "As you tread deeper into the forest you encounter a murky swamp with treacherous mud and hidden dangers. What do you do?",
            options: [
                { text: "Wade through the swamp directly", damage: 30 * damageMultiplier, alert: "You got stuck in the mud and took 30 damage while trying to free yourself." },
                { text: "Find a solid path and use a stick to check the ground", damage: 0, alert: "You found a solid path and safely navigated through the swamp." },
                { text: "Jump from one dry spot to another", damage: 30 * damageMultiplier, alert: "You missed a jump and fell into the swamp taking 30 damage." },
                { text: "Run quickly through the swamp", damage: 30 * damageMultiplier, alert: "Running quickly caused you to trip and fall taking 30 damage." }
            ]
        },
        {
            description: "You come across a dense patch of thorny bushes blocking your path. The thorns are sharp and can easily cause injury. What do you do?",
            options: [
                { text: "Push through the bushes", damage: 20 * damageMultiplier, alert: "You got scratched by the thorns and took 20 damage." },
                { text: "Cut through the bushes with a machete", damage: 0, alert: "You used a machete to safely cut through the bushes." },
                { text: "Crawl under the bushes", damage: 20 * damageMultiplier, alert: "Crawling under the bushes resulted in scratches taking 20 damage." },
                { text: "Jump over the bushes", damage: 20 * damageMultiplier, alert: "You landed poorly and got scratched taking 20 damage." }
            ]
        },
        {
            description: "You stumble upon a many ant colonies in your path. The ground is covered with dangerous ants. What do you do?",
            options: [
                { text: "Run across ants", damage: 40 * damageMultiplier, alert: "Even tho you ran fast ants still bit you many times taking 40 damage." },
                { text: "Use a long stick to poke ant hills", damage: 40 * damageMultiplier, alert: "Enraged ants bit you many times." },
                { text: "Jump across ant hills", damage: 50 * damageMultiplier, alert: "You didn't make the jump and fell onto ants that merecelessly bit you many times taking 50 damage." },
                { text: "Climb on a tree and jump to another trees", damage: 0, alert: "Your ingenuity saved you from ants." }
            ]
        },
        {
            description: "You encounter an area filled with poisonous plants. The air is thick with toxic pollen. What do you do?",
            options: [
                { text: "Walk through the plants normally", damage: 40 * damageMultiplier, alert: "You inhaled the toxic pollen and took 40 damage." },
                { text: "Cover your mouth and nose and move quickly", damage: 0, alert: "You covered your mouth and nose and safely passed through the area." },
                { text: "Crawl under the plants", damage: 40 * damageMultiplier, alert: "Crawling stirred up more pollen causing 40 damage." },
                { text: "Burn the plants", damage: 40 * damageMultiplier, alert: "Burning the plants released toxic smoke causing 40 damage." }
            ]
        },
        {
            description: "You find an old abandoned mine shaft. It looks unstable and dangerous. What do you do?",
            options: [
                { text: "Walk through the mine without any support", damage: 70 * damageMultiplier, alert: "The mine shaft collapsed on you causing 70 damage." },
                { text: "Use sturdy wooden beams to support your path", damage: 0, alert: "You used wooden beams to safely navigate the mine." },
                { text: "Run quickly through the mine", damage: 70 * damageMultiplier, alert: "Running caused the unstable mine to collapse taking 70 damage." },
                { text: "Shout to check for echoes", damage: 70 * damageMultiplier, alert: "Shouting caused a cave-in taking 70 damage." }
            ]
        },
        {
            description: "As you journey through the forest you suddenly find yourself surrounded by a spreading wildfire. The heat is intense and the smoke is choking. What do you do?",
            options: [
                { text: "Run through the fire to the other side", damage: 60 * damageMultiplier, alert: "You got burned while trying to run through the fire taking 60 damage." },
                { text: "Find a nearby river and stay low to avoid smoke", damage: 0, alert: "You found a river and stayed low safely avoiding the fire and smoke." },
                { text: "Climb a tree to escape the fire", damage: 60 * damageMultiplier, alert: "Climbing a tree didn't help and you got burned taking 60 damage." },
                { text: "Hide under a rock ledge", damage: 60 * damageMultiplier, alert: "Hiding under a rock ledge didn't protect you from the smoke causing 60 damage." }
            ]
        },
        {
            description: "You hear a rumbling sound and see a rockslide barreling down the mountain towards you. Large rocks and debris are crashing down. What do you do?",
            options: [
                { text: "Run downhill away from the rockslide", damage: 70 * damageMultiplier, alert: "Running downhill didn't save you and you got hit by rocks taking 70 damage." },
                { text: "Find cover behind a large boulder", damage: 0, alert: "You found cover behind a large boulder and safely avoided the rockslide." },
                { text: "Climb up a tree", damage: 70 * damageMultiplier, alert: "Climbing up a tree didn't protect you from the falling rocks causing 70 damage." },
                { text: "Stand still and brace yourself", damage: 70 * damageMultiplier, alert: "Standing still was a bad idea and you got hit by the rockslide taking 70 damage." }
            ]
        },
        {
            description: "The path ahead is overgrown with thick thorny vines. They look very difficult to navigate. What do you do?",
            options: [
                { text: "Push through the vines", damage: 40 * damageMultiplier, alert: "Pushing through the vines caused you to get scratched taking 40 damage." },
                { text: "Cut the vines with a knife", damage: 0, alert: "You used a knife to safely cut through the vines." },
                { text: "Burn the vines", damage: 40 * damageMultiplier, alert: "Burning the vines caused smoke inhalation taking 40 damage." },
                { text: "Climb over the vines", damage: 40 * damageMultiplier, alert: "Climbing over the vines caused you to fall taking 40 damage." }
            ]
        },
        {
            description: "You come across a large chasm with a fragile-looking rope bridge stretching across it. The bridge looks very unstable. What do you do?",
            options: [
                { text: "Cross the bridge quickly", damage: 50 * damageMultiplier, alert: "The bridge collapsed as you tried to cross quickly causing 50 damage." },
                { text: "Secure the bridge with additional ropes", damage: 0, alert: "You secured the bridge and crossed safely." },
                { text: "Find another way around the chasm", damage: 50 * damageMultiplier, alert: "Taking another way around was exhausting causing 50 damage." },
                { text: "Swing across using a vine", damage: 50 * damageMultiplier, alert: "The vine snapped mid-swing causing you to fall taking 50 damage." }
            ]
        },
        {
            description: "The weather suddenly changes, and a powerful storm approaches with heavy rain and lightning. What do you do?",
            options: [
                { text: "Continue your journey through the storm", damage: 60 * damageMultiplier, alert: "Continuing through the storm resulted in getting struck by lightning taking 60 damage." },
                { text: "Find shelter in a cave", damage: 0, alert: "You found shelter in a cave and waited out the storm safely." },
                { text: "Climb a tree to avoid flooding", damage: 60 * damageMultiplier, alert: "Climbing a tree during the storm resulted in getting struck by lightning causing 60 damage." },
                { text: "Hide under a large rock", damage: 60 * damageMultiplier, alert: "Hiding under a rock didn't protect you from the storm causing 60 damage." }
            ]
        },
        {
            description: "You find a large beehive hanging from a tree in your path. The bees look aggressive. What do you do?",
            options: [
                { text: "Walk past the beehive quietly", damage: 40 * damageMultiplier, alert: "Walking past the beehive disturbed the bees and they stung you causing 40 damage." },
                { text: "Use smoke to calm the bees", damage: 0, alert: "You used smoke to calm the bees and passed safely." },
                { text: "Run past the beehive", damage: 40 * damageMultiplier, alert: "Running past the beehive disturbed the bees and they stung you causing 40 damage." },
                { text: "Throw rocks at the beehive", damage: 40 * damageMultiplier, alert: "Throwing rocks at the beehive agitated the bees and they attacked causing 40 damage." }
            ]
        },
        {
            description: "As you walk through the dense forest you come across a giant spider web blocking your path. The web is sticky and strong. What do you do?",
            options: [
                { text: "Cut through the web with a knife", damage: 20 * damageMultiplier, alert: "Cutting through the web took longer than expected and the spider bit you causing 20 damage." },
                { text: "Burn the web with a torch", damage: 0, alert: "You burned the web with a torch and passed safely." },
                { text: "Find a way around the web", damage: 20 * damageMultiplier, alert: "Finding a way around the web took too long and you got bitten by the spider causing 20 damage." },
                { text: "Try to push through the web", damage: 20 * damageMultiplier, alert: "Pushing through the web got you stuck and the spider bit you causing 20 damage." }
            ]
        },
        {
            description: "You stumble upon a quicksand pit hidden under a layer of leaves. The quicksand looks dangerous. What do you do?",
            options: [
                { text: "Walk around the quicksand pit", damage: 30 * damageMultiplier, alert: "Walking around the quicksand pit took too long and you got exhausted causing 30 damage." },
                { text: "Use a stick to check the ground ahead", damage: 0, alert: "You used a stick to safely navigate around the quicksand." },
                { text: "Jump across the quicksand pit", damage: 30 * damageMultiplier, alert: "Jumping across the quicksand pit caused you to get stuck and take 30 damage." },
                { text: "Run quickly across the quicksand", damage: 30 * damageMultiplier, alert: "Running quickly caused you to sink into the quicksand and take 30 damage." }
            ]
        },
        {
            description: "You hear a distant roar and realize you're near a tiger's den. The tiger looks ready to attack. What do you do?",
            options: [
                { text: "Confront the tiger head-on", damage: 80 * damageMultiplier, alert: "Confronting the tiger head-on resulted in a fierce battle causing 80 damage." },
                { text: "Climb a tree to escape the tiger", damage: 0, alert: "You climbed a tree and escaped the tiger safely." },
                { text: "Use a torch to scare the tiger away", damage: 80 * damageMultiplier, alert: "The torch didn't scare the tiger and it attacked causing 80 damage." },
                { text: "Run away as fast as you can", damage: 80 * damageMultiplier, alert: "Running away didn't work and the tiger caught up to you causing 80 damage." }
            ]
        }
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    displayEvent(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);
}

function displayEnemyEvent(health, currentTurn, maxTurns, healthMultiplier, damageMultiplier) {
    const enemies = [
        {
            description: "Even with a bright light of the day, you seem to barely see mystique creature. A dark, shapeless creature that lurks in the shadows and dark parts of the forest. What do you do?",
            options: [
                { text: "Fight the Shadow Beast without a light source.", damage: 50 * damageMultiplier, alert: "You fought the Shadow Beast without a light source and took 50 damage." },
                { text: "Use a torch or lantern to scare it away.", damage: 0, alert: "You used a torch to scare away the Shadow Beast and avoided damage." },
                { text: "Shout loudly to scare it away.", damage: 50 * damageMultiplier, alert: "Shouting had no effect and the Shadow Beast attacked, causing 50 damage." },
                { text: "Throw a rock at it.", damage: 50 * damageMultiplier, alert: "Throwing a rock did nothing and the Shadow Beast attacked, causing 50 damage." }
            ]
        },
        {
            description: "As you are walking in woods, you can feel weird sensation that something is looking at you. You look above, and there, in tree branches you see bright orange snake, probably 10 meters long. It has poisonous fangs. What do you do?",
            options: [
                { text: "Attack the serpent head-on.", damage: 40 * damageMultiplier, alert: "Attacking the serpent head-on resulted in a venomous bite, causing 40 damage." },
                { text: "Use a ranged weapon.", damage: 0, alert: "You used a ranged weapon and defeated the serpent safely." },
                { text: "Try to catch the serpent by hand.", damage: 40 * damageMultiplier, alert: "Catching the serpent by hand was a bad idea, you got bit, causing 40 damage." },
                { text: "Run past the serpent quickly.", damage: 40 * damageMultiplier, alert: "Running past the serpent quickly resulted in a bite, causing 40 damage." }
            ]
        },
        {
            description: "You can hear terrible howls in a distance, and they seem to get closer every second. Before you, there it is . A ghostly wolf that can phase in and out of reality. What do you do?",
            options: [
                { text: "Fight the wolf with a magic silver sword.", damage: 30 * damageMultiplier, alert: "Fighting the wolf directly resulted in injuries, causing 30 damage." },
                { text: "Use a magic spell to banish it.", damage: 0, alert: "You used a magic spell and banished the Phantom Wolf to underground realm safely." },
                { text: "Climb a tree to escape it.", damage: 30 * damageMultiplier, alert: "Climbing a tree didn't help and the wolf attacked, causing 30 damage." },
                { text: "Throw magic water at it.", damage: 30 * damageMultiplier, alert: "Throwing water had no effect and the wolf attacked, causing 30 damage." }
            ]
        },
        {
            description: "Through binocular you see a large green ogre with spiky thorns covering its back is walking in your direction. He will be here soon. You cannon escape it. What do you do?",
            options: [
                { text: "Engage the ogre in close combat.", damage: 60 * damageMultiplier, alert: "Engaging the ogre in close combat resulted in serious injuries, causing 60 damage." },
                { text: "Set a trap.", damage: 0, alert: "You set a trap and safely immobilize the Thornback Ogre." },
                { text: "Throw a net over it.", damage: 60 * damageMultiplier, alert: "Throwing a net was ineffective and the ogre attacked, causing 60 damage." },
                { text: "Distract it with enchanted song.", damage: 60 * damageMultiplier, alert: "Singing didn’t work, you are a terrible singer, which angered Ogre and it attacked, causing 60 damage." }
            ]
        },
        {
            description: "As you walk down the path, you hear someone crying. You think it is a lost child and want to help it but, you find something terrifying. A ghostly figure whose scream can paralyze its victims. What do you do?",
            options: [
                { text: "Confront the banshee without ear protection.", damage: 50 * damageMultiplier, alert: "Confronting the banshee without ear protection paralyzed you, causing 50 damage." },
                { text: "Use earplugs and hit banshee with a branch.", damage: 0, alert: "You used earplugs and confronted the banshee safely." },
                { text: "Cover your ears with your hands and run fast.", damage: 50 * damageMultiplier, alert: "Covering your ears with your hands and running fast wasn't enough to escape banshee, causing 50 damage." },
                { text: "Scream back at banshee.", damage: 50 * damageMultiplier, alert: "Screaming back at banshee at first made her laugh, then really angry, causing 50 damage." }
            ]
        },
        {
            description: "Down the path you see something that resembles a green bush, but realise that it’s a blob of slime that can dissolve anything it touches. What do you do?",
            options: [
                { text: "Fight the slime directly.", damage: 35 * damageMultiplier, alert: "Fighting the slime directly resulted in burns, causing 35 damage." },
                { text: "Use freezing magic to solidify it.", damage: 0, alert: "You used freezing magic and safely solidified the Acidic Slime." },
                { text: "Step on it to squash it.", damage: 35 * damageMultiplier, alert: "Stepping on the slime caused it to burn you, causing 35 damage." },
                { text: "Try to capture it in a trap.", damage: 35 * damageMultiplier, alert: "Trying to capture the slime in a trap was dangerous, causing 35 damage." }
            ]
        },
        {
            description: "The section of the forest that you are walking right now is scorched. You see a small dragon that breathes fire. Fun fact about dragons: a small dragon in dragon world is still 12 meters high and weights around 10 tonnes. What do you do?",
            options: [
                { text: "Attack the dragon without fire protection.", damage: 100 * damageMultiplier, alert: "Attacking the Fury without fire protection resulted in burns, causing 100 damage." },
                { text: "Use a fire-resistant shield, frozen sword and magic spell to banish it.", damage: 0, alert: "You used a fire-resistant shield, frozen sword and spell and safely banish the Inferno Fury to mountains." },
                { text: "Throw water at the dragon.", damage: 100 * damageMultiplier, alert: "Throwing water was ineffective and made dragon laugh, the enraged Fury attacked, causing 100 damage." },
                { text: "Hide behind a rock.", damage: 100 * damageMultiplier, alert: "Hiding behind a rock didn't protect you from the fiery breath of the dragon, causing 100 damage." }
            ]
        },
        {
            description: "Near a path that you are walking is a huge cave entrance. A swarm of bats that drain blood from their victims fly right at you. What do you do?",
            options: [
                { text: "Swat at the bats.", damage: 25 * damageMultiplier, alert: "Swatting at the bats aggravated them, causing 25 damage." },
                { text: "Use a bat repellant and light a fire.", damage: 0, alert: "You used a repellant and lit a fire and the bats fled safely." },
                { text: "Run through the swarm.", damage: 25 * damageMultiplier, alert: "Running through the swarm got you bitten, causing 25 damage." },
                { text: "Cover yourself with a cloak.", damage: 25 * damageMultiplier, alert: "Covering yourself with a cloak didn't protect you from the bats, causing 25 damage." }
            ]
        },
        {
            description: "As you are resting and gathering energy for continuation of your journey on a nearby pile of boulders, suddenly boulders start moving and you realise that you were sitting on a stone golem covered in sharp spikes. Fun fact: stone gollems are very slow and weight up to 30 tonnes. What do you do?",
            options: [
                { text: "Attack the golem with sword and magic spell.", damage: 50 * damageMultiplier, alert: "Attacking the golem with sword and spells didn’t work and resulted in injuries, causing 50 damage." },
                { text: "Use a hammer to break its legs and spikes.", damage: 0, alert: "You used a hammer and safely broke the golem's legs and spikes so it can’t harm anyone anymore." },
                { text: "Try to push the golem over.", damage: 50 * damageMultiplier, alert: "Trying to push the golem over didn't work, and it attacked, causing 50 damage." },
                { text: "Shout to distract it.", damage: 50 * damageMultiplier, alert: "Shouting didn't distract the golem, it just woke up more stone golems from pile of boulders and they attacked, causing 50 damage." }
            ]
        },
        {
            description: "In a colder biome, you stumble on a frozen beast. A towering giant that emanates a freezing aura. What do you do?",
            options: [
                { text: "Engage the giant without warm clothing or heat sources.", damage: 55 * damageMultiplier, alert: "Engaging the giant without protection resulted in frostbite, causing 55 damage." },
                { text: "Use fire magic and a heat source to counter the cold beast.", damage: 0, alert: "You used fire magic and torch and safely countered the Frost Giant's cold aura." },
                { text: "Try to climb the giant and stick burning torch in his ear.", damage: 55 * damageMultiplier, alert: "Climbing the giant was dangerous and you fell, causing 55 damage." },
                { text: "Throw fire ball at the giant.", damage: 55 * damageMultiplier, alert: "Throwing fire ball at the giant had no effect and it attacked, causing 55 damage." }
            ]
        },
    ];
    const enemy = enemies[Math.floor(Math.random() * enemies.length)];
    displayEvent(enemy, health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);
}

function displayEvent(event, health, currentTurn, maxTurns, healthMultiplier, damageMultiplier) {
    const eventArea = document.getElementById('eventArea');
    //set the inner HTML of 'eventArea' to display the event description
    eventArea.innerHTML = `<p>${event.description}</p>`;
    //iterate through each option in the event options array
    event.options.forEach((option, index) => {
        // create a new button element
        const button = document.createElement('button');
        button.innerText = option.text;
        button.addEventListener('clicke', () => {
            //decrease health by the option's damage value
            health -= option.damage;
            //show an alert with the option text and the damage caused if any
            alert(option.text + (option.damage > 0 ? `caused ${option.damage} damage.` : " was safe."));
            currentTurn++;
            updateStatus(health, currentTurn, maxTurns);
            nextTurn(healt, health, currentTurn, maxTurns, healthMultiplier, damageMultiplier);

        });
        //append the button to the eventArea element
        eventArea.appendChild(button);
    })
}

function displayWizardEvent() {

}

function generateWizardQuestion() {

}

function getRandomHealthPack() {

}

function endGame(health) {
    const eventArea = document.getElementById('eventArea');
    eventArea.innerHTML = health > 0 ? `<p>Congratulations! You survived with ${health} health remaining.</p>` : `<p>Game Over! You ran out of health.</p>`;
}