        var HistoriaView = {
            solicitar: {
                borrarHistoria: function(historiaDOM){
                    var historiaHelper = Object.create(HistoriaHelper);
                    historiaHelper.fromDOM(historiaDOM);
                    BacklogViewModel.setViewCallback(HistoriaView.callbacks.borrarHistoria);
                    BacklogViewModel.ejecutar("borrarHistoriaById",historiaHelper.id);
                },
                // Esta solicitud utiliza un callback de la vista InfoHistoriaView.
                mostrarDetalles: function(historiaDOM){
                    var historiaHelper = Object.create(HistoriaHelper);
                    historiaHelper.fromDOM(historiaDOM);
                    BacklogViewModel.setViewCallback(InfoHistoriaView.callbacks.cargarHistoria);
                    BacklogViewModel.ejecutar("solicitarHistoria",historiaHelper.id);
                }
            },
            callbacks: {
                borrarHistoria: function(historia){
					if (typeof(historia.error) == "undefined"){
                    	var historiaDOM = document.getElementById(historia.id);
                    	historiaDOM.parentNode.removeChild(historiaDOM);
					} else {
						alert(historia.error);
					}
                },
                mostrarDetallesHistoria: function(historia){
                    InfoHistoriaView.solicitar.cargarHistoria(historia.id);
                }              
            }
        }
