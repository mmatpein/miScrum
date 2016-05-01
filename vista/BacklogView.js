        var BacklogView = {
            init: function(){
                this.solicitar.actualizarHistorias();
                var botonNuevaHistoria = document.getElementById("btn_nueva_historia");
                botonNuevaHistoria.addEventListener("click", function(){
                                                                InfoHistoriaView.interface.mostrar(InfoHistoriaView.comportamiento.FUNCIONALIDAD_INSERTAR)
                                                             });
            },
            interface: {
                drawHistoria: function(historiaHelper){
                    if (historiaHelper.id){
                        var backlog = document.getElementById("backlog");
                        backlog.appendChild(historiaHelper.getHistoriaDOM());
                    }   
                },
                replaceHistoria: function(historiaHelper){
                    var historiaAntiguaDOM = document.getElementById(historiaHelper.id);
                    historiaAntiguaDOM.parentNode.insertBefore(historiaHelper.getHistoriaDOM(),historiaAntiguaDOM);
                    historiaAntiguaDOM.parentNode.removeChild(historiaAntiguaDOM);
                }
            },
            solicitar: {
                actualizarHistorias: function(){
                    BacklogViewModel.setViewCallback(BacklogView.callbacks.actualizarHistorias);
                    BacklogViewModel.ejecutar("solicitarHistorias");
                }
            },
            callbacks: {
                actualizarHistorias: function(historias){
                        for (var id in historias){
                            var historiaHelper = Object.create(HistoriaHelper);
                            historiaHelper.fromObjeto(historias[id]);
                            BacklogView.interface.drawHistoria(historiaHelper);
                        }
                },
                insertarHistoria: function(historia){
					InfoHistoriaView.interface.ocultar();
                    if (typeof(historia.error) == "undefined"){
                        var historiaHelper = Object.create(HistoriaHelper);
                        historiaHelper.fromObjeto(historia);
                        BacklogView.interface.drawHistoria(historiaHelper);
                    } else {
						alert(historia.error);
                    }
                },
                actualizarHistoria: function(historia){
					InfoHistoriaView.interface.ocultar();
                    if (typeof(historia.error) == "undefined"){
                        var historiaHelper = Object.create(HistoriaHelper);
                        historiaHelper.fromObjeto(historia);
                        BacklogView.interface.replaceHistoria(historiaHelper);
                    } else {
                        alert(historia.error);
				    }
                }
            }
            
        };
