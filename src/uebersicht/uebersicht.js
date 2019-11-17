"use strict";

import stylesheet from "./uebersicht.css";
import DB from "../database.js";


let _app = "";
let _db="";
let _name = false;
let _marke = false;
let _farbe = false;
let _material = false;
let _kategorie = false;


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
  tdFarbe.classList.add("mobilAusblenden");
  let tdMaterial = document.createElement("td");
  tdMaterial.classList.add("mobilAusblenden");
  let tdKategorie = document.createElement("td");
  let tdLoeschen = document.createElement("td");
    tdLoeschen.classList.add("loeschenHover");

  //befüllen der Spalten//
  tdName.innerHTML = name;
  tdMarke.innerHTML = marke;
  tdFarbe.innerHTML = farbe;
  tdMaterial.innerHTML  = material;
  tdKategorie.innerHTML = kategorie;

//Hinzufügen der zugehörigen Klasse (abhängig von Kategorie), um richtiges Icon anzeigen zu können
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
//Anzeigen aller Kleidungsstücke
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

//Sortieren der Kleidungsstücke, je nachdem welche th geclickt wurde
let sortEventListener = (event) =>{
//Sortieren nach Name
  if (event.target == document.getElementById("nameTH")){
    tabLoeschen();
    if(_name == true){
      _name = false;
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
    }else{
    _name = true;
    _db.kleidungSortierenAbsteigend("NAME").then(function (querySnapshot){
      querySnapshot.forEach(function (doc){
        let name= doc.data().NAME;
        let marke= doc.data().MARKE;
        let farbe= doc.data().FARBE;
        let material= doc.data().MATERIAL;
        let kategorie= doc.data().KATEGORIE;
        einfügen(name, marke,farbe, material, kategorie, doc.id);
      });
    });
    console.log("nach allem in else");
  }
}
  //Sortieren nach Marke
  if (event.target == document.getElementById("markeTH")){
    tabLoeschen();
    if(_marke == true){
      _marke = false;
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
    }else{
      _marke = true;
      _db.kleidungSortierenAbsteigend("MARKE").then(function (querySnapshot){
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
  //Sortieren nach Farbe
  if (event.target == document.getElementById("farbeTH")){
    tabLoeschen();
    if (_farbe == false){
      _farbe = true;
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
    }else{
      _farbe = false;
      _db.kleidungSortierenAbsteigend("FARBE").then(function (querySnapshot){
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
  //Sortieren nach Material
  if (event.target == document.getElementById("materialTH")){
    tabLoeschen();
    if (_material==false){
      _material = true;

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
    }else{
      _material = false;

      _db.kleidungSortierenAbsteigend("FARBE").then(function (querySnapshot){
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
  //Sortieren nach Kategorie
  if (event.target == document.getElementById("kategorieTH")){
    tabLoeschen();
    if (_kategorie== false){
      _kategorie=true;

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
    }else{
      _kategorie=false;

      _db.kleidungSortierenAbsteigend("KATEGORIE").then(function (querySnapshot){
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
  //Durchsuchen der Tabelle nach Suchbegriff
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

//Überprüfen ob Suchfeld leer ist
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

//Löschen der Tabelle
function tabLoeschen() {
  var rowCount = document.getElementById("table").rows.length;
  var element = document.getElementById("table");
  for(let i = 1; i < rowCount; rowCount--) {
    element.deleteRow(rowCount-1);
  }
}



export default Uebersicht;
