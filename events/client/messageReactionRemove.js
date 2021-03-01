const config = require('../../config.json');

module.exports = async (Discord, client, reaction, user) => {

    if (user.bot) return;

    const euAnswerEmoji = '🇪';
    const usAnswerEmoji = '🇦';
    const notifyMeEmoji = '🔔';

    if (reaction.emoji.name === notifyMeEmoji) {
        await checkNotifyMeRoleLogic(Discord, client, reaction, user);
        return true;
    }

    if (reaction.emoji.name === euAnswerEmoji) {
        await checkAddEuRoleLogic(Discord, client, reaction, user);
        return true;
    }

    if (reaction.emoji.name === usAnswerEmoji) {
        await checkAddUsRoleLogic(Discord, client, reaction, user);
        return true;
    }
}

async function checkNotifyMeRoleLogic(Discord, client, reaction, user) {
    const memberTarger = reaction.message.guild.members.cache.get(user.id);
    let notifyMeRole = reaction.message.guild.roles.cache.find(r => r.name === config.roles.notifyme);
    memberTarger.roles.remove(notifyMeRole.id);
    return true;
}

async function checkAddEuRoleLogic(Discord, client, reaction, user) {
    const memberTarger = reaction.message.guild.members.cache.get(user.id);
    let euRole = reaction.message.guild.roles.cache.find(r => r.name === config.roles.eu);
    memberTarger.roles.remove(euRole.id);
    return true;
}

async function checkAddUsRoleLogic(Discord, client, reaction, user) {
    const memberTarger = reaction.message.guild.members.cache.get(user.id);
    let americaRole = reaction.message.guild.roles.cache.find(r => r.name === config.roles.us);
    memberTarger.roles.remove(americaRole.id);
    return true;
}
