"use strict";

import stylesheet from "./hinzufuegen.css";


let _app = "";


class Hinzufuegen {
  constructor(app) {
    this._app = app;
    _app = this._app;

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
    return;
  }

  onLeave(goon) {
    return true;
  }

  get title() {
    return "Hinzufuegen";
  }
}



export default Hinzufuegen;
