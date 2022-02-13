
function Enviar() {
    var arquivo = $('#arquivo').prop("files");

    var formData = new FormData;
    formData.append("arquivo", arquivo[0]);

    $.ajax({
        url: "Home/LerCSV",
        type: 'POST',
        data: formData,
        success: function (data) {
            console.log(data);
            exibeGrafico(JSON.parse(data.data));

        },
        cache: false,
        contentType: false,
        processData: false
    });
}

function exibeGrafico(data) {
    console.log(typeof (data));
    var datas_aux = [];//dados do tipo Date
    var datas = [];//dados do tipo string

    var data_displacement50ZI001 = [];
    var data_displacement50ZI002 = [];
    var data_displacement50ZI003 = [];

    var series_grafico = [];

    Object.keys(data).forEach(function (item) {
        var data_aux = (data[item].Data).split(' ')[0];//[data, hora]
        data_aux = data_aux.split('/');//[dia, mes, ano]
        var data_ = new Date(data_aux[2], data_aux[1] - 1, data_aux[0]);//Ano, mês, dia]

        if (datas.length >= 1 && !datas_aux.find(a_data => a_data.toISOString() == data_.toISOString())) {
            datas_aux.push(data_);
            datas.push((data[item].Data).split(' ')[0]);
        }

        if (datas.length == 0) {
            datas_aux.push(data_);
            datas.push((data[item].Data).split(' ')[0]);
        }

        data_displacement50ZI001.push(data[item]["50ZI001/COTA-DIF - Displacement (mm)"] != "" ? parseFloat((data[item]["50ZI001/COTA-DIF - Displacement (mm)"]).replace(',', '.')) : 0);
        data_displacement50ZI002.push(data[item]["50ZI002/COTA-DIF - Displacement (mm)"] != "" ? parseFloat((data[item]["50ZI002/COTA-DIF - Displacement (mm)"]).replace(',', '.')) : 0);
        data_displacement50ZI003.push(data[item]["50ZI003/COTA-DIF - Displacement (mm)"] != "" ? parseFloat((data[item]["50ZI003/COTA-DIF - Displacement (mm)"]).replace(',', '.')) : 0);
    });

    var myChart = echarts.init(document.getElementById('grafico'));

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
}
