"use strict";

import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCpc2YxhynIi_4_o5huNR4D4yNoXCkxNUE",
    authDomain: "yourcloset-1b566.firebaseapp.com",
    databaseURL: "https://yourcloset-1b566.firebaseio.com",
    projectId: "yourcloset-1b566",
    storageBucket: "yourcloset-1b566.appspot.com",
    messagingSenderId: "198154297388",
    appId: "1:198154297388:web:0281b7da1908042c2ef189"
};

let _db = "";


class DB {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        _db = firebase.firestore();
    }

    selectAllKleidung(){
        return _db.collection("kleidung").orderBy("NAME", "asc").get();
    }

    kleidungHinzufuegen(kleidung){
        return _db.collection("kleidung").add(kleidung);
    }

    kleidungLoeschen(id){
        return _db.collection("kleidung").doc(id).delete();
    }

    kleidungAuslesen(id){
        return _db.collection("kleidung").doc(id).get();
    }

    kleidungAktualisieren(id, kleidung){
        return _db.collection("kleidung").doc(id).update(kleidung);
    }
    kleidungSortierenAufsteigend(sortierParameter){

      console.log(sortierParameter);
      return _db.collection("kleidung").orderBy(sortierParameter, "asc").get();
    }
    kleidungSortierenAbsteigend(sortierParameter){

      return _db.collection("kleidung").orderBy(sortierParameter, "desc").get();
    }
    kleidungDurchsuchen(suchAspekt,suchParameter){
    return  _db.collection("kleidung").where(suchAspekt, "==", suchParameter).get();
    }

}

export default DB;
