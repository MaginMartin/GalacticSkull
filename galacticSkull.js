//objetos importantes
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//crear objeto de la nave
var nave = { //objeto json
    x:50,
    y:canvas.height-100,
    width:50,
    height:50,
    contador: 0,
}
var juego ={
    estado: 'iniciando'
};
var textoRespuesta ={
    counter: -1,
    titulo: '',
    subtitulo: '',
};
var teclado = {};
//define disparos
var disparos = [];
//define disparos enemigos
var disparosEnemigos = [];
// definir variables para las imagenes
var fondo;
//define enemigos
 
var enemigos = [];
// define sprite nave
                
// definir funciones
 
function loadMedia(){
    fondo = new Image();
    fondo.src = './img/espacio.jpg';
    fondo.onload = function(){
        var intevalo = window.setInterval(frameLoop, 1000/55);
    }
    naveA = new Image();
    naveA.src = './img/nave.png';
    naveE = new Image();
    naveE.src = './img/naveEnemiga.png';
    disparosN = new Image();
    disparosN.src = './img/disparosNave.png';
    disparosEne = new Image();
    disparosEne.src = './img/disparosEne.png';
    naveM = new Image();
    naveM.src = './img/naveSecuenciaDisparo.png';
}
function dibujarEnemigos(){
    for(var i in enemigos){
        var enemigo = enemigos[i];
        ctx.save();
        
        if(enemigo.estado == 'vivo') ctx.drawImage(naveE,enemigo.x, enemigo.y, enemigo.width, enemigo.height);
        if(enemigo.estado == 'muerto' )ctx.clearImage();
        
        //if(enemigo.estado == 'vivo') ctx.fillStyle ='red';
        //if(enemigo.estado == 'muerto' )ctx.fillStyle ='black';
         
        //ctx.fillRect(enemigo.x, enemigo.y, enemigo.width, enemigo.height);
        ctx.restore();
    }
}
function  drawBackground(){
    ctx.drawImage(fondo,0,0);
}
function animacionNave(){
    
}
function  animacionNave(){
 
        contexto.save();
        //contexto.fillStyle = "red ";
        contexto.fillRect(nave.x,nave.y,nave.width,nave.height);
        contexto.globalCompositeOperation = 'source-in';
        //contexto.clip();
        contexto.drawImage(naveM,nave.x - 100 ,nave.y, nave.width+150,nave.height)
        
        contexto.restore();
          
      
         
        
}
function dibujarNave(){
    ctx.save();
     ctx.drawImage(naveA, nave.x, nave.y, nave.width, nave.height);
   if (nave.estado == 'hit') {
      
       contexto.fillRect(nave.x,nave.y,nave.width,nave.height);
        contexto.globalCompositeOperation = 'source-in';
       ctx.drawImage(naveM, (nave.x - 100), nave.y, (nave.width + 150), nave.height);
   }
   /* 
    setInterval( function(){     
             
       
       
        ctx.save();
       // ctx.clearRect(nave.x, nave.x, nave.width, nave.height);
       
       
        //contexto.fillStyle = "red ";
        ctx.fillRect(nave.x,nave.y,nave.width,nave.height);
        ctx.globalCompositeOperation = 'source-in';
        //contexto.clip();
        
        ctx.drawImage(naveM , 
                      (step++ % - 2) *30,
                      nave.y, 
                      nave.width+150,
                      nave.height);
        
           
        console.log('dibujo nave anda')
                        
                ctx.restore();
          
      
         
        
},500);*/
    
    
    //ctx.fillStyle = 'white';
    //ctx.drawImage(naveA, nave.x, nave.y, nave.width, nave.height);
    //ctx.fillRect(nave.x, nave.y, nave.width, nave.height);
    ctx.restore();
}
function agregarEventosTeclado(){
    
    agregarEventos(document,"keydown",function(e){
        teclado[e.keyCode] = true; //teclapresionada
    });
 agregarEventos(document,"keyup",function(e){
        teclado[e.keyCode] = false; //tecla sin presionar
    });
    function agregarEventos(elemento,nombreEvento,funcion){
        if (elemento.addEventListener){
            //navegadores chrome
            elemento.addEventListener(nombreEvento,funcion,false);
        }else if(elemento.attachEvent){
            // internet Explorer
            elemento.attachEvent(nombreEvento,funcion);
        }
    }
}
function moverNave(){
    //izquierda
    if(teclado[37]){
        nave.x -=6;
        if(nave.x < 0) nave.x = 0;
    }
    //derecha
    
     if(teclado[39]){
        var limite = canvas.width - nave.width;
        nave.x +=6;
        if(nave.x > limite) nave.x = limite;
    }
    // tecla disparo
    if(teclado[32]){
        //disparos
        if (!teclado.fire){
            fire();
            teclado.fire = true;
        }
        
    } else teclado.fire = false;
    
    
    if(nave.estado == 'hit'){
        nave.contador++;
        if(nave.contador >= 20){
        nave.contador = 0;
        nave.estado = 'muerto';
        juego.estado = 'perdido';
        textoRespuesta.titulo = 'Game Over';
        textoRespuesta.subtitulo = 'Presiona la tecla R para reiniciar';
        textoRespuesta.contador = 0;
    }
    }
    
    
}
function moverDisparos(){
    for(var i in disparos){
        var disparo = disparos[i];
        disparo.y -= 30; 
    }
    disparos = disparos.filter(function(disparo){
        return disparo.y >  0;
    });
}
function fire(){
    disparos.push({
        x: nave.x + 20,
        y: nave.y - 20,
        width: 10,
        height: 30,
    });
}
function dibujarDisparos(){
    ctx.save();
    ctx.fillStyle = 'white';
    for(var i in disparos){
        var disparo = disparos[i];
       
       ctx.drawImage(disparosN,disparo.x, disparo.y, disparo.width, disparo.height);
        //ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height);
    }
    ctx.restore();
}
function dibujarDisparosEnemigos(){
    for(var i in disparosEnemigos){
        var disparo = disparosEnemigos[i];
        ctx.save();
        ctx.drawImage(disparosEne,disparo.x ,disparo.y, disparo.width, disparo.height);
        //ctx.fillStyle = 'yellow';
        //ctx.fillRect(disparo.x ,disparo.y, disparo.width, disparo.height);
        ctx.restore();
        
    }
}
function  actualizaEnemigos(){
        function agregarDisparosEnemigos(enemigo){
            return{
                x: enemigo.x,
                y: enemigo.y,
                width: 10,
                height: 33,
                contador: 0,
            }
        }
    
    if(juego.estado == 'iniciando'){
        for(var i = 0 ;i < 10; i++ ){ // el for se utiliza para crear los enemigos en este caso 10
           console.log('a');
            enemigos.push({
                x:-10 +(i*50), // le da una separación.
                y:10,
                width: 40,
                height: 40,
                estado: 'vivo',
                contador:0,
            });
        }
        juego.estado = 'jugando';
        
        }
        for(var i in enemigos){
            var enemigo = enemigos[i];
            if(!enemigo) continue;
            if(enemigo && enemigo.estado == 'vivo'){
                enemigo.contador ++ ;
                enemigo.x += Math.sin (enemigo.contador * Math.PI/40)*10; // mueve enemigos
            
                if(aleatorio(0,enemigos.length * 6) == 4 ){
                    disparosEnemigos.push(agregarDisparosEnemigos(enemigo)
                    );
                }
            
            }
    }
    if(enemigo && enemigo.estado == 'hit'){
        enemigo.contador++;
        if(enemigo.contador >= 20){
            enemigo.estado = 'muerto';
            enemigo.contador = 0;
        }
    }
    enemigos = enemigos.filter(function(enemigo){
        if(enemigo && enemigo.estado != 'muerto') return true;
        return false;
    }
    );
}
function aleatorio(inferior,superior){
    var posibilidades = superior - inferior;
    var a = Math.random() * posibilidades;
    a = Math.floor(a);
    return parseInt(inferior) + a;
    }
