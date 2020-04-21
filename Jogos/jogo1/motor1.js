const canvas = document.createElement("canvas");
canvas.setAttribute("id", "canva1");
const ctx = canvas.getContext("2d");

var objeto = {
    direita: {
        valida: false,
        key: "ArrowRight",
    },

    esquerda:{
        valida: false,
        key: "ArrowLeft",
    },

    cima:{
        valida: false,
        key: "ArrowUp",
    },

    baixo:{
        valida: false,
        key: "ArrowDown",
    }
}

const block = new Sprit(0,0,10,10);

function gameStart1(){
    var painel = document.getElementById("painel-central");
    painel.innerHTML = "";
    painel.appendChild(canvas);

    window.addEventListener('keydown', e => {
        let {direita, esquerda, cima, baixo} = objeto;
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
        else if(baixo.key === key){
            baixo.valida = true;
        }
    });

    window.addEventListener('keyup', e => {
        let {direita, esquerda, cima, baixo} = objeto;
        let key = e.key;

        if(direita.key === key){
            direita.valida = false;
        }
        else if(esquerda.key === key){
            esquerda.valida = false;
        }
        else if(cima.key === key){
            cima.valida = false;
        }
        else if(baixo.key === key){
            baixo.valida = false;
        }
    });

    loop();
}

function loop(){
    window.requestAnimationFrame(loop);

    update(block);
    print(block);
}

function update(sprit){
    let {direita, esquerda, cima, baixo} = objeto;

    var posX = canvas.width - sprit.getWidth();
    if((direita.valida === true) && (sprit.getX() < posX)){
        let i = sprit.getX()+2;
        sprit.setX(i);
    }
    if((esquerda.valida === true) && (sprit.getX() > 0)){
        let i = sprit.getX()-2;
        sprit.setX(i);
    }
    var posY = canvas.height - sprit.getHeight();
    if((baixo.valida === true) && (sprit.getY() < posY)){
        let i = sprit.getY()+2;
        sprit.setY(i);
    }
    if((cima.valida === true) && (sprit.getY() > 0)){
        let i = sprit.getY()-2;
        sprit.setY(i);
    }
}

function print(sprit){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    sprit.desenharSprit(ctx, canvas);
}
