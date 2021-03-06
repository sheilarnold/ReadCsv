
function Enviar() {

    $("#resumo").addClass('d-none');//oculta tabela de apresentação de valores máximos e mínimos

    var arquivo = $('#arquivo').prop("files");

    if (arquivo[0].type == "application/vnd.ms-excel") {
        var formData = new FormData;
        formData.append("arquivo", arquivo[0]);

        $.ajax({
            url: "Home/LerCSV",
            type: 'POST',
            data: formData,
            success: function (data) {
                if (data.success)
                    exibeGrafico(JSON.parse(data.data));
                else
                    alert('Erro: ' + data.message);
            },
            error: function (event) {
                alert("Status : " + event.status + " Status Text : " + event.statusText);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    } else {
        alert("Formato de aquivo inválido. Favor selecionar apenas arquivos .csv");
    }

}

function exibeGrafico(data) {   
    var datas = [];
    var data_displacement50ZI001 = [];
    var data_displacement50ZI002 = [];
    var data_displacement50ZI003 = [];

    var series_grafico = [];

    var max_displacement50ZI001 = -1000;
    var max_displacement50ZI002 = -1000;
    var max_displacement50ZI003 = -1000;
    var min_displacement50ZI001 = 100000;
    var min_displacement50ZI002 = 100000;
    var min_displacement50ZI003 = 100000;

    Object.keys(data).forEach(function (item) {
        datas.push(data[item].Data);
        data_displacement50ZI001.push(data[item]["50ZI001/COTA-DIF - Displacement (mm)"] != "" ? parseFloat((data[item]["50ZI001/COTA-DIF - Displacement (mm)"]).replace(',', '.')) : 0);
        data_displacement50ZI002.push(data[item]["50ZI002/COTA-DIF - Displacement (mm)"] != "" ? parseFloat((data[item]["50ZI002/COTA-DIF - Displacement (mm)"]).replace(',', '.')) : 0);
        data_displacement50ZI003.push(data[item]["50ZI003/COTA-DIF - Displacement (mm)"] != "" ? parseFloat((data[item]["50ZI003/COTA-DIF - Displacement (mm)"]).replace(',', '.')) : 0);

        max_displacement50ZI001 = data[item]["50ZI001/COTA-DIF - Displacement (mm)"] != "" ? parseFloat((data[item]["50ZI001/COTA-DIF - Displacement (mm)"]).replace(',', '.')) > max_displacement50ZI001 ? parseFloat((data[item]["50ZI001/COTA-DIF - Displacement (mm)"]).replace(',', '.')) : max_displacement50ZI001 : 0 > max_displacement50ZI001 ? 0 : max_displacement50ZI001 ;
        max_displacement50ZI002 = data[item]["50ZI002/COTA-DIF - Displacement (mm)"] != "" ? parseFloat((data[item]["50ZI002/COTA-DIF - Displacement (mm)"]).replace(',', '.')) > max_displacement50ZI002 ? parseFloat((data[item]["50ZI002/COTA-DIF - Displacement (mm)"]).replace(',', '.')) : max_displacement50ZI002 : 0 > max_displacement50ZI001 ? 0 : max_displacement50ZI002;
        max_displacement50ZI003 = data[item]["50ZI003/COTA-DIF - Displacement (mm)"] != "" ? parseFloat((data[item]["50ZI003/COTA-DIF - Displacement (mm)"]).replace(',', '.')) > max_displacement50ZI003 ? parseFloat((data[item]["50ZI003/COTA-DIF - Displacement (mm)"]).replace(',', '.')) : max_displacement50ZI003 : 0 > max_displacement50ZI003 ? 0 : max_displacement50ZI003;

        min_displacement50ZI001 = data[item]["50ZI001/COTA-DIF - Displacement (mm)"] != "" ? parseFloat((data[item]["50ZI001/COTA-DIF - Displacement (mm)"]).replace(',', '.')) < min_displacement50ZI001 ? parseFloat((data[item]["50ZI001/COTA-DIF - Displacement (mm)"]).replace(',', '.')) : min_displacement50ZI001 : 0 < min_displacement50ZI001 ? 0 : min_displacement50ZI001;
        min_displacement50ZI002 = data[item]["50ZI002/COTA-DIF - Displacement (mm)"] != "" ? parseFloat((data[item]["50ZI002/COTA-DIF - Displacement (mm)"]).replace(',', '.')) < min_displacement50ZI002 ? parseFloat((data[item]["50ZI002/COTA-DIF - Displacement (mm)"]).replace(',', '.')) : min_displacement50ZI002 : 0 < min_displacement50ZI002 ? 0 : min_displacement50ZI002;
        min_displacement50ZI003 = data[item]["50ZI003/COTA-DIF - Displacement (mm)"] != "" ? parseFloat((data[item]["50ZI003/COTA-DIF - Displacement (mm)"]).replace(',', '.')) < min_displacement50ZI003 ? parseFloat((data[item]["50ZI003/COTA-DIF - Displacement (mm)"]).replace(',', '.')) : min_displacement50ZI003 : 0 < min_displacement50ZI003 ? 0 : min_displacement50ZI003;
    });

    //Verifica se o gráfico já foi "montado"
    if (echarts.getInstanceByDom(document.getElementById('grafico')) == undefined)//se não, ele é "montado"
        var myChart = echarts.init(document.getElementById('grafico'));
    else
        var myChart = echarts.getInstanceByDom(document.getElementById('grafico'));//se sim, ele é atualizado

    series_grafico.push({
        name: '50ZI001/COTA-DIF - Displacement (mm)',
        type: 'line',
        showSymbol: false,
        data: data_displacement50ZI001
    });

    series_grafico.push({
        name: '50ZI002/COTA-DIF - Displacement (mm)',
        type: 'line',
        showSymbol: false,
        data: data_displacement50ZI002
    });

    series_grafico.push({
        name: '50ZI003/COTA-DIF - Displacement (mm)',
        type: 'line',
        showSymbol: false,
        data: data_displacement50ZI003
    });

    var option = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: datas
        },
        yAxis: {
            type: 'value',
        },
        series: series_grafico
    };

    myChart.setOption(option);

    $("#resumo").removeClass('d-none');//exibe tabela de apresentação de valores máximos e mínimos
    document.getElementById("cota1max").innerHTML = max_displacement50ZI001;
    document.getElementById("cota2max").innerHTML = max_displacement50ZI002;
    document.getElementById("cota3max").innerHTML = max_displacement50ZI003;
    document.getElementById("cota1min").innerHTML = min_displacement50ZI001;
    document.getElementById("cota2min").innerHTML = min_displacement50ZI002;
    document.getElementById("cota3min").innerHTML = min_displacement50ZI003;

}
