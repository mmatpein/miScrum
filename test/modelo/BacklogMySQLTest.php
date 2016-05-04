<?php

namespace miScrum\modelo;

require "../vendor/autoload.php";

use miScrum\modelo\HistoriaMySQL;
use miScrum\modelo\ BacklogMySQL;
/**
 * Generated by PHPUnit_SkeletonGenerator on 2016-05-03 at 20:52:28.
 */
class  BacklogMySQLTest extends \PHPUnit_Framework_TestCase {

    /**
     * @var historiasMySQL
     */
    protected $historiasMySQL;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */
    protected function setUp() {
        
        $this->historiasMySQL = new   BacklogMySQL;
        $historia1 = new HistoriaMySQL("h1tst","nombre1","descripción 1",100);
        $historia1->insertar();
        $historia2 = new HistoriaMySQL("h2tst","nombre2","descripción 2",100);
        $historia2->insertar();
        $historia3 = new HistoriaMySQL("h3tst","nombre3","descripción 3",100);
        $historia3->insertar();
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */
    protected function tearDown() {
        $historia1 = new HistoriaMySQL("h1tst","nombre1","descripción 1",100);
        $historia1->borrar();
        $historia2 = new HistoriaMySQL("h2tst","nombre2","descripción 2",100);
        $historia2->borrar();
        $historia3 = new HistoriaMySQL("h3tst","nombre3","descripción 3",100);
        $historia3->borrar();        
    }

    /**
     * @covers miScrum\modelo\historiasMySQL::leerTodo
     * @todo   Implement testLeerTodo().
     */
    public function testLeerTodo() {
        // Remove the following lines when you implement this test.
        $resultado = $this->historiasMySQL->leer();
        echo "[testLeerTodo]";
        print_r($resultado);
        echo "\n tamaño del resultado: ".count($resultado)."\n";
        echo "-------------------------\n";
        $this->assertTrue(count($resultado) >= 3,"No se obtuvieron las historias insertadas");
    }

}
