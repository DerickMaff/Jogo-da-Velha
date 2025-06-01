const cellElements = document.querySelectorAll("[date-cell]");
const boarder = document.querySelector("[date-board]");
const MensagemFinal = document.querySelector("[date-Fim]");
const AparecerMensagem = document.querySelector("[date-AparecerMensagem]");
const ReiniciarBotaoApertar = document.querySelector("[date-ReiniciarBotao]")

let CirculoVez;

const CombinacaoDeVitorias = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

]


const StartGame = () => {  // Essa funcao serve para o X começar (pois ele é sempre o primero)
let CirculoVez = false;
 
for (const cell of cellElements){
    
cell.classList.remove('circulo');  //Remover os circulos apos apertar em 'RESET' (depois do jogo acabar)
cell.classList.remove('x');  //Remover os X apos apertar em 'RESET' (depois do jogo acabar)
cell.removeEventListener("click", handleClick);

cell.addEventListener("click", handleClick, { once: true }); // Serve pra revesar quando apertar no X ir para a vez do circulo e vise e versa
}


setBoardHoverClass(); //Serve para adicionar o X sempre no começo do jogo (Para começar a sair )

AparecerMensagem.classList.remove("FinalAparecerDepoisDeGanha");

};



const FimDeJogo = (Empate) => {  // Essa função serve pra conferir se houver empates

    if (Empate){

        MensagemFinal.innerText = 'Empate!'; //Mostra que empatou 
    }
    else{

        MensagemFinal.innerText = CirculoVez ? 'O venceu!' : 'X Venceu!';  // como eu coloquei o "CirculoVez" a vez do ultimo jogador vai ser a que ganhou 
    }

AparecerMensagem.classList.add("FinalAparecerDepoisDeGanha");

};



const ConferirVitoria = (currentPlayer) => {  // Essa função vai servir para conferir quem ganhou

    return CombinacaoDeVitorias.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);  /* esse aqui vai conferir celula por celular, uma por uma, pra ver se tem alguma combinação daquelas que foi marcada no 'CombinacaoDeVitorias' se alguma for 'true' é porque alguma combinação foi feita */
            
        });
    });

};

const checkFroDraw = () => {

    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circulo');
    });
};


    const placeMark = (cell, classToAdd) => {
         cell.classList.add(classToAdd);
    };


    const setBoardHoverClass = () => {

    boarder.classList.remove('circulo');  // vai tirar toda as marcas
    boarder.classList.remove('x');

        if (CirculoVez){  // apos tirar todas as marcas vai ver se é o Circulo ou o X pra por a marca da vez

            boarder.classList.add('circulo');
        }else {

            boarder.classList.add('x');
        }
    }



const NaoMudarSimbolo = () => {  // Essa função serve para deixar certo o X ou o Circulo na vex do jogador

    CirculoVez = !CirculoVez;  // Aqui vai defenir o circulo do que ele era (antes, vai voltar atrás "arrempendimento" ) 

    setBoardHoverClass();
};



const handleClick = (e) => {


 //Colocar a marca (X ou Circulo)
const cell = e.target;                                                
const classToAdd = CirculoVez ? "circulo" : "x";  // Vai ver se é a vez do circulo
placeMark(cell, classToAdd);


//verificar por vitoria 
const Ganhou = ConferirVitoria(classToAdd);

//Verificar por empate
const isDraw = checkFroDraw();


    if (Ganhou) {

        FimDeJogo(false);

    } else if (isDraw) {

        FimDeJogo(true);

    }else {

        //Mudar o simbolo
        NaoMudarSimbolo();  // se ele for falso ele vai mudar o turno nessa função 
    }

};



StartGame();

ReiniciarBotaoApertar.addEventListener('click', StartGame);