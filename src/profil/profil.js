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
    document.getElementById("bearbButton").addEventListener("click", () => {
      document.getElementById("inputName").value = document.getElementById("name").textContent;
      document.getElementById("inputMarke").value = document.getElementById("marke").textContent;
      document.getElementById("inputFarbe").value = document.getElementById("farbe").textContent;
      document.getElementById("inputMaterial").value = document.getElementById("material").textContent;
      console.log(document.getElementById("kategorie").textContent);
      document.getElementById(document.getElementById("kategorie").textContent).setAttribute('selected', true);

      document.getElementById("inputWasch").value = document.getElementById("pflegehinweis").textContent;
      document.getElementById("inputGroe").value = document.getElementById("größe").textContent;
      _app._router.navigate("/bearbeiten/" +  _id);

    });

    document.getElementById("loeschButton").addEventListener("click", () => {
      _db.kleidungLoeschen(_id).then(_app._router.navigate("/uebersicht"))
    });

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
    console.log("Finished loading!");
    document.getElementById("name").textContent = doc.data().NAME;
    document.getElementById("kategorie").textContent = doc.data().KATEGORIE;
    document.getElementById("farbe").textContent = doc.data().FARBE;
    document.getElementById("material").textContent = doc.data().MATERIAL;
    document.getElementById("marke").textContent = doc.data().MARKE;
    document.getElementById("größe").textContent = doc.data().GROESSE;
    document.getElementById("pflegehinweis").textContent = doc.data().WAESCHE;

    if(doc.data().KATEGORIE == "Hose"){
    document.getElementById("iconHose").classList.remove("hideIcon");
  }if(doc.data().KATEGORIE == "Jacke"){
      document.getElementById("iconJacke").classList.remove("hideIcon");
  }if(doc.data().KATEGORIE == "Pullover"){
      document.getElementById("iconPullover").classList.remove("hideIcon");
  }if(doc.data().KATEGORIE == "Bluse/Hemd"){
      document.getElementById("iconBluse").classList.remove("hideIcon");
  }if(doc.data().KATEGORIE == "Kleid"){
      document.getElementById("iconKleid").classList.remove("hideIcon");
  }if(doc.data().KATEGORIE == "Shirt"){
      document.getElementById("iconShirt").classList.remove("hideIcon");
    }
}


export default Profil;
