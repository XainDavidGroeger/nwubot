module.exports = async (client) => {

    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    const goalChannel = guild.channels.cache.get(process.env.MEMBER_COUNT_GOAL_CHANNEL_ID);
    goalChannel.setName(`Goal: 200`);

    const serverBoostChannel = guild.channels.cache.get(process.env.SERVER_BOOST_LEVEL_CHANNEL_ID);
    serverBoostChannel.setName(`Server Boost Level: ${guild.premium_tier}`);

    setInterval(() => {
       const memberCount = guild.memberCount;
       const channel = guild.channels.cache.get(process.env.MEMBER_COUNT_CHANNEL_ID);
       channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
       console.log(memberCount.toLocaleString())
    }, 5000);

}