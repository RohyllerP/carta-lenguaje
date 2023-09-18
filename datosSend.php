<?php
session_start();
$objetos = json_decode(file_get_contents('practic.json'), true);
// Obtener los datos del formulario
if (isset($_POST['title']) && isset($_POST['pronunciation']) && isset($_POST['translate'])) {
    $title = $_POST['title'];
    $pronunciation = $_POST['pronunciation'];
    $translate = $_POST['translate'];
    $id = count($objetos) + 1;
    $url = "public/audios/$title.mp3";

    // Crear un array con los datos
    $datos = array(
        'id' => $id,
        'title' => $title,
        'pronunciation' => $pronunciation,
        'url' => $url,
        'translate' => $translate
    );
    $objetos[] = $datos;
    // Convertir el array a formato JSON
    $json_datos = json_encode($objetos,JSON_UNESCAPED_SLASHES);
    // Guardar los datos en el archivo JSON externo
    file_put_contents('practic.json', $json_datos);
    
    header("Location: datosSend.php");
    exit();
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DatosSend</title>
</head>
<body>
    <form method="POST">
        <label for="nombre">title:</label>
        <input type="text" id="title" name="title">
        <label for="email">pronuntiation:</label>
        <input type="text" id="pronunciation" name="pronunciation">
        <label for="translate">translate:</label>
        <input type="text" id="translate" name="translate">
        <input type="submit" value="Enviar">
    </form>
</body>
</html>