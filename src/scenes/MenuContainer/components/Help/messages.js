export default {
  fr: {
    title: 'Aide',
    backToMenu: 'Retour au menu',
    gameRules: {
      title: 'Régles du jeu',
      gameGoal: {
        title: 'But du jeu :',
        text:
          'Le but du jeu est de faire parvenir sa lettre d’amour à la princesse en ayant une carte avec le rang plus élevé.',
      },
      overviewGame: {
        title: 'Aperçu du jeu :',
        text: {
          t1:
            'Chaque joueur incarne un jeune homme ou une jeune femme voulant faire parvenir une lettre à la princesse. ',
          t2:
            'Pour cela, les joueurs peuvent transmettre leurs lettres à des servants du château (représentés par les différentes cartes). Ce sont ces servants qui vont remettre la lettre à la princesse, ainsi le joueur ne peut garder qu’une seule carte en main. Il faudra cependant faire attention à ne pas révéler aux autres joueurs qui est la personne qui apportera la lettre ou bien les autres joueurs feront tout leur possible pour l’empêcher d’atteindre son but. ',
          t3:
            'Ainsi celui qui choisira la meilleure stratégie parviendra à apporter sa lettre d’amour à la princesse et gagnera la partie.',
          t4: 'Le jeu comporte alors 16 cartes pour 8 personnages différents.',
        },
        cards: {
          alt: {
            soldier:
              'Carte Soldat - Choisissez un joueur et un nom de carte (excepté “Soldat”). Si le joueur possède cette carte, il est éliminé.',
            clown: 'Carte Clown - Consultez la main d’un joueur.',
            knight:
              'Carte Chevalier - Choisissez un joueur et comparez votre main avec la sienne. Le joueur avec la carte avec la valeur la moins élevée est éliminé.',
            priest:
              'Carte Prêtre - Jusqu’à votre prochain tour, vous ignorez les effets des cartes des autres joueurs',
            sorcerer:
              'Carte Sorcier - Choisissez un joueur ou vous-même. Le joueur sélectionné défausse sa carte et en pioche une nouvelle.',
            general:
              'Carte Général - Choisissez un joueur et échangez votre main avec la sienne.',
            minister:
              'Carte Ministre - Si vous gardez cette carte en main, calculez le total des valeurs de votre main à chaque pioche. Si celui-ci est égal ou supérieur à douze, vous êtes éliminé.',
            princess:
              'Carte Princesse - Si vous défaussez cette carte, vous êtes éliminé.',
          },
          nb_exemp: {
            soldier: ' 5 ',
            clown: ' 2 ',
            knight: ' 2 ',
            priest: ' 2 ',
            sorcerer: ' 2 ',
            general: ' 1 ',
            minister: ' 1 ',
            princess: ' 1 ',
          },
        },
      },
      gameProgress: {
        title: 'Déroulement d’une partie :',
        text: {
          t1:
            'Une partie se déroule en plusieurs manches et chaque manche rapporte un point. Pour gagner la partie, il faut donc récolter un certain nombre de points qui évoluent en fonction du nombre de joueur dans la partie.',
          t2: {
            t:
              'Au début de chaque manche les 16 cartes de la pile sont mélangées et : ',
            list1:
              'une carte est retirée de cette pile pour une partie à plus de 2 joueurs',
            list2:
              'trois cartes sont retirées et visibles par les joueurs de la partie s’ils sont deux',
          },
          t3: 'Par la suite chaque joueur pioche une carte.',
          t4:
            'Lorsque c’est son tour, le joueur pioche une carte dans la pile et l’ajoute à sa main. Il doit ensuite défaussé une de ces deux cartes qui sera donc visible par les autres joueurs. L’effet de cette carte défaussée est ensuite appliqué.',
          t5:
            'Lorsqu’un joueur est éliminé, celui-ci doit révéler sa carte aux autres.',
          t6:
            'La manche se termine lorsqu’il ne reste plus qu’un seul joueur en lice ou lorsque la pioche est vide. Dans ce dernier cas, c’est le joueur ayant la carte la plus puissante qui remporte la manche.',
        },
        table: {
          nb_player: 'Nombre de joueurs',
          nb_points: 'Nombre de points requis',
        },
      },
    },
    interface: {
      title: "Présentation de l'interface",
      create: {
        title: 'La page de création de partie',
        text:
          'Les parties sont de minimum de 2 joueurs. On peut choisir de faire une partie contre un ou plusieurs autres joueurs ou contre des intelligences artificiels plus ou moins difficile',
        alt: "Page creation d'une partie",
      },
      join: {
        title: 'La page pour rejoindre une partie',
        text:
          "On peut choisir de rejoindre des parties déjà crées par d'autre joueur",
        alt: 'Page rejoindre une partie',
      },
      game: {
        title: 'Présentation du plateau du jeu',
        text:
          'Le plateau de jeu comporte une pioche, notre carte, les cartes des adversaire, nos cartes jouées, les cartes jouéees pas les adversaires ainsi que le nom des adversaires, leurs nombre de manches gagnés, notre nom et nos nombres de manches gagnés',
        alt: 'Page du plateau de jeu',
        lost: {
          title: 'Affichage de fin de manche',
          text:
            "Lorsqu'une manche est terminé un text s'affiche précisant qui est ce qui a gagné et pour quel raison (soit la pioche est vide, soit tout les joueurs on été éliminés sauf un)",
          alt: 'Page du plateau de jeu perdu',
        },
        clown: {
          title: "Affichage de l'effet de la carte clown",
          text:
            "Lorsque l'on défausse une carte clown, celle-ci nous permet de voir la carte d'un adversaire qui est ainsi afficher brièvement à l'écran",
          alt: 'Page du plateau de jeu clown',
        },
        select: {
          title: "Choix d'une carte et/ou d'un joueur",
          text:
            "Certaines cartes nécessiste de choisir un joueur et éventuellement une carte. Ce choix s'effectue après avoir cliqué sur la carte voulue. L'effet de la carte est applliqué lorsque le formulaire est validé.",
          alt: "Page du plateau de jeu choix d'une carte et/ou d'un joueur",
        },
      },
    },
  },
  en: {
    title: 'Help',
    gameRules: {
      title: "The game's rules",
      gameGoal: {
        title: 'Goal of the game:',
        text:
          'The goal of the game is to send your love letter to the princess by having a card with a higher rank.',
      },
      overviewGame: {
        title: 'Preview of the game:',
        text: {
          t1:
            'Each player embodies a young man or a young woman wanting to send a letter to the princess. ',
          t2:
            'For this, players can transmit their letters to servants of the castle (represented by the different cards). It is these servants who will hand the letter to the princess, so the player can keep only one card in hand. However, care should be taken not to reveal to the other players who is the person who will bring the letter or the other players will do their utmost to prevent it from reaching its goal.',
          t3:
            'So whoever chooses the best strategy will manage to bring his love letter to the princess and win the game.',
          t4: 'The game then has 16 cards for 8 different characters.',
        },
        cards: {
          alt: {
            soldier:
              'Card Soldier - Choose a player and a card name (except “Soldier”). If the player has this card, he is eliminated.',
            clown: 'Card Clown - Look at a player’s hand.',
            knight:
              'Card Knight - Choose a player and compare your hand with his hand. The player who has the card with the lowest value is eliminated.',
            priest:
              'Card Priest - Until you next tour, you can’t be affected by the card’s effect from the other players.',
            sorcerer:
              'Card Sorcerer - Choose a player or yourself. The chosen player loses his card and takes another one.',
            general:
              'Card General - Choose a player and exchange your hand with his hand.',
            minister:
              'Card Minister - If you keep this card, calculate the total of all card’s value from your hand. If this total is equal or superior to twelve, you are eliminated.',
            princess:
              'Card Princess - If you play this card, you are eliminated',
          },
          nb_exemp: {
            soldier: ' 5 ',
            clown: ' 2 ',
            knight: ' 2 ',
            priest: ' 2 ',
            sorcerer: ' 2 ',
            general: ' 1 ',
            minister: ' 1 ',
            princess: ' 1 ',
          },
        },
      },
      gameProgress: {
        title: 'Course of a game:',
        text: {
          t1:
            'A game is played in several rounds and each round earns one point. To win the game, you have to collect a certain number of points which change according to the number of players in the game.',
          t2: {
            t:
              'At the beginning of each round the 16 cards of the pile are mixed and:',
            list1:
              'one card is removed from this stack for a game with more than 2 players',
            list2:
              'three cards are removed and visible by the players of the game if they are only two',
          },
          t3: 'Subsequently each player draws a card.',
          t4:
            "When it's his turn, the player draws a card from the stack and adds it to his hand. He must then discard one of these two cards which will be visible to other players. The effect of this discarded card is then applied.",
          t5:
            'When a player is eliminated, he must reveal his card to the others.',
          t6:
            'The round ends when there is only one player left or when the draw is empty. In the latter case, it is the player with the most powerful card who wins the round.',
        },
        table: {
          nb_player: 'Numbers of players',
          nb_points: 'Number of points required',
        },
      },
    },
    interface: {
      title: 'Presentation of the interface',
      create: {
        title: 'The party creation page',
        text:
          'The games are at least 2 players. You can choose to play a game against one or more other players or artificial intelligences more or less difficult',
        alt: 'Page creation party',
      },
      join: {
        title: 'The page to join a party',
        text: 'You can choose to join games already created by other players',
        alt: 'Page join party',
      },
      game: {
        title: 'Presentation of the game board',
        text:
          "The game board includes a pile, our card, opponent cards, played cards, cards played by opponents, opponents' names, number of wonest races, name, and number of wins",
        alt: 'Page game bord',
        lost: {
          title: 'End of game display',
          text:
            'When a round is over a text is displayed stating who won and why (either the draw is empty or all players have been eliminated except one)',
          alt: 'Page game bord lost',
        },
        clown: {
          title: 'Showing the effect of the clown card',
          text:
            'When we discard a clown card, it allows us to see the card of an opponent who is thus briefly displayed on the screen',
          alt: 'Page game bord clown',
        },
        select: {
          title: 'Choice of a card and / or a player',
          text:
            'Some cards need to choose a player and possibly a card. This choice is made after clicking on the desired map. The effect of the card is applied when the form is validated.',
          alt: 'Page game bord Choice of a card and / or a player',
        },
      },
    },
  },
};
