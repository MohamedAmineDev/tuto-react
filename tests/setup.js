import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as testingLibraryMatchers from '@testing-library/jest-dom/matchers'; // Import all matchers
import { expect } from 'vitest';

// Extract the matchers object from the imported module
const matchers = testingLibraryMatchers.default || testingLibraryMatchers;

// Extend expect with matchers
expect.extend(matchers);

// Run cleanup after each test case
afterEach(() => {
  cleanup();
});
