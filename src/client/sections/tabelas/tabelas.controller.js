class TabelasController {

    constructor (logger) {
        this.logger = logger;
        this.activate();
    } 
      
    activate(){
        this.logger.info('Tabelas Controller ativado');
    }  
}   
  
export default [ 'logger', TabelasController ];  
  