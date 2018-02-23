const createTestCafe = require('testcafe');
let testcafe = null;

createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe = tc;
        const runner = testcafe.createRunner();
        return runner
            .src(['tests/homepage.js', 'tests/nfl.js'])
            .browsers(['chrome:headless'])
            .concurrency(3)
            .run();
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
        process.exit(1);
    });