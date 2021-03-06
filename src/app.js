"use strict";
/*Main Class of Application*/

import stylesheet from "./app.css";
import Navigo from "navigo/lib/navigo.js";
import Uebersicht from "./uebersicht/uebersicht.js";
import Hinzufuegen from "./hinzufuegen/hinzufuegen.js";
import Startpage from "./startpage/startpage.js";
import Profil from "./profil/profil.js";
import DB from "./database.js";
import { runInThisContext } from "vm";



class App {
  constructor() {
    this._title = "YourCloset";
    this._currentView = null;

    //Single Page Router initialiesieren
    this._router = new Navigo();
    this._currentUrl = "";
    this._navAborted = false;
    this._db = new DB();


    this._router.on({
      "*":                    () => this.showStartpage(),
      "/":                    () => this.showStartpage(),
      "/uebersicht":          () => this.showUebersicht(),
      "/hinzufuegen":         () => this.showHinzufuegen(true, ""),
      "/bearbeiten/:id": (params) => this.showHinzufuegen(false, params.id),
      "/start":               () => this.showStartpage(),
      "/profil/:id":    (params) => this.showProfil(params.id),

    });

    this._router.hooks({
      after: (params) => {
        if(!this._navAborted) {
          this._currentUrl = this._router.lastRouteResolved().url;
        } else {
          this._router.pause(true);
          this._router.navigate(this._currentUrl);
          this._router.pause(false);
          this._navAborted = false;
        }
      }
    });
  }

  start() {
    console.log("App started successfully :)");
    this._router.resolve();
  }

  showStartpage() {
    let view = new Startpage(this);
    this._switchVisibleView(view);
  }


  showUebersicht() {
    console.log("übersicht");
    let view = new Uebersicht(this);
    this._switchVisibleView(view);
  }

  showHinzufuegen(newClothing, id) {
    console.log("hinzufügen");
    let view = new Hinzufuegen(this, newClothing, id);
    this._switchVisibleView(view);
  }

  showProfil(id) {
    console.log("profil");
    let view = new Profil(this,id);
    this._switchVisibleView(view);
  }

  _switchVisibleView(view) {
    let newUrl = this._router.lastRouteResolved().url;
    let goon = () => {
      this._router.navigate(newUrl + "?goon");
    }

    if(this._currentView && !this._currentView.onLeave(goon)) {
      this._navAborted = true;
      return false;
    }

    document.title = `${this._title} - ${view.title}`;
    this._currentView = view;
    this._switchVisibleContent(view.onShow());
    view.onLoad();
    return true;
  }

  _switchVisibleContent(content) {
    // <header> und <main> des HTML-Grundgerüsts ermitteln
    let app = document.querySelector("#app");
    let header = document.querySelector("#app > header");
    let main = document.querySelector("#app > main");

    // Zuvor angezeigte Inhalte entfernen
    // Bei der Topbar nur die untere Zeile, im Hauptbereich alles!
    app.className = "";
    header.querySelectorAll(".bottom").forEach(e => e.parentNode.removeChild(e));
    main.innerHTML = "";

    // CSS-Klasse übernehmen, um die viewspezifischen CSS-Regeln zu aktivieren
    if (content && content.className) {
        app.className = content.className;
    }

    // Neue Inhalte der Topbar einfügen
    if (content && content.topbar) {
        content.topbar.forEach(element => {
            element.classList.add("bottom");
            header.appendChild(element);
        });
    }

    // Neue Inhalte des Hauptbereichs einfügen
    if (content && content.main) {
        content.main.forEach(element => {
            main.appendChild(element);
        });
    }
    // Navigo an die Links in der View binden
    this._router.updatePageLinks();
    //end of _switchVisibleContent
  }
}

export default App;
