'use strict';


const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').valeu = '';
    document.getElementById('cidade').valeu = '';
    document.getElementById('estado').valeu = '';

}


const preencherFormulario = (endereco) => {

    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').valeu = endereco.bairro;
    document.getElementById('cidade').valeu = endereco.localidade;
    document.getElementById('estado').valeu = endereco.UF;

}

const eNumero = (numero) => /^[0-9]+$/.test(cep);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    const dados = await fetch(url);
    const endereco = await dados.json();
    //console.log(endereco);
    if (cepValido(cep)) {
        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP NÃO ENCONTRADO';
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('endereco').value = 'CEP INVALIDO';
    }
}



document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep);