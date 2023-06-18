/**
 * Parses environment variables that have a specified prefix
 *  and outputs them as a formatted string in console.
 * @param {string} varNamePrefix - The prefix of the environment
 *  variable names to parse.
 */
const parseEnv = varNamePrefix => {
    const env = process.env;
    const result = [];

    for (const key in env) {
        if (key.includes(varNamePrefix)) {
            const toString = `${key}=${env[key]}`;
            result.push(toString);
        }
    }

    console.log(result.join('; '));
};

const PREFIX = 'RSS_';

parseEnv(PREFIX);
