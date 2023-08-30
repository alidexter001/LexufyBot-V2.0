var colors = require('colors');

/**
 * Emitted when a track has an error during playback.
 * @param {import("erela.js").Player} player
 * @param {import("erela.js").Track} track
 * @param {import("erela.js").TrackExceptionEvent} ex
 */


module.exports = (player, track, ex) => {
    console.log(`[${colors.red('NodeError')}] Track Stuck: ${ex.error}`);
}