var colors = require('colors')
/**
 * @param {import('erela.js').Node} node
 */

module.exports = async(node)=> {
        console.log(`[${colors.green('NODE')}] Successfully Connected to <${colors.cyan(`${node.options.identifier}`)}>`)
}