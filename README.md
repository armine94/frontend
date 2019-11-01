To get you started you can simply clone the repository

git clone https://github.com/armine94/frontend

and install the dependencies

npm ci

Prerequisites
you need git to clone the repository. You can get git from http://git-scm.com/.

Run the Application

npm start

Open browser 
enter http://localhost:8080/

├── frontend
|  ├── src -  Contains all components and logic files
|  |  ├──  APIClient Sending requests 
|  |  |  ├──  APIClient.js
|  |  |  ├──  apiConstants.js
|  |  ├── components - All components for this project.
|  |  |  ├──  Home.js
|  |  |  ├──  ImageTable.js
|  |  |  ├──  Login.js
|  |  |  ├──  Modal.js
|  |  |  ├──  Navbar.js
|  |  |  ├──  Register.js
|  |  |  ├──  Upload.js
|  |  |  └──  View.js
|  |  ├── css - Css styles.
|  |  |  ├── Login.css
|  |  |  ├──  main.css
|  |  |  ├── Pagination.css
|  |  |  ├── Registration.css
|  |  |  └──  Table.css
|  |  ├── js - Main file.
|  |  |  └──  main.js
|  |  ├── store - Mobx store for all components.
|  |  |  ├──  Image.DAO.js
|  |  |  ├──  Upload.DAO.js
|  |  |  └──  User.DAO.js
|  |  ├── App.js - Start .
|  |  ├──  index.js - App component render this
├── .babelrc
├── package.jso
├── README.md
└── webpack.config.json