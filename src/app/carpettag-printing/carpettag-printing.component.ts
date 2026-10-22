import { Component, ElementRef, OnInit } from '@angular/core';
import { ServicesService } from './../services/services.service';
//import { GroupTagNumbers } from './../services/carpetmodel.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { formatDate } from '@angular/common';
import { NoOfdaylist, NoOfdaylistcarpet,PrintersName ,GetPDFFile} from '../services/cabmodel.model';
import { ActivatedRoute,Router  } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-carpettag-printing',
  templateUrl: './carpettag-printing.component.html',
  styleUrls: ['./carpettag-printing.component.css'],
})
export class CARPETTagPrintingComponent implements OnInit {
  constructor(
    public service: ServicesService,
    private SpinnerService: NgxSpinnerService,
    private router: ActivatedRoute ,private appcomp :AppComponent) {
      this.router.queryParams.subscribe((queryParam:any) =>
      {
        this.user = queryParam.user
      });
     }
  
  pnm:string;
  PDF:string;

  ReleaseCode: string;
  isDivDisabled: boolean;
  IsItemNoHidden: boolean = true;
  ItemNumber: any;
  GetLibrarian: any;
  PrinterName: any;
  tempdata: any;
  selectPrinterName: string;
  selectTemplateName: any;
  release: any;
  sono: any;
  searchvalue: any;
  seletedrunno: any;
  workcenterHide: boolean = true;
  releasecodehide: boolean = true;
  GroupTagNumberHide: boolean = true;
  TagNumberPrintHide: boolean = true;
  workcenter: any;
  releasesonumbers: any;
  itemnumbers: any;
  GroupTagNumbers: any;
  itemnumber: any;
  selected: string;
  selectedSO: string;
  allRuncheck: string = '';
  TagCount: number;
  WCCount: number;
  public GTagCount: number;
  allrelease: any;
  tagNumberToPrint: any;
  allItemcheck: string = '';
  allcheck: boolean = false;
  dt2: string;
  UniqueId: any = [];
  dt1: string;
  Datewiseselect: string;
  RunNoHide: boolean = true;
  ishidden: boolean = true;
  selectRunnumber: any;
  GroupTagCount: any;
  coutnfinal: number = 0;
  dataStatus: any;
  filter: any;
  hiddensearch: boolean = true;
  isLogActive: boolean = false;
  Logs: any = [];
  public itemnumbercount: Number = 0;
  releasereset: any;
  listReleaseCode: any;
  //NoofDayslist:any;
  public NoofDayslist: any;
  selectedNumberOfDays = 20;

  //public Logs: Array<{ LogStatus: any, ProductType:any, StartTime: any, EndTime: any, releaseCode:any, User:any, UniqueId:any}> = [];
  PrintedBy: any = 'CarpetAdmin';
  getfile:string="";
  IsDownload:boolean=true;
  url:string;
  splitURL:string;
  user:any;
  printername: string=PrintersName.printmptp;

  ngOnInit(): void {
    this.GetUserDetails(this.user);
    this.url = window.location.href;
    this.splitURL ="CARPET"  ; //  this.url.split("/", 10)[5].trim().split("?", 5)[0].trim();
    this.appcomp.GetUserDetails(this.user,this.splitURL);
    
    this.PDF = PrintersName.PDF;
    this.pnm = PrintersName.printnm;
    this.getfile = GetPDFFile.valuecarpet;
    this.setNumberOfDays();
    this.ReleaseCode = 'Release Code';
    this.GetLibrarianFile();
    this.GetPrinterName();
  }

  UserDetails:any;
  Value:any;
  Username:string;

  async GetUserDetails(user:number){
    try{
      this.UserDetails = "";
      const data = await this.service.GetUserDetails(user).toPromise();
      this.UserDetails = data;
      this.Username = this.UserDetails[0].UserNames;
      sessionStorage.setItem('Username',this.Value);
    }
    catch (err: any) {
      //sessionStorage.removeItem('Username');
      //window.location.href = 'http://172.25.1.144:8079/FM_NSH/';
      //sessionStorage.setItem('Username',"manoj");
      //alert(err.error);
    }
  }

  
  setNumberOfDays() {
    let days = new NoOfdaylistcarpet();
    this.NoofDayslist = days.value;
  }

  GetSelectTagNumber() {
    const result = this.tagNumberToPrint.filter((user: any) =>
      user.Value.includes(this.selectRunnumber)
    );

    this.tagNumberToPrint = result;
    this.GroupTagCount = 'Total Tag : ' + this.tagNumberToPrint.length;
  }

  ResetNumber() {
    this.clearwcfromreset();
    const checkbox = document.getElementById(
      'chkAllWorkCenter'
    ) as HTMLInputElement;
    checkbox.checked = true;
    this.checkUncheckWorkCenter();
    this.selectRunnumber = '';
    // this.setCutlenght();
  }

  async Reset() {
    //this.resetRunWCItemTagNo();

    this.reseteverything();

    this.TagCount = 0;
    const data = await this.service.ResetEngine().toPromise();
  }

  reseteverything() {
    //this.selected = "";
    this.ReleaseCode = '';
    this.Datewiseselect = '';
    this.selectRunnumber = '';

    //this.selectedNumberOfDays=5;
    //this.releasereset = "";
    this.dt1 = '';
    this.dt2 = '';
    this.releasesonumbers = [];
    this.Datewiseselect = '';
    //this.tagNumberToPrint=[];
    this.RunNoHide = true;
    this.workcenter = [];
    this.workcenterHide = true;
    this.GroupTagNumbers = [];
    this.GroupTagNumberHide = true;
    this.tagNumberToPrint = [];
    this.TagNumberPrintHide = true;
    this.TagCount = 0;
    this.Logs = [];
    this.searchvalue = '';
    this.isDivDisabled = false;
  }

  clearwcfromreset() {
    const checkbox = document.getElementById(
      'chkAllWorkCenter'
    ) as HTMLInputElement;
    this.countworkcenter = 0;
    checkbox.checked = false;
    var inputElems = document.getElementsByTagName('input');
    for (var i = 0; i < inputElems.length; i++) {
      if (
        inputElems[i].className === 'form-check-input m-1 chkSelectworkcenter'
      ) {
        if (
          inputElems[i].type === 'checkbox' &&
          inputElems[i].checked === true
        ) {
          inputElems[i].checked = false;
        } else {
          inputElems[i].checked = false;
        }
      }
    }
  }

