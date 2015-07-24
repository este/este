import socket from 'socket.io-client';

// Private instance of the socket Manager
let io;

const socketVamos = {
    /**
     * Open the socket
     * @param {String} url - The url to the server
     */
    init(url) {
        io = socket(url);
    },

    /**
     * Interface to native socket.on
     * Throw an error if called with socketVamos non initialized
     * @param {String} message - The name of the message to listen
     * @param {Function} callback - the callback function
     */
    on(message, callback) {
        if (typeof io === 'undefined') {
            throw new Error('The socket needs to be initialized');
        }

        io.on(message, callback);
    },

    /**
     * Interface to native socket.emit
     * Throw an error if called with socketVamos non initialized
     * @param {String} message - The name of the message to send
     * @param {Object} data - the data to send
     */
    emit(message, data) {
        if (typeof io === 'undefined') {
            throw new Error('The socket needs to be initialized');
        }

        io.emit(message, data);
    }
};

export default socketVamos;
