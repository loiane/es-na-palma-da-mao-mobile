import ErrorMessageModule from './messages/error-message/index';
import RemarkModule from './messages/remark/index';
import HighlightModule from './messages/highlight/index';
import MessageModule from './messages/message/index';

export default angular.module( 'layout', [ ErrorMessageModule.name, MessageModule.name, RemarkModule.name, HighlightModule.name ] );