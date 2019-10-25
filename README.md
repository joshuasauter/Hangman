# Hangman

Hangman: Simple word guessing game!

Simple hangman game played against the computer, written in `Node.js`

> Hangman is a paper and pencil guessing game for two or more players.
> One player thinks of a word, phrase or sentence and the other(s) tries
> to guess it by suggesting letters or numbers, within a certain number of guesses.

---

### Rules

- The game continues until the player loses (rounds).
- Word to guess is set by the computer (random).
- The player guess the word letter-by-letter.
- The game ends either when the player misses six guesses or guesses the word.

UI will display the number of games played and games won.

### Notes

- Player may enter any character but just letters will be counted as valid.
- In case the player enters more than one letter, just the first letter will be counted as valid.
- The player can exits at any time using `CTRL+C`.

[readline-sync](https://www.npmjs.com/package/readline-sync)
