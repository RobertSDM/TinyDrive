<p align="center">
  <img src="./public/imgs/tiny-drive-logo.svg" />
</p>

# **Tiny Drive (Client)**

TinyDrive is a personal project, that is inspired by the Google's Drive interface and cloud storage. This project was developt to explore concepts and apply them is a somewhat real project.

TinyDrive was created for you store files on the cloud in a easy way and download or preview its content.

You can access the project and test it using this link: [Tiny Drive](https://tiny-drive.vercel.app/login)

if you don't want to login with your own email, you can use this login I've created for tests:

```
Email: tiny.test.drive@gmail.com
Senha: 12345678
```

# Main Features

-   **Notification API**: An API to create notifications and exhibit them on the interface. The notifications are stored in a `queue`, and consumed by a context provider.
-   **Responsive UI and UX**: 
    -  The UI is responsive, and functions well both on large and smaller screens.
    -  The client counts with features to enhance the user experient, they are: Use of shortcuts, preview visualization, drag and drop.
-   **Integrated Authentication**: The user login is managed on the client, using the supabase authentication service.

# How to run locally

First of all, to run this project you will need the server part which is in this repo [Server](https://github.com/RobertSDM/be-tiny-drive)

Clone this repo and move to the folder:

```bash
git clone https://github.com/RobertSDM/TinyDrive.git
cd TinyDrive
```

Install the dependencies with your favorite package manager:

```bash
npm install
```

This project has some environment varibles, they are:

-   `VITE_BACKEND_URL` The server url
-   `VITE_SUPABASE_URL`
-   `VITE_SUPABASE_KEY`

Run with:

```bash
npm run dev
```

## Mocking

-   The authentication in the mock is static. The data is:

```javascript
{
    accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzYWNkNDBhNi1mMzg0LTRlMzQtOGY5NS00NzZhMGRlYzkxYTYifQ.lvOE26ibRYbZ7NW612e1LHQdgNl14GTy91CE4rcBjTc",
    refreshToken: "",
    userid: "3acd40a6-f384-4e34-8f95-476a0dec91a6",
}
```

## Technologies

### Bundler

-   Vite.js

### Libraries

-   React.js
-   Typescript
-   Tailwind
-   Axios

### Host Services

-   Vercel (Client host)
