class DiversosController {

    constructor (logger) {
        this.logger = logger;
        this.activate();
    } 
      
    activate(){
        this.logger.info('Diversos Controller ativado');
    }  
}   
  
export default [ 'logger', DiversosController ];  
  