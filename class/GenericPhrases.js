const mysql = require('mysql');

/**
 * Get all phrases and return a random message
 */
class GenericPhrases {

    /**
     * Constructor
     * @arg {string} mysqlConnection Connection json
     * @return instance
     */
    constructor(mysqlConnection) {
        this._mysqlConnection = mysqlConnection;
        this._phrases = [];
        this.setMessagesDatabase(this._phrases, this._mysqlConnection);
    }

    /**
     * Set messages from database
     * @arg {array} arr Array of phrases
     * @arg {string} mysqlConnection Connection json
     * @return null
     */
    setMessagesDatabase(arr, mysqlConnection) {
        let $this = this;
        let connection = mysql.createConnection(mysqlConnection);
        connection.connect();
        connection.query('SELECT * FROM phrase', function (error, results, fields) {
            if (error) throw error;
            $this.setMessages(arr, results);
        });
        connection.end();
    }

    /**
     * Set messages from queries
     * @arg {array} arr Array of phrases
     * @arg {array} results Array of queries
     * @return null
     */
    setMessages(arr, results) {
        for (var i = results.length - 1; i >= 0; i--) {
            arr.push(results[i].message);        
        }
    }

    /**
     * Get a random message
     * @return {string} message
     */
    getMessage() {
        return this._phrases[Math.floor(Math.random() * this._phrases.length)];
    }

}

// Export
module.exports = GenericPhrases;