        
        var InfoHistoriaView = {
            init: function(){
                this.interface.ocultar();
                var botonCancelarInfoHistoria = document.getElementById("btn_cancelar_info_historia");
                botonCancelarInfoHistoria.addEventListener("click",InfoHistoriaView.interface.ocultar);
                // El comportamiento del botón "btn_aceptar_info_historia" se asigna en el método InfoHistoriaView.interface.mostrar,
                // ya que varía dependiendo de la funcionalidad (insertar/actualizar).
            },
            interface: {
                mostrar: function(comportamiento){
                    document.getElementById("comp_info_historia").style.visibility = "visible";
					document.getElementById("input_nombre_historia").focus();
					InfoHistoriaView.interface.ocultarIconoCargando();
                    if (comportamiento == InfoHistoriaView.comportamiento.FUNCIONALIDAD_INSERTAR){
                        InfoHistoriaView.interface.limpiarCampos();        
                        InfoHistoriaView.interface.setCampoIdModificable();
                        InfoHistoriaView.interface.setTitulo("Insertar nueva historia");
                        InfoHistoriaView.comportamiento.setModoInsertar();
                    } else if (comportamiento == InfoHistoriaView.comportamiento.FUNCIONALIDAD_ACTUALIZAR){
                        InfoHistoriaView.interface.setCampoIdNoModificable();
                        InfoHistoriaView.interface.setTitulo("Actualizar historia");
                        InfoHistoriaView.comportamiento.setModoActualizar();
                    }
                },                
                ocultar: function(){
                    document.getElementById("comp_info_historia").style.visibility = "hidden";
                    InfoHistoriaView.interface.ocultarIconoCargando();
                },
                setHistoria: function(historia){
                    document.getElementById("input_nombre_historia").value = historia.nombre;
                    document.getElementById("input_etiqueta_historia").value = historia.id;
                    document.getElementById("input_descripcion_historia").value = historia.descripcion;
                    document.getElementById("input_valor_historia").value = historia.valor;
                },
                getHistoria: function(){
                    var historia = new Object();
                    historia.nombre = document.getElementById("input_nombre_historia").value;
                    historia.id = document.getElementById("input_etiqueta_historia").value.replace(/\s*/g,'');
                    historia.descripcion = document.getElementById("input_descripcion_historia").value;
                    historia.valor = document.getElementById("input_valor_historia").value;
                    return historia;
                },
                setCampoIdNoModificable: function(){
                    var campoId = document.getElementById("input_etiqueta_historia");
                    campoId.readOnly = true;
                    campoId.style.backgroundColor = "lightgray";
                },
                setCampoIdModificable: function(){
                    var campoId = document.getElementById("input_etiqueta_historia");
                    campoId.readOnly = false;
                    campoId.style.backgroundColor = "white";
                },
                limpiarCampos: function(){
                    document.getElementById("input_nombre_historia").value = "";
                    document.getElementById("input_etiqueta_historia").value = "";
                    document.getElementById("input_descripcion_historia").value = "";
                    document.getElementById("input_valor_historia").value = "";
                },
                setTitulo: function(textoTitulo){
                    var titulo = document.getElementById("comp_info_historia").getElementsByTagName("h1")[0];
                    titulo.textContent = textoTitulo;
                },
                mostrarIconoCargando: function(){
                    var icono = document.getElementById("icono_cargando");
                    icono.setAttribute("src","vista/recursos/loading.gif");
                },
                ocultarIconoCargando: function(){
                    var icono = document.getElementById("icono_cargando");
                    icono.setAttribute("src","vista/recursos/1x1.png");}
            },
            comportamiento: {
                FUNCIONALIDAD_INSERTAR: 0,
                FUNCIONALIDAD_ACTUALIZAR: 1,
                setModoInsertar: function(){
                    var botonInfoHistoria = document.getElementById("btn_aceptar_info_historia");
                    botonInfoHistoria.removeEventListener("click",InfoHistoriaView.solicitar.actualizarHistoria);
                    botonInfoHistoria.addEventListener("click",InfoHistoriaView.solicitar.insertarHistoria);                    
                },
                setModoActualizar: function(){
                    var botonInfoHistoria = document.getElementById("btn_aceptar_info_historia");
                    botonInfoHistoria.removeEventListener("click",InfoHistoriaView.solicitar.insertarHistoria);
                    botonInfoHistoria.addEventListener("click",InfoHistoriaView.solicitar.actualizarHistoria);
                },
                cancelar: function(){
                    InfoHistoriaView.interface.ocultar();
                }
            },
            solicitar: {
                // El callback para la solicitud "insertarHistoria" está en BacklogViewModel.
                insertarHistoria: function(){ 
                    var historia = InfoHistoriaView.interface.getHistoria();
                    BacklogViewModel.setViewCallback(BacklogView.callbacks.insertarHistoria);
                    BacklogViewModel.ejecutar("validarNuevaHistoria",historia);
                    InfoHistoriaView.interface.mostrarIconoCargando();
                },
                actualizarHistoria: function(){
                    var historia = InfoHistoriaView.interface.getHistoria();
                    BacklogViewModel.setViewCallback(BacklogView.callbacks.actualizarHistoria);
                    BacklogViewModel.ejecutar("actualizarHistoria",historia);
                    InfoHistoriaView.interface.mostrarIconoCargando();
                }
            },
            callbacks: {
                cargarHistoria: function(historia){
                    InfoHistoriaView.interface.mostrar(InfoHistoriaView.comportamiento.FUNCIONALIDAD_ACTUALIZAR);
                    InfoHistoriaView.interface.setHistoria(historia);
                }
            }
        }
