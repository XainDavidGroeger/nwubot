module.exports = async (Discord, client) => {

    console.log('NWU Bot is online!');

     // Load all invites for all guilds and save them to the cache.
    await client.guilds.cache.get(process.env.GUILD_ID).fetchInvites()
    .then(guildInvites => {
        client.invites = guildInvites;
    });

    require ('../../wc3stats/monitor-clans').main ();
    require ('../../wc3stats/monitor-lobbies').main ();
    require ('../../wc3stats/monitor-replays').main ();

return true;

}