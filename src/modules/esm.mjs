import { sep } from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'url';
import { pathToFile as dirname } from '../utils.js';

import './files/c.js';

const url = import.meta.url;
const __filename = fileURLToPath(url);
const __dirname = dirname(url);

const getJSON = async path =>
    (
        await import(path, {
            assert: { type: 'json' },
        })
    ).default;

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = await getJSON('./files/a.json');
} else {
    unknownObject = await getJSON('./files/b.json');
}
console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export default {
    unknownObject,
    myServer,
};
