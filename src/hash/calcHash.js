import fs from 'fs/promises';
import { join } from 'path';
import { createHash } from 'crypto';

import { pathToFile } from '../utils.js';

/**
 * Calculate the SHA256 hash for a file and log it to the console as hex
 * @param {string} relativePath - relative file path.
 */
const calculateHash = async relativePath => {
    const pathToCurrentFile = pathToFile(import.meta.url);
    const finalPath = join(pathToCurrentFile, relativePath);
    const data = await fs.readFile(finalPath);

    const hash = createHash('sha256')
        .update(data)
        .digest('hex');

    console.log(hash);
};

const FILE = './files/fileToCalculateHashFor.txt';

await calculateHash(FILE);
