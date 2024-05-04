require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const {token} = process.env
const client = new Client({ intents: [ 
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,] });
const PREFIX = "!"



//MESSAGES!
client.on('messageCreate', async (message) => {

  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  //Calls hero data!
  if (command === 'hero') {
    if (!args.length) {
      return message.channel.send('Please provide a hero name.');
    }

    const heroName = args.join(' ');

try {
  const response = await axios.get(`https://overfast-api.tekrop.fr/heroes/${heroName}`);

} catch (error) {
 // console.error('Error fetching hero data:', error.message);
  message.channel.send('Failed to fetch hero data. Please try again later.');
}
    try {
      const response = await axios.get(`https://overfast-api.tekrop.fr/heroes/${heroName}`);
      const heroData = response.data;

      const heroInfo = 
      ` **Name:** ${heroData.name}
        **HP:** ${heroData.hitpoints.total}
        **Age:** ${heroData.age}
        **Role:** ${heroData.role}
        **Abilities:** ${heroData.abilities.map(ability => ability.name).join(', ')}
      `;

      message.channel.send(heroInfo);

    } catch (error) {
      console.error('Error fetching hero data:', error.message);
      message.channel.send('Failed to fetch hero data. Please try again later.');
    }
  }

  //Calls basic player data
  if (command === 'owstats') {
    if (!args.length) {
      return message.channel.send('Please provide a player name. ex: Aeriials-11173');
    }

    const playerName = args.join(' ');
   

try {
  const response = await axios.get(`https://overfast-api.tekrop.fr/players/${playerName}/stats/summary`);
  
  // Rest of your code
} catch (error) {
  message.channel.send('Failed to fetch player data. Please try again later.');
}
    try {
      const response = await axios.get(`https://overfast-api.tekrop.fr/players/${playerName}/stats/summary`);
      const playerData = response.data;
      const formattedDamage = playerData.general.total.damage.toLocaleString();


      const playerInfo = `
        **${playerName.slice(0, -6)} stats:**
        **Games Played:** ${playerData.general.games_played}
        **Games Won:** ${playerData.general.games_won}
        **Win Percentage:** ${playerData.general.winrate}%
        **KDA:** ${playerData.general.kda}
        **Elims:** ${playerData.general.total.eliminations}
        **Total Damage:** ${formattedDamage}
      `;

      message.channel.send(playerInfo);
    } catch (error) {
      console.error('Error fetching hero data:', error.message);
      message.channel.send('Failed to fetch hero data. Please try again later.');
    }
  }

  //Calls Player Comp Data
  if (command === 'comp') {
    if (!args.length) {
      return message.channel.send('Please provide a player name. ex: Aeriials-11173');
    }

    const playerName = args.join(' ');
    //figure a way to add two commands (!owstats Aeriials-11173 comp) or something. 

try {
  const response = await axios.get(`https://overfast-api.tekrop.fr/players/${playerName}/stats/summary?gamemode=competitive`);

  message.channel.send('searching...')
  
  // Rest of your code
} catch (error) {
  message.channel.send('Failed to fetch player data. Please try again later.');
}
    try {
      const response = await axios.get(`https://overfast-api.tekrop.fr/players/${playerName}/stats/summary?gamemode=competitive`);
      const playerData = response.data;
      const formattedDamage = playerData.general.total.damage.toLocaleString();


      const playerInfo = `
        **${playerName.slice(0, -6)} stats:**
        **Comps Played:** ${playerData.general.games_played}
        **Comps Won:** ${playerData.general.games_won}
        **Comp Win %:** ${playerData.general.winrate}%
        **Comp KDA:** ${playerData.general.kda}
        **Comp Elims:** ${playerData.general.total.eliminations}
        **Comp Damage:** ${formattedDamage}
      `;

      message.channel.send(playerInfo);
    } catch (error) {
      console.error('Error fetching hero data:', error.message);
      message.channel.send('Failed to fetch hero data. Please try again later.');
    }
  }

});





client.login(process.env.token);
