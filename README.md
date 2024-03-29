# Hangman

Simple hangman game, player vs computer; written with `Node.js`

> Hangman is a paper and pencil guessing game for two or more players.
> One player thinks of a word, phrase or sentence and the other(s) tries
> to guess it by suggesting letters or numbers, within a certain number of guesses.

---

<p align="center">
  <img src="https://github.com/roramigator/Hangman/blob/master/preview/preview.jpg" alt="preview"/>
</p>

### Play

- Clone the repository `git clone https://github.com/roramigator/Hangman`
- Install dependencies (inside folder) `npm install`
- Run the game `node .`

### Rules

- The game continues until the player loses (rounds).
- Word to guess is set by the computer (random).
- The player guess the word letter-by-letter.
- The game ends either when the player misses six guesses or guesses the word.

UI will display the number of games played and games won.

### Notes

- Player may enter any character but just letters will be counted as valid.
- In case the player enters more than one letter, just the first letter will be counted as valid.
- The player can exit at any time using `CTRL+C`.

[readline-sync](https://www.npmjs.com/package/readline-sync)
