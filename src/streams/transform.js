import { Transform, pipeline } from 'stream';

/**
 * Function that reads data from process.stdin, 
 *  reverses the text using Transform Stream, 
 *  and writes it to process.stdout
 */
const transform = async () => {
    const transform = new Transform({
        transform(chunk, enc, cb) {
            const dataToString = chunk.toString().trim();

            const reverseString = dataToString.split('').reverse().join('');

            this.push(reverseString + '\n');

            cb();
        },
    });

    pipeline(process.stdin, transform, process.stdout, err => {
        console.log('Error:', err);
    });
};

await transform();
