
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
    console.log(data);
    var myChart = echarts.init(document.getElementById('teste'));

    var option = {
        title: {
            text: 'ECharts Getting Started Example'
        },
        tooltip: {},
        legend: {
            data: ['sales']
        },
        xAxis: {
            data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
        },
        yAxis: {},
        series: [
            {
                name: 'sales',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    };

    myChart.setOption(option);
}
