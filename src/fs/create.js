import fs from 'fs/promises';
import { pathToFile } from '../utils.js';
import { join } from 'path';

/**
 * Creates a file with the specified data in the specified folder with
 * the given name.
 * If the file already exists, throws an "FS operation failed" error.
 * @param {string} folderName - The name of the folder where the file will be
 * created.
 * @param {string} fileName - The name of the file.
 * @param {string} data - The data to be written to the file.
 */

const create = async (folderName, fileName, data) => {
    const pathToCurrentFile = pathToFile(import.meta.url);
    const finalPath = join(pathToCurrentFile, folderName, fileName);
    const fileCreateError = new Error('FS operation failed');

    try {
        await fs.access(finalPath, fs.constants.F_OK);
        throw new Error('File already exists');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw new Error('FS operation failed');
        }

        await fs.writeFile(finalPath, data);
    }
};

const FOLDER_NAME = 'files';
const FILE_NAME = 'fresh.txt';
const DATA = 'I am fresh and young';

await create(FOLDER_NAME, FILE_NAME, DATA);
