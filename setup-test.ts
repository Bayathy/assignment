import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/vitest'
import { server } from './src/mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
