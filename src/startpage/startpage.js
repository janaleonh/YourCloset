"use strict";

import stylesheet from "./startpage.css";


let _app = "";


class Startpage {
  constructor(app) {
    this._app = app;
    _app = this._app;
    _db = app._db;
  }

  onShow() {
    // Anzuzeigende HTML-Elemente ermitteln
    let section = document.querySelector("#startpage").cloneNode(true);


    return {
        className: "startpage",
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
    return "Startpage";
  }
}

startButton(){
  showUebersicht();
}



export default startpage;
