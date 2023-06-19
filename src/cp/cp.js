import { spawn } from 'child_process';
import { join } from 'path';
import { pathToFile } from '../utils.js';

const spawnChildProcess = async args => {
    const pathToCurDir = pathToFile(import.meta.url);
    const pathToCP = join(pathToCurDir, 'files', 'script.js');

    // spawns child process
    const cp = spawn('node', [pathToCP, ...args]);

    // child process stdin receives input from master process stdin
    process.stdin.pipe(cp.stdin);
    // child process stdout sends data to master process stdout
    cp.stdout.pipe(process.stdout);
};

const ARGS = ['rs', 'school'];

spawnChildProcess(ARGS);
