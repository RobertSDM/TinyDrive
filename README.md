<p align="center">
  <img src="./public/icons/tiny-drive-logo.svg" />
</p>

# Tiny Drive

TinyDrive is a personal project inspired by the Google's Drive. \
This project repository contains the interface is your window to access TinyDrive's your file storage.

**Running project [link](https://tiny-drive.vercel.app/)**

To test it you can use this login:

```
Email: tiny.test.drive@gmail.com
Senha: 12345678
```

# Run locally

First of all, to run this project you will need the server part which is in this [repository](https://github.com/RobertSDM/be-tiny-drive)

Clone this repo and move to the folder:

```bash
git clone https://github.com/RobertSDM/TinyDrive.git
cd TinyDrive
```

Install the dependencies with your favorite package manager:

```bash
pnpm i
```

The only variable you will need is the server url used by the axios client base url:

-   `VITE_BACKEND_URL` The server url

Run with:

```bash
pnpm run dev
```

## Technologies

### Bundler

-   Vite.js

### Libraries

-   React.js
-   Typescript
-   Tailwind
-   Tanstack (React Query)
-   React Router
-   Axios

### Host Service

-   Vercel
