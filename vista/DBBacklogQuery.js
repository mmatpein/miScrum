        
        var DBBacklogQuery = {
			http_request: false,
            setViewModelCallback:function(callback){
                this.callback = callback;
            },
			HTTP: {
				solicitudHTTP: function(url,datosJSON,notificacion){
					http_request = false;
					if (window.XMLHttpRequest) { // Mozilla, Safari,...
						http_request = new XMLHttpRequest();
						if (http_request.overrideMimeType) {
							http_request.overrideMimeType('text/xml');
						}
					} else if (window.ActiveXObject) { // IE
						try {
							http_request = new ActiveXObject("Msxml2.XMLHTTP");
						} catch (e) {
							try {
								http_request = new ActiveXObject("Microsoft.XMLHTTP");
							} catch (e) {}
						}
					}
					if (!http_request) {
						alert('Falló la creación de la instancia XMLHTTP');
						return false;				
					}
					http_request.onreadystatechange = notificacion;
					http_request.open('POST', url, true);
					http_request.setRequestHeader("Content-Type","application/json; charset=UTF-8");
					http_request.send(datosJSON);
					return true;
				},
				notificacionHTTP: function(){
					console.log("[notificacionHTTP]");
					console.log("http_request.readyState = " + http_request.readyState);
					console.log("http_request.status = " + http_request.status);
					if (http_request.readyState == 4) {
						if (http_request.status == 200) {
							return http_request.responseText;
						} else {
							return false;
						}
					} else {
						return false;
					}
				},
				prepararDatosParaEnviar: function(operacion,tipoDeDatos,datosAEnviar){
					return {
						op: operacion,
						tipo: tipoDeDatos,
						datos: datosAEnviar
					};
				}
			},
            solicitudes: {
                getAllHistorias: function(){
                    if (DBBacklogQuery.callback){
						var solicitud = DBBacklogQuery.HTTP.prepararDatosParaEnviar("seleccionarTodo","historia",{});
						DBBacklogQuery.HTTP.solicitudHTTP("http://localhost/temp/testAJAX.php",JSON.stringify(solicitud),DBBacklogQuery.notificaciones.resultadoAllHistorias);
                    }
                },
                insertHistoria: function(historia){
                    if (DBBacklogQuery.callback){
						var solicitud = DBBacklogQuery.HTTP.prepararDatosParaEnviar("insertar","historia",historia);
						DBBacklogQuery.HTTP.solicitudHTTP("http://localhost/temp/testAJAX.php",JSON.stringify(solicitud),DBBacklogQuery.notificaciones.insercion);
					}
               },
                borrarHistoriaById: function(idHistoria){
                    if (DBBacklogQuery.callback){
						var solicitud = DBBacklogQuery.HTTP.prepararDatosParaEnviar("borrar","historia",{id:idHistoria});
						DBBacklogQuery.HTTP.solicitudHTTP("http://localhost/temp/testAJAX.php",JSON.stringify(solicitud),DBBacklogQuery.notificaciones.borrado);
                    }
                },
                actualizarHistoria: function(historia){
                    if (DBBacklogQuery.callback){
						var solicitud = DBBacklogQuery.HTTP.prepararDatosParaEnviar("actualizar","historia",historia);
						DBBacklogQuery.HTTP.solicitudHTTP("http://localhost/temp/testAJAX.php",JSON.stringify(solicitud),DBBacklogQuery.notificaciones.actualizacion);
                    }
                }  
            },
            notificaciones: {
                resultadoAllHistorias: function(){
					console.log("[notificaciones.resultadoAllHistorias]");
					var historiasJSON = DBBacklogQuery.HTTP.notificacionHTTP();
					console.log("historiasJSON = " + historiasJSON);
					if (historiasJSON){
						DBBacklogQuery.callback(historiasJSON);
					}
                },
                insercion: function(){//historiaJSON){
					console.log("[notificaciones.insercion]");
					var historiaJSON = DBBacklogQuery.HTTP.notificacionHTTP();
					console.log("historiaJSON = " + historiaJSON);
					if (historiaJSON){
						DBBacklogQuery.callback(historiaJSON);  
					}
                },
                borrado: function(historiaJSON){
					console.log("[notificaciones.borrado]");
					var historiaJSON = DBBacklogQuery.HTTP.notificacionHTTP();
					console.log("historia borrada = " + historiaJSON);
                    if (historiaJSON){
						DBBacklogQuery.callback(historiaJSON);
					}
                },
                actualizacion: function(historiaJSON){
					console.log("[notificaciones.actualizacion]");
					var historiaJSON = DBBacklogQuery.HTTP.notificacionHTTP();
					console.log("historia actualizada = " + historiaJSON);
					if (historiaJSON){
						DBBacklogQuery.callback(historiaJSON);	
					}
                }
            }/*,
            historiasEjemploJSON: function(){
                return JSON.stringify({
                                        "HU#A": {id: "HU#A",
                                                nombre: "Historia A",
                                                descripcion: "Descripción de la historia A",
                                                valor: 200
                                            },
                                        "HU#B": {id:"HU#B",
                                                nombre: "Historia B",
                                                descripcion: "Descripción de la historia B",
                                                valor: 200
                                            },
                                        "HU#C": {id:"HU#C",
                                                nombre: "Historia C",
                                                descripcion: "Descripción de la historia C",
                                                valor: 200}
                                    });}*/
        };
