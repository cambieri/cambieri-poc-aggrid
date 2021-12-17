import { Component } from '@angular/core';

import 'ag-grid-enterprise';
import { RenderActivity } from '../../theme/renderers/render-activity';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public localeText = {
    page: "Pagina",
    more: "Altre",
    to: "A",
    of: "Di",
    next: "Successivo",
    last: "Ultimo",
    first: "Primo",
    previous: "Precedente",
    loadingOoo: "Caricamento...",
    selectAll: "Seleziona tutto",
    searchOoo: "Ricerca...",
    blanks: "Vuoti",
    filterOoo: "Filtra...",
    lessThan: "Minore di",
    greaterThan: "Maggiore di",
    lessThanOrEqual: "Minore o uguale di",
    greaterThanOrEqual: "Maggiore o uguale di",
    inRange: "Nell'intervallo",
    andCondition: "E",
    orCondition: "O",
    group: "Gruppo",
    noRowsToShow: "Nessun record da visualizzare",

    //APPLICA / PULISCI FILTRI
    applyFilter: "Applica filtro",
    clearFilter: 'Pulisci valore filtro',

    //UGUALE / DIVERSO
    equals: "Uguale",
    notEqual: "Diverso",

    //CONTIENE / NON CONTIENE
    contains: "Contiene",
    notContains: "Non contiene",

    //INIZIA / FINISCE CON
    startsWith: "Inizia con",
    endsWith: "Finisce con",

    // FILTRI DATA IMPORT
    startsWithDate: "Data uguale a",
    endsWithTime: "Ora uguale a"
  }

  public filterParamsDate: any = {
    suppressAndOrCondition: true,
    applyButton: true,
    clearButton: true,
    includeBlanksInEquals: false,
    filterOptions: [
      {
        displayKey: 'equals',
        displayName: 'equals',
        test: function (filterValue: Date, cellValue: any) { //filterValue quello che scrivo / cellValue valore cella riga
          let splitted_date = cellValue.split('/');
          let dateCellValue = new Date(parseInt(splitted_date[2]), parseInt(splitted_date[1]) - 1, parseInt(splitted_date[0]), 0, 0, 0);
          return dateCellValue.toLocaleDateString() == filterValue.toLocaleDateString();
        }
      }
    ]
  };

  public filterObjID_Descr: any = {
    suppressAndOrCondition: true,
    filterOptions: [
      {
        displayKey: 'contains',
        displayName: 'contains',
        test: function (filterValue: any, cellValue: any) { //filterValue quello che scrivo / cellValue valore cella riga
          cellValue = cellValue.toLowerCase();
          filterValue = filterValue.toLowerCase();
          return cellValue.includes(filterValue);
        }
      }
    ]
  };

  cellStyleColumn = { "display": "flex!important", "justify-content": "center !important", "align-items": "center !important" };

  columnDefs = [
    {
      headerName: '', field: '', cellRenderer: RenderActivity, width: 50, cellStyle: function () {
        return { "display": "flex!important", "justify-content": "center!important", "align-items": "center!important", "padding": 0 };
      }
    },
    { field: 'idPdf', width: 130, sortable: true, filter: true, filterParams: this.filterObjID_Descr, cellStyle: this.cellStyleColumn, cellRenderer: "agGroupCellRenderer" },
    { headerName: 'Divisione', field: 'descDivisione', width: 130, sortable: true, filter: true, filterParams: this.filterObjID_Descr, cellStyle: this.cellStyleColumn },
    {
      headerName: "Cliente", field: 'cliente.valueFormatted', width: 350, sortable: true, filter: true, filterParams: this.filterObjID_Descr, cellStyle: this.cellStyleColumn
    },
    { field: 'tipo', sortable: true, filter: true, filterParams: this.filterObjID_Descr, cellStyle: this.cellStyleColumn },
    {
      headerName: "Richiedente", field: 'richiedente.valueFormatted', sortable: true, filter: true, filterParams: this.filterObjID_Descr, cellStyle: this.cellStyleColumn
    },
    {
      headerName: "Approvatore", field: 'approvatore.valueFormatted', sortable: true, filter: true, filterParams: this.filterObjID_Descr, cellStyle: this.cellStyleColumn
    },
    { field: 'livelloApprovatore', width: 220, sortable: true, filter: true, filterParams: this.filterObjID_Descr, cellStyle: this.cellStyleColumn },
    {
      headerName: "Stato", field: 'stato.descr', sortable: true, filter: true, cellStyle: function (params) {
        let colore = "white";
        if (params.data.stato.id === 'A') {
          colore = 'green';
        } else if (params.data.stato.id === 'R') {
          colore = 'red';
        }
        else if (params.data.stato.id === 'N') {
          colore = 'blue';
        }
        else {
          colore = 'grey';
        }
        return { "display": "flex!important", "justify-content": "center !important", "align-items": "center !important", "color": colore };
      }
      , filterParams: this.filterObjID_Descr
    },
    { field: 'dataInserimento', width: 210, sortable: true, type: 'dateColumn', filter: 'agDateColumnFilter', cellStyle: this.cellStyleColumn, filterParams: this.filterParamsDate },
    { field: 'dataApprovazione', width: 210, sortable: true, type: 'dateColumn', filter: 'agDateColumnFilter', cellStyle: this.cellStyleColumn, filterParams: this.filterParamsDate },
    {
      headerName: '', cellRenderer: 'customizedContrattoButtons', field: 'idPdf', filter: false, resizable: false, width: 130, cellStyle: function () {
        return { "display": "flex!important", "justify-content": "left !important", "align-items": "center !important" };
      }
    }
  ]

  rowData = [
    {
      "idPdf": "8590A6632Y",
      "cliente": {
        "id": "IT009117001B",
        "descr": "AUCHAN IPERMERCATI S.P.A.",
        "valueFormatted": "IT009117001B - AUCHAN IPERMERCATI S.P.A."
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "7724E",
        "descr": "DEMO-LG",
        "valueFormatted": "7724E - DEMO-LG"
      },
      "approvatore": {
        "id": "1389T",
        "descr": "Coleman Buck",
        "valueFormatted": "1389T - Coleman Buck"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "08/12/2018",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "8272A1945Y",
      "cliente": {
        "id": "5099A",
        "descr": "NIMON",
        "valueFormatted": "5099A - NIMON"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "5185E",
        "descr": "Ryan Castillo",
        "valueFormatted": "5185E - Ryan Castillo"
      },
      "approvatore": {
        "id": "4394T",
        "descr": "Daphne Collier",
        "valueFormatted": "4394T - Daphne Collier"
      },
      "stato": {
        "id": "A",
        "descr": "Approvato"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "18/04/2014",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 557,
        "duration": 90,
        "switchCode": "SW5",
        "direction": "In",
        "number": "(09) 76105491"
      }, {
        "name": "susan",
        "callId": 558,
        "duration": 83,
        "switchCode": "SW5",
        "direction": "In",
        "number": "(03) 72020613"
      }, {
        "name": "susan",
        "callId": 559,
        "duration": 94,
        "switchCode": "SW1",
        "direction": "In",
        "number": "(04) 98295709"
      }, {
        "name": "susan",
        "callId": 560,
        "duration": 102,
        "switchCode": "SW2",
        "direction": "Out",
        "number": "(07) 96771309"
      }, {
        "name": "susan",
        "callId": 561,
        "duration": 22,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(08) 38428058"
      }, {
        "name": "susan",
        "callId": 562,
        "duration": 88,
        "switchCode": "SW2",
        "direction": "Out",
        "number": "(02) 70137438"
      }, {
        "name": "susan",
        "callId": 563,
        "duration": 77,
        "switchCode": "SW5",
        "direction": "In",
        "number": "(06) 48756154"
      }, {
        "name": "susan",
        "callId": 564,
        "duration": 85,
        "switchCode": "SW5",
        "direction": "Out",
        "number": "(00) 11319412"
      }, {
        "name": "susan",
        "callId": 565,
        "duration": 82,
        "switchCode": "SW1",
        "direction": "In",
        "number": "(02) 37557264"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 567,
        "duration": 46,
        "switchCode": "SW0",
        "direction": "In",
        "number": "(09) 20489000"
      }, {
        "name": "susan",
        "callId": 568,
        "duration": 90,
        "switchCode": "SW0",
        "direction": "In",
        "number": "(04) 90652096"
      }, {
        "name": "susan",
        "callId": 569,
        "duration": 49,
        "switchCode": "SW2",
        "direction": "In",
        "number": "(00) 73342113"
      }, {
        "name": "susan",
        "callId": 570,
        "duration": 40,
        "switchCode": "SW0",
        "direction": "Out",
        "number": "(01) 79831695"
      }, {
        "name": "susan",
        "callId": 571,
        "duration": 105,
        "switchCode": "SW8",
        "direction": "In",
        "number": "(03) 28694433"
      }, {
        "name": "susan",
        "callId": 572,
        "duration": 64,
        "switchCode": "SW9",
        "direction": "In",
        "number": "(03) 8705515"
      }, {
        "name": "susan",
        "callId": 573,
        "duration": 44,
        "switchCode": "SW7",
        "direction": "In",
        "number": "(01) 180304"
      }, {
        "name": "susan",
        "callId": 574,
        "duration": 24,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(05) 33983060"
      }, {
        "name": "susan",
        "callId": 575,
        "duration": 40,
        "switchCode": "SW1",
        "direction": "In",
        "number": "(02) 4129807"
      }, {
        "name": "susan",
        "callId": 576,
        "duration": 24,
        "switchCode": "SW9",
        "direction": "Out",
        "number": "(01) 89806499"
      }, {
        "name": "susan",
        "callId": 577,
        "duration": 36,
        "switchCode": "SW5",
        "direction": "In",
        "number": "(09) 13139104"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "1141A2820Y",
      "cliente": {
        "id": "1252A",
        "descr": "PLASMOX",
        "valueFormatted": "1252A - PLASMOX"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "6545E",
        "descr": "Hewitt Adkins",
        "valueFormatted": "6545E - Hewitt Adkins"
      },
      "approvatore": {
        "id": "6816T",
        "descr": "Lilia Duran",
        "valueFormatted": "6816T - Lilia Duran"
      },
      "stato": {
        "id": "A",
        "descr": "Approvato"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "17/09/2014",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 557,
        "duration": 90,
        "switchCode": "SW5",
        "direction": "In",
        "number": "(09) 76105491"
      }, {
        "name": "susan",
        "callId": 558,
        "duration": 83,
        "switchCode": "SW5",
        "direction": "In",
        "number": "(03) 72020613"
      }, {
        "name": "susan",
        "callId": 559,
        "duration": 94,
        "switchCode": "SW1",
        "direction": "In",
        "number": "(04) 98295709"
      }, {
        "name": "susan",
        "callId": 560,
        "duration": 102,
        "switchCode": "SW2",
        "direction": "Out",
        "number": "(07) 96771309"
      }, {
        "name": "susan",
        "callId": 561,
        "duration": 22,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(08) 38428058"
      }, {
        "name": "susan",
        "callId": 562,
        "duration": 88,
        "switchCode": "SW2",
        "direction": "Out",
        "number": "(02) 70137438"
      }, {
        "name": "susan",
        "callId": 563,
        "duration": 77,
        "switchCode": "SW5",
        "direction": "In",
        "number": "(06) 48756154"
      }, {
        "name": "susan",
        "callId": 564,
        "duration": 85,
        "switchCode": "SW5",
        "direction": "Out",
        "number": "(00) 11319412"
      }, {
        "name": "susan",
        "callId": 565,
        "duration": 82,
        "switchCode": "SW1",
        "direction": "In",
        "number": "(02) 37557264"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 567,
        "duration": 46,
        "switchCode": "SW0",
        "direction": "In",
        "number": "(09) 20489000"
      }, {
        "name": "susan",
        "callId": 568,
        "duration": 90,
        "switchCode": "SW0",
        "direction": "In",
        "number": "(04) 90652096"
      }, {
        "name": "susan",
        "callId": 569,
        "duration": 49,
        "switchCode": "SW2",
        "direction": "In",
        "number": "(00) 73342113"
      }, {
        "name": "susan",
        "callId": 570,
        "duration": 40,
        "switchCode": "SW0",
        "direction": "Out",
        "number": "(01) 79831695"
      }, {
        "name": "susan",
        "callId": 571,
        "duration": 105,
        "switchCode": "SW8",
        "direction": "In",
        "number": "(03) 28694433"
      }, {
        "name": "susan",
        "callId": 572,
        "duration": 64,
        "switchCode": "SW9",
        "direction": "In",
        "number": "(03) 8705515"
      }, {
        "name": "susan",
        "callId": 573,
        "duration": 44,
        "switchCode": "SW7",
        "direction": "In",
        "number": "(01) 180304"
      }, {
        "name": "susan",
        "callId": 574,
        "duration": 24,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(05) 33983060"
      }, {
        "name": "susan",
        "callId": 575,
        "duration": 40,
        "switchCode": "SW1",
        "direction": "In",
        "number": "(02) 4129807"
      }, {
        "name": "susan",
        "callId": 576,
        "duration": 24,
        "switchCode": "SW9",
        "direction": "Out",
        "number": "(01) 89806499"
      }, {
        "name": "susan",
        "callId": 577,
        "duration": 36,
        "switchCode": "SW5",
        "direction": "In",
        "number": "(09) 13139104"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "5037A6477Y",
      "cliente": {
        "id": "2692A",
        "descr": "INRT",
        "valueFormatted": "2692A - INRT"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "8831E",
        "descr": "Charlene Acosta",
        "valueFormatted": "8831E - Charlene Acosta"
      },
      "approvatore": {
        "id": "2222T",
        "descr": "Denise Bradford",
        "valueFormatted": "2222T - Denise Bradford"
      },
      "stato": {
        "id": "W",
        "descr": "In lavorazione"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "11/08/2018",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 557,
        "duration": 90,
        "switchCode": "SW5",
        "direction": "In",
        "number": "(09) 76105491"
      }, {
        "name": "susan",
        "callId": 558,
        "duration": 83,
        "switchCode": "SW5",
        "direction": "In",
        "number": "(03) 72020613"
      }, {
        "name": "susan",
        "callId": 559,
        "duration": 94,
        "switchCode": "SW1",
        "direction": "In",
        "number": "(04) 98295709"
      }, {
        "name": "susan",
        "callId": 560,
        "duration": 102,
        "switchCode": "SW2",
        "direction": "Out",
        "number": "(07) 96771309"
      }, {
        "name": "susan",
        "callId": 561,
        "duration": 22,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(08) 38428058"
      }, {
        "name": "susan",
        "callId": 562,
        "duration": 88,
        "switchCode": "SW2",
        "direction": "Out",
        "number": "(02) 70137438"
      }, {
        "name": "susan",
        "callId": 563,
        "duration": 77,
        "switchCode": "SW5",
        "direction": "In",
        "number": "(06) 48756154"
      }, {
        "name": "susan",
        "callId": 564,
        "duration": 85,
        "switchCode": "SW5",
        "direction": "Out",
        "number": "(00) 11319412"
      }, {
        "name": "susan",
        "callId": 565,
        "duration": 82,
        "switchCode": "SW1",
        "direction": "In",
        "number": "(02) 37557264"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 567,
        "duration": 46,
        "switchCode": "SW0",
        "direction": "In",
        "number": "(09) 20489000"
      }, {
        "name": "susan",
        "callId": 568,
        "duration": 90,
        "switchCode": "SW0",
        "direction": "In",
        "number": "(04) 90652096"
      }, {
        "name": "susan",
        "callId": 569,
        "duration": 49,
        "switchCode": "SW2",
        "direction": "In",
        "number": "(00) 73342113"
      }, {
        "name": "susan",
        "callId": 570,
        "duration": 40,
        "switchCode": "SW0",
        "direction": "Out",
        "number": "(01) 79831695"
      }, {
        "name": "susan",
        "callId": 571,
        "duration": 105,
        "switchCode": "SW8",
        "direction": "In",
        "number": "(03) 28694433"
      }, {
        "name": "susan",
        "callId": 572,
        "duration": 64,
        "switchCode": "SW9",
        "direction": "In",
        "number": "(03) 8705515"
      }, {
        "name": "susan",
        "callId": 573,
        "duration": 44,
        "switchCode": "SW7",
        "direction": "In",
        "number": "(01) 180304"
      }, {
        "name": "susan",
        "callId": 574,
        "duration": 24,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(05) 33983060"
      }, {
        "name": "susan",
        "callId": 575,
        "duration": 40,
        "switchCode": "SW1",
        "direction": "In",
        "number": "(02) 4129807"
      }, {
        "name": "susan",
        "callId": 576,
        "duration": 24,
        "switchCode": "SW9",
        "direction": "Out",
        "number": "(01) 89806499"
      }, {
        "name": "susan",
        "callId": 577,
        "duration": 36,
        "switchCode": "SW5",
        "direction": "In",
        "number": "(09) 13139104"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "3489A8018Y",
      "cliente": {
        "id": "4742A",
        "descr": "SLOGANAUT",
        "valueFormatted": "4742A - SLOGANAUT"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "3631E",
        "descr": "Case Mcguire",
        "valueFormatted": "3631E - Case Mcguire"
      },
      "approvatore": {
        "id": "8153T",
        "descr": "Cherry Frye",
        "valueFormatted": "8153T - Cherry Frye"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "23/02/2019",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "4242A7402Y",
      "cliente": {
        "id": "9545A",
        "descr": "FIREWAX",
        "valueFormatted": "9545A - FIREWAX"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "7870E",
        "descr": "Kerr Perkins",
        "valueFormatted": "7870E - Kerr Perkins"
      },
      "approvatore": {
        "id": "5846T",
        "descr": "Kirk Gibson",
        "valueFormatted": "5846T - Kirk Gibson"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "15/08/2016",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "9305A3614Y",
      "cliente": {
        "id": "9527A",
        "descr": "EXOSWITCH",
        "valueFormatted": "9527A - EXOSWITCH"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "3919E",
        "descr": "Kimberly Pitts",
        "valueFormatted": "3919E - Kimberly Pitts"
      },
      "approvatore": {
        "id": "7652T",
        "descr": "Marsh Gaines",
        "valueFormatted": "7652T - Marsh Gaines"
      },
      "stato": {
        "id": "W",
        "descr": "In lavorazione"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "04/02/2014",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "2547A9862Y",
      "cliente": {
        "id": "8678A",
        "descr": "PRIMORDIA",
        "valueFormatted": "8678A - PRIMORDIA"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "7066E",
        "descr": "Concetta Davidson",
        "valueFormatted": "7066E - Concetta Davidson"
      },
      "approvatore": {
        "id": "1960T",
        "descr": "Rosario Delgado",
        "valueFormatted": "1960T - Rosario Delgado"
      },
      "stato": {
        "id": "A",
        "descr": "Approvato"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "24/01/2017",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "3384A1018Y",
      "cliente": {
        "id": "5323A",
        "descr": "ZYTREK",
        "valueFormatted": "5323A - ZYTREK"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "2465E",
        "descr": "Ashley Kirk",
        "valueFormatted": "2465E - Ashley Kirk"
      },
      "approvatore": {
        "id": "9973T",
        "descr": "Nikki Rodriquez",
        "valueFormatted": "9973T - Nikki Rodriquez"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "30/04/2018",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "6402A7789Y",
      "cliente": {
        "id": "9829A",
        "descr": "BEZAL",
        "valueFormatted": "9829A - BEZAL"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "8771E",
        "descr": "Harmon Rivas",
        "valueFormatted": "8771E - Harmon Rivas"
      },
      "approvatore": {
        "id": "5406T",
        "descr": "Nunez Robertson",
        "valueFormatted": "5406T - Nunez Robertson"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "21/03/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "6084A5810Y",
      "cliente": {
        "id": "1057A",
        "descr": "HAIRPORT",
        "valueFormatted": "1057A - HAIRPORT"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "7644E",
        "descr": "Mccullough Harrington",
        "valueFormatted": "7644E - Mccullough Harrington"
      },
      "approvatore": {
        "id": "3021T",
        "descr": "Crosby Crane",
        "valueFormatted": "3021T - Crosby Crane"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "05/05/2019",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "5981A3973Y",
      "cliente": {
        "id": "8836A",
        "descr": "GENESYNK",
        "valueFormatted": "8836A - GENESYNK"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "7695E",
        "descr": "Kaye Holden",
        "valueFormatted": "7695E - Kaye Holden"
      },
      "approvatore": {
        "id": "2081T",
        "descr": "Levine Pearson",
        "valueFormatted": "2081T - Levine Pearson"
      },
      "stato": {
        "id": "W",
        "descr": "In lavorazione"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "05/12/2014",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "8241A2969Y",
      "cliente": {
        "id": "9611A",
        "descr": "UTARIAN",
        "valueFormatted": "9611A - UTARIAN"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "9634E",
        "descr": "Hodge Nelson",
        "valueFormatted": "9634E - Hodge Nelson"
      },
      "approvatore": {
        "id": "2395T",
        "descr": "Melody Santos",
        "valueFormatted": "2395T - Melody Santos"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "07/04/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "6133A6516Y",
      "cliente": {
        "id": "1867A",
        "descr": "MITROC",
        "valueFormatted": "1867A - MITROC"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "8734E",
        "descr": "Eunice Fulton",
        "valueFormatted": "8734E - Eunice Fulton"
      },
      "approvatore": {
        "id": "5352T",
        "descr": "Mckee Turner",
        "valueFormatted": "5352T - Mckee Turner"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "15/08/2019",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "2373A1287Y",
      "cliente": {
        "id": "6448A",
        "descr": "LIMAGE",
        "valueFormatted": "6448A - LIMAGE"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "7096E",
        "descr": "Walter Petty",
        "valueFormatted": "7096E - Walter Petty"
      },
      "approvatore": {
        "id": "7442T",
        "descr": "Sexton Ashley",
        "valueFormatted": "7442T - Sexton Ashley"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "28/07/2019",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "6777A6601Y",
      "cliente": {
        "id": "3648A",
        "descr": "REMOTION",
        "valueFormatted": "3648A - REMOTION"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "2703E",
        "descr": "Santiago Mcmahon",
        "valueFormatted": "2703E - Santiago Mcmahon"
      },
      "approvatore": {
        "id": "8328T",
        "descr": "Staci Mercado",
        "valueFormatted": "8328T - Staci Mercado"
      },
      "stato": {
        "id": "A",
        "descr": "Approvato"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "24/07/2018",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "7707A8246Y",
      "cliente": {
        "id": "7966A",
        "descr": "QUONK",
        "valueFormatted": "7966A - QUONK"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "7543E",
        "descr": "Veronica Rowe",
        "valueFormatted": "7543E - Veronica Rowe"
      },
      "approvatore": {
        "id": "8541T",
        "descr": "Mayra Blankenship",
        "valueFormatted": "8541T - Mayra Blankenship"
      },
      "stato": {
        "id": "W",
        "descr": "In lavorazione"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "15/05/2019",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "9987A4323Y",
      "cliente": {
        "id": "8456A",
        "descr": "EXTRAGENE",
        "valueFormatted": "8456A - EXTRAGENE"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "4036E",
        "descr": "Gutierrez Oneil",
        "valueFormatted": "4036E - Gutierrez Oneil"
      },
      "approvatore": {
        "id": "8491T",
        "descr": "Tiffany Banks",
        "valueFormatted": "8491T - Tiffany Banks"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "01/07/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "2647A9901Y",
      "cliente": {
        "id": "9506A",
        "descr": "CAXT",
        "valueFormatted": "9506A - CAXT"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "4355E",
        "descr": "Leta Carter",
        "valueFormatted": "4355E - Leta Carter"
      },
      "approvatore": {
        "id": "5685T",
        "descr": "Vanessa Flores",
        "valueFormatted": "5685T - Vanessa Flores"
      },
      "stato": {
        "id": "A",
        "descr": "Approvato"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "28/10/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "1784A7623Y",
      "cliente": {
        "id": "3936A",
        "descr": "PARAGONIA",
        "valueFormatted": "3936A - PARAGONIA"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "5842E",
        "descr": "Goodman Kidd",
        "valueFormatted": "5842E - Goodman Kidd"
      },
      "approvatore": {
        "id": "4679T",
        "descr": "Lilly Stanley",
        "valueFormatted": "4679T - Lilly Stanley"
      },
      "stato": {
        "id": "W",
        "descr": "In lavorazione"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "07/04/2014",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "2573A6594Y",
      "cliente": {
        "id": "4628A",
        "descr": "ERSUM",
        "valueFormatted": "4628A - ERSUM"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "4786E",
        "descr": "Tanisha Mcdowell",
        "valueFormatted": "4786E - Tanisha Mcdowell"
      },
      "approvatore": {
        "id": "5284T",
        "descr": "Huff Estes",
        "valueFormatted": "5284T - Huff Estes"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "02/05/2019",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "4751A8847Y",
      "cliente": {
        "id": "1339A",
        "descr": "UNQ",
        "valueFormatted": "1339A - UNQ"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "2575E",
        "descr": "Aguilar Robbins",
        "valueFormatted": "2575E - Aguilar Robbins"
      },
      "approvatore": {
        "id": "7404T",
        "descr": "Tamra Harper",
        "valueFormatted": "7404T - Tamra Harper"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "24/09/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "5998A2294Y",
      "cliente": {
        "id": "2098A",
        "descr": "CUJO",
        "valueFormatted": "2098A - CUJO"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "4583E",
        "descr": "Glenna Cummings",
        "valueFormatted": "4583E - Glenna Cummings"
      },
      "approvatore": {
        "id": "9527T",
        "descr": "Nona Larson",
        "valueFormatted": "9527T - Nona Larson"
      },
      "stato": {
        "id": "W",
        "descr": "In lavorazione"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "27/02/2014",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "2714A1140Y",
      "cliente": {
        "id": "6301A",
        "descr": "FANGOLD",
        "valueFormatted": "6301A - FANGOLD"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "7440E",
        "descr": "Mercedes Lane",
        "valueFormatted": "7440E - Mercedes Lane"
      },
      "approvatore": {
        "id": "2399T",
        "descr": "Lawanda Montgomery",
        "valueFormatted": "2399T - Lawanda Montgomery"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "04/07/2019",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "8951A7663Y",
      "cliente": {
        "id": "6715A",
        "descr": "KYAGORO",
        "valueFormatted": "6715A - KYAGORO"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "2911E",
        "descr": "Cooke Forbes",
        "valueFormatted": "2911E - Cooke Forbes"
      },
      "approvatore": {
        "id": "5113T",
        "descr": "Santana Acevedo",
        "valueFormatted": "5113T - Santana Acevedo"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "01/09/2018",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "8687A9775Y",
      "cliente": {
        "id": "1695A",
        "descr": "GYNKO",
        "valueFormatted": "1695A - GYNKO"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "3210E",
        "descr": "Grace Brennan",
        "valueFormatted": "3210E - Grace Brennan"
      },
      "approvatore": {
        "id": "4208T",
        "descr": "Kay Roberts",
        "valueFormatted": "4208T - Kay Roberts"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "12/01/2018",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "9531A4133Y",
      "cliente": {
        "id": "3535A",
        "descr": "ISOLOGICA",
        "valueFormatted": "3535A - ISOLOGICA"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "4422E",
        "descr": "Claudine Burt",
        "valueFormatted": "4422E - Claudine Burt"
      },
      "approvatore": {
        "id": "4411T",
        "descr": "Soto Barlow",
        "valueFormatted": "4411T - Soto Barlow"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "21/09/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "8444A9116Y",
      "cliente": {
        "id": "5727A",
        "descr": "VIRVA",
        "valueFormatted": "5727A - VIRVA"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "7014E",
        "descr": "Valerie Casey",
        "valueFormatted": "7014E - Valerie Casey"
      },
      "approvatore": {
        "id": "5485T",
        "descr": "Deanne Freeman",
        "valueFormatted": "5485T - Deanne Freeman"
      },
      "stato": {
        "id": "A",
        "descr": "Approvato"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "08/04/2014",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "3156A1571Y",
      "cliente": {
        "id": "1421A",
        "descr": "VORATAK",
        "valueFormatted": "1421A - VORATAK"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "8141E",
        "descr": "Consuelo Reid",
        "valueFormatted": "8141E - Consuelo Reid"
      },
      "approvatore": {
        "id": "5965T",
        "descr": "Elsa Curry",
        "valueFormatted": "5965T - Elsa Curry"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "05/03/2017",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "9949A2683Y",
      "cliente": {
        "id": "4592A",
        "descr": "UTARA",
        "valueFormatted": "4592A - UTARA"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "9430E",
        "descr": "Conley Nash",
        "valueFormatted": "9430E - Conley Nash"
      },
      "approvatore": {
        "id": "9108T",
        "descr": "Janelle Hampton",
        "valueFormatted": "9108T - Janelle Hampton"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "06/05/2019",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "9480A7382Y",
      "cliente": {
        "id": "7264A",
        "descr": "KOZGENE",
        "valueFormatted": "7264A - KOZGENE"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "2517E",
        "descr": "Nieves Buckner",
        "valueFormatted": "2517E - Nieves Buckner"
      },
      "approvatore": {
        "id": "4818T",
        "descr": "Noel Mendoza",
        "valueFormatted": "4818T - Noel Mendoza"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "23/03/2017",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "5234A2698Y",
      "cliente": {
        "id": "4929A",
        "descr": "CYCLONICA",
        "valueFormatted": "4929A - CYCLONICA"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "2524E",
        "descr": "Kristina Lopez",
        "valueFormatted": "2524E - Kristina Lopez"
      },
      "approvatore": {
        "id": "9871T",
        "descr": "Long Reyes",
        "valueFormatted": "9871T - Long Reyes"
      },
      "stato": {
        "id": "W",
        "descr": "In lavorazione"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "29/08/2019",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "1390A9740Y",
      "cliente": {
        "id": "8502A",
        "descr": "XYQAG",
        "valueFormatted": "8502A - XYQAG"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "7682E",
        "descr": "Owen Barry",
        "valueFormatted": "7682E - Owen Barry"
      },
      "approvatore": {
        "id": "7928T",
        "descr": "Roach Kim",
        "valueFormatted": "7928T - Roach Kim"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "18/06/2016",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "5805A3456Y",
      "cliente": {
        "id": "1237A",
        "descr": "DELPHIDE",
        "valueFormatted": "1237A - DELPHIDE"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "6803E",
        "descr": "Walls Moreno",
        "valueFormatted": "6803E - Walls Moreno"
      },
      "approvatore": {
        "id": "4153T",
        "descr": "Marquez Stanton",
        "valueFormatted": "4153T - Marquez Stanton"
      },
      "stato": {
        "id": "W",
        "descr": "In lavorazione"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "10/10/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "1281A1166Y",
      "cliente": {
        "id": "7067A",
        "descr": "QNEKT",
        "valueFormatted": "7067A - QNEKT"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "4476E",
        "descr": "Kendra Henson",
        "valueFormatted": "4476E - Kendra Henson"
      },
      "approvatore": {
        "id": "6338T",
        "descr": "Mcguire Byers",
        "valueFormatted": "6338T - Mcguire Byers"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "30/07/2018",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "4671A9570Y",
      "cliente": {
        "id": "1403A",
        "descr": "AVENETRO",
        "valueFormatted": "1403A - AVENETRO"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "2189E",
        "descr": "Mejia Anthony",
        "valueFormatted": "2189E - Mejia Anthony"
      },
      "approvatore": {
        "id": "3565T",
        "descr": "Mcmahon Hinton",
        "valueFormatted": "3565T - Mcmahon Hinton"
      },
      "stato": {
        "id": "A",
        "descr": "Approvato"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "23/05/2016",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "7988A7305Y",
      "cliente": {
        "id": "3655A",
        "descr": "SPRINGBEE",
        "valueFormatted": "3655A - SPRINGBEE"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "7205E",
        "descr": "Gabrielle Baker",
        "valueFormatted": "7205E - Gabrielle Baker"
      },
      "approvatore": {
        "id": "7116T",
        "descr": "Millie Ortega",
        "valueFormatted": "7116T - Millie Ortega"
      },
      "stato": {
        "id": "W",
        "descr": "In lavorazione"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "06/03/2016",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "1371A6456Y",
      "cliente": {
        "id": "7239A",
        "descr": "GEOLOGIX",
        "valueFormatted": "7239A - GEOLOGIX"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "6642E",
        "descr": "Wise Dickson",
        "valueFormatted": "6642E - Wise Dickson"
      },
      "approvatore": {
        "id": "7201T",
        "descr": "Sandoval Pruitt",
        "valueFormatted": "7201T - Sandoval Pruitt"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "10/02/2017",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "9313A6527Y",
      "cliente": {
        "id": "2462A",
        "descr": "MEDIOT",
        "valueFormatted": "2462A - MEDIOT"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "4471E",
        "descr": "Ericka Paul",
        "valueFormatted": "4471E - Ericka Paul"
      },
      "approvatore": {
        "id": "2713T",
        "descr": "Jenifer Pratt",
        "valueFormatted": "2713T - Jenifer Pratt"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "25/06/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "6225A6004Y",
      "cliente": {
        "id": "5206A",
        "descr": "RECRISYS",
        "valueFormatted": "5206A - RECRISYS"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "5379E",
        "descr": "Guthrie Weiss",
        "valueFormatted": "5379E - Guthrie Weiss"
      },
      "approvatore": {
        "id": "6462T",
        "descr": "Cross Shepherd",
        "valueFormatted": "6462T - Cross Shepherd"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "30/05/2016",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "5165A4920Y",
      "cliente": {
        "id": "1176A",
        "descr": "FUELTON",
        "valueFormatted": "1176A - FUELTON"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "1660E",
        "descr": "Melton Morrow",
        "valueFormatted": "1660E - Melton Morrow"
      },
      "approvatore": {
        "id": "9083T",
        "descr": "Jami Franklin",
        "valueFormatted": "9083T - Jami Franklin"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "01/01/2017",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "8631A4027Y",
      "cliente": {
        "id": "8761A",
        "descr": "SLUMBERIA",
        "valueFormatted": "8761A - SLUMBERIA"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "2296E",
        "descr": "Anna Bennett",
        "valueFormatted": "2296E - Anna Bennett"
      },
      "approvatore": {
        "id": "4663T",
        "descr": "Dana Hubbard",
        "valueFormatted": "4663T - Dana Hubbard"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "08/04/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "8860A3415Y",
      "cliente": {
        "id": "3272A",
        "descr": "RODEOMAD",
        "valueFormatted": "3272A - RODEOMAD"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "4270E",
        "descr": "Nola Boone",
        "valueFormatted": "4270E - Nola Boone"
      },
      "approvatore": {
        "id": "7133T",
        "descr": "Chavez Hull",
        "valueFormatted": "7133T - Chavez Hull"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "24/05/2016",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "8505A3535Y",
      "cliente": {
        "id": "6006A",
        "descr": "IDETICA",
        "valueFormatted": "6006A - IDETICA"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "1719E",
        "descr": "Tisha Bowman",
        "valueFormatted": "1719E - Tisha Bowman"
      },
      "approvatore": {
        "id": "2555T",
        "descr": "Eula Wong",
        "valueFormatted": "2555T - Eula Wong"
      },
      "stato": {
        "id": "W",
        "descr": "In lavorazione"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "12/07/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "7256A8463Y",
      "cliente": {
        "id": "8367A",
        "descr": "DOGNOSIS",
        "valueFormatted": "8367A - DOGNOSIS"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "8956E",
        "descr": "Rena Blackburn",
        "valueFormatted": "8956E - Rena Blackburn"
      },
      "approvatore": {
        "id": "3864T",
        "descr": "Burns Stephenson",
        "valueFormatted": "3864T - Burns Stephenson"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "30/04/2019",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "4994A6066Y",
      "cliente": {
        "id": "8697A",
        "descr": "VIAGREAT",
        "valueFormatted": "8697A - VIAGREAT"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "4561E",
        "descr": "Langley Clarke",
        "valueFormatted": "4561E - Langley Clarke"
      },
      "approvatore": {
        "id": "7151T",
        "descr": "Duke Christian",
        "valueFormatted": "7151T - Duke Christian"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "05/06/2018",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "9069A7953Y",
      "cliente": {
        "id": "9062A",
        "descr": "MALATHION",
        "valueFormatted": "9062A - MALATHION"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "7869E",
        "descr": "Obrien Warner",
        "valueFormatted": "7869E - Obrien Warner"
      },
      "approvatore": {
        "id": "9980T",
        "descr": "Glover Mcconnell",
        "valueFormatted": "9980T - Glover Mcconnell"
      },
      "stato": {
        "id": "W",
        "descr": "In lavorazione"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "21/09/2018",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "8736A4525Y",
      "cliente": {
        "id": "7018A",
        "descr": "QUARX",
        "valueFormatted": "7018A - QUARX"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "5178E",
        "descr": "Tina Thomas",
        "valueFormatted": "5178E - Tina Thomas"
      },
      "approvatore": {
        "id": "8368T",
        "descr": "Oneil Dennis",
        "valueFormatted": "8368T - Oneil Dennis"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "15/01/2014",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "5795A8307Y",
      "cliente": {
        "id": "1500A",
        "descr": "SIGNIDYNE",
        "valueFormatted": "1500A - SIGNIDYNE"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "6771E",
        "descr": "Massey Murray",
        "valueFormatted": "6771E - Massey Murray"
      },
      "approvatore": {
        "id": "7019T",
        "descr": "Maritza Mayer",
        "valueFormatted": "7019T - Maritza Mayer"
      },
      "stato": {
        "id": "A",
        "descr": "Approvato"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "02/01/2014",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "8178A4677Y",
      "cliente": {
        "id": "7405A",
        "descr": "EZENT",
        "valueFormatted": "7405A - EZENT"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "9145E",
        "descr": "Chaney Lloyd",
        "valueFormatted": "9145E - Chaney Lloyd"
      },
      "approvatore": {
        "id": "4735T",
        "descr": "Barrera Dalton",
        "valueFormatted": "4735T - Barrera Dalton"
      },
      "stato": {
        "id": "A",
        "descr": "Approvato"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "20/11/2019",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "9198A6673Y",
      "cliente": {
        "id": "8810A",
        "descr": "CONCILITY",
        "valueFormatted": "8810A - CONCILITY"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "6104E",
        "descr": "Vonda Rosa",
        "valueFormatted": "6104E - Vonda Rosa"
      },
      "approvatore": {
        "id": "2812T",
        "descr": "Brenda Kane",
        "valueFormatted": "2812T - Brenda Kane"
      },
      "stato": {
        "id": "A",
        "descr": "Approvato"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "17/06/2014",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "8885A9803Y",
      "cliente": {
        "id": "4723A",
        "descr": "ELENTRIX",
        "valueFormatted": "4723A - ELENTRIX"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "3018E",
        "descr": "Wall Waller",
        "valueFormatted": "3018E - Wall Waller"
      },
      "approvatore": {
        "id": "5693T",
        "descr": "Morales Dejesus",
        "valueFormatted": "5693T - Morales Dejesus"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Director",
      "dataApprovazione": "01/03/2019",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "9065A1125Y",
      "cliente": {
        "id": "8257A",
        "descr": "ISOTRACK",
        "valueFormatted": "8257A - ISOTRACK"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "3478E",
        "descr": "Nixon Wolfe",
        "valueFormatted": "3478E - Nixon Wolfe"
      },
      "approvatore": {
        "id": "9713T",
        "descr": "Bryant Daniels",
        "valueFormatted": "9713T - Bryant Daniels"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "21/01/2017",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "6689A2137Y",
      "cliente": {
        "id": "8553A",
        "descr": "ANACHO",
        "valueFormatted": "8553A - ANACHO"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "6114E",
        "descr": "Meyers Shepard",
        "valueFormatted": "6114E - Meyers Shepard"
      },
      "approvatore": {
        "id": "1493T",
        "descr": "Francisca Malone",
        "valueFormatted": "1493T - Francisca Malone"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "27/02/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "3309A3959Y",
      "cliente": {
        "id": "1896A",
        "descr": "NIPAZ",
        "valueFormatted": "1896A - NIPAZ"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "2114E",
        "descr": "Levy Rivera",
        "valueFormatted": "2114E - Levy Rivera"
      },
      "approvatore": {
        "id": "3450T",
        "descr": "Magdalena Dyer",
        "valueFormatted": "3450T - Magdalena Dyer"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "18/11/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "7060A7712Y",
      "cliente": {
        "id": "1012A",
        "descr": "GAZAK",
        "valueFormatted": "1012A - GAZAK"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "9694E",
        "descr": "Juanita Ewing",
        "valueFormatted": "9694E - Juanita Ewing"
      },
      "approvatore": {
        "id": "4627T",
        "descr": "Leanna Estrada",
        "valueFormatted": "4627T - Leanna Estrada"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "17/06/2019",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "5563A4652Y",
      "cliente": {
        "id": "3410A",
        "descr": "STUCCO",
        "valueFormatted": "3410A - STUCCO"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "4110E",
        "descr": "Shelley Sanders",
        "valueFormatted": "4110E - Shelley Sanders"
      },
      "approvatore": {
        "id": "4709T",
        "descr": "Caldwell Sampson",
        "valueFormatted": "4709T - Caldwell Sampson"
      },
      "stato": {
        "id": "A",
        "descr": "Approvato"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "25/12/2015",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "3762A5267Y",
      "cliente": {
        "id": "1637A",
        "descr": "COMTRACT",
        "valueFormatted": "1637A - COMTRACT"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "5441E",
        "descr": "Kathy Murphy",
        "valueFormatted": "5441E - Kathy Murphy"
      },
      "approvatore": {
        "id": "7003T",
        "descr": "Morse Puckett",
        "valueFormatted": "7003T - Morse Puckett"
      },
      "stato": {
        "id": "W",
        "descr": "In lavorazione"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "29/08/2016",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "1160A5693Y",
      "cliente": {
        "id": "8374A",
        "descr": "DRAGBOT",
        "valueFormatted": "8374A - DRAGBOT"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "1893E",
        "descr": "Jewel Hebert",
        "valueFormatted": "1893E - Jewel Hebert"
      },
      "approvatore": {
        "id": "6264T",
        "descr": "Castaneda Fitzgerald",
        "valueFormatted": "6264T - Castaneda Fitzgerald"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Admin Manager",
      "dataApprovazione": "22/08/2014",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "5089A4803Y",
      "cliente": {
        "id": "3665A",
        "descr": "REVERSUS",
        "valueFormatted": "3665A - REVERSUS"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "1055E",
        "descr": "Jeannette Mayo",
        "valueFormatted": "1055E - Jeannette Mayo"
      },
      "approvatore": {
        "id": "8650T",
        "descr": "Misty Morton",
        "valueFormatted": "8650T - Misty Morton"
      },
      "stato": {
        "id": "N",
        "descr": "Nuovo"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "03/01/2014",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "9024A2434Y",
      "cliente": {
        "id": "8558A",
        "descr": "VICON",
        "valueFormatted": "8558A - VICON"
      },
      "tipo": "Quadro",
      "richiedente": {
        "id": "9444E",
        "descr": "Celina Castro",
        "valueFormatted": "9444E - Celina Castro"
      },
      "approvatore": {
        "id": "4965T",
        "descr": "Cassandra Reese",
        "valueFormatted": "4965T - Cassandra Reese"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "PM",
      "dataApprovazione": "28/12/2014",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    },
    {
      "idPdf": "1549A6509Y",
      "cliente": {
        "id": "5564A",
        "descr": "PETIGEMS",
        "valueFormatted": "5564A - PETIGEMS"
      },
      "tipo": "Promozionale",
      "richiedente": {
        "id": "2189E",
        "descr": "James Coffey",
        "valueFormatted": "2189E - James Coffey"
      },
      "approvatore": {
        "id": "8340T",
        "descr": "Wolf Gray",
        "valueFormatted": "8340T - Wolf Gray"
      },
      "stato": {
        "id": "R",
        "descr": "Respinto"
      },
      "livelloApprovatore": "Sales Manager",
      "dataApprovazione": "17/01/2017",
      "dataInserimento": "08/12/2018",
      "detailRowData": [{
        "name": "susan",
        "callId": 555,
        "duration": 72,
        "switchCode": "SW3",
        "direction": "Out",
        "number": "(00) 88542069"
      }, {
        "name": "susan",
        "callId": 556,
        "duration": 61,
        "switchCode": "SW3",
        "direction": "In",
        "number": "(01) 7432576"
      }, {
        "name": "susan",
        "callId": 566,
        "duration": 75,
        "switchCode": "SW4",
        "direction": "In",
        "number": "(00) 94729563"
      }, {
        "name": "susan",
        "callId": 578,
        "duration": 46,
        "switchCode": "SW6",
        "direction": "In",
        "number": "(06) 8486087"
      }]
    }
  ]

  public detailCellRendererParams = {
    detailGridOptions: {
      columnDefs: [
        { field: "callId" },
        { field: "direction" },
        { field: "number" },
        {
          field: "duration",
          valueFormatter: "x.toLocaleString() + 's'"
        },
        { field: "switchCode" }
      ],
      onFirstDataRendered: function (params) {
        params.api.sizeColumnsToFit();
      }
    },
    getDetailRowData: function (params) {
      params.successCallback(params.data.detailRowData);
    }
  };

  public getRowHeight = function (params) {
    if (params.node && params.node.detail) {
      var offset = 80;
      var allDetailRowHeight = params.data.detailRowData.length * 28;
      return allDetailRowHeight + offset;
    } else {
      return 28;
    }
  };

  constructor() { }

}
