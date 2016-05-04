        var BacklogViewModel = {
            historias: {},
            setViewCallback: function(callback){
                this.callback = callback;
            },
            ejecutar: function(com,args){
                this.acciones[com](args);
            },
            acciones: {
                solicitarHistorias: function(){
                    DBBacklogQuery.setViewModelCallback(BacklogViewModel.callbacks.notificarAllHistorias);
                    DBBacklogQuery.solicitudes.getAllHistorias();
                },
                validarNuevaHistoria: function(nuevaHistoria){
                    if (BacklogViewModel.historias[nuevaHistoria.id] == undefined){
                        DBBacklogQuery.setViewModelCallback(BacklogViewModel.callbacks.notificarValidacionNuevaHistoria);
                        DBBacklogQuery.solicitudes.insertHistoria(nuevaHistoria);
                    } else {
                        BacklogViewModel.callbacks.notificarValidacionNuevaHistoria(JSON.stringify({error: "La historia ya existe"}));
                    }
                },
                borrarHistoriaById: function(id){
                    if (BacklogViewModel.historias[id]){
                        DBBacklogQuery.setViewModelCallback(BacklogViewModel.callbacks.notificarHistoriaBorrada);
                        DBBacklogQuery.solicitudes.borrarHistoriaById(id);
                    } else {
						BacklogViewModel.callbacks.notificarHistoriaBorrada(JSON.stringify({error: "No se ha podido borrar la historia"}));
                    }
                },
                solicitarHistoria: function(id){
                    if (BacklogViewModel.historias[id]){
                        // No hacemos consulta a DBBacklogQuery. Lanzamos el callback directamente.
                        BacklogViewModel.callback(BacklogViewModel.historias[id]);
                    } else {
						BacklogViewModel.callback({error:"La historia no existe"});
					}
                },
                actualizarHistoria: function(historia){
                    var historiaSinActualizar = BacklogViewModel.historias[historia.id];
                    if (historiaSinActualizar){
                        var historiaSinActualizarHelper = Object.create(HistoriaHelper);
                        historiaSinActualizarHelper.fromObjeto(historiaSinActualizar);
                        if (historiaSinActualizarHelper.igual(historia)){
                            /*InfoHistoriaView.interface.ocultar();
                            alert("La historia no se ha modificado");
                            console.log(document.getElementById("icono_cargando_comp_info_historia").style.visibility);*/
							BacklogViewModel.callbacks.notificarHistoriaActualizada(JSON.stringify({error: "No hay cambios en la historia"}));
                        } else {
                            DBBacklogQuery.setViewModelCallback(BacklogViewModel.callbacks.notificarHistoriaActualizada);
                            DBBacklogQuery.solicitudes.actualizarHistoria(historia);
                        }    
                    } else {
			BacklogViewModel.callbacks.notificarHistoriaActualizada(JSON.stringify({error: "La historia no existe"}));
			/*InfoHistoriaView.interface.ocultar();
                        alert("La historia no se ha modificado");
                        console.log(document.getElementById("icono_cargando_comp_info_historia").style.visibility);*/
                    }
                }
            },
            callbacks:{
                notificarAllHistorias: function(historiasJSON){
                    var historias = JSON.parse(historiasJSON);
                    BacklogViewModel.historias = historias;
                    BacklogViewModel.callback(historias);
                },
                notificarValidacionNuevaHistoria: function(nuevaHistoriaJSON){
                    var nuevaHistoria = JSON.parse(nuevaHistoriaJSON);
                    if (typeof(nuevaHistoria.error) != undefined){
                        BacklogViewModel.historias[nuevaHistoria.id] = nuevaHistoria;
                    }
					BacklogViewModel.callback(nuevaHistoria);        
                },
                notificarHistoriaBorrada: function(historiaBorradaJSON){
                    var historiaBorrada = JSON.parse(historiaBorradaJSON);
                    if (typeof(historiaBorrada.error) != undefined){
                        delete BacklogViewModel.historias[historiaBorrada.id];
                    }
					BacklogViewModel.callback(historiaBorrada);    
                },
                notificarHistoriaActualizada: function(historiaActualizadaJSON){
                    var historiaActualizada = JSON.parse(historiaActualizadaJSON);
					if (typeof(historiaActualizada.error) != undefined){
						BacklogViewModel.historias[historiaActualizada.id] = historiaActualizada;
					}
                    BacklogViewModel.callback(historiaActualizada);
                }
            }
        }
