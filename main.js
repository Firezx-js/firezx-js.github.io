window.addEventListener("DOMContentLoaded", function(){
    
//SERVICE WORKER
    if('serviceWorker' in navigator){
        navigator.serviceWorker
        .register('sw.js')
        .then(res => console.log('Se registro correctamente el service worker'))
        .catch(err => console.log('No se registro el service worker :c'))
    }

//INSTALAR APP 
let eventInstall;
let install = document.querySelector(".install");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    eventInstall = e;
    ShowInstallButton();
})

//COMPARTIR LA APP
let share = document.querySelector('.share');
if(share != undefined){
    console.log('test')
    if(navigator.share){

        share.addEventListener('click', e => {
            let dataShare = {title: 'Kimetsu no Yaiba', text: 'App Kimetsu', url: 'http://localhost/app/index.html'}
            navigator.share(dataShare)
            .then(res => {
                console.log('Compartir App')
            })
        } )

    }else{
        console.log('NO es compatible');
        share.style.display = 'none';
    }
}


let ShowInstallButton = () => {
    if(install != undefined){
        install.style.display = "inline-block";
        install.addEventListener("click", InstallApp)
    }
}

let InstallApp = () => {
    if(eventInstall){
        eventInstall.prompt();
        eventInstall.userChoice
        .then((res) => {
            if(res.outcome == "accepted"){
                console.log("El usuario descargo la app");
                install.style.display = "none";
            }else{
                console.log("El usuario no descargo la app");
            }
        })
    }
}     

//CARGAR EL ARCHIVO JSON    
    fetch('data/personajes.json')
        .then(response => response.json())
        .then(data => {
            //ACCEDER A LOS DATOS DEL ARCHIVO JSON
            const lunasSuperiores = data.lunas_superiores;
            const pilares = data.pilares;
            const protagonistas = data.protagonistas;

            //MOSTRAR INFO DE LUNAS SUPERIORES
            const lunasSuperioresList = document.querySelector('#lunas-superiores-list');
            let HTMLLunas = '';
            lunasSuperiores.forEach(personaje => {
                HTMLLunas += `
                <div class="row h_100 align-content-center align-items-center">
                  <div class="col-sm-12 col-md-12 col-lg-6">
                    <h2 class="text-white text-uppercase">${personaje.titulo}</h2>
                    <p class="texto">${personaje.descripcion}</p>
                    <a href="personaje.html?id=${personaje.id}" class="btn btn-outline-info mb-5">Ver mas</a>
                  </div>
                  <div class="col-sm-12 col-md-12 col-lg-6 text-center">
                    <img class="img-fluid" src="${personaje.img}" alt="${personaje.nombre}" width="">     
                  </div>
                </div>
                `;
            });
            lunasSuperioresList.innerHTML = HTMLLunas;

            //MOSTRAR INFO DE PILARES
            const pilaresList = document.querySelector('#pilares-list');
            let HTMLPilares = '';
            pilares.forEach(personaje => {
                HTMLPilares += `
                <div class="row h_100 align-content-center align-items-center">
                  <div class="col-sm-12 col-md-12 col-lg-6">
                    <h2 class="text-white text-uppercase">${personaje.titulo}</h2>
                    <p class="texto">${personaje.descripcion}</p>
                    <a href="personaje.html?id=${personaje.id}" class="btn btn-outline-info mb-5">Ver mas</a>
                  </div>
                  <div class="col-sm-12 col-md-12 col-lg-6 text-center">
                    <img class="img-fluid" src="${personaje.img}" alt="${personaje.nombre}" width="">     
                  </div>
                </div>
                `;
            });
            pilaresList.innerHTML = HTMLPilares;
            
            //MOSTRAR INFO DE PROTAGONISTAS
            const protagonistasList = document.querySelector('#protagonistas-list');
            let HTMLProtagonistas = '';
            protagonistas.forEach(personaje => {
                HTMLProtagonistas += `
                <div class="row h_100 align-content-center align-items-center">
                  <div class="col-sm-12 col-md-12 col-lg-6">
                    <h2 class="text-white text-uppercase">${personaje.titulo}</h2>
                    <p class="texto">${personaje.descripcion}</p>
                    <a href="personaje.html?id=${personaje.id}" class="btn btn-outline-info mb-5">Ver mas</a>
                  </div>
                  <div class="col-sm-12 col-md-12 col-lg-6 text-center">
                    <img class="img-fluid" src="${personaje.img}" alt="${personaje.nombre}" width="">     
                  </div>
                </div>
                `;
            });
            protagonistasList.innerHTML = HTMLProtagonistas;
            
            //MOSTRAR SECCION DE LUNAS SUPERIORES
            const btnLunasSuperiores = document.querySelector('#btn-lunas-superiores');
            btnLunasSuperiores.addEventListener('click', () => {
                const lunasSuperioresSection = document.querySelector('#lunas-superiores');
                const pilaresSection = document.querySelector('#pilares');
                const protagonistasSection = document.querySelector('#protagonistas');
                lunasSuperioresSection.style.display = 'block';
                pilaresSection.style.display = 'none';
                protagonistasSection.style.display = 'none';
            });

            //MOSTRAR SECCION DE PILARES
            const btnPilares = document.querySelector('#btn-pilares');
            btnPilares.addEventListener('click', () => {
                const lunasSuperioresSection = document.querySelector('#lunas-superiores');
                const pilaresSection = document.querySelector('#pilares');
                const protagonistasSection = document.querySelector('#protagonistas');
                lunasSuperioresSection.style.display = 'none';
                pilaresSection.style.display = 'block';
                protagonistasSection.style.display = 'none';
            });

            //MOSTRAR SECCION DE PROTAGONISTAS
            const btnProtagonistas = document.querySelector('#btn-protagonistas');
            btnProtagonistas.addEventListener('click', () => {
                const lunasSuperioresSection = document.querySelector('#lunas-superiores');
                const pilaresSection = document.querySelector('#pilares');
                const protagonistasSection = document.querySelector('#protagonistas');
                lunasSuperioresSection.style.display = 'none';
                pilaresSection.style.display = 'none';
                protagonistasSection.style.display = 'block';
            });
        })
        .catch(error => console.log(error));
})