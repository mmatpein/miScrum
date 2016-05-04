<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControladorBacklog
 *
 * @author mauri
 */
namespace miScrum\controlador;

//require __DIR__."../vendor/autoload.php";

use miScrum\modelo\HistoriaMySQL;
use miScrum\modelo\BacklogMySQL;
use miScrum\vista\BacklogView;

class ControladorBacklog {
    protected $modeloMySQL;
    protected $operacion;
    protected $tipoRequest;
    public function __construct($tipoRequest,$operacion,$datosEntrada){
        $this->tipoRequest = $tipoRequest;
        if (strcmp($tipoRequest,"POST")==0){
			$this->operacion = $operacion;
			$this->datosEntrada = $datosEntrada;
            $this->modeloMySQL = $this->getModeloMySQL($operacion);
		}
    }
    
    public function ejecutar(){
        if (strcmp($this->tipoRequest,"GET")==0){
            $backlogView = new BacklogView($this->tipoRequest,\NULL,\NULL);
			}
        else {
			$datosADevolver = $this->ejecutarConsulta();
            $backlogView = new BacklogView($this->tipoRequest,$this->operacion,$datosADevolver);
        }
		$backlogView->mostrar();
    }
        
    protected function ejecutarConsulta(){
		if ($this->operacion == "insertar"){
            $resultado = $this->modeloMySQL->insertar();
        } else if ($this->operacion == "actualizar"){
            $resultado = $this->modeloMySQL->actualizar();
        } else if ($this->operacion == "borrar"){
            $resultado = $this->modeloMySQL->borrar();
        } else if ($this->operacion == "leer"){
            $resultado = $this->modeloMySQL->leer();
        } else if ($this->operacion == "seleccionarTodo"){
            $resultado = $this->modeloMySQL->leer();
        }
		return $resultado;
    }
        
    protected function getModeloMySQL(){
		if (strcmp($this->operacion,"seleccionarTodo")==0){
			$this->modeloMySQL = new BacklogMySQL(); 
			
        } else {
            if ($this->datosEntrada){ // Una consulta tipo "seleccionarTodo" no lleva datos
                $this->modeloMySQL = new HistoriaMySQL($this->datosEntrada['id'],
                                                       $this->datosEntrada['nombre'],
                                                       $this->datosEntrada['descripcion'],
                                                       $this->datosEntrada['valor']);
            }    
		}
        return $this->modeloMySQL;
    }
}
