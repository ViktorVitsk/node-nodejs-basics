import { fileURLToPath } from 'url';
import path from 'path';

export const pathToFile = url => {
    const currentPath = fileURLToPath(url);
    return path.dirname(currentPath);
};    
