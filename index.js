/** LIBRARIES */
const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

/** INITIALIZATION */
const maxWords = wordBank.length;
let findWord, mysteryWord, hiddenWord, countGuesses = 1;
let guessLetters = [];
let rounds = 0;
let wins = 0;

/** FLAGS & UI */
const clearScreen = "\u001B[2J\u001B[0;0f";
const headerBox = "┬ ┬┌─┐┌┐┌┌─┐┌┬┐┌─┐┌┐┌\n├─┤├─┤││││ ┬│││├─┤│││\n┴ ┴┴ ┴┘└┘└─┘┴ ┴┴ ┴┘└┘\n─────────────────────\n─➞\x1b[31m Ctrl+C\x1b[0m: Exit game.\n┬───────────────────┬\n";
const footerBox = "┴───────────────────┴";
const inputFlag = " guess:: ";
const continueGame = 'Press ENTER to continue.';
const invalidCharacter = ' \x1b[34mInvalid character\x1b[0m';
let ordinalNumber = '';
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
const winnerFlag = "\tWell done!\n";
const loserFlag = "\tTry Again!\n";

/** FUNCTIONS */

/** setNewGame
 * 
 *  Resets game variables
 * 
 */
let setNewGame = () => {
  findWord = Math.floor(Math.random() * maxWords);
  mysteryWord = wordBank[findWord].toLowerCase();
  hiddenWord = mysteryWord.split("").map(() => "#");
  countGuesses = 1;
  guessLetters = [];
};

/** print
 *
 *  Prints message on the console.
 *
 *  @param {string} message; Will be printed in the screen.
 *
 */
const print = message => console.log(message);

/** printScore
 *
 *  Print the rounds and the wins
 *
 */
const score = () => print("  Rounds:\x1b[33m " + rounds + "\x1b[0m" + "; Wins:\x1b[32m " + wins + "\x1b[0m\n");

/** askForInput
 *
 *  Using readline-sync library, reads input from the player and conditions a one character string.
 *
 *  @returns {string} 1 letter, stablished by the player.
 *
 */
const askForInput = () => {
  switch(countGuesses){
    case 1:
      ordinalNumber = countGuesses + "st";
      break;
    case 2:
        ordinalNumber = countGuesses + "nd";
      break;
    case 3:
        ordinalNumber = countGuesses + "rd";
      break;
    default:
        ordinalNumber = countGuesses + "th";
  }
  const input = prompt.question(ordinalNumber + inputFlag);
  const validate = text => /[a-zA-Z]/.test(text);
  if (validate(input)) {
    if (input.length === 1) {
      return input.toLowerCase();
    } else {
      if(validate(input[0]))
        return input[0].toLowerCase(); 
    }
  } else {
    return '';
  }
};

/** hasWordBeenFound
 *
 *  Searches for stars ('#') in a given word; meaning the word with stars (# # A #) is not a founded word.
 *
 *  @param {array} word; Each value is a letter, of mysteryWord.lenght size, each letter has been replaced
 *                       with a star (#) to show the player.
 *
 *  @returns {boolean} true if the word has been found, false if the word hasn't  been found.
 *
 */
const hasWordBeenFound = word => {
  const hasStar = word.find(hasStar => {
    return hasStar === "#";
  });
  if (hasStar === "#") {
    return false;
  } else {
    return true;
  }
};

/** searchLetterInWord
 *
 *  Discovers the posible existence of a letter in the hiddenWord, exchanging the star (#) for the founded letter.
 *  If the letter isn't found countGuesses increments by 1.
 *
 *  @param {string} letter; A one character string containing the guess letter.
 *  @param {array} word; Each value is a letter, of mysteryWord.lenght size, each letter has been replaced
 *                       with a star (#) to show the player.
 *
 *  @returns {string} Feedback to the user according to action.
 *
 */
const searchLetterInWord = (letter, word) => {
  mysteryWord.split("").forEach((explicitLetter, letterPosition) => {
    if(explicitLetter === letter) word[letterPosition] = letter;
  });
  let findLetter = mysteryWord.split("").find(wordLetter => wordLetter === letter);  
  if(!findLetter){
    if(!guessLetters.find(guessLetter => guessLetter === "\x1b[31m"+letter.toUpperCase()+"\x1b[0m")){    
      countGuesses += 1;
      guessLetters.push("\x1b[31m"+letter.toUpperCase()+"\x1b[0m");
      return " :: \x1b[31m" + letter.toUpperCase() + '\x1b[34m is not in the word\x1b[0m ::';
    }
    return ' :: \x1b[34mYou already guessed \x1b[33m' + letter.toUpperCase() + '\x1b[0m ::';
  }
  return ' :: \x1b[32m' + letter.toUpperCase() + '\x1b[34m is in the word\x1b[0m ::'
};

/** searchLetterInWord
 *
 *  Print GUI on screen, game name, winner/loser flags, and score.
 *
 *  @param {string} word; This will be the word displayed to the user (hidden/revealed).
 *  @param {string} flag; Winner/loser flag, can be undefined.
 *
 *  @returns {undefined}  Draw UI, a return value isn't necessary.
 *
 */
const drawBox = (word, flag) => {
  let face = countGuesses;
  if(flag){
    if(hasWordBeenFound(word)){
      face = 0;
    }else{
      face = 7;
      word = mysteryWord.split("");
    }
  }
  const newWord = word.reduce((colorWord, letter) => {
    letter !== '#'
      ? colorWord.push('\x1b[32m'+letter.toUpperCase()+'\x1b[0m')
      : colorWord.push('#');
    return colorWord;
  },[]);
  print(headerBox);
  print(" " + newWord.join(" ") + "\t" + guiMan[face] + "\n");
  if(flag){ print(flag); score(); }
  print(footerBox);
  print("Guesses:[" + guessLetters.join(",") + "]\n─────────────────────");
};

/** gameLoop
 *
 *  Main game functionality; prints instruction/informative flags, resets the game if player wins,
 *  finds the player's letter in the hidenWord (if exist), keep record of the guesse made by the player.
 *
 */
let gameLoop = () => {
  while(true){
    print(clearScreen);
    if(countGuesses <= 6){
      if(hasWordBeenFound(hiddenWord)){
        rounds += 1; wins += 1;
        drawBox(hiddenWord, winnerFlag);
        setNewGame();
      }else{
        drawBox(hiddenWord);
        const letter = askForInput();
        letter ? print(searchLetterInWord(letter, hiddenWord)) : print(invalidCharacter);
      }
      prompt.question(continueGame, {hideEchoBack: true, mask: ''});
    }else{
      rounds += 1;
      drawBox(hiddenWord, loserFlag);
      break;
    }
  }
};

/** GAME LOOP */
setNewGame();
gameLoop();