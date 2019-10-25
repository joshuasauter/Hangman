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
const welcomeFlag =
  "\n┬ ┬┌─┐┌┐┌┌─┐┌┬┐┌─┐┌┐┌\n├─┤├─┤││││ ┬│││├─┤│││\n┴ ┴┴ ┴┘└┘└─┘┴ ┴┴ ┴┘└┘";
const headerGUI =
  "\n╭➞\x1b[31m Ctrl+C\x1b[0m: Exit game.\n┼───────────────────┬\n";
const footerFlat = "┴───────────────────┴";
const footerGuess = "┼───────────────────┴";
const inputFlag = "╰➞ Guess: ";
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
const congratulationsFlag = "  You found it!" + "\t" + guiMan[0] + "\n";
const apologyFlag = "  Try again!" + "\t" + guiMan[7] + "\n";

/** FUNCTIONS */

/** print
 *
 *  Prints message on the console.
 *
 *  @param {string} message; Will be printed in the screen.
 *
 */
const print = message => console.table(message);

/** printScore
 *
 *  Print the rounds and the wins
 *
 */
const printScore = () => {
  print(
    "  Rounds:\x1b[33m " +
      rounds +
      "\x1b[0m" +
      "; Wins:\x1b[32m " +
      wins +
      "\x1b[0m\n"
  );
};

/** askForInput (#)
 *
 *  Using readline-sync library, reads input from the player and conditions a one character string.
 *
 *  @returns {string} 1 letter, stablished by the player.
 *
 */
const askForInput = () => {
  const input = prompt.question(inputFlag);
  if (/[a-zA-Z]/.test(input)) {
    if (input.length === 1) {
      return input.toLowerCase();
    } else {
      return input[0].toLowerCase();
    }
  } else {
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

/** Game
 *
 *  Main game functionality; prints instruction/informative flags, resets the game if player wins,
 *  finds the player's letter in the hidenWord (if exist), keep record of the guesse made by the player.
 *
 */
function gameLoop() {
  while (true) {
    print(headerGUI);

    if (wordFounded(hiddenWord)) {
      print(congratulationsFlag);
      print("\t\x1b[34m" + hiddenWord.join(" ").toUpperCase() + "\x1b[0m\n");

      /** RESET GAME */
      findWord = Math.floor(Math.random() * maxWords);
      mysteryWord = wordBank[findWord];
      hiddenWord = mysteryWord.split("").map(() => "*");
      rounds += 1;
      wins += 1;
      countGuesses = 1;
      printScore();
      print(footerFlat);
      gameLoop();
      /** */
    } else {
      print(
        "  " +
          hiddenWord.join(" ").toUpperCase() +
          "\t" +
          guiMan[countGuesses] +
          "\n"
      );
    }
    print(footerGuess);
    if (countGuesses <= 6) {
      const letter = askForInput();
      matchWord(letter, hiddenWord);
    } else {
      rounds += 1;
      break;
    }
  }
}

/** GAME LOOP */
print(welcomeFlag);
gameLoop();
print(headerGUI);
print(apologyFlag);
print("\t\x1b[34m " + mysteryWord.toUpperCase() + "\x1b[0m\n");
printScore();
print(footerFlat);
