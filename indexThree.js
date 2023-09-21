const response = await fetch('./practic.json');
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
$(document).ready(function () {
    var miDiv = $('#listWords');

    for (var i = 0; i < data.length; i++) {
        var divProducto = $("<div>");
        divProducto.addClass("pb-2");

        var spanIndex = $("<span>")
        spanIndex.text(data[i].id + ")");
        spanIndex.addClass("pe-3")
        
        var spanNombre = $("<span>");
        spanNombre.addClass("pe-3");
        spanNombre.text(data[i].title);

        var spanPrecio = $("<span>");
        spanPrecio.text(data[i].pronunciation);
        spanPrecio.addClass("pe-3");

        var spanDefini = $("<span>");
        spanDefini.text(data[i].translate);

        divProducto.append(spanIndex, spanNombre, spanPrecio,spanDefini);
        miDiv.append(divProducto);
    }
    var audio = $('#myAudio')[0];
    var auxNum = 0;
    let dataMap;
    $('#sonido').click(function () {
        changeAudio();
    })
    const changeText = () => {
        $('#pronuciation').text(dataMap[auxNum].pronunciation);
        $('#translate').text(dataMap[auxNum].translate);
    }
    const changeAudio = () => {
        audio.load();
        audio.oncanplaythrough = function () {
            audio.play();
        }
    }
    $('#modal').click(function () {
        let h = data.slice(-$('#num').val())
        dataMap = shuffle(h);
        auxNum = 0;
        $('#word').text(dataMap[auxNum].title);
        $('#playSound').click(function () {
            audio.src = `${dataMap[auxNum].url}`;
            changeAudio();
        });
        $('#playSound').click();
        $('#sonido').click(function () {
            changeAudio();
        });
        $('#showWord').click(function () {
            $('#pronuciation').text(dataMap[auxNum].pronunciation);
            $('#translate').text(dataMap[auxNum].translate);
        })
        $('#continueBtn').click(function () {
            auxNum++;
            if (auxNum < dataMap.length) {
                $('#word').text(dataMap[auxNum].title);
                $('#pronuciation').text("");
                $('#translate').text("");
                $('#playSound').click();
            } else {
                auxNum = 0;
                $('#closeBtn').click();
                location.reload();
            }
        });

    });
    $('#todosWordsTwo').click(function () {
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
        if (event.keyCode == 82) {
            changeAudio();
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