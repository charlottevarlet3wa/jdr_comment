const game = {
    currentStep: 0,
    stats: {
        health: 20,
        strength: 5,
        defense: 5,
        magic: 5,
        knowledge: 5,
        stealth: 5,
        morale: 10,
        provisions: 3,
        potions: 2,
        gold: 5
    },
    story: [
        {
            text: "Vous lisez la prophétie et décidez de partir en quête du trésor.",
            choices: [
                { text: "Préparez-vous avec des provisions et des armes.", action: () => { game.stats.strength += 5; game.nextStep(); } },
                { text: "Consultez le sage du village pour obtenir des conseils.", action: () => { game.stats.knowledge += 2; game.nextStep(); } },
                { text: "Partez immédiatement sans préparation.", action: () => { game.stats.health -= 3; game.nextStep(); } }
            ]
        },
        {
            text: "En chemin, vous croisez Luna, une magicienne.",
            choices: [
                { text: "Invitez Luna à se joindre à votre quête.", action: () => { game.stats.magic += 3; game.nextStep(); } },
                { text: "Passez votre chemin, préférant voyager seul.", action: () => { game.stats.morale -= 1; game.nextStep(); } },
                { text: "Défiez Luna en duel pour tester vos compétences.", action: () => { game.stats.strength += 2; game.nextStep(); } }
            ]
        },
        {
            text: "Vous arrivez devant un pont gardé par un troll.",
            choices: [
                { text: "Combattez le troll.", action: () => { game.fightTroll(); } },
                { text: "Essayez de le soudoyer avec quelques pièces d'or.", action: () => { game.stats.gold -= 2; game.nextStep(); } },
                { text: "Trouvez un autre chemin pour contourner le pont.", action: () => { game.stats.defense += 2; game.nextStep(); } }
            ]
        },
        {
            text: "Vous rencontrez Darius, un guerrier.",
            choices: [
                { text: "Acceptez son aide dans votre quête.", action: () => { game.stats.strength += 3; game.nextStep(); } },
                { text: "Refusez son aide, pensant que vous n'avez pas besoin de lui.", action: () => { game.stats.knowledge -= 1; game.nextStep(); } },
                { text: "Proposez-lui un duel amical pour évaluer sa force.", action: () => { game.stats.strength += 2; game.nextStep(); } }
            ]
        },
        {
            text: "La forêt devient dense et sombre.",
            choices: [
                { text: "Utilisez une torche pour éclairer le chemin.", action: () => { game.stats.defense += 2; game.nextStep(); } },
                { text: "Suivez les traces d'animaux pour trouver un passage sûr.", action: () => { game.stats.knowledge += 2; game.nextStep(); } },
                { text: "Grimpez dans les arbres pour avoir une meilleure vue.", action: () => { game.stats.stealth += 2; game.nextStep(); } }
            ]
        },
        {
            text: "Vous rencontrez Elena, une voleuse agile.",
            choices: [
                { text: "Invitez-la à rejoindre votre groupe.", action: () => { game.stats.stealth += 3; game.nextStep(); } },
                { text: "Méfiez-vous d'elle et continuez sans l'inviter.", action: () => { game.stats.morale -= 1; game.nextStep(); } },
                { text: "Proposez-lui un échange : des informations contre des provisions.", action: () => { game.stats.knowledge += 2; game.nextStep(); } }
            ]
        },
        {
            text: "Vous tombez dans un piège caché.",
            choices: [
                { text: "Utilisez la magie de Luna pour vous libérer.", action: () => { game.escapeTrap(); } },
                { text: "Demandez à Darius de briser les barreaux.", action: () => { game.breakBars(); } },
                { text: "Utilisez la dextérité d'Elena pour crocheter la serrure.", action: () => { game.pickLock(); } }
            ]
        },
        {
            text: "Un ruisseau bloqué par des rochers vous barre la route.",
            choices: [
                { text: "Demandez à Darius de déplacer les rochers.", action: () => { game.moveRocks(); } },
                { text: "Utilisez un sort d'eau de Luna pour dévier le ruisseau.", action: () => { game.useWaterSpell(); } },
                { text: "Cherchez un passage secret sous l'eau avec l'aide d'Elena.", action: () => { game.findSecretPath(); } }
            ]
        },
        {
            text: "Un esprit de la forêt apparaît devant vous.",
            choices: [
                { text: "Parlez-lui avec respect pour obtenir des informations.", action: () => { game.stats.knowledge += 2; game.nextStep(); } },
                { text: "Ignorez-le et continuez votre chemin.", action: () => { game.stats.morale -= 1; game.nextStep(); } },
                { text: "Tentez de le capturer pour qu'il vous guide.", action: () => { game.stats.health -= 3; game.nextStep(); } }
            ]
        },
        {
            text: "Vous trouvez un camp de brigands.",
            choices: [
                { text: "Infiltrez-vous furtivement pour récupérer des provisions.", action: () => { game.stats.provisions += 3; game.stats.stealth += 2; game.nextStep(); } },
                { text: "Affrontez-les de front avec Darius.", action: () => { game.stats.strength += 3; game.stats.provisions += 3; game.nextStep(); } },
                { text: "Négociez avec leur chef pour obtenir un passage sûr.", action: () => { game.stats.knowledge += 2; game.stats.defense += 2; game.nextStep(); } }
            ]
        },
        {
            text: "Vous découvrez une caverne mystérieuse.",
            choices: [
                { text: "Explorez-la pour trouver des indices.", action: () => { game.stats.knowledge += 2; game.nextStep(); } },
                { text: "Évitez-la, pensant qu'elle est trop dangereuse.", action: () => { game.stats.defense += 1; game.nextStep(); } },
                { text: "Envoyez Elena en éclaireur pour vérifier les lieux.", action: () => { game.stats.knowledge += 2; game.nextStep(); } }
            ]
        },
        {
            text: "Vous trouvez un ancien autel avec des inscriptions.",
            choices: [
                { text: "Laissez Luna déchiffrer les inscriptions.", action: () => { game.stats.knowledge += 2; game.nextStep(); } },
                { text: "Ignorez les inscriptions et continuez votre chemin.", action: () => { game.stats.defense += 1; game.nextStep(); } },
                { text: "Essayez de toucher l'autel pour voir ce qui se passe.", action: () => { game.stats.health -= 3; game.stats.defense += 2; game.nextStep(); } }
            ]
        },
        {
            text: "Vous arrivez à un lac scintillant.",
            choices: [
                { text: "Buvez l'eau pour vous ressourcer.", action: () => { game.drinkWater(); } },
                { text: "Cherchez un bateau pour traverser le lac.", action: () => { game.stats.defense += 2; game.nextStep(); } },
                { text: "Explorez les rives du lac pour trouver un passage.", action: () => { game.stats.knowledge += 2; game.stats.defense += 2; game.nextStep(); } }
            ]
        },
        {
            text: "Un vieil ermite vous offre son aide.",
            choices: [
                { text: "Acceptez son aide et écoutez ses conseils.", action: () => { game.stats.health += 3; game.stats.knowledge += 2; game.nextStep(); } },
                { text: "Refusez son aide, craignant un piège.", action: () => { game.stats.defense += 1; game.nextStep(); } },
                { text: "Échangez des provisions contre des informations.", action: () => { game.stats.knowledge += 2; game.stats.provisions -= 1; game.nextStep(); } }
            ]
        },
        {
            text: "Vous trouvez une ancienne bibliothèque abandonnée.",
            choices: [
                { text: "Cherchez des livres sur le Trésor des Étoiles.", action: () => { game.stats.knowledge += 2; game.nextStep(); } },
                { text: "Utilisez la magie de Luna pour révéler des secrets cachés.", action: () => { game.stats.magic += 2; game.nextStep(); } },
                { text: "Évitez la bibliothèque, pensant qu'elle est trop dangereuse.", action: () => { game.stats.defense += 1; game.nextStep(); } }
            ]
        },
        {
            text: "Une pluie magique commence à tomber.",
            choices: [
                { text: "Utilisez un sort de protection pour vous abriter.", action: () => { game.stats.magic += 2; game.stats.defense += 2; game.nextStep(); } },
                { text: "Cherchez un abri naturel pour vous protéger.", action: () => { game.stats.defense += 2; game.nextStep(); } },
                { text: "Continuez à avancer malgré la pluie.", action: () => { game.stats.morale += 1; game.stats.defense += 2; game.nextStep(); } }
            ]
        },
        {
            text: "Vous arrivez dans une clairière enchantée.",
            choices: [
                { text: "Méditez pour recharger votre énergie.", action: () => { game.stats.health += 2; game.stats.morale += 1; game.nextStep(); } },
                { text: "Cherchez des herbes médicinales.", action: () => { game.stats.health += 2; game.nextStep(); } },
                { text: "Installez un camp pour la nuit.", action: () => { game.stats.health += 3; game.stats.defense += 1; game.nextStep(); } }
            ]
        },
        {
            text: "Vous rencontrez Alduin, le dragon gardien.",
            choices: [
                { text: "Combattez-le directement.", action: () => { game.fightAlduin(); } },
                { text: "Essayez de négocier avec lui.", action: () => { game.negotiateAlduin(); } },
                { text: "Utilisez la magie pour l'affaiblir avant d'attaquer.", action: () => { game.weakenAlduin(); } }
            ]
        },
        {
            text: "La bataille contre Alduin commence.",
            choices: [
                { text: "Darius attaque de front.", action: () => { game.stats.strength += 5; game.nextStep(); } },
                { text: "Luna utilise des sorts pour affaiblir le dragon.", action: () => { game.stats.magic += 5; game.nextStep(); } },
                { text: "Elena trouve le point faible du dragon.", action: () => { game.stats.stealth += 5; game.nextStep(); } }
            ]
        },
        {
            text: "Vous découvrez le Trésor des Étoiles.",
            choices: [
                { text: "Utilisez le trésor pour restaurer la paix.", action: () => { game.stats.morale += 5; game.endGame(); } },
                { text: "Cachez le trésor pour le protéger des mauvaises intentions.", action: () => { game.stats.defense += 3; game.stats.knowledge += 2; game.endGame(); } },
                { text: "Partagez le trésor avec vos compagnons pour améliorer le royaume.", action: () => { game.stats.morale += 5; game.endGame(); } }
            ]
        }
        // Ajoute les autres étapes du jeu ici
    ],
    nextStep: function() {
        this.currentStep++;
        this.displayStory();
        this.updateStats(); // Met à jour les statistiques après chaque étape
    },
    updateStats: function() {
        const statsDiv = document.getElementById('stats');
        statsDiv.innerHTML = `
            <p>Points de Vie: ${this.stats.health}</p>
            <p>Force: ${this.stats.strength}</p>
            <p>Défense: ${this.stats.defense}</p>
            <p>Magie: ${this.stats.magic}</p>
            <p>Savoir: ${this.stats.knowledge}</p>
            <p>Furtivité: ${this.stats.stealth}</p>
            <p>Moral: ${this.stats.morale}</p>
            <p>Provisions: ${this.stats.provisions}</p>
            <p>Potions: ${this.stats.potions}</p>
            <p>Or: ${this.stats.gold}</p>
        `;
    },
    displayStory: function() {
        const step = this.story[this.currentStep];
        document.getElementById('story').innerText = step.text;
        const choicesDiv = document.getElementById('choices');
        choicesDiv.innerHTML = '';

        step.choices.forEach((choice, index) => {
            const choiceDiv = document.createElement('div');
            choiceDiv.innerHTML = `
                <select id="comment${index + 1}-start">
                    <option value=""> </option>
                    <option value="// ">//</option>
                    <option value="/* ">/*</option>
                </select>
                "${choice.text}"
                <select id="comment${index + 1}-end">
                    <option value=""> </option>
                    <option value="">//</option>
                    <option value=" */">*/</option>
                </select>
            `;
            choicesDiv.appendChild(choiceDiv);
        });

        this.updateStats(); // Met à jour les statistiques au début du jeu
    },
    validerReponse: function() {
        const step = this.story[this.currentStep];
        const responses = step.choices.map((choice, index) => {
            const commentStart = document.getElementById(`comment${index + 1}-start`).value;
            const commentEnd = document.getElementById(`comment${index + 1}-end`).value;
            return {
                text: choice.text,
                selected: commentStart === "" && commentEnd === ""
            };
        });

        const selectedResponses = responses.filter(response => response.selected);
        const result = document.getElementById('resultat');

        if (selectedResponses.length > 1) {
            result.innerText = "Erreur: Plusieurs réponses sélectionnées. Veuillez ne sélectionner qu'une seule réponse.";
        } else if (selectedResponses.length === 1) {
            const selectedChoice = step.choices[responses.findIndex(response => response.selected)];
            selectedChoice.action();
        } else {
            result.innerText = "Vous n'avez sélectionné aucune réponse ou vous avez fait une erreur.";
        }
    },
    displayDiceRoll: function(rollAction) {
        const diceRollDiv = document.getElementById('dice-roll');
        diceRollDiv.innerHTML = `
            <button id="roll-dice">Lancer le dé</button>
            <div id="dice-result"></div>
            <button id="continue" style="display: none;">Continuer</button>
        `;
        document.getElementById('roll-dice').onclick = () => {
            const roll = Math.floor(Math.random() * 6) + 1;
            rollAction(roll);
            document.getElementById('dice-result').innerText = 'Résultat du dé: ' + roll;
            document.getElementById('continue').style.display = 'block';
        };
        document.getElementById('continue').onclick = () => {
            diceRollDiv.innerHTML = '';
            this.nextStep();
        };
    },
    // Ajoute les méthodes fightTroll, escapeTrap, etc. ici
    fightTroll: function() {
        this.displayDiceRoll((roll) => {
            if (roll > 3) {
                this.stats.strength += 5;
            } else {
                this.stats.health -= 5;
            }
            this.updateStats();
        });
    },
    escapeTrap: function() {
        this.displayDiceRoll((roll) => {
            if (roll > 3) {
                this.stats.magic += 2;
            } else {
                this.stats.health -= 3;
            }
            this.updateStats();
        });
    },
    breakBars: function() {
        this.displayDiceRoll((roll) => {
            if (roll > 3) {
                this.stats.strength += 2;
            } else {
                this.stats.health -= 3;
            }
            this.updateStats();
        });
    },
    pickLock: function() {
        this.displayDiceRoll((roll) => {
            if (roll > 3) {
                this.stats.stealth += 2;
            } else {
                this.stats.health -= 3;
            }
            this.updateStats();
        });
    },
    moveRocks: function() {
        this.displayDiceRoll((roll) => {
            if (roll > 3) {
                this.stats.strength += 2;
            } else {
                this.stats.health -= 3;
            }
            this.updateStats();
        });
    },
    useWaterSpell: function() {
        this.displayDiceRoll((roll) => {
            if (roll > 3) {
                this.stats.magic += 2;
            } else {
                this.stats.health -= 3;
            }
            this.updateStats();
        });
    },
    findSecretPath: function() {
        this.displayDiceRoll((roll) => {
            if (roll > 3) {
                this.stats.defense += 2;
            } else {
                this.stats.health -= 3;
            }
            this.updateStats();
        });
    },
    drinkWater: function() {
        this.displayDiceRoll((roll) => {
            if (roll > 3) {
                this.stats.health += 3;
            } else {
                this.stats.health -= 3;
            }
            this.updateStats();
        });
    },
    fightAlduin: function() {
        this.displayDiceRoll((roll) => {
            if (roll > 3) {
                this.stats.strength += 5;
            } else {
                this.stats.health -= 5;
            }
            this.updateStats();
        });
    },
    negotiateAlduin: function() {
        this.displayDiceRoll((roll) => {
            if (roll > 2) {
                this.stats.knowledge += 2;
            } else {
                this.stats.health -= 5;
            }
            this.updateStats();
        });
    },
    weakenAlduin: function() {
        this.displayDiceRoll((roll) => {
            if (roll > 3) {
                this.stats.magic += 5;
            } else {
                this.stats.health -= 5;
            }
            this.updateStats();
        });
    },    
    endGame: function() {
        const endingText = "Votre aventure se termine ici. Merci d'avoir joué!";
        document.getElementById('story').innerText = endingText;
        document.getElementById('choices').innerHTML = '';
    },
};

document.addEventListener('DOMContentLoaded', () => {
    game.displayStory();
    game.updateStats(); // Initialisation des statistiques au chargement du jeu
});

function validerReponse() {
    game.validerReponse();
}
