module.exports = function() {

    const service = {
        notFoundMiddleware: notFoundMiddleware,
        send404: send404
    };

    return service;

    ///////////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * @param {Object} req -
     * @param {Object} res -
     * @param {Function} next -
     *
     * @returns {void}
     */
    function notFoundMiddleware( req, res, next ) { // eslint-disable-line no-unused-vars
        send404( req, res, 'API endpoint not found' );
    }

    /**
     *
     * @param {Object} req -
     * @param {Object} res -
     * @param {String} description -
     *
     * @returns {Object} - A resposta http com status 404
     */
    function send404( req, res, description ) {
        const data = {
            status: 404,
            message: 'Not Found',
            description: description,
            url: req.url
        };
        res.status( 404 )
           .send( data )
           .end();
    }
};
