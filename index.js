/** LIBRARIES */
const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

const maxWords = wordBank.length;
let findWord = Math.floor(Math.random() * maxWords);
let mysteryWord = wordBank[findWord];

let hiddenWord = mysteryWord.split("").map(() => "*");

/*
 **							**
 **	Setting flags and UI.	**
 **							**
 */

const welcomeFlag = "\nWELCOME TO HANGMAN!\n";
const stopFlag = "\n\nPress \x1b[31mCtrl+C\x1b[0m to exit.\n";
const inputFlag = "Please guess a letter: ";
const byeFlag = "Thank you for playing!";
const guiMan = [
  "\x1b[5m\x1b[32m😎\x1b[0m",
  "\x1b[32m😄\x1b[0m",
  "\x1b[32m😊\x1b[0m",
  "\x1b[33m😐\x1b[0m",
  "\x1b[33m😞\x1b[0m",
  "\x1b[33m😱\x1b[0m",
  "\x1b[31m😵\x1b[0m"
];
let guiManGuesses = 1;

/*
 **							**
 **	Score					**
 **							**
 */

let rounds = 0;
let wins = 0;

// ╔ ═ ╗ ║ ╚ ═ ╝ - have a function to draw UI...

/** FUNCTIONS */

/** print
 *
 *  Prints message on the screen.
 *
 *  @param {string} message
 *
 */

const print = message => console.log(message);

/** askForInput
 *
 *  Using readline-sync library, reads input from the player and conditions a one character string.
 *
 *  @returns {string} 1 letter, stablished by the player.
 *
 */

const askForInput = () => {
  const input = prompt.question(inputFlag);
  if (input.length === 1) {
    return input.toLowerCase();
  } else {
    print("\n\x1b[33mInsert one letter!\x1b[0m\n");
    askForInput();
  }
};

const wordFounded = word => {
  const star = word.find(star => {
    return star === "*";
  });

  if (star === "*") {
    return false;
  } else {
    return true;
  }
};

const matchWord = (letter, word) => {
  mysteryWord.split("").forEach((explicitWordLetter, letterPosition) => {
    if (explicitWordLetter === letter) word[letterPosition] = letter;
  });

  const checkGuesses = word.find(wordLetter => {
    return wordLetter === letter;
  });
  if (!checkGuesses) guiManGuesses += 1;

  return;
};

/*
 **							**
 **	Game loop				**
 **							**
 */

print(welcomeFlag);

while (true) {
  print(stopFlag);

  if (wordFounded(hiddenWord)) {
    print("Founded!" + "\t" + guiMan[0] + "\n");

    findWord = Math.floor(Math.random() * maxWords);
    mysteryWord = wordBank[findWord];
    hiddenWord = mysteryWord.split("").map(() => "*");

    rounds += 1;
    wins += 1;
    guiManGuesses = 1;

    print(
      "Rounds:\x1b[33m " +
        rounds +
        "\x1b[0m" +
        "; Wins:\x1b[32m " +
        wins +
        "\x1b[0m"
    );

    print(stopFlag);
    print(
      hiddenWord.join(" ").toUpperCase() + "\t" + guiMan[guiManGuesses] + "\n"
    );
  } else {
    print(
      hiddenWord.join(" ").toUpperCase() + "\t" + guiMan[guiManGuesses] + "\n"
    );
  }

  if (guiManGuesses <= 6) {
    const letter = askForInput();
    matchWord(letter, hiddenWord);
  } else {
    rounds += 1;
    break;
  }
}

print("\nTry again!");
print("The word was " + mysteryWord.toUpperCase() + "\n");
print(
  "Rounds:\x1b[33m " +
    rounds +
    "\x1b[0m" +
    "; Wins:\x1b[32m " +
    wins +
    "\x1b[0m"
);
print(byeFlag + "\n");
