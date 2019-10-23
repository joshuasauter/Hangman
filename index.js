/*
*	Required libraries.
*/

const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

const welcomeFlag = "\nWelcome to Hangman!\nPress Ctrl+C to stop\n";

function drawHangman(){
	//const guiMan = "\n╔═════════════╗\n║             ║\n║             ║\n║             ║\n║             ║\n╚═════════════╝\n";
	const guiMan = '😄😊😐😞😱😵';
	return guiMan;
}

while(true){
	console.log(wordBank);
	//const letter = prompt.question("Please guess a letter: ");
	break;
}