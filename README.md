M(h)ate(r)s
===========
Realized for the [Riot API Challenge 2016](https://developer.riotgames.com/discussion/announcements/show/eoq3tZd1)
===========


![A screenshot of your package](https://raw.githubusercontent.com/Gmousse/mhaters/master/screenshots/anim.gif)

### What is M(h)ate(r)s ?

M(h)ate(r)s allow you to compare your champions mastery against your friends.
This web application was created for the Riot API Challenge 2016 between the 30th april and the 9th may 2016.
This application was created with few technologies : React, Redux and React-router for the front, and Flask for the back.
M(h)ate(r)s is responsive, and compatible with FireFox and Chrome.


### How it works ?
- First, choose your localisation (EUW, NA, ...),
- Then enter your summoner name,
- Then enter summoner name of a friend,
- Finally, click the Search button to launch mastery comparison for champions played by you and your friend.


#### Demo
A demo is available here : >>[HERE](http://93.15.96.71:5000/)<<

#### Installation
##### Prerequisites
You need to have on your computer :
- git
- node.js v0.12+
- npm v3+
- python 3

##### Install
- Clone the repo :
- Install node dependencies : ```npm install```
- Install pip requirements : ```pip3 install -r requirements.pip```
- Enter a valid riot api key : ```export RIOT_API_KEY=your_api_key```

Usage for development : ```npm run dev``` and see the result on localhost:5000

Usage for producton : Launch ```npm run prod``` to compile the bundle.js. Then change localhost in front/action.js by your server ip. Then, launch in daemon ```npm run server```.

#### Application structure
```bash
.
├── back
│   └── api.py
├── front
│   ├── initDevServer.js
│   ├── lib
│   │   ├── actions.js
│   │   ├── components
│   │   │   └── YourComponent.js
│   │   ├── containers
│   │   │   ├── App.js
│   │   │   ├── DevTools.js
│   │   │   ├── Root.dev.js
│   │   │   ├── Root.js
│   │   │   ├── Root.prod.js
│   │   │   └── Router.js
│   │   ├── index.js
│   │   ├── reducers.js
│   │   └── store
│   │       ├── configureStore.dev.js
│   │       ├── configureStore.js
│   │       └── configureStore.prod.js
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── actions.js
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── Comparator.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── reusables
│   │   │   │   ├── AppBar.jsx
│   │   │   │   ├── AppMenu.jsx
│   │   │   │   ├── Comparison.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Search.jsx
│   │   │   │   ├── Select.jsx
│   │   │   │   └── UserIcon.jsx
│   │   │   └── SearchSummoner.jsx
│   │   ├── containers
│   │   │   ├── DevTools.jsx
│   │   │   ├── Root.dev.jsx
│   │   │   ├── Root.js
│   │   │   ├── Root.prod.jsx
│   │   │   └── Router.jsx
│   │   ├── css
│   │   │   ├── loader.css
│   │   │   └── main.css
│   │   ├── index.js
│   │   ├── reducers.js
│   │   └── store
│   │       ├── configureStore.dev.js
│   │       ├── configureStore.js
│   │       └── configureStore.prod.js
│   ├── tests
│   │   └── components
│   │       └── YourComponent-test.js
│   ├── webpack.config.dev.js
│   └── webpack.config.js
├── LICENSE
├── npm-debug.log
├── package.json
├── README.md
└── requirements.pip

15 directories, 48 files
```
