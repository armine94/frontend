To get you started you can simply clone the repository

git clone [https://github.com/armine94/frontend]

## Prerequisites
you need `git` to `clone` the repository. You can get git from [http://git-scm.com/].
you need `node`, you can `download` here [https://nodejs.org/en/download/]
you need `npm`, you can `install`  npm install npm@latest -g

## Available Scripts

In the `project` directory, you can `run`: 
The first `install` dependencies nmp ci , then 

1) Run project for `development`

### `npm run dev`
Runs the app in the development mode.<br />
Open [http://localhost:3000] to view it in the browser.

2) Run project for `production` 

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:5000] to view it in the browser.

## Project structure

├── frontend
|  ├── config - Contains config files .
|  |  ├── jest
|  |  |  ├── cssTransform.js -  transform config option to specify how css are transformed.
|  |  |  └── fieTransform.js -  Transform config option to specify how assets are transformed.
|  |  ├── env.js - The environment variables configuration
|  |  ├── modules.js - Modules configuration 
|  |  ├── paths.js - Paths configuration
|  |  ├── webpack.config.js - webpack configuration 
|  |  └── webpackDevServer.config.js - webpack dev server configuration
|  ├── public - Contains main index.js files and logo.
|  ├── scripts - Contains scripts for start , build or test .
|  |  ├──  build.js - create program for production mode
|  |  └──  start.js - start program
|  ├── src - Contains all components and logic files.
|  |  ├── components - All components for this project.
|  |  |  ├──  audioTable.jsx - show audio file, edit, delete.  
|  |  |  ├──  imageTable.jsx - show image file, edit, delete. 
|  |  |  ├──  login.jsx - login user.
|  |  |  ├──  modal.jsx - show edit modal. 
|  |  |  ├──  navbar.jsx - show sign up and sign in button, when user logged show view all, upload and logout button
|  |  |  ├──  pagination.jsx - Change page number and get new data 
|  |  |  ├──  register.jsx - User registration
|  |  |  ├──  upload.jsx - upload new file
|  |  |  └──  view.jsx - show file
|  |  ├── config - Contains all project config.
|  |  |  └──  config.js - Api configuration for send and get data
|  |  ├── css - Contains all css files.
|  |  |  ├── login.css
|  |  |  ├── modal.css
|  |  |  ├── navbar.css
|  |  |  ├── pagination.css
|  |  |  ├── registration.css
|  |  |  ├── table.css
|  |  |  └── upload.css
|  |  ├── images - Mobx store for all components.
|  |  |  └── bg.jpg - background image
|  |  ├──  DAO Sending requests .
|  |  |  ├──  audio.DAO.js - Add, get, update, delete audio file requests
|  |  |  ├──  image.DAO.js - Add, get, update, delete image file requests
|  |  |  └──  user.DAO.js - User registration, login and logout request
|  |  ├── store - Mobx store for all components.
|  |  |  ├──  audio.stor.js - Store for audio file
|  |  |  ├──  image.stor.js - Store for image file
|  |  |  ├──  upload.store.js - Store for uploading file
|  |  |  └──  user.store.js - Store or user
|  |  ├── app.js - Start .
|  |  └── index.js - App component render this.
├── .babelrc - babel configuration
├── .gitignore 
├── package-lock.json
├── package.json 
└── README.md