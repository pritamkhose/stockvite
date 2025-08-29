# Stock Explorer React + Vite App

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Getting Started

This project uses the npm, pod, Gradle build system. To build this project, use the `yarn install` or `npm install` command in [Visual Studio Code](https://code.visualstudio.com/download) or Getting Started with React native typescript project
```sh
 npm create vite@latest stockvite -- --template react
 cd stockvite
 yarn install
 yarn add react-bootstrap bootstrap antd react-router-dom localforage match-sorter sort-by
 yarn add axios

 yarn run dev
```
Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Set env config variable

| name                           | Description                | e.g.                   |
| ------------------------------ | -------------------------- | ---------------------- |
| ENV                            | Run react enviorment-mode  | development            |
| VITE_APP_API_URL              | backed server url          | http://localhost:5000/ |
| VITE_GITHUB_CLIENT_ID     | ID for for web             |                        |
| VITE_FACEBOOK_CLIENT_ID   | ID for web login           |                        |
| VITE_GOOGLE_CLIENT_ID     | SECRET for web             |                        |
| VITE_GOOGLE_CLIENT_SECRET | SECRET for for web captcha |                        |
| VITE_AUTH_LOGIN           | enable auth type           |                        |


```sh
TZ: Asia/Calcutta
VITE_APP_API_URL: https://market-dashboard-7arb.onrender.com/
VITE_FACEBOOK_CLIENT_ID: <SECRET_ID>
VITE_GITHUB_CLIENT_ID: <SECRET_ID>
VITE_GOOGLE_CLIENT_ID: <SECRET_ID>
VITE_AUTH_LOGIN: { "github": true, "google": false, "facebook": false, "email": true }
```

# Reference
- [New Project setup](https://medium.com/@galohernandez/vite-react-react-router-dom-the-latest-way-312ee887197e) Vite-React + React-Router-Dom

- [React Docs - Component](https://react.dev/reference/react/Component)

- [ErrorBoundary with react](https://stackoverflow.com/questions/60537645/how-to-implement-error-boundary-with-react-hooks-component)

- [React doc](https://react.dev/)

- [Render Web Services](https://render.com/docs/web-services)

- [vitejs docs](https://v3.vitejs.dev/guide/)

- [Reactrouter docs](https://reactrouter.com/start/framework/navigating)

- [Examples auth-router-provider/](https://github.com/remix-run/react-router/blob/main/examples/auth-router-provider/)

- [Ant design Icon](https://ant.design/components/icon)

## React Charts Links

- [LightWeight Charts time series](https://jsfiddle.net/hz07guto/)

- [react-vis Charts](https://github.com/uber/react-vis/)

- [React Google Charts](https://react-google-charts.com/)

- [React MicroBar Charts](https://github.com/KyleAMathews/react-micro-bar-chart)

## Login with Github

- [Github developers](https://github.com/settings/developers)

- [Login with Github](https://medium.com/zestgeek/login-with-github-and-microsoft-in-reactjs-e33ffbcd933)

- [Github Authorizing OAuth Apps](https://docs.github.com/en/developers/apps/authorizing-oauth-appsl)

## Extra

- [w3schools Colors Picker](https://www.w3schools.com/colors/colors_picker.asp)

- [React Email Validation](https://www.itsolutionstuff.com/post/react-email-validation-exampleexample.html)

## react-hook-form-v7

- [react-hook-form Doc](https://react-hook-form.com/api/useform)

- [React Bootstrap from](https://react-bootstrap.netlify.app/forms/form-control/)

- [react-hook-form-v7-controller Example](https://codesandbox.io/s/react-hook-form-v7-controller-5h1q5?file=/src/AntD.js:351-361)

