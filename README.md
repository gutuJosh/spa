## About
This is an e-commerce single page application bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It use [React Router](https://reactrouter.com/) for routing and [react-i18next](https://react.i18next.com/) framework for internationalization.
You can see it on action here : https://www.bancomail.com
The app runs when the user goes in offline mode.

## Available Scripts

In the project directory, you can run:

to install dependencies:
### `npm install`

to start the application:
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `i18n generate json files from cli`
Use i18next-parser cli
Then go to the root folder and run : i18next 'src/**/*.{js,hbs}' 'lib/**/*.{js,hbs}' [-oc]
Or read the instructions here: https://github.com/i18next/i18next-parser
