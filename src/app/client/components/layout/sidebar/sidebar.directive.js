import template from './sidebar.html!text';

export default function sidebarDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        template: template,
        scope: {
            visible:'=',
            showFooterControls:'=',
            showUserInfo:'=',
            appName:'=',
            userName:'='
        },
        replace:true
        //controller: SidebarDirectiveController,
        //controllerAs: 'vm',
        //bindToController: true
    };

    return directive;
}

// class SidebarDirectiveController {
//     constructor($timeout) {
//         'ngInject';
//         console.log(this);
//         //this.showFooterCo ntrols = false;
//         
//        
//         $timeout(()=>{
//             this.showFooterControls = true; 
//         },3000);
//     }
// }
