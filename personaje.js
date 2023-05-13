window.addEventListener("DOMContentLoaded", function(){
    let lista = document.querySelector('#lista');
    let titulo = document.querySelector("#titulo");

    //OBTENEMOS LA URL ACTUAL Y LO ALMACENAMOS EN LA VARIABLE
    let urlString = window.location.href;

    //CREAMOS UNA NUEVA URL CON LA VARIABLE ALMACENADA
    let url = new URL(urlString);

    //OBTENEMOS EL VALOR DEL PARAMETRO ID DEL URL Y LO ALMACENAMOS EN LA NUEVA VARIABLE
    let personajeId = url.searchParams.get('id');

    //LLAMAMOS AL JSON CON EL ID
    fetch('data/personajes-'+personajeId+'.json')
    .then(res => res.json())
    .then(data => {
        titulo.innerHTML = data.title;
        let html = "";
        for (const personaje of data.caracter) {
            html += `
            <div class="col">
                <div class="card text-bg-dark">
                    <img src="${personaje.img}" class="card-img-top" alt="${personaje.nombre}">
                    <div class="card-body">
                        <h4 class="card-title">${personaje.nombre}</h4>
                        <p class="fw-bold">${personaje.info}</p>
                        <p class="card-text">${personaje.descripcion}</p>
                    </div>
                </div>
            </div>
            `;
        }
        lista.innerHTML = html;
    });
});
