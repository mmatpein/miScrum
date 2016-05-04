        
        var HistoriaHelper = {
            id: null,
            init: function(id, nombre, descripcion, valor){
                this.id = id;
                this.nombre = nombre;
                this.descripcion = descripcion;
                this.valor = valor;
            },
            fromObjeto: function(historia){
                this.id = historia.id;
                this.nombre = historia.nombre;
                this.descripcion = historia.descripcion;
                this.valor = historia.valor;
                return this;
            },
            /*getIdFromDOMObject: function(domObject){
                return domObject.getElementsByTagName("li")[0].value;
            },*/
            getHistoriaDOM: function(){
                var historia = "";
                if (this.id){
                    historia = " <ul>" +
                               "    <li class='etiqueta_historia'>" + this.id + "</li>" +
                               "    <li class='nombre_historia'>" + this.nombre + "</li>" +
                               " </ul>" +
                               " <span class='valor_historia' title='Valor de negocio'>" + this.valor + "</span>" +
                               " <button class='btn_detalles_historia' onclick='HistoriaView.solicitar.mostrarDetalles(this.parentNode);'>Mostrar detalles</button><button class='btn_borrar_historia' onclick='HistoriaView.solicitar.borrarHistoria(this.parentNode);'>Borrar historia</button>";
                    var historiaDOM = document.createElement("div");
                    historiaDOM.setAttribute("class","historia");
                    historiaDOM.setAttribute("draggable","true");
                    historiaDOM.setAttribute("id",this.id);
                    historiaDOM.innerHTML = historia;
                    return historiaDOM;
                } else {
                    return null;
                }
            },
            fromDOM: function(historiaDOM){
                this.id = historiaDOM.querySelector(".etiqueta_historia").textContent;
                this.nombre = historiaDOM.querySelector(".nombre_historia").textContent;
                this.valor = parseInt(historiaDOM.querySelector(".valor_historia").textContent);
            },
            igual: function(historia){
                if ((this.id == historia.id) && 
                    (this.nombre == historia.nombre) &&
                    (this.descripcion == historia.descripcion) &&
                    (this.valor == historia.valor)){
                    return true;
                } else {
                    return false;
                }
            }
        };
