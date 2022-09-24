# InstaShare Project Frontend

This is a project that allows the storage, upload, download and rename files. It is made with Redux-Toolkit to store global states and material ui for visual components.

## Build

This project was created using **create-react-app** command so it can be built using the 
```
npm install
``` 
command and it will automatically download all the node modules needed to run the program.


## Run

To run the program just press the command
```
npm start
``` 


## Test

This project uses 2 different technologies to test the components. Testing-library and Jest are used for some unit tests and the rest of the unit, integration and e2e tests are done with Cypress. To run the tests of the testing library, the following command must be put in the console:
```
npm run test
```
and follow the instructions. It must be verified that all the tests passed correctly.

To test the Cypress tests, it can be done in two different ways: the first is to run the tests in the background and obtain a report on the console of the tests carried out, this is done with the command:
```
npx cypress run
```

The second way is by setting up a visual interface and running the tests manually, selecting a predefined browser and seeing everything as if it were a user interacting with the application. To use this way, use the command:
```
npx cypress open
```
