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
});

function getData() {
    const app = initializeApp(firebaseConfig);
    const dbRef = ref(getDatabase(app));
    const formPrim = document.querySelector('#primeros');
    const formSegu = document.querySelector('#segundos');
    const formPost = document.querySelector('#postres');
    const formFijo = document.querySelector('#fijos');

    get(child(dbRef, '/')).then((snapshot) => {
        if (snapshot.exists()) {
            const res = snapshot.val();
            const pri = res['menu-diario']['01-primeros']
            const seg = res['menu-diario']['02-segundos']
            const pos = res['menu-diario']['03-postres']
            const fij = res['platos-fijos']

            for (let index = 0; index < pri.length; index++) {
                const element = pri[index];
                const p = document.createElement('p');
                const contenP = `<b>${element.nombre}&nbsp;</b>– ${element.precio} €`;
                p.innerHTML = contenP;

                if(element.nombre !== '') {
                    formPrim.append(p);
                }
            }

            for (let index = 0; index < seg.length; index++) {
                const element = seg[index];
                const p = document.createElement('p');
                const contenP = `<b>${element.nombre}&nbsp;</b>– ${element.precio} €`;
                p.innerHTML = contenP;

                if(element.nombre !== '') {
                    formSegu.append(p);
                }
            }

            for (let index = 0; index < pos.length; index++) {
                const element = pos[index];
                const p = document.createElement('p');
                const contenP = `<b>${element.nombre}&nbsp;</b>– ${element.precio} €`;
                p.innerHTML = contenP;

                if(element.nombre !== '') {
                    formPost.append(p);
                }
            }

            for (let index = 0; index < fij.length; index++) {
                const element = fij[index];
                const p = document.createElement('p');
                const contenP = `<span><b>${element.nombre}&nbsp;</b></span><span>${element.precio} €</span>`;
                p.innerHTML = contenP;

                if(element.nombre !== '') {
                    formFijo.append(p);
                }
            }

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}