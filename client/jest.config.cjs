module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^axios$": "../__mocks__/axios.js",
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
};



