const config = require('../config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "<a:giveaway:1160574949036146739> **GIVEAWAY** <a:giveaway:1160574949036146739>",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "<a:giveaway:1160574949036146739> **GIVEAWAY ENDED** <a:giveaway:1160574949036146739>",
  drawing:  `Ends: **{timestamp}**`,
  inviteToParticipate: `React with 🎉 to participate!`,
  winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
  embedFooter: "Giveaways",
  noWinner: "Giveaway cancelled, no valid participations.",
  hostedBy: "*Hosted by:*${interaction.user.toString()}",
  winners: "winner(s)",
  endedAt: "Ended at"
}