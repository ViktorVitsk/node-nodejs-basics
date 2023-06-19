import fs from 'fs/promises';
import { join } from 'path';
import { pathToFile } from '../utils.js';

/**
 * prints all array of filenames from folder into console
 * if folder doesn't exists Error with message
 * 'FS operation failed'
 * @param {string} dir - The name of the folder where the files
 */
const list = async dir => {
    const pathToCurrentFile = pathToFile(import.meta.url);
    const pathToFolder = join(pathToCurrentFile, dir);

    try {
        await fs.access(pathToFolder, fs.constants.F_OK);
        const data = await fs.readdir(pathToFolder);
        console.log(data);
    } catch {
        throw new Error('FS operation failed');
    }
};

const DIR = 'files';
await list(DIR);