  GetReleaseCode(code: string, days: number) {
    this.Datewiseselect = '';
    this.SpinnerService.show('spinner0');
    //this.resetWCITagNo();
    this.resetreleasewctagitem();
    this.ReleaseCode = 'Release Code';
    this.ItemNoHideClear(true);
    this.release = 'release';
    this.sono = '';
    this.selected = 'releasecode';
    this.GetAllNumbers('releasecode', days);
    this.searchvalue = 'Select Release code';
    this.SpinnerService.hide('spinner0');
  }
  GetSONumber(code: string, days: number) {
    this.Datewiseselect = '';
    this.SpinnerService.show('spinner0');
    //this.resetWCITagNo();
    this.resetreleasewctagitem();
    this.ReleaseCode = 'SO Number';
    this.ItemNoHideClear(false);
    this.release = '';
    this.sono = 'sono';
    this.selected = 'sonumber';
    this.GetAllNumbers('sonumber', days);
    this.searchvalue = 'Select So Number';
    this.GroupTagNumberHide = true;
    // this.releasesonumbers=[];
    // this.releasesonumbers="";
    this.SpinnerService.hide('spinner0');
    //this.resetreleasewctagitem();
  }

  resetreleasewctagitem() {
    this.workcenter = [];
    this.workcenterHide = true;
    //this.GroupTagNumbers = [];
    // this.GroupTagNumberHide = true;
    this.tagNumberToPrint = [];
    this.TagNumberPrintHide = true;
    this.GroupTagNumbers = [];
    this.GroupTagCount = 0;
    this.releasesonumbers = [];
    this.RunNoHide = true;
    this.listReleaseCode = [];
  }

  resetforreleasedropdown() {
    this.Datewiseselect = '';
    this.workcenter = [];
    this.workcenterHide = true;
    //this.GroupTagNumbers = [];
    // this.GroupTagNumberHide = true;
    this.tagNumberToPrint = [];
    this.TagNumberPrintHide = true;
    this.GroupTagNumbers = [];
    this.GroupTagCount = 0;
    this.releasesonumbers = [];
    this.RunNoHide = true;
  }

  GetRunNumber() {
    this.ReleaseCode = 'Run Number';
    this.ItemNoHideClear(true);
  }
  GetBBSNo() {
    this.ReleaseCode = 'BBS No';
    this.ItemNoHideClear(true);
  }

  ItemNoHideClear(flag: boolean) {
    this.IsItemNoHidden = flag;
    this.ItemNumber = [];
  }

  democheck: any = '';

  alldisbale() {
    this.ishidden = true;
    this.hiddensearch = true;
    this.selectRunnumber = '';
    this.filter = '';
    //this.checkUncheckTagNumbertoPrint();
    this.democheck = '';
    this.checkUncheckTagNumbertoPrintforall();
    this.checkUncheckWorkCenter();
    this.checkworkcenter();

    //this.checkUncheckTagNumbertoPrint();
    //this.checkUncheckTagNumbertoPrintforall();
  }

  checkworkcenter() {
    const checkbox = document.getElementById(
      'chkAllWorkCenter'
    ) as HTMLInputElement;

    //this.countworkcenter = 0;
    var inputElems = document.getElementsByTagName('input');
    for (var i = 0; i < inputElems.length; i++) {
      if (
        inputElems[i].className === 'form-check-input m-1 chkSelectworkcenter'
      ) {
        if (
          inputElems[i].type === 'checkbox' &&
          inputElems[i].checked === false
        ) {
          inputElems[i].checked = true;
        } else {
          //inputElems[i].checked = false;
        }
      }
    }
    checkbox.checked = true;
  }

  checkUncheckTagNumbertoPrintforall() {
    this.count = 0;
    const checkbox = document.getElementById(
      'chkAllTagNumbertoPrint'
    ) as HTMLInputElement;
    //const checkbox2 = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;

    checkbox.checked = true;
    var inputElems = document.getElementsByTagName('input');
    for (var i = 0; i < inputElems.length; i++) {
      if (
        inputElems[i].className === 'form-check-input m-1 chkTagNoTagNotoPrint'
      ) {
        if (
          inputElems[i].type === 'checkbox' &&
          inputElems[i].checked === false
        ) {
          inputElems[i].checked = true;
        }
      }
    }
  }
  allenable() {
    this.democheck = 'xyz';
    this.ishidden = false;
    this.hiddensearch = false;
    this.checkUncheckTagNumbertoPrintwhenselect();
    this.checkUncheckTagNumbertoPrintforall();
  }
  SearchDisable(event: any) {
    this.Datewiseselect = '';
    var scc = event.target.value;
    if (scc == '') {
      this.isDivDisabled = false;
    } else {
      this.isDivDisabled = true;
    }
  }

