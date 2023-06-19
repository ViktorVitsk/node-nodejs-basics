/**
 * Parses command line arguments
 *  and outputs them as a formatted string in console.
 */
const parseArgs = () => {
    const args = process.argv.slice(2);
    const result = [];
    for (let i = 1; i < args.length; i += 2) {
        const toString = `${args[i - 1]} is ${args[i]}`;
        result.push(toString);
    }
    console.log(result.join(', '));
};

parseArgs();
