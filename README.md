# Algortihm visualizer


Live version link

The project was built in [Typescript](https://www.typescriptlang.org/) using [React](https://reactjs.org), [D3.JS](https://d3js.org/) data visualization library and [CSS Modules] (https://www.npmjs.com/package/typescript-plugin-css-modules).
Functional testing was done with [Jest](https://jestjs.io/).

### Abstract of functionality:

User can choose an algorithm to run.
User can choose size of input array or generate random array in Input menu
User can `play`, `pause`, `reset`, and set delay between each animation step(`speed`) using Play menu.

By turning on `Compare Mode` user can choose a few algorithms to run at the same time.

### Abstract of logic:


Algorithm Class created on Algorithm component mount.
Algorithm Class serves as container for each instance of Algorithm Component that holds name, link and perform a choosen algorithm funciton. 

Algorithm itself is runned when Algorithm component mountes. 

Inside algorithm funcitons placed lines that make records in HashTable

The output of algorithm funcitons is HashTable with records of all steps and pivot moves that been done by algorithm. 
Each record of hashTbale has collection of indexes/values of where/what should be changed and current position of pivots.


Algorithm Component holds the local play menu state that is fired when Global Play Menu state is changed.


Then the HashTable is used in Chart Component to display the current animation.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

