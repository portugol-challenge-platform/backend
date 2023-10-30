"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prefer-rest-params */
const excecoes_1 = require("../../../excecoes");
module.exports.graus = function (angle) {
    if (isNaN(angle) || angle === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover um número para mat.graus(ângulo).');
    return angle * (180 / Math.PI);
};
module.exports.mediana = function (a) {
    if (isNaN(a) || a === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para mediana(a).');
    a.sort(function (a, b) {
        return a - b;
    });
    const mid = a.length / 2;
    return mid % 1 ? a[mid - 0.5] : (a[mid - 1] + a[mid]) / 2;
};
/**
 * Calcula a moda de um vetor.
 * @param {inteiro[]} vetor Vetor de inteiros.
 * @returns Valor inteiro da moda.
 */
module.exports.moda = function (numbers) {
    if (!Array.isArray(numbers))
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Parâmetro `vetor` deve ser um vetor na função moda(vetor).');
    if (numbers.some(isNaN))
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Todos os elementos de `vetor` deve ser numéricos na função moda(vetor).');
    let modes = [], count = [], i, number, maxIndex = 0;
    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }
    return modes;
};
module.exports.pi = Math.PI;
module.exports.radiano = function (angulo) {
    if (!Number.isInteger(angulo))
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover um número inteiro para o parâmetro `angulo`, em radiano(angulo).');
    return angulo * (Math.PI / 180);
};
//FUNÇÃO AFIM E QUADRÁTICA
/**
 * Gera valores para abscissa.
 * @param {inteiro} distancia A distância entra dois pontos.
 * @param {inteiro} valorPontoCentral O ponto central na abscissa.
 * @param {inteiro} numeroPontos Número de pontos a serem gerados (padrão: 7).
 * @returns Um vetor, contendo o número de pontos informado ou definido por padrão em uma abscissa.
 *          Se o número informado é par, um ponto negativo a mais é gerado.
 */
module.exports.gerarPontosAbscissa = function (distancia, valorPontoCentral, numeroPontos) {
    if (!Number.isInteger(distancia))
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover um valor inteiro para o parâmetro `distancia`, em gerarPontosAbscissa(distancia, valorInicial).');
    if (!Number.isInteger(valorPontoCentral))
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover um valor inteiro para o parâmetro `valorInicial`, em gerarPontosAbscissa(distancia, valorInicial).');
    if (!numeroPontos) {
        numeroPontos = 7;
    }
    const elementoInicial = valorPontoCentral - ((numeroPontos / 2) >> 0) * distancia;
    const x = [];
    for (let i = 0; i < numeroPontos; i++) {
        x.push(elementoInicial + i * distancia);
    }
    return x;
};
//Raíz da Função Afim
module.exports.fun1R = function (a, b) {
    if (isNaN(a) || a === null || isNaN(b) || b === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para fun1R(valor1,valor2).');
    return (-1 * b) / a;
};
//Intervalo Preenchido
module.exports.linspace = function (startValue, stopValue, cardinality) {
    if (isNaN(startValue) ||
        startValue === null ||
        isNaN(stopValue) ||
        stopValue === null ||
        isNaN(cardinality) ||
        cardinality === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para linspace(valor1,valor2,valor3).');
    const lista = [];
    const step = (stopValue - startValue) / (cardinality - 1);
    for (let i = 0; i < cardinality; i++) {
        lista.push(startValue + step * i);
    }
    return lista;
};
//Raízes da Função Quadrática
module.exports.fun2R = function (a, b, c) {
    if (isNaN(a) || a === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para fun2R(a,b,c).');
    const r1 = (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    const r2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    const xv = (-1 * b) / (2 * a);
    const yv = ((-1 * (Math.pow(b, 2) - 4 * a * c)) / 4) * a;
    return [xv, yv];
};
//Aproximação de valores
const aprox = function (x, z) {
    if (isNaN(x) || x === null || isNaN(z) || z === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para aprox(x,z).');
    if (z == undefined) {
        z = 2;
    }
    if (typeof x == 'number') {
        x = x.toFixed(z);
    }
    else if (x[0].length == undefined) {
        // 1D array
        for (let i = 0; i < x.length; i++) {
            x[i] = parseFloat(x[i].toFixed(z));
        }
    }
    else
        for (let i = 0; i < x.length; i++) {
            // 2D array
            for (let j = 0; j < x[0].length; j++) {
                x[i][j] = parseFloat(x[i][j].toFixed(z));
            }
        }
    return x;
};
module.exports.aprox = aprox;
//Parâmetros da Função
const matrizn = function (z) {
    if (isNaN(z) || z === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para matrizn(z).');
    const n = arguments.length;
    const data = Array.from(Array(1), () => new Array(n));
    for (let i = 0; i < n; i++) {
        data[0][i] = arguments[i];
    }
    return data;
};
module.exports.matrizn = matrizn;
//Vetor de pontos aleatórios
module.exports.pontosAleatorios = function (n) {
    if (isNaN(n) || n === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para pale(n).');
    let ex;
    if (ex == undefined) {
        ex = 0;
    }
    const x = [];
    x[0] = 100;
    for (let i = 1; i < n; i++) {
        x[i] = ex + x[i - 1] + Math.random() * 2 - 1;
    }
    const xx = aprox(x, 2);
    return xx;
};
//Intervalo A-B
module.exports.vet = function (a, b) {
    if (isNaN(a) || a === null || isNaN(b) || b === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para vet(a,b).');
    const data = Array.from(Array(1), () => new Array(b - a + 1));
    for (let i = 0; i < data[0].length; i++) {
        data[0][i] = a + i;
    }
    return matrizn(data);
};
/**
 * Conta quantas vezes um determinado valor aparece em um vetor.
 * @param {qualquer[]} vetor Vetor de elementos
 * @param {qualquer} valor Valor a ser encontrado no vetor
 * @returns Valor inteiro, com o número de vezes que `valor` foi encontrado em `vetor`.
 */
module.exports.numeroOcorrencias = function (vetor, valor) {
    if (!Array.isArray(vetor))
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Parâmetro `vetor` deve ser um vetor, em numeroOcorrencias(vetor, valor).');
    return vetor.filter((v) => v === valor).length;
};
/* ESTATÍSTICA */
/**
 * Encontra o elemento máximo em um vetor.
 * @param {inteiro[]} vetor Um vetor de números inteiros.
 * @returns O maior número encontrado em um vetor.
 */
module.exports.max = function (vetor) {
    if (!Array.isArray(vetor))
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Parâmetro `vetor` deve ser um vetor, em max(vetor).');
    if (vetor.some(isNaN))
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Todos os elementos de `vetor` deve ser numéricos, em max(vetor).');
    return Math.max.apply(null, vetor);
};
/**
 * Encontra o elemento mínimo em um vetor.
 * @param {inteiro[]} vetor Um vetor de números inteiros.
 * @returns O menor número encontrado em um vetor.
 */
module.exports.min = function (vetor) {
    if (!Array.isArray(vetor))
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Parâmetro `vetor` deve ser um vetor, em min(vetor).');
    if (vetor.some(isNaN))
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Todos os elementos de `vetor` deve ser numéricos, em min(vetor).');
    return Math.min.apply(null, vetor);
};
//Soma de determinada matriz
const smtr = function (a) {
    if (isNaN(a) || a === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para smtr(a).');
    let z = 0;
    if (a.length == 1) {
        // a is a 1D row array
        for (let j = 0; j < a[0].length; j++) {
            z = z + a[0][j];
        }
    }
    else if (a[0].length == 1) {
        // a is a 1D column array
        for (let i = 0; i < a.length; i++) {
            z = z + a[i][0];
        }
    }
    else {
        for (let j = 0; j < a.length; j++) {
            z = z + a[j];
        }
    }
    return aprox(z, 2);
};
module.exports.smtr = smtr;
// Retorna a média de um vetor de números
module.exports.media = function () {
    const argumentsLength = Object.keys(arguments).length;
    if (argumentsLength <= 0) {
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve fornecer um parâmetro para a função.');
    }
    if (argumentsLength > 1) {
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'A função recebe apenas um parâmetro.');
    }
    // Pega o primeiro argumento do objeto de argumentos
    const args = arguments['0'];
    if (!Array.isArray(args)) {
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve fornecer um parâmetro do tipo vetor.');
    }
    // Valida se o array está vazio.
    if (!args.length) {
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Vetor vazio. Você deve fornecer ao menos um valor ao vetor.');
    }
    // Valida se o array contém apenas valores do tipo número.
    args.forEach((item) => {
        if (typeof item !== 'number') {
            throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve fornecer um vetor contendo apenas valores do tipo número.');
        }
    });
    // Soma todos os itens.
    const valoresSomados = args.reduce((acumulador, itemAtual) => acumulador + itemAtual, 0);
    // Faz o cáculo da média em si e retorna.
    return valoresSomados / args.length;
};
//Média aritmética de uma matriz
const ve = function (a) {
    if (isNaN(a) || a === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para ve(a).');
    if (a.length == 1) {
        return aprox(smtr(a) / a[0].length, 4);
    } // a is a row array
    if (a[0].length == 1) {
        return aprox(smtr(a) / a.length, 4);
    } // a is a column array
    if (a[0].length == undefined) {
        return aprox(smtr(a) / a.length, 4);
    }
};
module.exports.ve = ve;
//Soma dos quadrados dos resíduos (sqr) de uma matriz
const sqr = function (a) {
    if (isNaN(a) || a === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para sqr(a).');
    const mean = ve(a);
    let sum = 0;
    let i = a.length;
    let tmp;
    while (--i >= 0) {
        tmp = a[i] - mean;
        sum += tmp * tmp;
    }
    return sum;
};
module.exports.sqr = sqr;
//Variação de uma matriz
module.exports.variancia = function (array, flag) {
    if (isNaN(array) || array === null || isNaN(flag) || flag === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para variancia(matriz, flag).');
    if (flag == undefined) {
        flag = 1;
    }
    return sqr(array) / (array.length - (flag ? 1 : 0));
};
//Covariância de duas matrizes
module.exports.colet = function (array1, array2) {
    if (isNaN(array1) || array1 === null || isNaN(array1) || array2 === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para covar(matriz1, matriz2).');
    let u = ve(array1);
    let v = ve(array2);
    let arr1Len = array1.length;
    let sq_dev = new Array(arr1Len);
    for (let i = 0; i < arr1Len; i++)
        sq_dev[i] = (array1[i] - u) * (array2[i] - v);
    return smtr(sq_dev) / (arr1Len - 1);
};
/*TRIGONOMETRIA*/
//Seno de um número
module.exports.sen = function (x) {
    if (isNaN(x) || x === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para sen(x).');
    return Math.sin(x);
};
//Cosseno de um número
module.exports.cos = function (x) {
    if (isNaN(x) || x === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para cos(x).');
    return Math.cos(x);
};
//Tangente de um número
module.exports.tan = function (x) {
    if (isNaN(x) || x === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para tan(x).');
    return Math.tan(x);
};
//Arco cosseno de um número
module.exports.arcos = function (x) {
    if (isNaN(x) || x === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para arcos(x).');
    return Math.acos(x);
};
//Arco seno de um número
module.exports.arsen = function (x) {
    if (isNaN(x) || x === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para arsen(x).');
    return Math.asin(x);
};
//Arco tangente de um número
module.exports.artan = function (x) {
    if (isNaN(x) || x === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para artan(x).');
    return Math.atan(x);
};
//Exponencial
module.exports.exp = function (x) {
    if (isNaN(x) || x === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para exp(x).');
    return Math.exp(x);
};
//Logaritmo natural
module.exports.log = function (x) {
    if (isNaN(x) || x === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para log(x).');
    return Math.log(x);
};
// Retorna a base elevada ao expoente
const pot = function (base, expoente) {
    if (typeof base !== 'number' || typeof expoente !== 'number') {
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Os parâmetros devem ser do tipo número.');
    }
    return Math.pow(base, expoente);
};
module.exports.potencia = pot;
//Raíz quadrada
module.exports.raizq = function (x) {
    if (isNaN(x) || x === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para raizq(x).');
    return Math.sqrt(x);
};
/*CINEMÁTICA*/
//Velocidade média
module.exports.velocidadeMedia = function (s, t) {
    if (isNaN(s) || s === null || isNaN(t) || t === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para velocidadeMedia(d,t).');
    return s / t;
};
//Espaço percorrido
module.exports.deltaS = function (s0, s) {
    if (isNaN(s0) || s0 === null || isNaN(s) || s === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para deltas(e0,e1).');
    let ds = s - s0;
    return ds;
};
//Tempo Percorrido
module.exports.deltaT = function (t0, t) {
    if (isNaN(t0) || t0 === null || isNaN(t) || t === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para deltat(t0,t1).');
    let dt = t - t0;
    return dt;
};
// Cálculo de aceleração
module.exports.aceleracao = function (velocidadeFinal, velocidadeInicial, tempoFinal, tempoInicial) {
    if (velocidadeFinal === null || velocidadeInicial === null || tempoFinal === null || tempoInicial === null) {
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Devem ser fornecidos quatro parâmetros obrigatórios.');
    }
    if (typeof velocidadeFinal !== 'number' ||
        typeof velocidadeInicial !== 'number' ||
        typeof tempoFinal !== 'number' ||
        typeof tempoInicial !== 'number') {
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Todos os parâmetros devem ser do tipo número.');
    }
    return (velocidadeFinal - velocidadeInicial) / (tempoFinal - tempoInicial);
};
//Função Horária da Posição (M.R.U)
module.exports.mrufh = function (s0, v, t) {
    if (isNaN(s0) || s0 === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para mrufh(s0,v,t).');
    t = t + 1;
    const s = [];
    let index = 0;
    for (let i = 0; i < t; i++) {
        s[index] = s0 + v * i;
        index++;
    }
    return ['Função: ' + s0 + '+(' + v + ')*t' + '<br>' + 'Posições: ' + s];
};
//Gráfico da velocidade (M.R.U.V)
module.exports.mruv = function (s0, s, a) {
    if (isNaN(s0) || s0 === null || isNaN(s) || s === null || isNaN(a) || a === null)
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para mruv(Pi, Vf, A).');
    const vf = [];
    const x = [];
    let v = [];
    let index = 0;
    for (let i = 0; i < s; i++) {
        v = index;
        vf[index] = Math.sqrt(2 * a * (index - s0));
        x[index] = i;
        index++;
    }
    return vf;
};
/*Controle e Servomecanismos*/
module.exports.pid = function (Mo, t, K, T1, T2) {
    if (isNaN(Mo) ||
        Mo === null ||
        isNaN(t) ||
        t === null ||
        isNaN(K) ||
        K === null ||
        isNaN(T1) ||
        T1 === null ||
        isNaN(T2) ||
        T2 === null) {
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'Você deve prover valores para pid(Ov, Ts, K, T1, T2).');
    }
    let pi = Math.PI; //Pi da bilbioteca Math.js
    //Amortecimento Relativo
    let csi = (-1 * Math.log(Mo / 100)) / Math.sqrt(Math.pow(pi, 2) + pot(Math.log(Mo / 100), 2));
    //Frequência Natural
    let Wn = 4 / (t * csi);
    //Controlador Proporcional (P)
    let Kp = 20 * (Math.pow(csi, 2) * Math.pow(Wn, 2) * T1 * T2) + (Math.pow(Wn, 2) * T1 * T2 - 1) / K;
    //Controlador Integral (I)
    let Ki = (10 * csi * Math.pow(Wn, 3) * T1 * T2) / K;
    //Controlador Derivativo (D)
    let Kd = (12 * csi * Wn * T1 * T2 - T1 - T2) / K;
    return [csi, Wn, Kp, Ki, Kd];
};
// Retorna o comprimento de um vetor
module.exports.comp = function (array) {
    if (!Array.isArray(array)) {
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'O valor passado pra função deve ser um vetor.');
    }
    return array.length;
};
// Retorna o menor número inteiro dentre o valor de "value"
module.exports.minaprox = function (value) {
    if (typeof value !== 'number') {
        throw new excecoes_1.ErroEmTempoDeExecucao(this.token, 'O valor passado pra função deve ser um número.');
    }
    return Math.floor(value);
};
//# sourceMappingURL=matematica.js.map