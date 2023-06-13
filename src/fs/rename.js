import fs from 'fs/promises';
import { join } from 'path';
import { pathToFile } from '../utils.js';

/**
 * Renames file. If the required file does not exist or 
 * file with new name already exists will be thrown Error with message 
 * 'FS operation failed'
 * @param {string} folderName - The name of the folder where the file
 * @param {string} oldFileName - old file name.
 * @param {string} newFileName - new file name.
 */
const rename = async (folderName, oldFileName, newFileName) => {
    const pathToCurrentFile = pathToFile(import.meta.url);
    const pathToOldFile = join(pathToCurrentFile, folderName, oldFileName);
    const pathToNewFile = join(pathToCurrentFile, folderName, newFileName);

    try {
        await fs.access(pathToOldFile, fs.constants.F_OK);

        try {
            await fs.access(pathToNewFile, fs.constants.F_OK);
            throw new Error('File already exists');
        } catch (error) {
            fs.rename(pathToOldFile, pathToNewFile);
        }
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

const FOLDER_NAME = 'files';
const FILE_OLD_NAME = 'wrongFilename.txt';
const FILE_NEW_NAME = 'properFilename.md';

await rename(FOLDER_NAME, FILE_OLD_NAME, FILE_NEW_NAME);
