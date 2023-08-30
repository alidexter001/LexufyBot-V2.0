const { EmbedBuilder } = require('discord.js');
const config = require(`${process.cwd()}/config.js`);

module.exports = {
  name: 'seek',
  category: '🎵 music',
  description: 'Seek to a specific position on the current song',
  options: [
    {
      name: 'time',
      description: 'The time you want to seek to <hr:min:sec>',
      required: true,
      type: 3,
    },
  ],
  run: async (interaction) => {
    await interaction.deferReply({ fetchReply: true });
    const response = seek(interaction);
    interaction.followUp(response);
  },
};

function seek(interaction) {
  const time = interaction.options.getString('time');
  const player = interaction.client.manager.get(interaction.guild.id);
  if (!player) return `❌ **| Nothing Is Played Right Now.**`;

  const channel = interaction.member.voice.channel;
  const botChannel = interaction.guild.members.me.voice.channel;
  if (!channel) return `❌ **| You have to be in a voice channel to use this command.**`;
  if (channel && botChannel && botChannel !== channel)
    return `❌ **| You have to be on the same voice channel as mine to use this command.**`;

  // Helper function to convert time strings to milliseconds
  function parseTime(timeStr) {
    const timeRegex = /^((\d+):)?((\d{1,2}):)?(\d{1,2})$/;
    const match = timeStr.match(timeRegex);
    if (!match) return null;
  
    const [, hours, , minutes, , seconds] = match;
    const hoursInMilliseconds = hours ? parseInt(hours, 10) * 3600000 : 0;
    const minutesInMilliseconds = minutes ? parseInt(minutes, 10) * 60000 : 0;
    const secondsInMilliseconds = parseInt(seconds, 10) * 1000;
    const milliseconds = hoursInMilliseconds + minutesInMilliseconds + secondsInMilliseconds;
    return milliseconds;
  }

  try{
    const seekTime = parseTime(time);
    if (!seekTime || seekTime < 0) return `❌ **| Invalid time format. Please provide a valid time to seek to.**`;

    // Get the current playing track and its duration
    const track = player.queue.current;
    const trackDuration = track.duration;

    if (seekTime >= trackDuration) return `❌ **| The provided time exceeds the duration of the current song.**`;

    // Seek to the specified position
    player.seek(seekTime);

    return `⏩ **| Seeked to ${msToHms(seekTime)} in the current song.**`;
  }catch{return `❌ **| Something Went Wrong.**`}
}

// Helper function to convert milliseconds to "hh:mm:ss" format
function msToHms(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  const hms = [hours, minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val))
    .filter((val, index) => val !== '00' || index > 0)
    .join(':');

  return hms;
}