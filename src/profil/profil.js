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
    document.getElementById("name").textContent = doc.data().NAME;
    document.getElementById("kleidungsstück").textContent = doc.data().KATEGORIE;
    document.getElementById("farbe").textContent = doc.data().FARBE;
    document.getElementById("material").textContent = doc.data().MATERIAL;
    document.getElementById("marke").textContent = doc.data().MARKE;
    document.getElementById("größe").textContent = doc.data().GROESSE;
    document.getElementById("wäsche").textContent = doc.data().WAESCHE;
}

export default Profil;
