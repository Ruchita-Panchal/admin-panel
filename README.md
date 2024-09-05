# Admin Panel

Admin Panel project is build in React JS with Typescript using vite. The application uses mock API's created in node JS and file system for database.This application allows login and registration for users and giving access to dashboard, projects and estimations modules.


## Tech Stack

**Client:** React, Zustand, Antd

**Server:** Node, Express

## Features

- Light/dark mode toggle
- Login and register functionality for Users
- Dynamic graphs on dashboard with dummy data
- i18next implementation for login page for demonstration
- CRUD operation on Projects module
- Read and delete operations on Estimation module

## Installation and run locally

Download the zip file or take the clone of the repository.
Then run the below commands to start server and frontend application.
```bash
  git clone https://link-to-project
```

Step 1: Open the terminal and move to the root of the project folder in your editor with the below command.
```bash
  cd admin-panel
```

Step 2: Run the below command to install the dependencies.
```bash
  npm install
```

Step 3: Move into the api folder in the project to run the server.The below commands start the server at port 5000.
```bash
  cd .\src\api\
  npm install
  npm run dev
```

Step 4: Open another terminal to the root of the project folder and run the below command to start frontend application.
```bash
  npm run dev
```

## Lessons Learned

It was a great experience working on the project. I learned and explored typescript in detail for the implementation of functionalities. Also, tried working keeping the code clean, scalable and readable.
