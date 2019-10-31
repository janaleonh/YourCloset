"use strict";

import stylesheet from "./profil.css";
import DB from "../database.js"


let _app = "";
let _db = "";
let _id = "";

class Profil {
    constructor(app,id) {
      this._app = app;
      _app = this._app;
      _db = app._db;
      _id = id;
    }

    onShow() {
      // Anzuzeigende HTML-Elemente ermitteln
      let section = document.querySelector("#profil").cloneNode(true);

      _db.kleidungAuslesen(_id).then(function(doc){
          console.log("Kleidung ausgelesen!")
          onFinishedLoading(doc);
      });

      return {
          className: "profil",
          topbar: section.querySelectorAll("header > *"),
          main: section.querySelectorAll("main > *"),
      };
    }

  onLoad() {
    return;
  }

  onLeave(goon) {
    return true;
  }

  get title() {
    return "Profil";
  }
}

let onFinishedLoading = (doc) => {
    console.log("Finished loading!");
    document.getElementById("name") = doc.data().NAME;
    document.getElementById("kleidungsstück") = doc.data().KATEGORIE;
    document.getElementById("farbe") = doc.data().FARBE;
    document.getElementById("material") = doc.data().MATERIAL;
    document.getElementById("marke") = doc.data().MARKE;
    document.getElementById("größe") = doc.data().GROESSE;
    document.getElementById("wäsche") = doc.data().WAESCHE;
}

export default Profil;
