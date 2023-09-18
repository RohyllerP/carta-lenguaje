const response = await fetch('./practic.json');
const data = await response.json();
$(document).ready(function () {
    var audio = $('#myAudioTwo')[0];
    var auxNum = 0;
    let dataMap;
    $('#sonidoTwo').click(function () {
        changeAudio();
    })
    const changeText = () => {
        $('#pronuciationTwo').text(dataMap[auxNum].pronunciation);
        $('#translateTwo').text(dataMap[auxNum].translate);
    }
    const changeAudio = () => {
        audio.load();
        audio.oncanplaythrough = function () {
            audio.play();
        }
    }
    $('#modalTwo').click(function () {
        dataMap = data.slice(-$('#numTwo').val());
        auxNum = 0;
        $('#wordTwo').text(dataMap[auxNum].title);
        $('#playSoundTwo').click(function () {
            audio.src = `${dataMap[auxNum].url}`;
            changeAudio();
        });
        $('#playSoundTwo').click();
        $('#sonidoTwo').click(function () {
            changeAudio();
        });
        $('#showWordTwo').click(function () {
            $('#pronuciationTwo').text(dataMap[auxNum].pronunciation);
            $('#translateTwo').text(dataMap[auxNum].translate);
        })
        $('#continueBtnTwo').click(function () {
            auxNum++;
            if (auxNum < dataMap.length) {
                $('#wordTwo').text(dataMap[auxNum].title);
                $('#pronuciationTwo').text("");
                $('#translateTwo').text("");
                $('#playSoundTwo').click();
            } else {
                auxNum = 0;
                $('#closeBtnTwo').click();
                location.reload();
            }
        });

    });

    $('#staticBackdropTwo').keydown(function (event) {
        if (event.keyCode == 27) {
            $('#closeBtnTwo').click();
            location.reload();
        }
        if (event.keyCode == 13) {
            $('#continueBtnTwo').click();
        }
        if (event.keyCode == 82) {
            changeAudio();
        }
        if (event.keyCode == 69) {
            changeText();
        }
    })
    $('#submitTwo').click(function (event) {
        event.preventDefault();
        $('#modalTwo').click();
    });
})