<p align="center">
  <img src="./public/imgs/tiny-drive-logo.svg" />
</p>

# Welcome to **Tiny Drive**

Tiny Drive in a personal project to recreate the google's drive in a tiny version \
Provides a online plataform for saving files and folders, that you can access, download or view on any browser with one click, simple as it sounds

You can access and test the project on [Tiny Drive](https://tiny-drive.vercel.app/login)

# How to download

First you will need to clone the project into your machine or virtual environment

```bash
git clone https://github.com/RobertSDM/TinyDrive.git
```

Once the download completed, go into the directory

```bash
cd TinyDrive
```

Install the project dependencies with your prefered node package manager

```bash
npm install
```
or
```bash
npm i
```

This project has some environment varibles, they are: \
`VITE_URL` = The frontend base url (in your case must be "http://localhost:5173") \
`VITE_BACKEND_URL` = The backend base url

# Execution

To execute the drive interface you must:

Initialize the frontend project using the vite command: \

```bash
npm run dev
```

## Technologies

### Frameworks

-   Vite.js (frontend)
-   Fastapi (backend)

### Libraries

-   React.js (frontend)
-   Typescript (frontend)
-   Tailwind (frontend)
-   Axios (frontend)
-   Bcrypt (backend)
-   SQLAlchemy (backend)
-   Logger (backend)
-   Uvicorn (backend)

### Database

-   PostgreSQL (Hosted on Neon)

### Host Services

-   Vercel (frontend)
-   Azure (backend)
