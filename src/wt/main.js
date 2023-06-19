import os from 'os';
import { Worker } from 'worker_threads';
import { join } from 'path';
import { pathToFile } from '../utils.js';

const performCalculations = async () => {
    const pathToCurDir = pathToFile(import.meta.url);
    const pathToWorker = join(pathToCurDir, 'worker.js');

    const numOfThreads = os.availableParallelism();
    let startNum = 10;

    const workers = [];

    for (let i = 0; i < numOfThreads; i++) {
        const worker = new Worker(pathToWorker, { workerData: startNum++ });
        workers.push(worker);
    }

    const workersResults = await Promise.allSettled(
        workers.map(
            worker =>
                new Promise((resolve, reject) => {
                    worker.on('message', msg => resolve(msg));
                    worker.on('error', msg => reject(msg));
                })
        )
    );

    const finishResults = workersResults.map(({ status, value }) => ({
        status: status === 'fulfilled' ? 'resolved' : 'error',
        data: status === 'fulfilled' ? value : null,
    }));

    console.log(finishResults);
};

await performCalculations();
