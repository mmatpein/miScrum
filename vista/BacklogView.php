<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace miScrum\vista;

/**
 * Description of BacklogView
 *
 * @author mauri
 */
class BacklogView {
    
    protected $tipoRequest;
    protected $datosADevolver;
    protected $operacionRealizada;
    
    public function __construct($tipoRequest,$operacionRealizada,$datosADevolver){
        $this->tipoRequest = $tipoRequest;
        $this->datosADevolver = $datosADevolver;
        $this->operacionRealizada = $operacionRealizada;
    }
    
    public function mostrar(){
        if (strcmp($this->tipoRequest,"GET")==0){
            require __DIR__.'/plantilla_backlog.html';
        } else {
            echo json_encode($this->prepararDatos());
        }
    }
    
    public function prepararDatos(){
        if (strcmp($this->operacionRealizada,"seleccionarTodo")==0){
            $datosADevolverModificados = array();
            for ($i = 0; $i<count($this->datosADevolver);$i++){
                $idHistoria = $this->datosADevolver[$i]["id"];
                $datosADevolverModificados[$idHistoria] = $this->datosADevolver[$i];
            }
            return $datosADevolverModificados;
        } else {
            return $this->datosADevolver; // No es necesario. Solo se devuelve con propósito de testeo.
        }
        
    } 
}
