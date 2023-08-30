var colors = require('colors');
/**
 * @param {Error} error
 */

module.exports = async(error) => {
        console.error(`[${colors.red('ERROR')}] An Error occurred: ${colors.bgRed(error)}`);
}