// src/setupTests.js
import { server } from './mocks/server.js'

require('jest-expect-message')
require('babel-polyfill')
const jsdom = require('jsdom')

const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>'
const dom = new jsdom.JSDOM(documentHTML, { pretendToBeVisual: true })

global.document = dom.window.document
global.window = dom.window
global.window.scroll = jest.fn()

// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
