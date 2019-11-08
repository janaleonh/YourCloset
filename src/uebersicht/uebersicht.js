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
    //EventListener
      document.getElementById("nameTH").addEventListener("click", sortEventListener );
      document.getElementById("markeTH").addEventListener("click", sortEventListener );
      document.getElementById("farbeTH").addEventListener("click", sortEventListener );
      document.getElementById("materialTH").addEventListener("click", sortEventListener );
      document.getElementById("suchButton").addEventListener("click", sortEventListener );
      document.getElementById("kategorieTH").addEventListener("click", sortEventListener );

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
    //Einfügen des Kleidungsstückes//
    //Einfügen von neuer Zeile an erster Stelle in der Tabelle //
    let neueTr = document.getElementById("table").insertRow();
    //erzeugen der Tabellenspalten//
    let tdName = document.createElement("td");
    let tdMarke = document.createElement("td");
    let tdFarbe = document.createElement("td");
    let tdMaterial = document.createElement("td");
    tdMaterial.classList.add("mobilAusblenden");
    let tdKategorie = document.createElement("td");
    let tdLoeschen = document.createElement("td");

    //befüllen der Spalten//
    tdName.innerHTML = name;
    tdMarke.innerHTML = marke;
    tdFarbe.innerHTML = farbe;
    tdMaterial.innerHTML  = material;
    tdKategorie.innerHTML = kategorie;

    if(kategorie=="Hose"){
    tdKategorie.classList.add("hoseKlasse");
  }if (kategorie== "Shirt"){
    tdKategorie.classList.add("shirtKlasse");
  }if (kategorie== "Kleid"){
    tdKategorie.classList.add("kleidKlasse");
  }if(kategorie=="Pullover"){
    tdKategorie.classList.add("pulloverKlasse");
  }if(kategorie=="Bluse"){
    tdKategorie.classList.add("bluseKlasse");
  }if(kategorie=="Jacke"){
    tdKategorie.classList.add("jackeKlasse");
  }
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
        tabLoeschen();
            anzeigen();
      });
    }
  });

//NACHFOLGENDE ZEILEN WERDEN NICHT BENÖTIGT

  // for(let i = 1; i<5; i++){
  //     //erzeugen der Tabellenspalten//
  //     let tdKleidung = document.createElement("td");
  //
  //     tdKleidung.innerHTML = " ";
  //
  //     //Hinzufügen von Klasse "Kleidung"//
  //     tdKleidung.classList.add("kleidung");
  //
  //     //hinzufügen der Spalten //
  //     neueTr.appendChild(tdKleidung);
  // }





}

function anzeigen(){
    _db.kleidungSortierenAufsteigend("KATEGORIE").then(function (querySnapshot){
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

let sortEventListener = (event) =>{

    if (event.target == document.getElementById("nameTH")){

  tabLoeschen();
  _db.kleidungSortierenAufsteigend("NAME").then(function (querySnapshot){
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
if (event.target == document.getElementById("markeTH")){
tabLoeschen();
_db.kleidungSortierenAufsteigend("MARKE").then(function (querySnapshot){
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
if (event.target == document.getElementById("farbeTH")){
tabLoeschen();
_db.kleidungSortierenAufsteigend("FARBE").then(function (querySnapshot){
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
if (event.target == document.getElementById("materialTH")){
tabLoeschen();
_db.kleidungSortierenAufsteigend("MATERIAL").then(function (querySnapshot){
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
if (event.target == document.getElementById("kategorieTH")){
tabLoeschen();
_db.kleidungSortierenAufsteigend("KATEGORIE").then(function (querySnapshot){
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
if (event.target == document.getElementById("suchButton")){
  if (!emptySuche()){
  let suchParameter = document.getElementById("suchBegriff").value;
  console.log(suchBegriff);
  let suchAspekt = document.getElementById("suchAspekt").value;
  console.log(suchAspekt);
  tabLoeschen();
    _db.kleidungDurchsuchen(suchAspekt,suchParameter).then(function (querySnapshot){
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
}
}

  function emptySuche(){
    let sucheEmpty = false;
    if(document.getElementById("suchBegriff").value == ""){
      alert("Bitte einen Suchbegriff eingeben!");
      sucheEmpty = true;
      console.log("Suchbegriff leer");
    }
    if(document.getElementById("suchAspekt").value == ""){
      alert("Bitte Kategorie, die durchsucht werden soll, angeben!");
      sucheEmpty = true;
      console.log("Suchaspekt leer");
    }
    return sucheEmpty;
  }

  function tabLoeschen() {
    var rowCount = document.getElementById("table").rows.length;
    var element = document.getElementById("table");
    for(let i = 1; i < rowCount; rowCount--) {
        element.deleteRow(rowCount-1);
  }
}


export default Uebersicht;
