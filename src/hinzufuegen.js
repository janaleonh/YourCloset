function speicherHinzuButton(){
  document.getElementById("hinzufuegen").classList.add("hidden");
  document.getElementById("uebersicht").classList.remove("hidden");
  /*brauch bei dem Tastendruck noch eine Funktion die mir die einträge selbst löscht und natürlich seite wirklich hinzufügt*/
  var trhtml = document.getElementById("tabellen_id").insertRow(nummer);
  tdhtml = document.createElement("td");
  tdhtml.innerHTML = 'content'
  trhtml.appendChild(tdhtml);

  function ad_row()
                {
                        var nummer = 1;
                        var tabellen_id = "t1";
                        var trhtml = document.getElementById( tabellen_id ).insertRow( nummer );
                        var tdhtml1 = document.createElement( "td" );
                        var tdhtml2 = document.createElement( "td" );
                        var tdhtml3 = document.createElement( "td" );
                        tdhtml1.innerHTML = ''; // content
                        tdhtml2.innerHTML = '';
                        tdhtml3.innerHTML = '';
                        trhtml.appendChild( tdhtml1 );
                        trhtml.appendChild( tdhtml2 );
                        trhtml.appendChild( tdhtml3 );
                }
}
