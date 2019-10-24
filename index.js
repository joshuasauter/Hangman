/*
**							**
**	Required libraries.		**
**							**
*/

const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

/*
**							**
**	Generating random word.	**
**							**
*/

const maxWords = wordBank.length;
const findWord = Math.floor(Math.random() * maxWords);
const mysteryWord = wordBank[findWord];

let hiddenWord = mysteryWord.split('').map(() => '*');

/*							
**							**
**	Setting flags and UI.	**
**							**
*/

const welcomeFlag = "\nWELCOME TO HANGMAN!\n";
const stopFlag = "Press \x1b[31mCtrl+C\x1b[0m to exit.\n";
const inputFlag = "Please guess a letter: ";
const byeFlag = "Thank you for playing!";
const guiMan = ['\x1b[5m\x1b[32m😎\x1b[0m','\x1b[32m😄\x1b[0m','\x1b[32m😊\x1b[0m','\x1b[33m😐\x1b[0m','\x1b[33m😞\x1b[0m','\x1b[33m😱\x1b[0m','\x1b[31m😵\x1b[0m'];
let guiManGuesses = 1;

/*
**							**
**	Score					**
**							**
*/

let rounds = 0;
let wins = 0;

// ╔ ═ ╗ ║ ╚ ═ ╝ - have a function to draw UI...

/*
**							**
**	Helping functions		**
**							**
*/

const print = message => console.log(message);

const askForInput = () => {
	const input = prompt.question(inputFlag);
	if((input.length) === 1){
		return input.toLowerCase();
	}else {
		print('\n\x1b[33mInsert one letter!\x1b[0m\n');
		askForInput();
	}
};

const wordFounded = word => {
	const star = word.find(star => {
		return star === '*';
	});

	if(star === '*'){
		return false;
	}else{
		return true;
	}
};

const matchWord = (letter, word) => {
	
	mysteryWord.split('').forEach((explicitWordLetter,letterPosition) => {
		if(explicitWordLetter === letter) word[letterPosition] = letter;		/** Compares if the player letter is in the word; if so, place the founded letter in the correct position **/
	});

	return;
};

/*
**							**
**	Game loop				**
**							**
*/

print(welcomeFlag);

while(true){
	print(mysteryWord);
	print(stopFlag);

	if(wordFounded(hiddenWord)){
		print('Founded!'+'\t'+guiMan[0]+'\n');
		break; // have all variables reset and generate a new random word...
	}else{
		print(hiddenWord.join(' ').toUpperCase()+'\t'+guiMan[guiManGuesses]+'\n');
	}

	const letter = askForInput();

	if(guiManGuesses <= 5){
		matchWord(letter, hiddenWord);
	}else{
		print('\nTry again!');
		print('The word was '+mysteryWord.toUpperCase()+'\n');
		break;
	}

	const checkGuesses = hiddenWord.find(wordLetter => {
		return wordLetter === letter;
	});
	if(!checkGuesses) guiManGuesses += 1;	

}

print(byeFlag+'\n');