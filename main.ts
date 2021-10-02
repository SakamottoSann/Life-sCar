import { exit } from 'process';
import prompt from 'prompt-sync'

const menu = require('console-menu');

let entrada = prompt();

class Veiculos {
    constructor(
        public placa: string,
        public marca: string,
        public modelo: string,
        public valor: number,
    ) { }
}

type newCarsTypes = {
    placa: string,
    marca: string,
    modelo: string,
    valor: number,
}

let carrosNovos: Array<newCarsTypes> = []

const mainMenu = () => {
    console.clear()
    menu([
        { hotkey: 1, title: 'Listagem De Veiculos', selected: true },
        { hotkey: 2, title: 'Cadastro De Veiculos' },
        { hotkey: 3, title: 'Numero de Veiculos Cadastrados' },
        { hotkey: 4, title: 'REMOVER TODOS VEICULOS' },
        { separator: true },
        { hotkey: '*', title: 'Sair' },
    ], {
        header: "Lif's Cars",
        border: true,

    }).then((item: any) => {
        option(item.hotkey)
    });
}

mainMenu()

function option(dado: any) {

    if (dado == 1) {
        if (carrosNovos.length) {
            console.table(carrosNovos)

            menu([
                { hotkey: '*', title: 'Voltar', select: true },
            ], {
                border: true,

            }).then((item: any) => {
                if (item) {
                    console.clear()
                    mainMenu()
                }
            });

        } else {
            console.log('Sem Carros Cadastrados')
            setTimeout(mainMenu, 2500)
        }
    }

    if (dado == 2) {
        function cad01() {
            console.clear()

            console.log("Cadastrar novo veiculo: ")

            var placa = entrada("Placa: ")
            var marca = entrada("Marca: ")
            var modelo = entrada("Modelo: ")
            var valor = Number(entrada("Valor: "))
            console.clear()

            carrosNovos.push(new Veiculos(placa, marca, modelo, valor));

            console.log('Cadastrando Veiculo...')
            console.table(carrosNovos);
            setTimeout(cadastrado, 1000)

        }
        cad01();

        function cadastrado() {
            console.clear()
            console.table(carrosNovos);
            menu([
                { hotkey: 1, title: 'Cadastrar Novo Veiculo', selected: true },
                { separator: true },
                { hotkey: '*', title: 'Voltar' },
            ], {
                header: "Cadastro De Veiculo",
                border: true,

            }).then((item: any) => {
                if (item.hotkey == 1) {
                    // console.clear
                    cad01();
                } else{
                    mainMenu();
                }
            });
        }

        
    }



    if (dado == 3) {
        if (carrosNovos.length) {
            console.log(carrosNovos.length)

            menu([
                { hotkey: '*', title: 'Voltar', select: true },
            ], {
                border: true,

            }).then((item: any) => {
                if (item) {
                    console.clear()
                    mainMenu()
                }
            });
        } else {
            console.log('0 Veiculos cadastrados')
            setTimeout(mainMenu, 2500)
        }
    }

    if (dado == 4) {
        carrosNovos.splice(0, 3)
        console.log('Excluindo veiculos...')
        setTimeout(time, 500)
        function time() {
            console.clear()
            console.log('Veiculos excluidos!')
            setTimeout(mainMenu, 2500)
        }
    }

    if (dado == '*') {
        console.clear(),
            () => { exit };
    }

}

