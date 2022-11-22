
window.onload = function(){
    var oForm = $('.formulario_column');
    oForm.on('submit', onSubmitColumn);
    
    oForm.find('[name="column_type"]').on('change', function(oEv){
        var sValor = $(oEv.target).val();
        if (sValor == 'varchar'){
            oForm.find('[for="varchar_length"]').css('display', 'block');
            oForm.find('[name="varchar_length"]').css('display', 'block')
        }
        else{
            oForm.find('[for="varchar_length"]').css('display', 'none');
            oForm.find('[name="varchar_length"]').css('display', 'none')
        }
    });
}

function onSubmitColumn(oEv){
    var oDados = {};
    oDados.nome          = $(this).find('[name="column_name"]').val();
    oDados.tipo          = $(this).find('[name="column_type"]').val();
    oDados.primaryKey    = $(this).find('[name="column_primary_key"]').is(':checked');
    oDados.autoIncrement = $(this).find('[name="column_auto_increment"]').is(':checked');
    oDados.isNull        = $(this).find('[name="column_null"]').is(':checked');

    if (oDados.tipo == 'varchar'){
        oDados.tipo = oDados.tipo + '(' + $(this).find('[name="varchar_length"]').val() + ')';
    }

    var sTable = new URL(window.location.href).searchParams.get('tabela')

    fetch(`http://localhost:3000/api/column/${sTable}`, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(oDados)
    })
    .then((oRes) => {
        oRes.json()
        .then((oData) => {
            alert(`Coluna ${oDados.nome} adicionada com sucesso.`);
            console.log(oData);
            location.href = 'index.html';
        })
    })
    .catch((oRes) =>{
        console.log('Erro:');
        console.log(oRes);
    })

    oEv.preventDefault();
}