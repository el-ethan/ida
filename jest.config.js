const nextJest = require('next/jest');
const createJestConfig = nextJest();

const customJestConfig = {
    // Any custom config you want to pass to Jest
};

module.exports = createJestConfig(customJestConfig);
