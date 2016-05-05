import Environment from './Environment';
import TaskMaker from './TaskMaker';

/**
 *
 */
class GulpHelpers {

    /**
     *
     * @param gulp
     * @returns {TaskMaker}
     */
    taskMaker( gulp ) {
        if ( !this.tm ) {
            this.tm = new TaskMaker( gulp );
        }
        return this.tm;
    }

    /**
     *
     * @returns {Environment}
     */
    environment() {
        if ( !this.env ) {
            this.env = new Environment();
        }
        return this.env;
    }
}

export default new GulpHelpers();
