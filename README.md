# FP Testing Proof of Concept  
## Install
`npm install -g testcafe newman`  
Place API Key inside *value* on line 803 of `postman/Fantasy Pros.postman_collection.json`  
## Usage  
### Frontend Testing
#### Testcafe
Testcafe allows for end to end testing for the frontend website. Tests can be written in Javascript and run without the use of Selenium. Tests can offer be ran against cloud services such as Saucelabs or BrowserStack. Almost any browser, including mobile devices, can be used for testing.  
##### Single Test Examples  
Chrome: `testcafe chrome tests/nfl.js`  
Firefox: `testcafe firefox tests/nfl.js`  
Safari: `testcafe safari tests/nfl.js `  
3 Concurrent Browsers: `testcafe -c 3 chrome tests/nfl.js`  
Headless Browsers: `testcafe chrome:headless tests/nfl.js`    
Multiple Browsers:  `testcafe chrome:headless,firefox:headless tests/nfl.js`  
#### Test Runner  
`node test.js`  
### API Testing  
API Testing can be managed using Postman. The tests can be run within Postman or through the CLI using Newman.  Included in this repo are the latest collection of requests and a sample environment file. Both files located in the `postman` folder can be imported using the **Import** button within Postman.  
#### Postman
##### Single Test
Tests are writte and executed each time a call is ran. See `Compare Players` within the collection for examples.  
##### Test Runner
All (or some) of the tests may be run in batch using the Test Runner feature of Postman. Click the **Runner** button within Postman and choose the Fantasy Pros collection.  
#### Newman
Newman provides a CLI driven option to run Postman tests.  
All Tests: `newman run postman/Fantasy\ Pros.postman_collection.json -e postman/FP\ Partners.postman_environment.json`  
Single Folder: `newman run postman/Fantasy\ Pros.postman_collection.json -e postman/FP\ Partners.postman_environment.json --folder "Compare Players"
`  
