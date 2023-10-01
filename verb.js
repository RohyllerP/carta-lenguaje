const response = await fetch('./verbos.json');
const data = await response.json();

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // Mientras queden elementos a mezclar...
    while (0 !== currentIndex) {

        // Seleccionar un elemento sin mezclar...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // E intercambiarlo con el elemento actual
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
$(document).ready(function(){
    $('#numSpan').text(data.length);
    var miDiv = $('#listWords');

    for (var i = 0; i < data.length; i++) {
        var divProducto = $("<div>");
        divProducto.addClass("pb-2");

        var spanIndex = $("<span>")
        spanIndex.text(data[i].id + ")");
        spanIndex.addClass("pe-3")
        
        var spanNombre = $("<span>");
        spanNombre.addClass("pe-3");
        spanNombre.addClass("fw-bold");
        spanNombre.text(data[i].verb);

        var spanPrecio = $("<span>");
        spanPrecio.text(data[i].proVerb + ",");
        spanPrecio.addClass("pe-3");
      

        var spanPast = $("<span>");
        spanPast.text(data[i].verbPast);
        spanPast.addClass("pe-3");
        spanPast.addClass("fw-bold");

        var spanPastPro = $("<span>");
        spanPastPro.text(data[i].proVerbPast + ",");
        spanPastPro.addClass("pe-3");

        var spanPastPerfect = $("<span>");
        spanPastPerfect.text(data[i].verbPastPerfect);
        spanPastPerfect.addClass("pe-3");
        spanPastPerfect.addClass("fw-bold");

        var spanPastPerfectPro = $("<span>");
        spanPastPerfectPro.text(data[i].proVerbPastPerfect + ",");
        spanPastPerfectPro.addClass("pe-3");

        var spanTranslate = $("<span>");
        spanTranslate.text(data[i].translate);
        spanTranslate.addClass("pe-3");

        divProducto.append(spanIndex, spanNombre, spanPrecio,spanPast,spanPastPro,spanPastPerfect,spanPastPerfectPro, spanTranslate);
        miDiv.append(divProducto);
    }
    var auxNum = 0;
    let dataMap;
    const changeText = () => {
        $('#verb').text(dataMap[auxNum].verb);
        $('#proVerb').text("- " + dataMap[auxNum].proVerb);
        $('#verbPast').text(dataMap[auxNum].verbPast);
        $('#proVerbPast').text("- " + dataMap[auxNum].proVerbPast);
        $('#verbPastPerfect').text(dataMap[auxNum].verbPastPerfect);
        $('#proVerbPastPerfect').text("- " + dataMap[auxNum].proVerbPastPerfect);
    }
    $('#modal').click(function () {
        $('#listWords').empty();
        let h = data.slice(-$('#num').val())
        dataMap = shuffle(h);
        auxNum = 0;
        $('#translate').text(dataMap[auxNum].translate);
        $('#showWord').click(function () {
            $('#verb').text(dataMap[auxNum].verb);
            $('#proVerb').text("- " + dataMap[auxNum].proVerb);
            $('#verbPast').text(dataMap[auxNum].verbPast);
            $('#proVerbPast').text("- " + dataMap[auxNum].proVerbPast);
            $('#verbPastPerfect').text(dataMap[auxNum].verbPastPerfect);
            $('#proVerbPastPerfect').text("- " + dataMap[auxNum].proVerbPastPerfect);
        })
        $('#continueBtn').click(function () {
            auxNum++;
            if (auxNum < dataMap.length) {
                $('#translate').text(dataMap[auxNum].translate);
                $('#verb').text("");
                $('#proVerb').text("");
                $('#verbPast').text("");
                $('#proVerbPast').text("");
                $('#verbPastPerfect').text("");
                $('#proVerbPastPerfect').text("");
            } else {
                auxNum = 0;
                $('#closeBtn').click();
                location.reload();
            }
        });

    });
    $('#todosVerbos').click(function () {
        $('#modal').click();
    })
    $('#staticBackdrop').keydown(function (event) {
        if (event.keyCode == 27) {
            $('#closeBtn').click();
            location.reload();
        }
        if (event.keyCode == 13) {
            $('#continueBtn').click();
        }
        if (event.keyCode == 69) {
            changeText();
        }
    })
    $('#submit').click(function (event) {
        event.preventDefault();
        $('#modal').click();
    });
})