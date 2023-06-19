import fs from 'fs';
import { join } from 'path';
import { pathToFile } from '../utils.js';

/**
 * Reads the content of the specified file using a Readable Stream 
 *  and prints it to process.stdout.
 * @param {string} folderName - The name of the folder containing the file.
 * @param {string} fileName - The name of the file to read.
 */
const read = async (folderName, fileName) => {
    const pathToCurrentFile = pathToFile(import.meta.url);
    const finalPath = join(pathToCurrentFile, folderName, fileName);

    const readStream = fs.createReadStream(finalPath);

    readStream.pipe(process.stdout);
};

const FOLDER = 'files';
const FILE = 'fileToRead.txt';

await read(FOLDER, FILE);
