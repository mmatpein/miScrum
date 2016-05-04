<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DBConfig
 *
 * @author mauri
 */
namespace miScrum\config;

class BDConfig {
    protected $usuario;
    protected $password;
    protected $servidor;
    protected $nombreBD;
    
    function __construct() {
        //Valores por defecto
        $this->usuario = "scrum";
        $this->password = "Perro20";
        $this->servidor = "localhost";
        $this->nombreBD = "Scrum";
    }

    
    function getUsuario() {
        return $this->usuario;
    }

    function getPassword() {
        return $this->password;
    }

    function getServidor() {
        return $this->servidor;
    }

    function getNombreBD() {
        return $this->nombreBD;
    }

    function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    function setPassword($password) {
        $this->password = $password;
    }

    function setServidor($servidor) {
        $this->servidor = $servidor;
    }

    function setNombreBD($nombreBD) {
        $this->nombreBD = $nombreBD;
    }


}
