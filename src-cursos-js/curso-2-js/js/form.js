var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

    var paciente = obtemPacienteDoFormulario(form);
    var erros = validaPaciente(paciente);
    console.log(paciente);

/*     if (!validaPaciente(paciente)) {
        alert("Paciente invalido, impossivel inserir ele no registro");
        return;
    }
 */    //AJEITAR A VALIDAÇÃO
  
    
    console.log(erros);

    if (erros === undefined) {
       console.log("não possui erros!");
    } else {
        if (erros.length > 0){
            
            exibeMensagemDeErro(erros);
            return;
        }
    }
    adicionaPacienteNaTabela(paciente);

    form.reset();

});

function adicionaPacienteNaTabela(paciente){
    var pacienteTr = montarTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
    
}

var mensagensErro = document.querySelector("#mensagens-erro");
mensagensErro.innerHTML = "";


function obtemPacienteDoFormulario(form) {
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaIMC(form.peso.value, form.altura.value)


    }
    return paciente;
}

function montarTr(paciente) {

    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;
    return td;
}

function validaPaciente(paciente) {
     var erros = [];
    
    if (!validaPeso(paciente.peso)) {
        erros.push("Peso invalido!");

    if (!validaAltura(paciente.altura)) {
        erros.push("Altura é inválida");
    }

    if (paciente.nome.length == 0){
        erros.push("o nome não pode ser em branco");
    }

    if (paciente.gordura.length == 0){
        erros.push("A gordura do meu paciente não pode ser em branco");
    }
    
    if (paciente.altura.length == 0){
        erros.push("A altura não pode ser em branco");
    }

    return erros;
}


}

function exibeMensagemDeErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
       
}