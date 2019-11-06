"use strict";

import stylesheet from "./uebersicht.css";
import DB from "../database.js";


let _app = "";
let _db="";


class Uebersicht {
  constructor(app) {
    this._app = app;
    _app = this._app;
    _db = app._db;
  }

  onShow() {
    // Anzuzeigende HTML-Elemente ermitteln
    let section = document.querySelector("#uebersicht").cloneNode(true);

    return {
        className: "uebersicht",
        topbar: section.querySelectorAll("header > *"),
        main: section.querySelectorAll("main > *"),
    };
  }

  onLoad() {
      anzeigen();


      return;

  }

  onLeave(goon) {
    return true;
  }

  get title() {
    return "Uebersicht";
  }
}

function einfügen (name, marke, farbe, material, kategorie, id){
    //Einfügen des KLeidungsstück//
    //Einfügen von neuer Zeile an erster Stelle in der Tabelle //
    let neueTr = document.getElementById("table").insertRow();


    //erzeugen der Tabellenspalten//
    let tdName = document.createElement("td");
    let tdMarke = document.createElement("td");
    let tdFarbe = document.createElement("td");
    let tdMaterial = document.createElement("td");
    let tdKategorie = document.createElement("td");
    let tdLoeschen = document.createElement("td");


    //tdLoeschen.type = "checkbox";

    //befüllen der Spalten//
    tdName.innerHTML = name; //a ref außenrum, navigopfad
    tdMarke.innerHTML = marke;
    tdFarbe.innerHTML = farbe;
    tdMaterial.innerHTML  = material;
    tdKategorie.innerHTML = kategorie;
    tdLoeschen.innerHTML = "🗑️";

    //hinzufügen der Spalten//
    neueTr.appendChild(tdName);
    neueTr.appendChild(tdMarke);
    neueTr.appendChild(tdFarbe);
    neueTr.appendChild(tdMaterial);
    neueTr.appendChild(tdKategorie);
    neueTr.appendChild(tdLoeschen);

    tdName.addEventListener("click", () => { _app._router.navigate("/profil/" + id) } );
    tdMarke.addEventListener("click", () => { _app._router.navigate("/profil/" + id) } );
    tdFarbe.addEventListener("click", () => { _app._router.navigate("/profil/" + id) } );
    tdMaterial.addEventListener("click", () => { _app._router.navigate("/profil/" + id) } );
    tdKategorie.addEventListener("click", () => { _app._router.navigate("/profil/" + id) } );
    tdLoeschen.addEventListener("click", () => {
      let answer = confirm("Soll der ausgewählte Eintrag gelöscht werden?");
      if(answer === true){
        _db.kleidungLoeschen(id).then(function() {
            var rowCount = document.getElementById("table").rows.length;
            var element = document.getElementById("table");
            for(let i = 1; i < rowCount; rowCount--) {
                element.deleteRow(rowCount-1);
            }
            anzeigen();

      });
    }});

    for(let i = 1; i<6; i++){
        //erzeugen der Tabellenspalten//
        let tdKleidung = document.createElement("td");

        tdKleidung.innerHTML = " ";

        //Hinzufügen von Klasse "Kleidung"//
        tdKleidung.classList.add("kleidung");

        //hinzufügen der Spalten //
        neueTr.appendChild(tdKleidung);
    }
}

function anzeigen(){
    _db.selectAllKleidung().then(function (querySnapshot){
        querySnapshot.forEach(function (doc){
            let name= doc.data().NAME;
            let marke= doc.data().MARKE;
            let farbe= doc.data().FARBE;
            let material= doc.data().MATERIAL;
            let kategorie= doc.data().KATEGORIE;
            einfügen(name, marke,farbe, material, kategorie, doc.id);
        });
    });
}


export default Uebersicht;


//jedes mal wenn neue tabellenzeile, h ref navigo link um zeile herum
// ziel ist yourcloset/profil/id
//
