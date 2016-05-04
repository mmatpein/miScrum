<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace miScrum\modelo;

require "../vendor/autoload.php";

use miScrum\modelo\MySQLConector;
use miScrum\config\BDConfig;
/**
 * Description of historiasMySQL
 *
 * @author mauri
 */
class BacklogMySQL {
    public function leer(){
        $config = new BDConfig();
        $mySQLCon = new MySQLConector($config);
        $mySQLCon->conectar();
        $mySQLCon->sql("SELECT * FROM Backlog");
        $resultado = array();
        while ($mySQLCon->hasNext()){
            array_push($resultado,$mySQLCon->next());
        }
        return $resultado;
    }
}
