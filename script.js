let contador = 0
let preguntas = []
let respuestas = []
let puntaje = 0
let nombre

function actualizarPuntaje() {
    var punt = document.querySelector(".puntaje");
    punt.textContent = `PUNTAJE: ${puntaje}`;
}

actualizarPuntaje();

function replaceContent() {
    var container = document.querySelector(".container");
    var rect = document.createElement("div");
    rect.classList.add("rect");
    const nombreInput = document.querySelector('input[type="text"]').value.toUpperCase();
    nombre = nombreInput;
    container.innerHTML = '';
    container.appendChild(rect);
    addElementsToRect(rect);

    const triviaDiv = document.querySelector('.trivia');
    triviaDiv.textContent = `TRIVIA ${nombreInput}`;

}


document.addEventListener("DOMContentLoaded", function () {
    createInitialContent();

    var button = document.querySelector("button");
    button.addEventListener("click", replaceContent);

});

function createInitialContent() {
    var container = document.querySelector(".rect");

    var newDiv = document.createElement("div");
    newDiv.classList.add("new-content");

    var h1 = document.createElement("h1");
    h1.textContent = "HOLA";

    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Ingresa tu nombre"

    input.addEventListener("click", function () {
        input.placeholder = "";
    });

    input.addEventListener("blur", function () {
        input.placeholder = "Ingresa tu nombre";
    });

    var h2 = document.createElement("h2");
    h2.textContent = "¡BIENVENIDO A ESTA TRIVIA DE PROGRAMACIÓN!";

    var h3 = document.createElement("h2");
    h3.textContent = "!ES HORA DE EMPEZAR LA DIVERSIÓN!";

    var button = document.createElement("button");
    button.textContent = "EMPEZAR";

    button.classList.add("hover-button");

    newDiv.appendChild(h1);
    newDiv.appendChild(input);
    newDiv.appendChild(h2);
    newDiv.appendChild(h3);

    newDiv.appendChild(button);

    container.appendChild(newDiv);
}

function addElementsToRect(rect) {
    var newInnerDiv = document.createElement("div");
    newInnerDiv.classList.add("cat-content");

    var h1 = document.createElement("h1");
    h1.textContent = "¡ELIGE UNA CATEGORIA!";

    var divCategorias = document.createElement("div");
    divCategorias.classList.add("categorias");

    divCategorias.setAttribute("id", "cat");

    iterarCategoria();

    newInnerDiv.appendChild(h1);
    newInnerDiv.appendChild(divCategorias)
    rect.appendChild(newInnerDiv);

}

function iterarCategoria() {
    const apiUrl = 'https://www.trivia.somee.com/api/v1/categories';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error));

    const mostrarData = (data) => {
        console.log(data)
        let body = ''
        for (let i = 0; i < data.length; i++) {
            body += `<button onclick="mostrarDatosPorId(${data[i].id})">${data[i].name}</button>`
        }
        document.getElementById('cat').innerHTML = body
    }
}


function mostrarDatosPorId(id) {
    const apiPreguntas = 'https://www.trivia.somee.com/api/v1/questions';
    fetch(apiPreguntas + '/' + id)
        .then(response => response.json())
        .then(data => mostrarDetalles(data))
        .catch(error => console.log(error));


}

function addPreguntas(rect, data) {
    var newDivPr = document.createElement("div");
    newDivPr.classList.add("pre-content");

    rect.appendChild(newDivPr);
}



const mostrarDetalles = (data) => {
    preguntas = data;

    var container = document.querySelector(".container");
    var rect = document.createElement("div");
    rect.classList.add("rect");
    container.innerHTML = '';

    container.appendChild(rect);

    var divpreguntas = document.createElement("div");
    divpreguntas.classList.add("preguntas");
    divpreguntas.setAttribute("id", "pre");
    divpreguntas.textContent = preguntas[contador].description;

    var divRespuestas = document.createElement("div");
    divRespuestas.classList.add("respuestas");
    divRespuestas.setAttribute("id", "res");



    let answers = preguntas[contador].answers
    let body = ''
    for (let index = 0; index < answers.length; index++) {
        const answer = answers[index];

        body += `<button onclick="siguientePregunta(${answer.id})">${answer.description}</button>`

    }

    divRespuestas.innerHTML = body

    rect.appendChild(divpreguntas);
    rect.appendChild(divRespuestas);

    container.appendChild(rect);
}

function siguientePregunta(id) {
    let answers = preguntas[contador].answers;

    for (let index = 0; index < answers.length; index++) {
        if (answers[index].id == id) {
            if (answers[index].isValid) {
                puntaje = puntaje + 100;
                actualizarPuntaje()
            }
        }
    }
    if (preguntas.length === contador + 1) {
        partidaFinalizada = true;
        finPartida();
    }
    else {
        contador++;
        mostrarDetalles(preguntas)
    }
}

function finPartida() {
    console.log("Partida ");

    var container = document.querySelector(".container");
    var rect = document.createElement("div");
    rect.classList.add("rect");
    container.innerHTML = '';

    var fin = document.createElement("div");
    fin.classList.add("fin");

    var h1 = document.createElement("h1");
    var h2 = document.createElement("h2");
    h2.textContent = `${nombre}`

    var ganador = document.createElement("p");

    console.log(puntaje)
    
    if(puntaje == (preguntas.length*100)) 
    {
        ganador.textContent = "ACERTASTE TODAS LAS PREGUNTAS"
        createConfetti(); 
    }
    else if (puntaje > 90) {
        h1.textContent = "¡INCREIBLE!"
    }
    else {
        h1.textContent = "VUELVE A INTENTARLO"
       
    }


    console.log(puntaje);
    var puntos = document.createElement("h3");
    puntos.textContent = `Obtuviste ${puntaje} puntos!`

    var reiniciarBoton = document.createElement("button");
    reiniciarBoton.textContent = "VOLVER A JUGAR";
    reiniciarBoton.classList.add("reiniciarBoton"); 

    reiniciarBoton.addEventListener("click", function () {
        location.reload();
    });

    
    fin.appendChild(h1);
    fin.appendChild(h2);
    fin.appendChild(ganador);
    fin.appendChild(puntos);
    fin.appendChild(reiniciarBoton);

    rect.appendChild(fin);
    container.appendChild(rect);
}


function createConfetti() {
    var confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");

    for (var i = 0; i < 100; i++) {
        var confettiPiece = document.createElement("div");
        confettiPiece.classList.add("confetti-piece");
        confettiPiece.style.left = Math.random() * 100 + "vw";
        confettiPiece.style.animationDelay = Math.random() + "s";
        confettiContainer.appendChild(confettiPiece);
    }

    document.body.appendChild(confettiContainer);

    setTimeout(function() {
        confettiContainer.remove();
    }, 5000);
}

window.onload = function() {
    var confettiButton = document.createElement("button");
    confettiButton.textContent = "¡Lanzar Confeti!";
    confettiButton.addEventListener("click", createConfetti);
    document.body.appendChild(confettiButton);
};