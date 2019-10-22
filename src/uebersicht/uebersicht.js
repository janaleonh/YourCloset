"use strict";

import stylesheet from "./uebersicht.css";


let _app = "";


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
    return;
  }

  onLeave(goon) {
    return true;
  }

  get title() {
    return "Uebersicht";
  }
}



export default uebersicht;
