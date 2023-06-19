import fs from 'fs';
import zlib from 'zlib';
import { join } from 'path';
import { pathToFile } from '../utils.js';

/**
 * Compresses a file to an archive using zlib and Streams API.
 *
 * @param {string} folderName - Name of the folder containing the file.
 * @param {string} fileName - Name of the file to compress.
 * @param {string} compressedFileName - Name of the compressed archive file.
 */
const compress = async (folderName, fileName, compressedFileName) => {
    const pathToCurrentFile = pathToFile(import.meta.url);
    const filePath = join(pathToCurrentFile, folderName, fileName);
    const compressedFilePath = join(
        pathToCurrentFile,
        folderName,
        compressedFileName
    );

    const readStream = fs.createReadStream(filePath);
    const gzipStream = zlib.createGzip();
    const writeStream = fs.createWriteStream(compressedFilePath);

    readStream.pipe(gzipStream).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Compression complete.');
    });

    writeStream.on('error', (error) => {
        console.error('Compression failed:', error);
    });
};

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToCompress.txt';
const COMPRESSED_FILE_NAME = 'archive.gz';

await compress(FOLDER_NAME, FILE_NAME, COMPRESSED_FILE_NAME);
