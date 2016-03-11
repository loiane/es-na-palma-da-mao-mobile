/* global System */
/**
 * Wrapper around System
 */
class SystemService {
    /**
     * Imports a component from the given path, relative to the baseURL set in SystemJS.
     *
     * @param {String} path
     * @returns {Promise}
     */
    import(path) {
        return System.import(path)
            .catch(function (err) {
                console.error(err.stack);
            });
    }
}

export default[SystemService];