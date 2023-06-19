import fs from 'fs/promises';
import { join } from 'path';
import { pathToFile } from '../utils.js';

/**
 * reads a file and prints to the console
 * @param {string} folderName - The name of the folder where the file 
 * @param {string} fileName - The name of the file.
 */
const read = async (folderName, fileName) => {
    const pathToCurrentFile = pathToFile(import.meta.url);
    const finalPath = join(pathToCurrentFile, folderName, fileName);

    try {
        await fs.access(finalPath, fs.constants.F_OK);
        const data = await fs.readFile(finalPath, 'utf-8');
        console.log(data);
    } catch {
        throw new Error('FS operation failed');
    }
};

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRead.txt';

await read(FOLDER_NAME, FILE_NAME);
