
"use strict";

import stylesheet from "./hinzufuegen.css";
import DB from "../database.js"


let _app = "";
let _db = "";
let _id = "";
let _newClothing = "";



class Hinzufuegen {
  constructor(app, newClothing, id) {
    this._app = app;
    _app = this._app;
    _db = app._db;
    _id = id;
    _newClothing = newClothing;
  }

  onShow() {
    // Anzuzeigende HTML-Elemente ermitteln
    let section = document.querySelector("#hinzufuegen").cloneNode(true);

    return {
        className: "hinzufuegen",
        topbar: section.querySelectorAll("header > *"),
        main: section.querySelectorAll("main > *"),
    };
  }

  onLoad() {
      document.getElementById("speicherHinzufuegen").addEventListener("click", speichernEventListener );
      return;
  }

  onLeave(goon) {
    return true;
  }

  get title() {
    return "Hinzufuegen";
  }
}



let speichernEventListener = (event) =>
    {
      if(!checkEmptyInput()){
        let kleidungName = document.getElementById("inputName").value;
        let kleidungMarke = document.getElementById("inputMarke").value;
        let kleidungFarbe = document.getElementById("inputFarbe").value;
        let kleidungMaterial = document.getElementById("inputMaterial").value;
        let kleidungKategorie = document.getElementById("inputKategorie").value;
        let kleidungWaesche = document.getElementById("inputWasch").value;
        let kleidungGroesse = document.getElementById("inputGroe").value;

        let kleidungNeu = {
            "NAME": kleidungName,
            "MARKE": kleidungMarke,
            "FARBE": kleidungFarbe,
            "MATERIAL": kleidungMaterial,
            "KATEGORIE": kleidungKategorie,
            "WAESCHE": kleidungWaesche,
            "GROESSE": kleidungGroesse
        };

        if(_newClothing){

        console.log(kleidungNeu);
        _db.kleidungHinzufuegen(kleidungNeu).then(() => {
            //document.getElementById("inputID").value = "";
            document.getElementById("inputName").value = "";
            document.getElementById("inputMarke").value = "";
            document.getElementById("inputFarbe").value = "";
            document.getElementById("inputMaterial").value = "";
            document.getElementById("inputKategorie").value = "";
            document.getElementById("inputWasch").value = "";
            document.getElementById("inputGroe").value = "";
            _app._router.navigate("/uebersicht");
        });

      }else{

        _db.kleidungAktualisieren(_id, kleidungNeu).then(() => {
          //document.getElementById("inputID").value = "";
          document.getElementById("inputName").value = "";
          document.getElementById("inputMarke").value = "";
          document.getElementById("inputFarbe").value = "";
          document.getElementById("inputMaterial").value = "";
          document.getElementById("inputKategorie").value = "";
          document.getElementById("inputWasch").value = "";
          document.getElementById("inputGroe").value = "";
          _app._router.navigate("/uebersicht");
      });
      }
    }
  }
  function checkEmptyInput(){
              var isEmpty = false,
                  name = document.getElementById("inputName").value,
                  marke = document.getElementById("inputMarke").value,
                  farbe = document.getElementById("inputFarbe").value,
                  material = document.getElementById("inputMaterial").value,
                  kategorie = document.getElementById("inputKategorie").value,
                  waesche = document.getElementById("inputWasch").value,
                  groesse = document.getElementById("inputGroe").value;

                  console.log(name);

              if(name === ""){
                  alert("Bitte einen Namen eingeben!");
                  isEmpty = true;
              }  else if(marke === ""){
                  alert("Bitte eine Marke eingeben!");
                  isEmpty = true;
              } else if(farbe === ""){
                  alert("Bitte eine Farbe eingeben!");
                  isEmpty = true;
              } else if(material === ""){
                 alert("Bitte ein Material eingeben!");
                 isEmpty = true;
             } else if(kategorie === ""){
                 alert("Bitte eine Kategorie eingeben!");
                 isEmpty = true;
             }  else if(waesche === ""){
                  alert("Bitte einen Pflegehinweis eingeben!");
                  isEmpty = true;
             }   else if(groesse === ""){
                  alert("Bitte eine Größe eingeben!");
                  isEmpty = true;
              }

              return isEmpty;
          }

export default Hinzufuegen;
