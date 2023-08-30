var colors = require('colors')
/**
 * @param {import('erela.js').Node} node
 */

module.exports = async (node, error) => {
    console.log(`[${colors.red('NODE')}] An Error Has Accured While Connecting to <${colors.cyan(`${node.options.identifier}`)}>`)
    console.log(String(error.message))
}