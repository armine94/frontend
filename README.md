To get you started you can simply clone the repository

git clone [https://github.com/armine94/frontend]

## Attention
if you use `Mozilla Firefox`, you need install `gecko driver` 
ypu can `download` here [https://github.com/mozilla/geckodriver/releases]

## Prerequisites
you need `git` to `clone` the repository. You can get git from [http://git-scm.com/].
you need `node`, you can `download` here [https://nodejs.org/en/download/]
you need `npm`, you can `install`  npm install npm@latest -g

## Available Scripts

In the `project` directory, you can `run`: 
The first `install` dependencies nmp ci , then 

1) for `development`
### `npm run dev`
Runs the app in the development mode.<br />
Open [http://localhost:3000] to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

2) for `production` 
### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:5000] to view it in the browser.

## Project structure

├── frontend
|  ├── config -  Contains config files .
|  ├── public -  Contains main index.js files.
|  ├── scripts -  Contains scripts for start , build or test .
|  |  ├──  build.js
|  |  ├──  start.js
|  |  └──  test.js
|  ├── src -  Contains all components and logic files.
|  |  ├── components - All components for this project.
|  |  |  ├──  imageTable.js
|  |  |  ├──  login.js
|  |  |  ├──  navbar.js
|  |  |  ├──  register.js
|  |  |  ├──  upload.js
|  |  |  └──  view.js
|  |  ├── config - Contains all project config.
|  |  |  └──  config.js
|  |  ├──  DAO Sending requests .
|  |  |  ├──  apiConfigs.js
|  |  |  ├──  audio.DAO.js
|  |  |  ├──  image.DAO.js
|  |  |  ├──  text.DAO.js
|  |  |  └──  user.DAO.js
|  |  ├── css - Css styles.
|  |  ├── store - Mobx store for all components.
|  |  |  ├──  image.stor.js
|  |  |  ├──  upload.store.js
|  |  |  └──  user.store.js
|  |  ├── app.js - Start .
|  |  ├──  index.js - App component render this.
├── .babelrc
├── .gitignore
├── package.json
└── README.md
