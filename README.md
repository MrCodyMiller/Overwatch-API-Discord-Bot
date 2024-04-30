# Overwatch-API-Discord-Bot

A discord bot written in Javascript that connects to the Overfast-API to pull Overwatch data: Heros, Player Stats, Etc.

To access hero information Message the server "!hero" followed by the Overwatch Heros Name.

Ex: "!hero Cassidy" this will return selected information about the hero.

To access Player information, Message the server "!owstats" followed by the players Blizzard ID.

-Blizard ID is traditionally their in-game name followed by a '#' and 5 numbers. Ex: Aeriials#11173

-This needs to be modified for the Bot to understand though. We much change the '#' to a '-'. So the final call will look like...

Ex: "!owstats Aeriials-11173"
