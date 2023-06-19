import { fileURLToPath } from 'url';
import path from 'path';

/**
 * Returns the path to the directory of the file specified in the passed URL.
 * @param {string} url - File URL.
 * @returns {string} - Path to the file directory.
 */
export const pathToFile = url => {
    const currentPath = fileURLToPath(url);
    return path.dirname(currentPath);
};
