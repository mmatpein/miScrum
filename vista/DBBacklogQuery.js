        
        var DBBacklogQuery = {
            setViewModelCallback:function(callback){
                this.callback = callback;
            },
            solicitudes: {
                // Todos los métodos en este objeto simulan una consulta AJAX con el servidor. Para ello
                // provocan un retraso en la ejecución de la notificación.
                getAllHistorias: function(){
                    if (DBBacklogQuery.callback){
                        setTimeout(DBBacklogQuery.notificaciones.resultadoAllHistorias,1000);
                    }
                },
                insertHistoria: function(historia){
                    if (DBBacklogQuery.callback){
                        setTimeout(function(){DBBacklogQuery.notificaciones.insercion(JSON.stringify(historia))},1000);
                    }
                },
                borrarHistoriaById: function(idHistoria){
                    if (DBBacklogQuery.callback){
                        setTimeout(function(){
                                        DBBacklogQuery.notificaciones.borrado(JSON.stringify(BacklogViewModel.historias[idHistoria]));
                                    },1000);
                    }
                },
                actualizarHistoria: function(historia){
                    if (DBBacklogQuery.callback){
                        setTimeout(function(){
                                        DBBacklogQuery.notificaciones.actualizacion(JSON.stringify(historia));
                                    },1000);
                    }
                }  
            },
            notificaciones: {
                resultadoAllHistorias: function(){
                    // SIMULACIÓN DE RESPUESTA AJAX //
                    DBBacklogQuery.callback(DBBacklogQuery.historiasEjemploJSON());
                },
                insercion: function(historiaJSON){
                    DBBacklogQuery.callback(historiaJSON);  
                },
                borrado: function(historiaJSON){
                    DBBacklogQuery.callback(historiaJSON);
                },
                actualizacion: function(historiaJSON){
                    DBBacklogQuery.callback(historiaJSON);
                }
            },
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
                                    });}
        };
