window.onload = function() {

    try {
        iniciaPagina();
    } catch (error) {
        console.log(error);
    }

    $('.formulario_sgbd').on('submit', onSubmitDatabase);
    $('.new_column').on('click', onClickNewColumn);
}

async function iniciaPagina (){
    var oDados = await (await fetch('http://localhost:3000/api/table', {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    })).json();
    console.log(oDados);
    if (oDados.tabelas.length){
        $('.formulario_sgbd').css('display', 'none');
        reloadTabelas();
    }
}

function onSubmitDatabase(oEv){
    var oDados = {};
    oDados.nome     = $(this).find('[name="db_name"]').val();
    oDados.porta    = $(this).find('[name="port"]').val();
    oDados.usuario  = $(this).find('[name="user"]').val();
    oDados.senha    = $(this).find('[name="user_password"]').val();
    oDados.tipoSgbd = $(this).find('[name="type"]').val();

    fetch('http://localhost:3000/api/database', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(oDados)
    })
    .then((oRes) => {
        oRes.json()
        .then((oData) => {
            console.log(oData);
            reloadTabelas();
            $(this).hide();
        })
    })
    .catch((oRes) => {
        console.log(oRes);
    });

    oEv.preventDefault();
}

function reloadTabelas(){
    fetch('http://localhost:3000/api/table', {
        method: 'GET'
    })
    .then((oRes) => {
        oRes.json()
        .then((oData) => {
            console.log(oData)
            criaCamposTabelas(oData);
        })
    })
    .catch((oRes) => {
        console.log('Erro');
    })
}

function criaCamposTabelas(oData){

    var oContainer = $('<div>').addClass('container_tabelas_geral');
    oContainer.css('margin-left', '1rem');

    var oText = $('<h2>').html(oData.database).appendTo(oContainer);
    var oDivTabelas = $('<div>').addClass('container_tabelas');
    oDivTabelas.css('margin', '1rem');
    oData['tabelas'].forEach(function(oTable){
        var oDiv = $('<div>');
        oDiv.css({
            'display': 'flex',
            'width': '20%'
        })
        oDiv.append($('<span>').css('flex', '1 0 0').html(oTable.nome));
        var oBtn = ($("<a href='coluna.html?tabela=" + oTable.nome + "'>").html('Nova coluna'));
        oBtn.addClass('text-decoration-none');
        oBtn.on('click', () => {
            
        })
        oBtn.appendTo(oDiv);
        oDiv.appendTo(oDivTabelas);
    });

    var oBtnGerarJson = $('<button class="btn btn-primary btn-sm">').html('Salvar em JSON');
    var oBtnCriarTable = $('<button class="btn btn-dark btn-sm">').html('Nova tabela')
    oBtnGerarJson.on('click', salvaJson);
    oBtnCriarTable.on('click', () => {
        location.href= 'tabela.html';
    })
    oContainer.append(oBtnGerarJson, oBtnCriarTable);

    oContainer.prependTo($(document.body))
    oContainer.after(oDivTabelas);

}

function onClickNewColumn(oEv){
    var oDivColumn = $('.container_columns');
    
    var oColumn = {};
    oDivColumn.find('input').each(function(){
        oColumn[$(this).attr('name')] = $(this).val();
        $(this).val(''); 
    });
    console.log(oColumn);
    oEv.preventDefault();
}

function salvaJson(oEv){
    oEv.preventDefault();
    fetch('http://localhost:3000/api/salvarJson', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    })
    .then((oRes) => {
        oRes.json().then((sContent) => console.log(sContent));  
        alert('Salvado!');
    })
    .catch((oRes) => {
        console.log(oRes);
    });
}
