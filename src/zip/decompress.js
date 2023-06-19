import fs from 'fs';
import zlib from 'zlib';
import { join } from 'path';
import { pathToFile } from '../utils.js';

/**
 * Decompresses an archive to a file using zlib and Streams API.
 *
 * @param {string} folderName - Name of the folder containing the file.
 * @param {string} fileName - Name of the file.
 * @param {string} compressedFileName - Name of the compressed archive file.
 */
const decompress = async (folderName, fileName, compressedFileName) => {
    const pathToCurrentFile = pathToFile(import.meta.url);
    const filePath = join(pathToCurrentFile, folderName, fileName);
    const compressedFilePath = join(
        pathToCurrentFile,
        folderName,
        compressedFileName
    );

    const readStream = fs.createReadStream(compressedFilePath);
    const gunzipStream = zlib.createGunzip();
    const writeStream = fs.createWriteStream(filePath);

    readStream.on('error', error => {
        if (error.code === 'ENOENT') {
            console.error('zipped file is missing');
        } else {
            console.error(error);
        }
    });

    writeStream.on('finish', () => {
        console.log('Compression complete.');
    });

    writeStream.on('error', error => {
        console.error('Compression failed:', error);
    });

    readStream.pipe(gunzipStream).pipe(writeStream);
};

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToCompress.txt';
const COMPRESSED_FILE_NAME = 'archive.gz';

await decompress(FOLDER_NAME, FILE_NAME, COMPRESSED_FILE_NAME);
