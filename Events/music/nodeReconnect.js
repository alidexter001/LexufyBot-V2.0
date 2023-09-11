var colors = require('colors');

/**
 * @param {import('erela.js').Node} node
 */

module.exports = async (node) => {
    console.log(`[${colors.yellow('NODE')}] Trying To Reconnect To <${colors.cyan(`${node.options.identifier}`)}>`)
};