


// fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//     console.log('Datos de la API:', data);
// })
//     .catch(error => {
//     console.error('Error en la solicitud:', error);
// });
//////////////////////////////////////////////////////////7

function replaceContent() {
    var container = document.querySelector(".container");
    var rect = document.createElement("div");
    rect.classList.add("rect");
    container.innerHTML = ''; 
    container.appendChild(rect);
    addElementsToRect(rect);

   
  }

  

document.addEventListener("DOMContentLoaded", function() {
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

    input.addEventListener("click", function() {
        input.placeholder = ""; 
      });

      input.addEventListener("blur", function() {
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
    divCategorias.textContent = "HOLAHOLA"
    divCategorias.setAttribute("id", "cat");
  
     iterarCategoria();
    
    newInnerDiv.appendChild(h1); 
    newInnerDiv.appendChild(divCategorias)
    rect.appendChild(newInnerDiv);

  }

  function iterarCategoria(){
    const apiUrl = 'https://localhost:7204/api/v1/categories';
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error));

    const mostrarData = (data)=>{
        console.log(data)
        let body = ''
        for(let i = 0;i<data.length;i++){
            body += `<button onclick="mostrarDatosPorId(${data[i].id})">${data[i].name}</button>`
        }
        document.getElementById('cat').innerHTML = body
    }
  }

  //de aca llamare a las preguntas
  function mostrarDatosPorId(id) {
    const apiPreguntas = 'https://localhost:7204/api/v1/questions';
    fetch(apiPreguntas + '/' + id)
        .then(response => response.json())
        .then(data => mostrarDetalles(data))
        .catch(error => console.log(error));

    const mostrarDetalles = (data) => {
       
        console.log(data);
    }
}      