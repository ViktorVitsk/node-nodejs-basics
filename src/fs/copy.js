import fs from 'fs/promises';
import { join } from 'path';
import { pathToFile } from '../utils.js';

/**
 * Copies files from one directory to another directory.
 * if files folder doesn't exists or files_copy has already, 
 * will throwing Error with message FS operation failed 
 * @param {string} dirWithFiles - The name of the source directory 
 * containing the files to copy.
 * @param {string} dirWithFilesCopy - The name of the destination 
 * directory where the files will be copied.
 */
const copy = async (dirWithFiles, dirWithFilesCopy) => {
    const pathToCurrentFile = pathToFile(import.meta.url);
    const pathToFiles = join(pathToCurrentFile, dirWithFiles);
    const pathToFilesCopy = join(pathToCurrentFile, dirWithFilesCopy);

    try {
        await fs.access(pathToFiles, fs.constants.F_OK);

        try {
            await fs.access(pathToFilesCopy, fs.constants.F_OK);
            throw new Error('File already exists');
        } catch {
            await fs.mkdir(pathToFilesCopy);
            const files = await fs.readdir(pathToFiles);
            files.forEach(async file => {
                await fs.copyFile(
                    join(pathToFiles, file),
                    join(pathToFilesCopy, file)
                );
            });
        }
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

const DIR_WITH_FILES = 'files';
const DIR_WITH_FILES_COPY = 'files_copy';

await copy(DIR_WITH_FILES, DIR_WITH_FILES_COPY);
