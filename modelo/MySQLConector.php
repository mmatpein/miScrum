<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace miScrum\modelo;

/**
 * Description of MySQLConector
 *
 * @author mauri
 */

require '../vendor/autoload.php';

use miScrum\config\BDConfig;

class MySQLConector {
    protected $sesion;
    protected $config;
    protected $resultadoConsulta;
    protected $indiceCursor;
    
    function __construct($config){
        $this->config = $config;
    }

    public function conectar(){
        $this->sesion = new \mysqli($this->config->getServidor(), 
                                    $this->config->getUsuario(), 
                                    $this->config->getPassword(), 
                                    $this->config->getNombreBD());
        if ($this->sesion->connect_error){
            throw new \Exception("Error de conexión a la base de datos");
        }
    }
    
    public function getEstadoConectado(){
        if ($this->sesion != \NULL){
            return $this->sesion->ping();
        } else {
            return false;
        }
    }
    
    public function sql($sentenciaSQL){
        if (($this->sesion) && ($this->sesion->ping())){
            $this->resultadoConsulta = $this->sesion->query($sentenciaSQL);
            $this->indiceCursor = 0;
            if (gettype($this->resultadoConsulta) == "boolean"){
                return $this->resultadoConsulta;
            } else {
                return ($this->resultadoConsulta->num_rows > 0);
            }
        } else {
            throw new \Exception("No hay conexión a la base de datos");
        }
    }
    
    public function next(){
        if ($this->resultadoConsulta){
            $this->indiceCursor++;
            return $this->resultadoConsulta->fetch_assoc();
        } else {
            return \NULL;
        }
    }
    
    public function hasNext(){
        return (($this->resultadoConsulta->num_rows - $this->indiceCursor) > 0);
    }
    
    public function getEstado(){
        return $this->sesion->ping();
    }
    
    public function cerrar(){
        if (($this->sesion != \NULL) && ($this->sesion->ping())){
            $cierre = $this->sesion->close();
        }
    }
}
