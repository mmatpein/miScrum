<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace miScrum\modelo;

//require '../vendor/autoload.php';

/**
 * Description of HistoriaMySQL
 *
 * @author mauri
 */
use miScrum\modelo\Historia;
use miScrum\modelo\MySQLConector;
use miScrum\config\BDConfig;

class HistoriaMySQL extends Historia{
    
    protected $informeError;
    protected $mySQLCon;
    
    public function __construct($id,$nombre,$descripcion,$valor){
        $this->id = $id;
        $this->nombre = $nombre;
        $this->descripcion = $descripcion;
        $this->valor = $valor;
    }
    
    protected function consulta($sql){
     try{
            $configBD = new BDConfig();
            $this->mySQLCon = new MySQLConector($configBD);
            $this->mySQLCon->conectar();
            $result = $this->mySQLCon->sql($sql);
            if (preg_match("/^SELECT.*/",$sql) == 1){
                $result = $this->mySQLCon->next();
            }
            $this->mySQLCon->cerrar();
            return $result;
        } catch (\Exception $e){
            $this->informeError = $e->getMessage();
            return false;
        }
    }
    
    public function insertar(){
        $sql = "INSERT INTO Backlog (id,nombre,descripcion,valor) VALUES ('".$this->id."','".$this->nombre."','".$this->descripcion."','".$this->valor."');";
        if ($this->consulta($sql)){
            return array("id" => $this->id,
                         "nombre" => $this->nombre,
                         "descripcion" => $this->descripcion,
                         "valor" => $this->valor);
        } else {
            return array("error" => $this->informeError,
                         "id" => $this->id);
        }
    }
    
    public function borrar(){
        $sql = "DELETE FROM Backlog WHERE id='".$this->id."';";
        if ($this->consulta($sql)){
            return array("id" => $this->id);
        } else {
            return array("error" => $this->informeError,
                         "id" => $this->id);
        }
    }
    
    public function actualizar(){
        $sql = "UPDATE Backlog SET nombre='".$this->nombre."',descripcion='".$this->descripcion."',valor='".$this->valor."' WHERE id='".$this->id."';";
        if ($this->consulta($sql)){
            return array("id" => $this->id,
                         "nombre" => $this->nombre,
                         "descripcion" => $this->descripcion,
                         "valor" => $this->valor);
        } else {
            return array("error" => $this->informeError,
                         "id" => $this->id);
        }
    }
    
    public function leer(){
        $sql = "SELECT * FROM Backlog WHERE id='".$this->id."';";
        return $this->consulta($sql);
    }
    
}
