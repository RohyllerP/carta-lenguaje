<?php
session_start();
$objetos = json_decode(file_get_contents('verbos.json'), true);
// Obtener los datos del formulario
if (isset($_POST['verb']) && isset($_POST['verbPast']) && isset($_POST['verbPastPerfect'])
    && isset($_POST['proVerb']) && isset($_POST['proVerbPast']) && isset($_POST['proVerbPastPerfect']) 
    && isset($_POST['translate'])) {
    $verb = $_POST['verb'];
    $verbPast = $_POST['verbPast'];
    $verbPastPerfect = $_POST['verbPastPerfect'];
    $proVerb = $_POST['proVerb'];
    $proVerbPast = $_POST['proVerbPast'];
    $proVerbPastPerfect = $_POST['proVerbPastPerfect'];
    $translate = $_POST['translate'];
    $id = empty($objetos) ? 1 : count($objetos) + 1;
    

    // Crear un array con los datos
    $datos = array(
        'id' => $id,
        'verb' => $verb,
        'proVerb' => $proVerb,
        'verbPast' => $verbPast,
        'proVerbPast' => $proVerbPast,
        'verbPastPerfect' => $verbPastPerfect,
        'proVerbPastPerfect' => $proVerbPastPerfect,
        'translate' => $translate
    );
    $objetos[] = $datos;
    // Convertir el array a formato JSON
    $json_datos = json_encode($objetos,JSON_UNESCAPED_SLASHES);
    // Guardar los datos en el archivo JSON externo
    file_put_contents('verbos.json', $json_datos);
    
    header("Location: verb.php");
    exit();
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verbos</title>
</head>
<body>
    <form method="POST">
        <div style="padding-top: 20px;padding-bottom: 20px;">
            <label style="padding-right: 60px;">Verbo normal:</label>
            <input type="text" id="verb" name="verb">
            <input type="text" name="proVerb" placeholder="pro verb">
        </div>
        <div style="padding-top: 20px;padding-bottom: 20px;">
            <label style="padding-right: 70px;">Verb pasado:</label>
            <input type="text" id="verbPast" name="verbPast">
            <input type="text" name="proVerbPast" placeholder="pro verb past">
        </div>
        <div style="padding-top: 20px;padding-bottom: 20px;">
            <label style="padding-right: 20px;">Verb pasado perfect:</label>
            <input type="text" id="verbPastPerfect" name="verbPastPerfect">
            <input type="text" name="proVerbPastPerfect" placeholder="pro verb past perfect">
        </div>
        <div style="padding-top: 20px; padding-bottom: 20px;">
            <label style="padding-right: 20px;">Translate:</label>
            <input type="text" id="translate" name="translate">
        </div>    
        <input type="submit" value="Enviar" style="width: 46%;">
    </form>
</body>
</html>