"use strict";

import stylesheet from "./hinzufuegen.css";
import DB from "../database.js"


let _app = "";
let _db = "";



class Hinzufuegen {
  constructor(app) {
    this._app = app;
    _app = this._app;
    _db = app._db;
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
      document.getElementById("speicherHinzufuegen").addEventListener("click", () => { speichernEventListener() } );
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

        console.log(kleidungNeu);
        _db.kleidungHinzufuegen(kleidungNeu).then(() => {
            document.getElementById("inputID").value = "";
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

export default Hinzufuegen;
