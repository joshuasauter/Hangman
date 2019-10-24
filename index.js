/** LIBRARIES */
const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

/** INITIALIZATION */
const maxWords = wordBank.length;
let findWord = Math.floor(Math.random() * maxWords);
let mysteryWord = wordBank[findWord];
let hiddenWord = mysteryWord.split("").map(() => "*");
let countGuesses = 1;
let rounds = 0;
let wins = 0;

/** FLAGS & UI */
const welcomeFlag = "\nWELCOME TO HANGMAN!\n";
const stopFlag = "\n\nPress \x1b[31mCtrl+C\x1b[0m to exit.\n";
const inputFlag = "Please guess a letter: ";
const byeFlag = "Thank you for playing!";
const boundariesFlag = "\n\x1b[33mInsert one letter!\x1b[0m\n";
const guiMan = [
  "\x1b[5m\x1b[32m😎\x1b[0m",
  "\x1b[32m😄\x1b[0m",
  "\x1b[32m😊\x1b[0m",
  "\x1b[33m😐\x1b[0m",
  "\x1b[33m😞\x1b[0m",
  "\x1b[33m😱\x1b[0m",
  "\x1b[31m😭\x1b[0m",
  "\x1b[31m😵\x1b[0m"
];
const congratulationsFlag = "You founded!" + "\t" + guiMan[0] + "\n";

/** FUNCTIONS */

/** print
 *
 *  Prints message on the console.
 *
 *  @param {string} message; Will be printed in the screen.
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
    print(boundariesFlag);
    askForInput();
  }
};

/** wordFounded
 *
 *  Searches for stars ('*') in a given word; meaning the word with stars (* * R *) is not a founded word.
 *
 *  @param {array} word; Each value is a letter, of mysteryWord.lenght size, each letter has been replaced
 *                       with a star (*) to show the player.
 *
 *  @returns {boolean} true if the word has been found, false if the word hasn't  been found.
 *
 */
const wordFounded = word => {
  const hasStar = word.find(hasStar => {
    return hasStar === "*";
  });

  if (hasStar === "*") {
    return false;
  } else {
    return true;
  }
};

/** matchWord
 *
 *  Discovers the posible existence of a letter in the hiddenWord, exchanging the star (*) for the founded letter.
 *  If the letter isn't found countGuesses increments by 1.
 *
 *  @param {string} letter; A one character string containing the guess letter.
 *  @param {array} word; Each value is a letter, of mysteryWord.lenght size, each letter has been replaced
 *                       with a star (*) to show the player.
 *
 *  @returns {undefined} Action is taken and variables modified, a return value isn't necessary.
 *
 */
const matchWord = (letter, word) => {
  mysteryWord.split("").forEach((explicitWordLetter, letterPosition) => {
    if (explicitWordLetter === letter) word[letterPosition] = letter;
  });

  const checkGuesses = word.find(wordLetter => {
    return wordLetter === letter;
  });
  if (!checkGuesses) countGuesses += 1;

  return;
};

/** GAME LOOP */
print(welcomeFlag);

while (true) {
  print(stopFlag);

  if (wordFounded(hiddenWord)) {
    print(congratulationsFlag);

    /** RESET GAME */
    findWord = Math.floor(Math.random() * maxWords);
    mysteryWord = wordBank[findWord];
    hiddenWord = mysteryWord.split("").map(() => "*");
    rounds += 1;
    wins += 1;
    countGuesses = 1;
    print(
      "Rounds:\x1b[33m " +
        rounds +
        "\x1b[0m" +
        "; Wins:\x1b[32m " +
        wins +
        "\x1b[0m"
    );
    print(stopFlag);
    print("\nStart again!\n");
    print(
      hiddenWord.join(" ").toUpperCase() + "\t" + guiMan[countGuesses] + "\n"
    );
    /** */
  } else {
    print(
      hiddenWord.join(" ").toUpperCase() + "\t" + guiMan[countGuesses] + "\n"
    );
  }

  if (countGuesses <= 6) {
    const letter = askForInput();
    matchWord(letter, hiddenWord);
  } else {
    rounds += 1;
    break;
  }
}

print("\nTry again!");
print("The word was\x1b[34m " + mysteryWord.toUpperCase() + "\x1b[0m\n");
print(
  "Rounds:\x1b[33m " +
    rounds +
    "\x1b[0m" +
    "; Wins:\x1b[32m " +
    wins +
    "\x1b[0m"
);
print(byeFlag + "\n");
