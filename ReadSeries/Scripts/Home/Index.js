$(document).ready(function () {
    console.log("Machu Picchu")

    $("#btnLer").click(function () {
        console.log("aqui")
        var formData = new FormData(this);

        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: formData,
            success: function (data) {
                alert("sucesso")
                alert(data)
            },
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () { // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                    myXhr.upload.addEventListener('progress', function () {
                        /* faz alguma coisa durante o progresso do upload */
                    }, false);
                }
                return myXhr;
            }
        });
    });
});
