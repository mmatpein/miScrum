<?php

require __DIR__."/vendor/autoload.php";

use miScrum\controlador\ControladorBacklog;

if (isset($_GET)){
   
    if (isset($_GET['sprint'])){
        // ...
    } else {
        $controladorBacklog = new ControladorBacklog("GET",\NULL,\NULL);
        $controladorBacklog->ejecutar();
    }
} else {
    echo "POST";
  /*  $consulta = file_get_contents('php://input');
    $consulta = json_decode( $consulta, true );
    $operacion = $consulta['op'];
    $datos = $consulta['datos'];
    $tipo = $consulta['tipo'];
    if (strcmp($tipo,"historia") == 0){
        $controladorBacklog = new ControladorBacklog("POST", $operacion, $datos);
        $controladorBacklog->ejecutar();   
    }*/
}