  checkUncheckAll() {
    this.searchvalue = '';
    this.count = 0;
    try {
      const checkbox = document.getElementById(
        'chkAllSelectRunNo'
      ) as HTMLInputElement;
      const checkbox2 = document.getElementById(
        'chkAllWorkCenter'
      ) as HTMLInputElement;

      if (checkbox?.checked) {
        var inputElems = document.getElementsByTagName('input');
        for (var i = 0; i < inputElems.length; i++) {
          if (
            inputElems[i].className === 'form-check-input m-1 chkSelectRunNo'
          ) {
            if (
              inputElems[i].type === 'checkbox' &&
              inputElems[i].checked === false
            ) {
              //inputElems[i].checked = true;
            } else {
              inputElems[i].checked = false;
              this.count++;
              if (this.count == this.releasesonumbers.length) {
                return;
              }
            }
          }
        }
      }

      if (this.selected != 'sonumber') {
        this.ChechedAll('form-check-input m-1 chkSelectRunNo');
        if (checkbox?.checked) {
          this.GetselectedRunNo();
          this.getworkcenterselected(this.seletedrunno);
          checkbox2.checked = false;
        }
        if (this.count == this.releasesonumbers.length) {
          this.resetWCItemTagNo();
          return;
        }

        if (checkbox?.checked) {
          this.GetselectedRunNo();
          this.getworkcenterselected(this.seletedrunno);
          checkbox2.checked = false;
        } else {
          for (var i = 0; i < this.releasesonumbers.length; i++) {
            this.releasesonumbers[i].isChecked = false;
            this.resetWCItemTagNo();
          }
        }
      } else {
        alert('Please select only one SO Number');
        checkbox.checked = false;
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  RunnocountforSO: number = 0;
  isAllSelected() {
    this.searchvalue = '';
    try {
      this.RunnocountforSO = 0;
      var inputElems = document.getElementsByTagName('input');
      for (var i = 0; i < inputElems.length; i++) {
        if (inputElems[i].className == 'form-check-input m-1 chkSelectRunNo') {
          if (inputElems[i].checked == true) {
            this.RunnocountforSO++;
            if (this.selected == 'sonumber' && this.RunnocountforSO >= 2) {
              alert('Please select only one SO Number');
              inputElems[i].checked = false;
            }
          }
        }
      }

      if (this.selected != 'sonumber') {
        const checkbox = document.getElementById(
          'chkAllSelectRunNo'
        ) as HTMLInputElement;

        this.GetselectedRunNo();
        if (this.releasesonumbers.length == this.Runnocount) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
        this.getworkcenterselected(this.seletedrunno);
      } else {
        this.GetselectedRunNo();
        this.getworkcenterselected(this.seletedrunno);
      }
      if (this.selectRunnumber == '' || this.selectRunnumber == undefined) {
        this.resetWCItemTagNo();
      }
    } catch (err) {
      //console.log(err);
    } finally {
      const checkbox = document.getElementById(
        'chkAllWorkCenter'
      ) as HTMLInputElement;
      checkbox.checked = false;
    }
  }
  totalworkcenter: number = 0;

  async getworkcenterselectedfromso(SoNumber: any) {
    try {
      this.totalworkcenter = 0;
      this.SpinnerService.show('spinner3');
      this.ItemNumber = [];
      const data = await this.service
        .getWorkcenterfromItem('SoNo', SoNumber, 'abc')
        .toPromise();
      this.workcenter = data;
      this.totalworkcenter = this.workcenter.length;
      //this.ItemNumberHide = false;
      this.GroupTagNumberHide = false;
      this.SpinnerService.hide('spinner3');
    } catch (err: any) {
      this.SpinnerService.hide('spinner2');
      this.SpinnerService.hide('spinner3');
      //alert(err.error);
    }
  }

  resetWCITagNo() {
    this.workcenter = [];
    this.workcenterHide = true;
    //this.GroupTagNumbers = [];
    // this.GroupTagNumberHide = true;
    this.tagNumberToPrint = [];
    this.TagNumberPrintHide = true;
    this.GroupTagCount = 0;
  }

  resetWCItemTagNo() {
    this.workcenter = [];
    this.workcenterHide = true;
    this.GroupTagNumberHide = true;
    this.GroupTagNumbers = [];
    //this.GroupTagNumbers = [];
    // this.GroupTagNumberHide = true;
    this.tagNumberToPrint = [];
    this.TagNumberPrintHide = true;
    this.GroupTagCount = 0;
  }

  checkboxvisible() {
    this.workcenterHide = true;
  }

  Runnocount: number = 0;

  GetselectedRunNo() {
    this.Runnocount = 0;
    this.seletedrunno = [];
    var inputElems = document.getElementsByTagName('input');
    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].className === 'form-check-input m-1 chkSelectRunNo') {
        if (
          inputElems[i].type === 'checkbox' &&
          inputElems[i].checked === true
        ) {
          this.seletedrunno += inputElems[i].value + ',';
          this.Runnocount++;
        }
      }
    }
    if (this.seletedrunno.length > 0) {
      this.seletedrunno = this.seletedrunno.substring(
        0,
        this.seletedrunno.length - 1
      );
    } else {
      this.seletedrunno = '';
    }
  }
  count: number = 0;
  ChechedAll(classname: string) {
    this.count = 0;
    var inputElems = document.getElementsByTagName('input');
    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].className === classname) {
        if (
          inputElems[i].type === 'checkbox' &&
          inputElems[i].checked === false
        ) {
          inputElems[i].checked = true;
        } else {
          inputElems[i].checked = false;
          this.count++;
          if (this.count == this.releasesonumbers.length) {
            return;
          }
        }
      }
    }
  }

  async getworkcenterselected(TagId: any) {
    try {
      if (this.selected != 'sonumber') {
        this.SpinnerService.show('spinner2');
        this.workcenter = [];
        const data = await this.service
          .getWorkcenterfromItem('ReleaseCode', TagId, 'abc')
          .toPromise();
        this.workcenter = data;
        this.totalworkcenter = this.workcenter.length;
        this.workcenterHide = false;
        this.SpinnerService.hide('spinner2');
      } else {
        const checkbox = document.getElementById(
          'chkAllGroupTagNumber'
        ) as HTMLInputElement;
        checkbox.checked = false;
        this.SpinnerService.show('spinner3');
        this.GroupTagNumbers = [];
        const data = await this.service
          .getWorkcenterfromItem('SoNo', TagId, 'abc')
          .toPromise();
        this.GroupTagNumbers = data;
        this.itemnumbercount = this.GroupTagNumbers.length;
        //this.ItemNumberHide = false;
        this.GroupTagNumberHide = false;
        this.SpinnerService.hide('spinner3');
      }
    } catch (err: any) {
      this.SpinnerService.hide('spinner2');
      this.SpinnerService.hide('spinner3');
      //alert(err.error);
    }
  }
  async getWorkcenterfromItem(itemn: any) {
    itemn = itemn.substring(0, itemn.length - 1);

    if (this.Datewiseselect != undefined && this.Datewiseselect != '') {
      this.GetselectedRunNo();
      if (this.sono != '') {
        const data = await this.service
          .getWorkcenterfromItem('sonumber', this.seletedrunno, itemn)
          .toPromise();
        this.workcenter = data;
        this.totalworkcenter = this.workcenter.length;
        this.WCCount = this.workcenter.length;
      }
    } else {
      const data = await this.service
        .getWorkcenterfromItem('sonumber', this.searchvalue, itemn)
        .toPromise();
      this.workcenter = data;
      this.totalworkcenter = this.workcenter.length;
      this.WCCount = this.workcenter.length;
    }
  }

  itemN: any;

  checkUncheckItemNumber() {
    if (this.selected == 'releasecode') {
    } else {
      try {
        this.allItemcheck = '';
        var inputElems = document.getElementsByTagName('input');
        for (var i = 0; i < inputElems.length; i++) {
          if (
            inputElems[i].className === 'form-check-input m-1 chkGroupTagNo'
          ) {
            if (
              inputElems[i].type === 'checkbox' &&
              inputElems[i].checked === false
            ) {
              inputElems[i].checked = true;
            }
          }
        }

        const checkbox = document.getElementById(
          'chkAllGroupTagNumber'
        ) as HTMLInputElement;
        if (checkbox?.checked) {
          for (var i = 0; i < this.GroupTagNumbers.length; i++) {
            this.GroupTagNumbers[i].isChecked = true;
            this.allItemcheck += this.GroupTagNumbers[i].Value + ',';
          }
          this.workcenterHide = false;
          this.getWorkcenterfromItem(this.allItemcheck);
          this.allItemcheck = '';
          const checkbox = document.getElementById(
            'chkAllWorkCenter'
          ) as HTMLInputElement;
          checkbox.checked = false;
        } else {
          for (var i = 0; i < this.GroupTagNumbers.length; i++) {
            this.GroupTagNumbers[i].isChecked = false;
            this.workcenter = [];
            this.workcenterHide = true;
            this.resetWCITagNo();
          }
        }
      } catch (err: any) {}
    }
  }
  GroupTagNumberscount: number = 0;
  itemnumberso: string = '';
  async isAllSelecteitemnumber() {
    try {
      const checkbox = document.getElementById(
        'chkAllGroupTagNumber'
      ) as HTMLInputElement;
      const checkbox2 = document.getElementById(
        'chkAllWorkCenter'
      ) as HTMLInputElement;

      var inputElems = document.getElementsByTagName('input');

      this.GetselectedItemNumber();

      if (this.itemnumbercount == this.GroupTagNumberscount) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
      if (this.itemnumberso != '') {
        this.SpinnerService.show('spinner2');
        this.itemnumberso = this.itemnumberso + ',';
        this.workcenterHide = false;
        this.getWorkcenterfromItem(this.itemnumberso);
        checkbox2.checked = false;
        this.SpinnerService.hide('spinner2');
        this.itemnumberso = '';
      } else {
        this.resetWCITagNo();
      }
    } catch (err) {
    } finally {
      // this.GetselectedItemNumber();
      // if(this.itemnumberso=="")
      // {
      //   this.tagNumberToPrint="";
      // }

      // this.GetselectedWorkcenter();
      // if(this.workcenterstore=="")
      // {
      //   this.tagNumberToPrint="";
      // }
      const checkbox = document.getElementById(
        'chkAllWorkCenter'
      ) as HTMLInputElement;
      checkbox.checked = false;
    }
  }

  //added
  async GetAllCode(dt1: string, dt2: string, Datewiseselect: string) {
    this.resetreleasewctagitem();
    this.GroupTagNumberHide = true;
    if (this.selected != '' && this.selected != undefined) {
      if (this.Datewiseselect != '' && this.Datewiseselect != undefined) {
        try {
          if (dt1 != undefined && dt1 != '' && dt2 != undefined && dt1 != '') {
            const fromdate = formatDate(dt1, 'ddMMyyyy', 'en-US');
            const todate = formatDate(dt2, 'ddMMyyyy', 'en-US');
            this.SpinnerService.show('spinner1');
            //const fromdate = '01122021';
            //const todate =  '10102022';
            this.releasesonumbers = [];
            if (this.selected == 'releasecode') {
              const data = await this.service
                .CarpetGetReleaseCode(fromdate, todate, Datewiseselect)
                .toPromise();
              this.releasesonumbers = data;
            } else if (this.selected == 'sonumber') {
              const data = await this.service
                .CarpetSONumber(fromdate, todate, Datewiseselect)
                .toPromise();
              this.releasesonumbers = data;
            }

            //const data = await this.service.GetAllCode('01122021','10102022','Production_Date',3).toPromise();
            this.RunNoHide = false;
            this.GroupTagNumberHide = false;
            this.SpinnerService.hide('spinner1');
          } else {
            alert('Please Select FromDate And ToDate');
          }
        } catch (err: any) {
          this.SpinnerService.hide('spinner1');
          //alert(err.error);
        } finally {
          this.GroupTagNumberHide = true;
          const checkbox = document.getElementById(
            'chkAllSelectRunNo'
          ) as HTMLInputElement;
          checkbox.checked = false;
        }
      } else {
        alert('Please Select Date Type');
      }
    } else {
      alert('please select releasecode or so number radiobutton');
    }
  }
  //end
  workcentercount: number = 0;

  workc: number = 0;
  workcenterstore: any = '';
  GetselectedWorkcenter() {
    this.workcenterstore = '';
    //this.GroupTagNumbers=[];
    this.workcentercount = 0;

    var inputElems = document.getElementsByTagName('input');

    for (var i = 0; i < inputElems.length; i++) {
      if (
        inputElems[i].className === 'form-check-input m-1 chkSelectworkcenter'
      ) {
        if (
          inputElems[i].type === 'checkbox' &&
          inputElems[i].checked === true
        ) {
          this.workcenterstore += inputElems[i].value.trim() + ',';

          this.workcentercount++;
        }
      }
    }
    if (this.workcenterstore.length > 0) {
      this.workcenterstore = this.workcenterstore.substring(
        0,
        this.workcenterstore.length - 1
      );
    } else {
      this.workcenterstore = '';
    }
  }

  GetselectedItemNumber() {
    this.GroupTagNumberscount = 0;
    this.itemnumber = '';
    this.itemnumberso = '';
    //this.GroupTagNumbers=[];

    var inputElems = document.getElementsByTagName('input');

    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].className === 'form-check-input m-1 chkGroupTagNo') {
        if (
          inputElems[i].type === 'checkbox' &&
          inputElems[i].checked === true
        ) {
          this.itemnumberso += inputElems[i].value.trim() + ',';

          this.GroupTagNumberscount++;
        }
      }
    }

    if (this.itemnumberso.length > 0) {
      this.itemnumberso = this.itemnumberso.substring(
        0,
        this.itemnumberso.length - 1
      );
    } else {
      this.itemnumberso = '';
    }
  }

  //// Librarian File Name
  GetLibrarianFile() {
    try {
      this.service.CarpetLibrarianFile().subscribe((data) => {
        this.GetLibrarian = data;
        this.selectTemplateName = 'lib://CARPET_PROD_WEB/Carpet_R.btw';
      });
    } catch (err: any) {
      alert(err.error);
    }
  }

  //// Printer Name
  GetPrinterName() {
    try {
      this.service.CarpetGetPrinterName().subscribe((data) => {
        this.PrinterName = data;
        //this.selectPrinterName="BW_TAG C9065";
      });
    } catch (err: any) {
      alert(err.error);
    }
  }

  tempselect: any;
  async GetAllNumbers(selected: string, NoOfDays: number) {
    try {
      if (selected == '' || selected == undefined) {
        alert('please select release code or so number radiobutton.');
        return;
      } else {
        if (this.selected == 'releasecode') {
          this.tempselect = 'ReleaseCode';
        } else {
          this.tempselect = 'SoNo';
        }
      }
      this.SpinnerService.show('spinner0');

      const data = await this.service
        .CARPETGetAllNumbers(this.tempselect, NoOfDays)
        .toPromise();
      this.listReleaseCode = data;
      this.SpinnerService.hide('spinner0');
    } catch (err: any) {
      this.SpinnerService.hide('spinner0');
      //alert(err.error);
    }
  }

  async searchNumber(event: any) {
    try {
      //this.searchvalue = event.target.value.split(':', 2)[1].trim();
      this.searchvalue = event ;
      if (
        this.searchvalue == 'Select Release code' ||
        this.searchvalue == 'Select So Number'
      ) {
        this.isDivDisabled = false;
        this.searchvalue = '';
        return;
      } else {
        this.isDivDisabled = true;
      }

      this.resetforreleasedropdown();
      if (this.selected != undefined && this.selected != '') {
        if (
          this.release != '' &&
          this.searchvalue != 'Select Release code' &&
          this.searchvalue != 'Select So Number' &&
          this.selected != 'sonumber'
        ) {
          if (this.searchvalue != undefined && this.searchvalue != '') {
            this.resetonsearch();
            this.SpinnerService.show('spinner2');
            const data = await this.service
              .getNumber('ReleaseCode', this.searchvalue)
              .toPromise();
            this.workcenter = data;
            this.workcenterHide = false;
            this.SpinnerService.hide('spinner2');
          } else {
            alert('Please Select Number from dropdown');
          }

          // this.service.getNumber('ReleaseCode', this.searchvalue).subscribe(data => {
          //   this.workcenter = data;

          // });
        } else if (this.sono != '' && this.searchvalue != '') {
          if (this.searchvalue != undefined) {
            this.resetonsearch();
            this.SpinnerService.show('spinner3');
            const data = await this.service
              .getNumber('SoNo', this.searchvalue)
              .toPromise();
            this.GroupTagNumbers = data;
            this.itemnumbercount = this.GroupTagNumbers.length;
            this.GroupTagNumberHide = false;
            this.SpinnerService.hide('spinner3');
          } else {
            alert('Please enter so number to search');
          }
        }
      } else {
        alert('please select release code or so number');
      }
    } catch (err: any) {
      alert(err.error);
    } finally {
      const checkbox2 = document.getElementById(
        'chkAllWorkCenter'
      ) as HTMLInputElement;
      checkbox2.checked = false;
      const checkbox = document.getElementById(
        'chkAllGroupTagNumber'
      ) as HTMLInputElement;
      checkbox.checked = false;
      this.itemnumbercount = this.GroupTagNumbers.length;
      this.SpinnerService.hide('spinner2');
      this.SpinnerService.hide('spinner3');
    }
  }

  resetonsearch() {
    this.workcenterHide = true;
    this.workcenter = [];
    this.GroupTagNumberHide = true;
    this.GroupTagNumbers = [];
    this.releasesonumbers = [];
    this.RunNoHide = true;
    this.tagNumberToPrint = [];
    this.TagNumberPrintHide = true;
  }
  countworkcenter: number = 0;
  checkUncheckWorkCenter() {
    try {
      const checkbox = document.getElementById(
        'chkAllWorkCenter'
      ) as HTMLInputElement;

      this.countworkcenter = 0;
      var inputElems = document.getElementsByTagName('input');
      for (var i = 0; i < inputElems.length; i++) {
        if (
          inputElems[i].className === 'form-check-input m-1 chkSelectworkcenter'
        ) {
          if (
            inputElems[i].type === 'checkbox' &&
            inputElems[i].checked === false
          ) {
            inputElems[i].checked = true;
          } else {
            inputElems[i].checked = false;
          }
        }
      }

      //this.GroupTagCount = "Total Tag : 0";
      this.allRuncheck = '';

      const checkbox2 = document.getElementById(
        'chkAllTagNumbertoPrint'
      ) as HTMLInputElement;
      if (checkbox?.checked) {
        for (var i = 0; i < this.workcenter.length; i++) {
          //this.workcenter[i].isChecked = true;
          this.allRuncheck += this.workcenter[i].Value + ',';
          this.countworkcenter++;
        }

        checkbox2.checked = false;
        this.TagNumberPrintHide = false;
        this.GetTagNumberId(this.allRuncheck);
        checkbox.checked = true;
        return;
      } else {
        for (var i = 0; i < this.workcenter.length; i++) {
          this.workcenter[i].isChecked = false;
          this.allcheck = false;
          //this.groupTagNumber=[];
          checkbox2.checked = false;
          this.TagNumberPrintHide = true;
          this.tagNumberToPrint = [];
          return;
        }
      }
      if (this.totalworkcenter == this.workcentercount) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    } catch (err) {
      console.log(err);
    } finally {
      //this.SpinnerService.hide('spinner3');
    }
  }

  workwc: any;

  isAllSelectedworkcenter(event: any) {
    this.workwc = '';
    const checkbox = document.getElementById(
      'chkAllWorkCenter'
    ) as HTMLInputElement;
    const checkbox2 = document.getElementById(
      'chkAllTagNumbertoPrint'
    ) as HTMLInputElement;
    var inputElems = document.getElementsByTagName('input'),
      count = 0;
    for (var i = 0; i < inputElems.length; i++) {
      if (
        inputElems[i].className === 'form-check-input m-1 chkSelectworkcenter'
      ) {
        if (
          inputElems[i].type === 'checkbox' &&
          inputElems[i].checked === false
        ) {
          count++;
          checkbox.checked = true;
        } else {
          // this.runno += inputElems[i].value + ",";
          this.workwc += inputElems[i].value + ',';
        }
      }
    }
    if (count === 0) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;

      this.tagNumberToPrint = [];
      checkbox2.checked = false;
      this.TagNumberPrintHide = true;
      this.GroupTagCount = 'Total Tag : 0';
    }

    if (this.WCCount === count) {
      //this.groupTagNumber= [];
      this.tagNumberToPrint = [];
      //this.GroupTagNumberHide= true;
      this.TagNumberPrintHide = true;
      //this.GroupTagCount = "Total Tag : 0";
    }
    this.GetselectedWorkcenter();

    if (this.workcenterstore != '') {
      try {
        this.TagNumberPrintHide = false;
        this.GetTagNumberId(this.workwc);
      } catch (err: any) {}
    }
  }

  async GetTagNumberId(workId: any) {
    this.allrelease = '';
    this.SpinnerService.show('spinner4');

    try {
      if (this.selected != '') {
        if (
          this.Datewiseselect != undefined &&
          this.Datewiseselect != '' &&
          this.selected == 'releasecode'
        ) {
          const checkbox = document.getElementById(
            'chkAllSelectRunNo'
          ) as HTMLInputElement;
          if (checkbox?.checked) {
            for (var i = 0; i < this.releasesonumbers.length; i++) {
              this.releasesonumbers[i].isChecked = true;
              this.allrelease += this.releasesonumbers[i].ReleaseCode + ',';
            }
            this.allrelease = this.allrelease.substring(
              0,
              this.allrelease.length - 1
            );
            workId = workId.substring(0, workId.length - 1);
            //this.runno = this.runno.substring(0, this.runno.length - 1);
            //this.getSelectedRunNo();
            //this.itemN = '80';

            const data = await this.service
              .GetTagFromWorkcenter('ReleaseCode', workId, this.allrelease, '')
              .toPromise();
            this.tagNumberToPrint = data;
            this.coutnfinal = this.tagNumberToPrint.length;
            this.GTagCount = this.tagNumberToPrint.length;
            this.checkUncheckTagNumbertoPrint();
            this.checkUncheckTagNumbertoPrintforall();
          } else {
            workId = workId.substring(0, workId.length - 1);
            //this.runno = this.runno.substring(0, this.runno.length - 1);
            //this.getSelectedRunNo();
            //this.itemN = '80';
            this.GetselectedRunNo();
            this.GetselectedItemNumber();
            if (
              this.seletedrunno != '' &&
              this.seletedrunno != undefined &&
              this.selected == 'releasecode'
            ) {
              const data = await this.service
                .GetTagFromWorkcenter(
                  'ReleaseCode',
                  workId,
                  this.seletedrunno,
                  this.itemnumberso
                )
                .toPromise();
              this.tagNumberToPrint = data;
              this.coutnfinal = this.tagNumberToPrint.length;
              this.GTagCount = this.tagNumberToPrint.length;
              this.checkUncheckTagNumbertoPrint();
              this.checkUncheckTagNumbertoPrintforall();
            } else {
              const data = await this.service
                .GetTagFromWorkcenter(
                  'SoNo',
                  workId,
                  this.seletedrunno,
                  this.itemnumberso
                )
                .toPromise();
              this.tagNumberToPrint = data;
              this.coutnfinal = this.tagNumberToPrint.length;
              this.GTagCount = this.tagNumberToPrint.length;
              this.checkUncheckTagNumbertoPrint();
              this.checkUncheckTagNumbertoPrintforall();
            }
          }
        }
      } else {
        if (this.selected != '') {
          if (
            this.Datewiseselect != undefined &&
            this.Datewiseselect != '' &&
            this.selected == 'sonumber'
          ) {
            workId = workId.substring(0, workId.length - 1);
            //this.runno = this.runno.substring(0, this.runno.length - 1);
            //this.getSelectedRunNo();
            //this.itemN = '80';

            this.GetselectedRunNo();
            this.GetselectedItemNumber();
            if (this.seletedrunno != '' || this.seletedrunno != undefined) {
              const data = await this.service
                .GetTagFromWorkcenter(
                  'SoNo',
                  workId,
                  this.seletedrunno,
                  this.itemnumberso
                )
                .toPromise();
              this.tagNumberToPrint = data;
              this.coutnfinal = this.tagNumberToPrint.length;
              this.GTagCount = this.tagNumberToPrint.length;
              this.checkUncheckTagNumbertoPrint();
              this.checkUncheckTagNumbertoPrintforall();
            }
          }
        }
      }

      if (this.searchvalue != '' && this.searchvalue != undefined) {
        if (this.selected == 'sonumber') {
          this.GetselectedItemNumber();
          workId = workId.substring(0, workId.length - 1);
          //this.runno = this.runno.substring(0, this.runno.length - 1);
          //this.getSelectedRunNo();
          //this.itemN = '80';
          this.allItemcheck = this.allItemcheck.substring(
            0,
            this.allItemcheck.length - 1
          );
          const data = await this.service
            .GetTagFromWorkcenter(
              'SoNo',
              workId,
              this.searchvalue,
              this.itemnumberso
            )
            .toPromise();
          this.tagNumberToPrint = data;
          this.coutnfinal = this.tagNumberToPrint.length;
          this.GTagCount = this.tagNumberToPrint.length;
          this.checkUncheckTagNumbertoPrint();
          this.checkUncheckTagNumbertoPrintforall();
        } else {
          workId = workId.substring(0, workId.length - 1);
          //this.runno = this.runno.substring(0, this.runno.length - 1);
          //this.getSelectedRunNo();
          //this.itemN = '80';
          this.allItemcheck = this.allItemcheck.substring(
            0,
            this.allItemcheck.length - 1
          );
          const data = await this.service
            .GetTagFromWorkcenter('ReleaseCode', workId, this.searchvalue, '')
            .toPromise();
          this.tagNumberToPrint = data;
          this.coutnfinal = this.tagNumberToPrint.length;
          this.GTagCount = this.tagNumberToPrint.length;
          this.checkUncheckTagNumbertoPrint();
          this.checkUncheckTagNumbertoPrintforall();
        }
      }

      if (
        this.selected == 'sonumber' &&
        this.Datewiseselect != undefined &&
        this.Datewiseselect != ''
      ) {
        this.GetselectedItemNumber();
        this.GetselectedRunNo();
        workId = workId.substring(0, workId.length - 1);
        //this.runno = this.runno.substring(0, this.runno.length - 1);
        //this.getSelectedRunNo();
        //this.itemN = '80';
        this.allItemcheck = this.allItemcheck.substring(
          0,
          this.allItemcheck.length - 1
        );
        const data = await this.service
          .GetTagFromWorkcenter(
            'SoNo',
            workId,
            this.seletedrunno,
            this.itemnumberso
          )
          .toPromise();
        this.tagNumberToPrint = data;
        this.coutnfinal = this.tagNumberToPrint.length;
        this.GTagCount = this.tagNumberToPrint.length;
        this.checkUncheckTagNumbertoPrint();
        const checkbox3 = document.getElementById(
          'chkAllTagNumbertoPrint'
        ) as HTMLInputElement;
        checkbox3.checked = false;
        this.checkUncheckTagNumbertoPrintforall();
      }
    } catch (err: any) {
      alert(err.error);
    } finally {
      this.SpinnerService.hide('spinner4');
      const checkbox3 = document.getElementById(
        'chkAllTagNumbertoPrint'
      ) as HTMLInputElement;
      checkbox3.checked = false;
      this.GTagCount = this.tagNumberToPrint.length;
      //this.checkUncheckTagNumbertoPrintforall();
    }
  }

  checkUncheckTagNumbertoPrint() {
    try {
      this.count = 0;
      const checkbox = document.getElementById(
        'chkAllTagNumbertoPrint'
      ) as HTMLInputElement;
      //const checkbox2 = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;

      if (checkbox?.checked) {
        var inputElems = document.getElementsByTagName('input');
        for (var i = 0; i < inputElems.length; i++) {
          if (
            inputElems[i].className ===
            'form-check-input m-1 chkTagNoTagNotoPrint'
          ) {
            if (
              inputElems[i].type === 'checkbox' &&
              inputElems[i].checked === false
            ) {
              //inputElems[i].checked = true;
            } else {
              inputElems[i].checked = false;
              this.count++;
              if (this.count == this.tagNumberToPrint.length) {
                return;
              }
            }
          }
        }
      }

      if (this.selected != 'SoNo') {
        this.CheckedAll('form-check-input m-1 chkTagNoTagNotoPrint');
        if (checkbox?.checked) {
          this.GetselectedTagNo();
        }
        if (this.count == this.tagNumberToPrint.length) {
          return;
        }

        if (checkbox?.checked) {
        } else {
          for (var i = 0; i < this.tagNumberToPrint.length; i++) {
            this.tagNumberToPrint[i].isChecked = false;
          }
        }
      } else {
        alert('Please select only one SO Number');
        checkbox.checked = false;
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  demo: any = '';
  async getHistory() {
    this.PrinterStatus();
    if (this.democheck == '') {
      this.checkUncheckTagNumbertoPrintforall();
    }

    // if (this.filter == 'Select') {
    //       this.GetselectedTagNo();
    //       if(this.tagNumberforPrint=="")
    //       {
    //         alert("please select tag numbers");
    //         return;
    //       }
    // }
    // else {
    //   this.checkUncheckTagNumbertoPrintforall();
    // }
    this.GetselectedTagNo();
    if (this.tagNumberforPrint == '') {
      alert('please select tag number');
      return;
    }
    const data = await this.service
      .GetHistory(this.tagNumberforPrint)
      .toPromise();
    this.demo = data;
    if (this.demo[0].ErrorMsg.length > 0) {
      if (confirm('Are you sure to continue \n' + this.demo[0].ErrorMsg)) {
        this.print();
      }
    } else {
      this.print();
    }
  }

  CheckedAll(classname: string) {
    this.count = 0;
    var inputElems = document.getElementsByTagName('input');
    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].className === classname) {
        if (
          inputElems[i].type === 'checkbox' &&
          inputElems[i].checked === false
        ) {
          inputElems[i].checked = true;
        } else {
          inputElems[i].checked = false;
          this.count++;
          if (this.count == this.tagNumberToPrint.length) {
            return;
          }
        }
      }
    }
  }

  tagNumberforPrint: any = '';
  tagcount: number = 0;
  GetselectedTagNo() {
    this.TagnocountforSO = 0;
    this.tagNumberforPrint = [];
    var inputElems = document.getElementsByTagName('input');
    for (var i = 0; i < inputElems.length; i++) {
      if (
        inputElems[i].className === 'form-check-input m-1 chkTagNoTagNotoPrint'
      ) {
        if (
          inputElems[i].type === 'checkbox' &&
          inputElems[i].checked === true
        ) {
          this.tagNumberforPrint += inputElems[i].value + ',';
          this.TagnocountforSO++;
        }
      }
    }
    if (this.tagNumberforPrint.length > 0) {
      this.tagNumberforPrint = this.tagNumberforPrint.substring(
        0,
        this.tagNumberforPrint.length - 1
      );
    } else {
      this.tagNumberforPrint = '';
    }
  }

  TagnocountforSO: number = 0;
  isAllSelectedTagNotoPrint() {
    try {
      this.coutnfinal = 0;
      this.TagnocountforSO = 0;

      if (this.selected != 'SoNo') {
        const checkbox = document.getElementById(
          'chkAllTagNumbertoPrint'
        ) as HTMLInputElement;
        this.GetselectedTagNo();

        if (this.GTagCount == this.TagnocountforSO) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      } else {
        this.GetselectedTagNo();
      }
    } catch (err) {
      //console.log(err);
    }
  }

  checkUncheckTagNumbertoPrintwhenselect() {
    try {
      const checkbox = document.getElementById(
        'chkAllTagNumbertoPrint'
      ) as HTMLInputElement;
      const checkbox2 = document.getElementById(
        'chkAllWorkCenter'
      ) as HTMLInputElement;
      //checkbox2.checked=true;    //added temporary

      this.GetselectedWorkcenter();
      if (this.workcenterstore != '') {
        if (checkbox?.checked) {
        } else {
          checkbox.checked = true;
          var inputElems = document.getElementsByTagName('input');
          for (var i = 0; i < inputElems.length; i++) {
            if (
              inputElems[i].className ===
              'form-check-input m-1 chkTagNoTagNotoPrint'
            ) {
              if (
                inputElems[i].type === 'checkbox' &&
                inputElems[i].checked === false
              ) {
                inputElems[i].checked = true;
              } else {
                // inputElems[i].checked = false;
                // this.count++;
                // if(this.count==this.tagNumberToPrint.length)
                // {
                //   return;
                // }
              }
            }
          }
        }
      }
    } catch (err: any) {
      alert(err.error);
    }
  }
  Printmassage: any = '';
  massage: any = '';

  IsPrintdisabled:boolean = false;

  async print() {
    try {
      this.GetselectedTagNo();
      this.GetselectedRunNo();
      this.GetselectedItemNumber();
      this.GetselectedWorkcenter();
      //alert("now in printing function");
      if (this.selected == undefined || this.selected == '') {
        alert('Please Select Release Code ,SO No,BBS No, Run Number');
        return;
      }

      // this.GetselectedRunNo();
      // //this.GetselectedWorkcenter();
      // if (this.selected == "SONo") {
      //   this.GetselectedItemNumber();
      //   if (this.GroupTagNumberscount <= 0) {
      //     alert("Please Select Item Number");
      //     return;
      //   }
      // }
      // else {
      //   this.GroupTagNumbers = "";
      // }

      if (this.searchvalue == '') {
        if (this.Runnocount <= 0) {
          alert('Please Select Release Code');
          return;
        }
      }

      if (this.workcentercount <= 0) {
        alert('Please Select Work Center');
        return;
      } else if (this.tagNumberforPrint <= 0) {
        alert('Please Select Tag Number');
        return;
      } else if (
        this.selectPrinterName == undefined ||
        this.selectPrinterName == 'Select Printer Name'
      ) {
        alert('Please Select Printer Name');
        return;
      } else if (
        this.selectTemplateName == undefined ||
        this.selectTemplateName == 'Select Template File'
      ) {
        alert('Please Select Template File');
        return;
      }

      //this.GetselectedTagNo();
      // this.getHistory(this.tagNumberToPrint);
      if (this.searchvalue == '' || this.searchvalue == undefined) {
      } else {
        this.seletedrunno = this.searchvalue;
      }

      this.IsPrintdisabled= true;
      
      const data = await this.service
        .CARPETPrintTagTemplates(
          this.seletedrunno,
          this.tagNumberforPrint,
          'All',
          this.selectPrinterName,
          this.selectTemplateName,
          this.PrintedBy
        )
        .toPromise();

      this.Printmassage = data;
      this.massage = this.Printmassage[0].UniqueId;

      this.UniqueId.push({ UniqueId: this.massage });

      setInterval(() => {
        this.GetStatus(this.UniqueId);
      }, 10000);
    } catch (err: any) {
      this.SpinnerService.hide('spinner0');
      //alert(err.error);
    }
  }

  async GetStatus(id: any) {
    if (id.length > 0) {
      for (var i = 0; i < id.length; i++) {
        if (id[i] != undefined) {
          this.dataStatus = await this.service
            .GetCarpetStatus(id[i].UniqueId)
            .toPromise();

          if (this.Logs.length == 0) {
            this.pushLogs(this.dataStatus);
          } else {
            for (var k = 0; k < this.dataStatus.length; k++) {
              for (var h = 0; h < this.Logs.length; h++) {
                if (this.Logs[h].UniqueId == id[i].UniqueId) {
                  if (
                    this.Logs[h].UniqueId === this.dataStatus[k].UniqueId &&
                    this.Logs[h].LogStatus === this.dataStatus[k].LogStatus
                  ) {
                  } else {
                    this.pushLogs(this.dataStatus);
                    delete id[i];
                  }
                } else {
                  let flag: boolean = true;
                  for (var h = 0; h < this.Logs.length; h++) {
                    if (this.Logs[h].UniqueId == id[i].UniqueId) {
                      flag = false;
                      if (
                        this.Logs[h].LogStatus !=
                          this.dataStatus[k].LogStatus ||
                        this.Logs[h].UniqueId != id[i].UniqueId
                      ) {
                        flag = true;
                      }
                    }
                  }
                  if (flag) {
                    this.pushLogs(this.dataStatus);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

ProdType:string;
TempletFile:any;
Tempfile:string;

  pushLogs(logdata: any) {
    this.Tempfile= this.selectTemplateName.split("/")[3].trim() ;
    for (var j = 0; j < logdata.length; j++) {
      this.Logs.push({
        ProdType:"CARPET",
        LogStatus: logdata[j].LogStatus,
        ProductType: logdata[j].ProductType,
        StartTime: logdata[j].StartTime,
        EndTime: logdata[j].EndTime,
        releaseCode: logdata[j].releaseCode,
        User: this.Username,
        UniqueId: logdata[j].UniqueId,
        TempletFile: this.Tempfile
      });
    }
    if(this.selectPrinterName == "PDF"){
      this.IsDownload = false;
    }
    else{
      this.IsDownload = true;
    }

    for(var j =0;j < this.Logs.length; j++){
      var Unique = this.Logs[j].UniqueId
      if(this.massage === Unique){
       this.IsPrintdisabled = false;
      }
    }
  }

  getTempFileName(){
    this.Tempfile =  this.selectTemplateName.split("/")[3].trim() ;
  }

  isAllSelectedGroupTagNo() {}

  checkUncheckGroupTagNumber() {}

PStatus:any;
FinalPrinterStatus:string;

async PrinterStatus()
 {
  if(this.selectPrinterName == "PDF"){
    this.FinalPrinterStatus="";
    return
  }
    this.PStatus=[];
    const data = await this.service.GetPrinterStatus(this.selectPrinterName).toPromise();
    this.PStatus = data;
    this.FinalPrinterStatus=this.PStatus[0].Status;
    
 }
}
