const Phrases = require('./GenericPhrases');

/**
 * Create the bot
 */
class Bot {

    /**
     * Constructor
     * @arg {string} mysqlConnection Connection json
     * @return instance
     */
    constructor(mysqlConnection) {
        this.phrases = new Phrases(mysqlConnection);
    }

    /**
     * Get a message
     * @return {string} message
     */
    getMessage() {
        return this.phrases.getMessage();
    }

}

// Export
module.exports = Bot;