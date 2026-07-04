const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
}

// swiper ships untranspiled ESM, which Jest cannot parse; carve it out of
// next/jest's blanket node_modules transform ignore.
module.exports = async () => {
  const jestConfig = await createJestConfig(config)()
  jestConfig.transformIgnorePatterns = jestConfig.transformIgnorePatterns.map(
    (pattern) =>
      pattern === '/node_modules/'
        ? '/node_modules/(?!(swiper)/)'
        : pattern
  )
  // 'swiper/css' resolves to a raw .css file that next/jest's CSS mapping
  // does not catch, since the import specifier has no .css extension.
  jestConfig.moduleNameMapper = {
    '^swiper/css(/.*)?$': '<rootDir>/__mocks__/styleMock.js',
    ...jestConfig.moduleNameMapper,
  }
  return jestConfig
}
