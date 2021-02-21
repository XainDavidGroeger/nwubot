
function updateCachedInvites(client, invite) {
    client.invites.push(invite);
}

module.exports = { updateCachedInvites };