## Word Race - A fun game to gauge how fast you type!

## 📌 Overview

Word Race is a game designed to improve QWERTY typing rate and efficiency. Words appear one by one at a rate that goes up as time progresses. There's a limited "stack space" that fills up after a certain amount of words have appeared. Once a player types a word correctly, that word is removed from the stack.

The score is calculated based on how fast the player was able to clear that word, and a multiplier. The multiplier increases with every word the player types correctly and resets on any mistype. Optionally a leveling system can also be added that varies the word appearing rate, the stack space and leveling up bonus score, else the rate can go up constantly, flattening out at say one word per two seconds.

If the stack is full, it's game over. The player can then submit their score and compare with a leaderboard.

## 🛠 Implemention Details

### Component Heirarchy

<details>
<summary>Keyboard</summary>
<p>
<br>
  1. Keyboard based on JSX, styled using CSSModules
  2. Iterates through an array to render out keys, row-wise, and sets up event listeners for them
  3. Accepts SPACEBAR to start, and then dipatches keyPressed and keyCounts if keydown and keyup events are triggered
  4. Selects characterRequested and length. If keyPressed === characterRequested, and keyCount === wordLength, then the word typed is correct!
  5. Dispatches isCorrect, which is the corresponding action to WordRaceApp
  5. If incorrect, dispatches action to decrement score
</p>
</details>

<details>
<summary>WordStack</summary>
<p>
<br>
  1. Keyboard based on JSX, styled using CSSModules
  2. Iterates through an array to render out keys, row-wise, and sets up event listeners for them
  3. Accepts SPACEBAR to start, and then dipatches keyPressed and keyCounts if keydown and keyup events are triggered
  4. Selects characterRequested and length. If keyPressed === characterRequested, and keyCount === wordLength, then the word typed is correct!
  5. Dispatches isCorrect, which is the corresponding action to WordRaceApp
  5. If incorrect, dispatches action to decrement score
</p>
</details>

<details>
<summary>Timer</summary>
<p>
<br>
  1. Keyboard based on JSX, styled using CSSModules
  2. Iterates through an array to render out keys, row-wise, and sets up event listeners for them
  3. Accepts SPACEBAR to start, and then dipatches keyPressed and keyCounts if keydown and keyup events are triggered
  4. Selects characterRequested and length. If keyPressed === characterRequested, and keyCount === wordLength, then the word typed is correct!
  5. Dispatches isCorrect, which is the corresponding action to WordRaceApp
  5. If incorrect, dispatches action to decrement score
</p>
</details>

<details>
<summary>WordRaceApp</summary>
<p>
<br>
  1. Keyboard based on JSX, styled using CSSModules
  2. Iterates through an array to render out keys, row-wise, and sets up event listeners for them
  3. Accepts SPACEBAR to start, and then dipatches keyPressed and keyCounts if keydown and keyup events are triggered
  4. Selects characterRequested and length. If keyPressed === characterRequested, and keyCount === wordLength, then the word typed is correct!
  5. Dispatches isCorrect, which is the corresponding action to WordRaceApp
  5. If incorrect, dispatches action to decrement score
</p>
</details>


### Starting the Project

Install the dependencies with `npm i` or `yarn`  
Start the project by `npm start` or `yarn start`

### Deployment

You can deploy easily by using [GHPages](https://www.npmjs.com/package/gh-pages) 🎉


## ⚙ Tech Stack

- React
- Redux
- CSSModules
- TypeScript
- ESLint and Prettier
- 3rd Party Libraries - Classnames, UseSound, UseConstant and UseTimer
