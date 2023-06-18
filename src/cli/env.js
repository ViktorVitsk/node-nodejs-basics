/**
 * Parses environment variables that have a specified prefix 
 *  and outputs them as a formatted string in console.
 * @param {string} varNamePrefix - The prefix of the environment 
 *  variable names to parse.
 */
const parseEnv = varNamePrefix => {
    const env = process.env;
    const envKeysToArray = Object.keys(env);
    const fullVarsNames = envKeysToArray.filter(key =>
        key.includes(varNamePrefix)
    );
    let result = '';
    fullVarsNames.forEach((key, i) => {
        result += `${key}=${env[key]}`;
        if (fullVarsNames.length - 1 !== i) {
            result += '; ';
        }
    });
    console.log(result);
};

const PREFIX = 'RSS_';

parseEnv(PREFIX);
