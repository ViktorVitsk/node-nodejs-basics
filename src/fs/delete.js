import fs from 'fs/promises';
import { pathToFile } from '../utils.js';
import { join } from 'path';

const remove = async (folderName, fileName) => {
    const pathToCurrentFile = pathToFile(import.meta.url);
    const pathToFileForDel = join(pathToCurrentFile, folderName, fileName);

    try {
        await fs.access(pathToFileForDel, fs.constants.F_OK);
        fs.unlink(pathToFileForDel);
    } catch {
        throw new Error('FS operation failed');
    }
};

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRemove.txt';

await remove(FOLDER_NAME, FILE_NAME);
