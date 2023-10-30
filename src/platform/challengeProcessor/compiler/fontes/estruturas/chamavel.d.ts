import { ArgumentoInterface } from '../interpretador/argumento-interface';
export declare class Chamavel {
    valorAridade: number;
    aridade(): number;
    chamar(interpretador?: any, argumentos?: ArgumentoInterface[], simbolo?: any): Promise<any>;
}