function hit(a,b){
    var hit = false;
    if(b.x + b.width >= a.x && b.x < a.x + a.width ){
        if(b.y + b.height >= a.y && b.y < a.y + a.height){
            hit = true;
        }
    }
    if(b.x <= a.x && b.x + b.width >= a.x + a.width){
        if (b.y <= a.y && b.y + b.height >= a.y + a.height){
            hit = true;
        }
    }
    if(a.x <= b.x && a.x + a.width >= b.x +b.width){
        if (a.y <= b.y && a.y + a.height >= b.y + b.height){
            hit = true;
        }
    }
    return hit;
}
function verificarContactos(){
    for(var i in disparos){
        var disparo = disparos[i];
        for(j in enemigos){
            var enemigo = enemigos[j];
            if(hit(disparo,enemigo)){
                enemigo.estado = 'hit';
                enemigo.contador = 0;
                
            }
        }
    }
    if(nave.estado == 'hit' || nave.estado == 'muerto') return;
    for(var i in disparosEnemigos){
        var disparo = disparosEnemigos[i];
        if(hit(disparo,nave)){
            nave.estado = 'hit';
            console.log('contacto');
        }
    }
}
function moverDisparosEnemigos(){
    for(var i in disparosEnemigos){
        var disparo = disparosEnemigos[i];
        disparo.y += 8;
    }
    disparosEnemigos = disparosEnemigos.filter(function(disparo){
        return disparo.y < canvas.height;
    });
}
function dibujaTexto(){
    if(textoRespuesta.contador == -1) return;
    var alpha = textoRespuesta.contador/50.0;
    if(alpha>1){
        for(var i in enemigos){
            delete enemigos[i];
        }
    }
    ctx.save();
    ctx.globalAlpha = alpha;
    if(juego.estado =='perdido'){
        ctx.fillStyle = 'white';
        ctx.font = 'Bold 40pt Arial';// agregar texto al cambas
        ctx.fillText(textoRespuesta.titulo,140,200);
        ctx.font = '14pt Arial';
        ctx.fillText(textoRespuesta.subtitulo,190,250)
    }
     if(juego.estado =='victoria'){
        ctx.fillStyle = 'white';
        ctx.font = 'Bold 40pt Arial';// agregar texto al cambas
        ctx.fillText(textoRespuesta.titulo,140,200);
        ctx.font = '14pt Arial';
        ctx.fillText(textoRespuesta.subtitulo,190,250)
    }
    ctx.restore();
}
function actualizaEstadoJuego(){
    if(juego.estado == 'jugando' && enemigos.length == 0){
        juego.estado = 'victoria';
        textoRespuesta.titulo ='YOU WIN!!';
        textoRespuesta.subtitulo = 'Presiona R para reiniciar';
        textoRespuesta.contador = 0 ;
    }
    if(textoRespuesta.contador >= 0){
        textoRespuesta.contador++;
    }
    if((juego.estado == 'perdido' || juego.estado == 'victoria') && teclado[82]){
            juego.estado = 'iniciando';
            nave.estado = 'vivo';
            textoRespuesta.contador = -1;
    }
}
function frameLoop(){
    actualizaEstadoJuego();
    moverNave();
    actualizaEnemigos();
    verificarContactos();
    moverDisparos();
    moverDisparosEnemigos();
    drawBackground();
    dibujarEnemigos();
    dibujarDisparosEnemigos();
    dibujarDisparos();
    dibujaTexto();
    dibujarNave();
}
 
//Ejecutar gunciones
loadMedia();
agregarEventosTeclado();
