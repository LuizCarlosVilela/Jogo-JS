const canva2 = document.createElement("canvas");
canva2.setAttribute("id", "canva2");
const ctx2 = canva2.getContext("2d");

var sprites = [];

let posY = canva2.height-15;
var chao = new Sprit(0, posY, canva2.width,15);

posY = canva2.height-100;
var block2 = new Sprit(0, posY, 15,15);

sprites.push(chao);
sprites.push(block2);


for(var i = 0; i < 5; i++){
    let n = null;
    let posY = (canva2.height-15)-10;
    let posX = 60*i;
    let h = 10*i;
    
    n = new Sprit(posX, posY, 10, 10);
    console.log(n);
    sprites.push(n);
}

var objeto2 = {
    direita:{
        key: "ArrowRight",
        valida: false,
    },
    esquerda: {
        key: "ArrowLeft",
        valida: false,
    },
    cima: {
        key: "ArrowUp",
        valida: false,
        quantidade: 3,
    },
    baixo:{
        key: "ArrowDown",
        valida: false,
    }
}

function gameStart2(){
    
    var painel = document.getElementById("painel-central");
    painel.innerHTML = "";
    painel.appendChild(canva2);

    window.addEventListener("keydown", (e)=>{
        let {direita, esquerda, cima} = objeto2;
        let key = e.key;
    
        if(direita.key === key){
            direita.valida = true;
        }
        else if(esquerda.key === key){
            esquerda.valida = true;
        }
        else if(cima.key === key){
            cima.valida = true;
        }
    });


    
    window.addEventListener("keyup", (e) =>{
        let {direita, esquerda, cima} = objeto2;
        let key = e.key;
    
        if(direita.key === key){
            direita.valida = false;
        }
        else if(esquerda.key === key){
            esquerda.valida = false;
        }
    });

    loop2();
}

function loop2(){
    window.requestAnimationFrame(loop2);

    update2();
    print2(sprites);
}

function update2(){
    let {direita, esquerda, cima, baixo} = objeto2;

    let posBlockY = block2.getY() + block2.getHeight();
    if(posBlockY < chao.getY()){
        baixo.valida = true;
    }
    if(posBlockY >= chao.getY()){
        baixo.valida = false;
        cima.quantidade = 3;
    }

    let posBX = canva2.width-block2.getWidth();
    if((direita.valida === true) && (block2.getX() < posBX)){
        let i = block2.getX()+1;
        block2.setX(i);
    }
    if((esquerda.valida === true) && (block2.getX() > 0)){
        let i = block2.getX()-1;
        block2.setX(i);
    }

    if(baixo.valida === true){
        let i = block2.getY()+2;
        block2.setY(i);
    }
    if((cima.valida === true) && (block2.getY() > 0)){
        if(cima.quantidade >= 1){
            cima.quantidade = cima.quantidade -1;
            
            var i = block2.getY()-40;
            block2.setY(i);
            cima.valida = false;
        }
        cima.valida = false;
    }
}
function print2(sprites){
    ctx2.clearRect(0,0, canva2.width, canva2.height);

    sprites.forEach((element) => {
        element.desenharSprit(ctx2);
    });

}

