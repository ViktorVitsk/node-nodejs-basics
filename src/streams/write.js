import fs from 'fs';
import { join } from 'path';
import { pathToFile } from '../utils.js';

/**
 * writes process.stdin data into file fileToWrite.txt content 
 *  using Writable Stream
 * @param {string} folderName - The name of the folder containing the file.
 * @param {string} fileName - The name of the file to write.
 */
const write = async (folderName, fileName) => {
    const pathToCurrentFile = pathToFile(import.meta.url);
    const finalPath = join(pathToCurrentFile, folderName, fileName);

    const writeStream = fs.createWriteStream(finalPath);

    process.stdin.pipe(writeStream);
};

const FOLDER = 'files';
const FILE = 'fileToWrite.txt';

await write(FOLDER, FILE);
