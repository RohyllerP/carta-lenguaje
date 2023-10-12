const response = await fetch('./phrasal.json');
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

        var ind = $("<span>");
        ind.addClass("pe-3");
        ind.text(data[i].id + ")");


        var spanTitle = $("<span>");
        spanTitle.addClass("pe-3");
        spanTitle.text(data[i].title);
        
        var spanPronu = $("<span>");
        spanPronu.addClass("pe-3");
     
        spanPronu.text("  " + data[i].pronunciation);

        var spanTranslate = $("<span>");
        spanTranslate.text("  " + data[i].translate);
        spanTranslate.addClass("pe-3");
    
        divProducto.append(ind,spanTitle,spanPronu,spanTranslate);
        miDiv.append(divProducto);
    }
    var auxNum = 0;
    let dataMap;
    const changeText = () => {
        $('#title').text(dataMap[auxNum].title);
        $('#pronunciation').text(dataMap[auxNum].pronuciation);
        $('#translate').text(dataMap[auxNum].translate);	
    }
    $('#modal').click(function () {
        $('#listWords').empty();
        let h = data.slice(-$('#num').val())
        dataMap = shuffle(h);
        auxNum = 0;
        $('#word').text(dataMap[auxNum].title);
        $('#showWord').click(function () {
            $('#word').text(dataMap[auxNum].title);
            $('#pronunciation').text(dataMap[auxNum].pronunciation);
            $('#translate').text(dataMap[auxNum].translate);	
        })
        $('#continueBtn').click(function () {
            auxNum++;
            if (auxNum < dataMap.length) {
                $('#word').text(dataMap[auxNum].title);
                $('#pronunciation').text("");
                $('#translate').text("");
            } else {
                auxNum = 0;
                $('#closeBtn').click();
                location.reload();
            }
        });

    });
    $('#todosWords').click(function () {
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