import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    "./node_modules/",
    './dist/'
  ],
  moduleNameMapper: {
    "^#src$": "./src/"
  },
};

export default config;
