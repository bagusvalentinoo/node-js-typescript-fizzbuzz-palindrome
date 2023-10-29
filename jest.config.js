module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['<rootDir>/src/**/*.test.ts'],

  reporters: [
    "default",
    [
      'jest-junit',
      {
        outputDirectory: './test-results',
        outputName: 'junit.xml',
      },
    ],
  ],

  coverageReporters: ["lcov", "text", "cobertura"],
  collectCoverage: true,
  coverageDirectory: "./test-results/coverage",
}