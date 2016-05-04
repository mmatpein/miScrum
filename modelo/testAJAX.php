<?php


if (!isset($_GET['t'])){
		$serverName = "localhost";
		$user = "scrum";
		$password = "Perro20";
		$dbname = "Scrum";

		// Creación de la nueva conexión
		$conn = new mysqli($serverName, $user, $password, $dbname);
		// Comprobar la conexión
		if ($conn->connect_error) {
			$mensajeErrorDB = array("error"=>$conn->connect_error);
			echo "Error con la BBDD";//json_enconde($mensajeErrorDB);
		} else {
			// Obtenemos el json enviado
			$consulta = file_get_contents('php://input');
			$consulta = json_decode( $consulta, true );
			$operacion = $consulta['op'];
			$tipo = $consulta['tipo'];
			// Si la operación es de inserción...
			if (strcmp($operacion,"insertar") == 0){
				// Si la inserción es sobre una Historia
				if (strcmp($tipo,"historia") == 0){
					
					// OBTENER DATOS
					$datos = $consulta['datos'];
					$id = $datos['id'];
					$nombre = $datos['nombre'];
					$descripcion = $datos['descripcion'];
					$valor = $datos['valor'];
					// FIN OBTENER DATOS

					// CONSULTA BASE DE DATOS
					$sql = "INSERT INTO Backlog VALUES ('$id','$nombre','$descripcion','$valor')";
					$result = $conn->query($sql);

					if ($result == 1) {
						$devolucion = array("id"=>$id,"nombre"=>$nombre,"descripcion"=>$descripcion,"valor"=>$valor);
					} else {
						$devolucion = array("error"=>"No se ha podido insertar la historia");
					}

					$conn->close();
					// FIN CONSULTA EN LA BASE DE DATOS

					echo json_encode($devolucion);
				}
			} else if (strcmp($operacion,"borrar") == 0){
				if (strcmp($tipo,"historia") == 0){

					// OBTENER DATOS
					$datos = $consulta['datos'];
					$id = $datos['id'];
					// FIN OBTENER DATOS


					// CONSULTA BASE DE DATOS
					$sql = "DELETE FROM Backlog WHERE (id = '$id')";
					$result = $conn->query($sql);
					//echo $result;
					if ($result == 1) {
						$devolucion = array("id"=>$id);
					} else {
						$devolucion = array("error"=>"No se ha podido borrar la historia");
					}

					$conn->close();
					// FIN CONSULTA EN LA BASE DE DATOS

					echo json_encode($devolucion);					
				}
			} else if (strcmp($operacion,"actualizar") == 0){

					// OBTENER DATOS
					$datos = $consulta['datos'];
					$id = $datos['id'];
					$nombre = $datos['nombre'];
					$descripcion = $datos['descripcion'];
					$valor = $datos['valor'];
					// FIN OBTENER DATOS

					// CONSULTA BASE DE DATOS
					$sql = "UPDATE Backlog SET nombre='$nombre',descripcion='$descripcion',valor='$valor' WHERE id='$id'";
					$result = $conn->query($sql);

					if ($result == 1) {
						$devolucion = array("id"=>$id,"nombre"=>$nombre,"descripcion"=>$descripcion,"valor"=>$valor);
					} else {
						$devolucion = array("error"=>"No se ha podido actualizar la historia");
					}

					$conn->close();
					// FIN CONSULTA EN LA BASE DE DATOS

					echo json_encode($devolucion);


			} else if (strcmp($operacion,"seleccionarTodo") == 0){

					// OBTENER DATOS
					//
					// No es necesario, ya que no se pasan datos.
					//
					// FIN OBTENER DATOS

					// CONSULTA BASE DE DATOS
					$sql = "SELECT * FROM Backlog";
					$result = $conn->query($sql);

					if ($result->num_rows > 0) {
						$devolucion = array();
						while ($row = $result->fetch_assoc()){
							$id = $row["id"];
							$nombre = $row["nombre"];
							$descripcion = $row["descripcion"];
							$valor = $row["valor"];
							$devolucion[$id] = array("id"=>$id,
													 "nombre"=>$nombre,
													 "descripcion"=>$descripcion,
													 "valor"=>$valor);
						}

						/*$devolucion = array("id"=>$id,"nombre"=>$nombre,"descripcion"=>"Desde php","valor"=>$valor);*/
					} else {
						$devolucion = array();
					}

					$conn->close();
					// FIN CONSULTA EN LA BASE DE DATOS

					echo json_encode($devolucion);
			}
		}		
}


