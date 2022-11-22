window.onload = function() {

    $('.formulario_table').on('submit', onSubmitTable);
}

function onSubmitTable(oEv){
    $(this).hide();
    var sTableName = $(this).find('[name="table_name"]').val();

    fetch('http://localhost:3000/api/table', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({nome: sTableName})
    })
    .then((oRes) => {
        oRes.json()
        .then((oData) => {
            console.log(oData);
            location.href = 'index.html';
        })
    })
    .catch((oRes) => {
        console.log('Error');
    })
    
    oEv.preventDefault();
}