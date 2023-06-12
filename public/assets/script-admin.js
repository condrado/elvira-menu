// import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getDatabase, ref, child, get, set, push, update } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { ref as sRef } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js';

var firebaseConfig = {
    apiKey: "AIzaSyArZ_BLUahNpw3ZcpGK04FLDAeb6sIIHKU",
    authDomain: "elvira-menu.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://elvira-menu-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "elvira-menu",
    storageBucket: "elvira-menu.appspot.com"
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
};

document.addEventListener('DOMContentLoaded', function() {
    getData();
    writeUserData()
});

function getData() {
    const app = initializeApp(firebaseConfig);
    const dbRef = ref(getDatabase(app));
    const formPrim = document.querySelector('#priemros');
    const formSegu = document.querySelector('#segundos');
    const formPost = document.querySelector('#postres');
    const formFijo = document.querySelector('#platos-fijos');
    const formDate = document.querySelector('#date-menu');

    get(child(dbRef, '/')).then((snapshot) => {
        if (snapshot.exists()) {
            const res = snapshot.val();
            const pri = res['menu-diario']['01-primeros']
            const seg = res['menu-diario']['02-segundos']
            const pos = res['menu-diario']['03-postres']
            const fij = res['platos-fijos']
            const dat = res['fecha-menu']

            for (let index = 0; index < pri.length; index++) {
                const element = pri[index];
                const inputN = document.createElement('input');
                const inputP = document.createElement('input');
                inputN.setAttribute('type', 'text')
                inputN.classList.add('pure-input-3-4');
                inputP.setAttribute('type', 'text')
                inputP.classList.add('pure-input-1-4');
                const div = document.createElement('div');
                div.classList.add('row');
                inputN.value = element.nombre;
                inputP.value = element.precio;


                div.append(inputN);
                div.append(inputP);
                formPrim.append(div);
            }

            for (let index = 0; index < seg.length; index++) {
                const element = seg[index];
                const inputN = document.createElement('input');
                const inputP = document.createElement('input');
                inputN.setAttribute('type', 'text')
                inputN.classList.add('pure-input-3-4');
                inputP.setAttribute('type', 'text')
                inputP.classList.add('pure-input-1-4');
                const div = document.createElement('div');
                div.classList.add('row');
                inputN.value = element.nombre;
                inputP.value = element.precio;


                div.append(inputN);
                div.append(inputP);
                formSegu.append(div);
                
            }

            for (let index = 0; index < pos.length; index++) {
                const element = pos[index];
                const inputN = document.createElement('input');
                const inputP = document.createElement('input');
                inputN.setAttribute('type', 'text')
                inputN.classList.add('pure-input-3-4');
                inputP.setAttribute('type', 'text')
                inputP.classList.add('pure-input-1-4');
                const div = document.createElement('div');
                div.classList.add('row');
                inputN.value = element.nombre;
                inputP.value = element.precio;


                div.append(inputN);
                div.append(inputP);
                formPost.append(div);
            }

            for (let index = 0; index < fij.length; index++) {
                const element = fij[index];
                const inputN = document.createElement('input');
                const inputP = document.createElement('input');
                inputN.setAttribute('type', 'text')
                inputN.classList.add('pure-input-3-4');
                inputP.setAttribute('type', 'text')
                inputP.classList.add('pure-input-1-4');
                const div = document.createElement('div');
                div.classList.add('row');
                inputN.value = element.nombre;
                inputP.value = element.precio;


                div.append(inputN);
                div.append(inputP);
                formFijo.append(div);
            }

            formDate.value = dat;

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function writeUserData() {
    const guardar = document.querySelector('#guardar');

    guardar.addEventListener('click', function() {
        const app = initializeApp(firebaseConfig);
        const dbRef = getDatabase(app);
        const updates = {};
        const formPrim = document.querySelector('#priemros');
        const formPrimDiv = formPrim.querySelectorAll('.row')
        const formSegu = document.querySelector('#segundos');
        const formSegumDiv = formSegu.querySelectorAll('.row')
        const formPost = document.querySelector('#postres');
        const formPostDiv = formPost.querySelectorAll('.row')
        const formFijo = document.querySelector('#platos-fijos');
        const formFijoDiv = formFijo.querySelectorAll('.row');
        const formDate = document.querySelector('#date-menu');
        
        for (let index = 0; index < formPrimDiv.length; index++) {
            const element = formPrimDiv[index];
            const inputs = element.querySelectorAll('input')

            updates[`menu-diario/01-primeros/${index}/nombre`] = inputs[0].value;
            updates[`menu-diario/01-primeros/${index}/precio`] = inputs[1].value;
        }

        for (let index = 0; index < formSegumDiv.length; index++) {
            const element = formSegumDiv[index];
            const inputs = element.querySelectorAll('input')

            updates[`menu-diario/02-segundos/${index}/nombre`] = inputs[0].value;
            updates[`menu-diario/02-segundos/${index}/precio`] = inputs[1].value;
            
        }

        for (let index = 0; index < formPostDiv.length; index++) {
            const element = formPostDiv[index];
            const inputs = element.querySelectorAll('input')

            updates[`menu-diario/03-postres/${index}/nombre`] = inputs[0].value;
            updates[`menu-diario/03-postres/${index}/precio`] = inputs[1].value;
        }

        for (let index = 0; index < formFijoDiv.length; index++) {
            const element = formFijoDiv[index];
            const inputs = element.querySelectorAll('input')

            updates[`platos-fijos/${index}/nombre`] = inputs[0].value;
            updates[`platos-fijos/${index}/precio`] = inputs[1].value;
        }

        updates['fecha-menu'] = formDate.value;
    
        update(ref(dbRef), updates);
        location.reload()
    });
  }
