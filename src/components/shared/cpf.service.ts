export class CPFService {

    /** @constructor */
    constructor() {}

    /*
     Valida CPF

     Valida se for CPF

     @param  string cpf O CPF com ou sem pontos e traço
     @return bool True para CPF correto - False para CPF incorreto
     */
    public validar( valor ) {

        // Garante que o valor é uma string
        valor = valor.toString();

        // Remove caracteres inválidos do valor
        valor = valor.replace( /[^0-9]/g, '' );

        // Captura os 9 primeiros dígitos do CPF
        // Ex.: 02546288423 = 025462884
        let digitos = valor.substr( 0, 9 );

        // Faz o cálculo dos 9 primeiros dígitos do CPF para obter o primeiro dígito
        let novoCPF = this.calcularPosicoesDosDigitos( digitos );

        // Faz o cálculo dos 10 dígitos do CPF para obter o último dígito
        novoCPF = this.calcularPosicoesDosDigitos( novoCPF, 11 );

        // Verifica se o novo CPF gerado é idêntico ao CPF enviado
        if ( novoCPF === valor ) {
            // CPF válido
            return true;
        } else {
            // CPF inválido
            return false;
        }

    } // validar

    /*
     Multiplica dígitos vezes posições

     @param string digitos Os digitos desejados
     @param string posicoes A posição que vai iniciar a regressão
     @param string soma_digitos A soma das multiplicações entre posições e dígitos
     @return string Os dígitos enviados concatenados com o último dígito
     */
    protected calcularPosicoesDosDigitos( digitos, posicoes = 10, somaDigitos = 0 ) {

        // Garante que o valor é uma string
        digitos = digitos.toString();

        // Faz a soma dos dígitos com a posição
        // Ex. para 10 posições:
        //   0    2    5    4    6    2    8    8   4
        // x10   x9   x8   x7   x6   x5   x4   x3  x2
        //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
        for ( let i = 0; i < digitos.length; i++ ) {
            // Preenche a soma com o dígito vezes a posição
            somaDigitos = somaDigitos + ( digitos[ i ] * posicoes );

            // Subtrai 1 da posição
            posicoes--;

            // Parte específica para CNPJ
            // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
            if ( posicoes < 2 ) {
                // Retorno a posição para 9
                posicoes = 9;
            }
        }

        // Captura o resto da divisão entre soma_digitos dividido por 11
        // Ex.: 196 % 11 = 9
        somaDigitos = somaDigitos % 11;

        // Verifica se soma_digitos é menor que 2
        if ( somaDigitos < 2 ) {
            // soma_digitos agora será zero
            somaDigitos = 0;
        } else {
            // Se for maior que 2, o resultado é 11 menos soma_digitos
            // Ex.: 11 - 9 = 2
            // Nosso dígito procurado é 2
            somaDigitos = 11 - somaDigitos;
        }

        // Concatena mais um dígito aos primeiro nove dígitos
        // Ex.: 025462884 + 2 = 0254628842
        let cpf = digitos + somaDigitos;

        // Retorna
        return cpf;

    } // _calcularPosicoesDosDigitos

}
