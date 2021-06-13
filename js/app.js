let juguetes = document.getElementById("juguetes")
let farmacia = document.getElementById("farmacia")


const app = Vue.createApp({
    data (){
        return{    
        esVisible:true,    
        ArrayJuguetes:[],
        ArrayMedicamentos:[],
        ArrayJuguetesMenoresa5:[],
        ArrayMedicamentosMenoresa5:[],
        filtro:[],
        contador:0,
        precioTotal:0,
        carrito:[],
        };
    },
    created(){
        
        endpoint = "https://apipetshop.herokuapp.com/api/articulos"
      
        fetch(endpoint)
        .then(res => res.json())
        .then(data => {
            
            this.ArrayJuguetes = data.response.filter(e=>e.tipo=="Juguete")
            this.ArrayMedicamentos = data.response.filter(e=>e.tipo=="Medicamento")
            this.ArrayJuguetesMenoresa5 = this.ArrayJuguetes.filter(e=> e.stock<5)
            this.ArrayMedicamentosMenoresa5= this.ArrayMedicamentos.filter(e=> e.stock<5)
        })
        
        },
        methods:{
            toggleVisible(){
                this.esVisible = !this.esVisible
            },
                alertaContactenos(){
                swal("Bien hecho!", "Tu consulta será respondida a la brevedad!", "success");
            },
            alertaSubs(){
                swal("Bien hecho!","Datos Recibidos! Ahora,chequea tu casilla de e-mail","success");
            },
            sumarAcarrito(post){
                if(this.contador!=0)
                    {
                        let text = localStorage.getItem("testJSON");
                        let obj = JSON.parse(text);
                        this.carrito=obj;
                        this.precioTotal=localStorage.getItem("PrecioTotal");
                        this.carrito.push(post);
                        this.contador=localStorage.getItem("Contador");
                        this.contador++;
                        localStorage.setItem("Contador",this.contador)
                        this.precioTotal=(Number(this.precioTotal)+(Number(post.precio)));
                        const myJSON = JSON.stringify(this.carrito);
                        localStorage.setItem("testJSON", myJSON);
                        localStorage.setItem("PrecioTotal",this.precioTotal);
                    }
                    else
                    {
                        this.carrito.push(post);
                        this.contador++;
                        this.precioTotal=(Number(this.precioTotal)+(Number(post.precio)));
                        const myJSON = JSON.stringify(this.carrito);
                        localStorage.setItem("testJSON", myJSON);
                        localStorage.setItem("PrecioTotal",this.precioTotal);  
                        localStorage.setItem("Contador",this.contador)
                    }    
                
            },
            vaciarCarrito(){
                
                this.carrito="";
                const myJSON = JSON.stringify(this.carrito);
                localStorage.setItem("testJSON", myJSON);
                this.precioTotal=0;
                localStorage.setItem("PrecioTotal",this.precioTotal);
                this.contador=0;
                localStorage.setItem("Contador",this.contador);
            },
        },
        computed:{
            carritoLocalStorage(){
                let text = localStorage.getItem("testJSON");
                let obj = JSON.parse(text);
                this.carrito=obj;
                return this.carrito;
            },
            totalLocalStorage(){
                this.precioTotal=localStorage.getItem("PrecioTotal");
                return this.precioTotal;
            },
            contadorLocalStorage(){
                this.contador=localStorage.getItem("Contador");
                return this.contador;
            },
            Filtrados(){
            if(farmacia)
            var arrayFiltrado= this.ArrayMedicamentos
            else if(juguetes)
            var arrayFiltrado=this.ArrayJuguetes
            
            if (this.filtro==""){  //Si no hay ningun valor en el checkpoint.
                return arrayFiltrado
            }
            else if(this.filtro=="PrecioMayor")
                {    
                    let arrayAux = arrayFiltrado              
                    arrayAux.sort( (a,b) => {
                    if ( a.precio < b.precio) {
                        if(false){
                            return -1
                        }else {
                            return 1
                        }
                    }
                    if ( a.precio > b.precio) {
                        if(false){
                            return 1
                        }else {
                            return -1
                        }
                    }
                    return 0
                    
                    }) 
                    return arrayAux
                }
                else if (this.filtro=="PrecioMenor") 
                {
                    let arrayAux = arrayFiltrado              
                    arrayAux.sort( (a,b) => {
                    if ( a.precio < b.precio) {
                        if(true){
                            return -1
                        }else {
                            return 1
                        }
                    }
                    if ( a.precio > b.precio) {
                        if(true){
                            return 1
                        }else {
                            return -1
                        }
                    }
                    return 0
                    
                    }) 
                    return arrayAux

                }
                else if (this.filtro=="MayorStock"){
                    let arrayAux = arrayFiltrado              
                    arrayAux.sort( (a,b) => {
                    if ( a.stock < b.stock) {
                        if(false){
                            return -1
                        }else {
                            return 1
                        }
                    }
                    if ( a.stock > b.stock) {
                        if(false){
                            return 1
                        }else {
                            return -1
                        }
                    }
                    return 0
                    
                    }) 
                    return arrayAux
                }
                else if (this.filtro=="MenorStock"){
                    let arrayAux = arrayFiltrado              
                    arrayAux.sort( (a,b) => {
                    if ( a.stock < b.stock) {
                        if(true){
                            return -1
                        }else {
                            return 1
                        }
                    }
                    if ( a.stock > b.stock) {
                        if(true){
                            return 1
                        }else {
                            return -1
                        }
                    }
                    return 0
                    
                    }) 
                    return arrayAux
                }
            },

        },      
        });

        app.mount("#app"); 