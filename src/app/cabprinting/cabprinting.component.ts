import { AppComponent } from './../app.component';
import { ServicesService } from './../services/services.service';
import { NoOfdaylist ,PrintersName,GetPDFFile,GetUser,ReportNames} from './../services/cabmodel.model';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner"; 
import { ActivatedRoute,ParamMap,Params,Router  } from '@angular/router';
@Component({
  selector: 'app-cabprinting',
  templateUrl: './cabprinting.component.html',
  styleUrls: ['./cabprinting.component.css']
})
export class CABPrintingComponent implements OnInit {
  
  constructor(public service:ServicesService,
    private SpinnerService: NgxSpinnerService,
    private router: ActivatedRoute, private appcomp :AppComponent) {
      this.router.queryParams.subscribe((queryParam:any) =>
      {
        this.user = queryParam.user
      });
     }

  pnm:string;
  PDF:string;

  hostName: string;
 
  Number:any;
  tagNumber:any;
  workcenter :any;
  groupTagNumber:any;
  tagNumberToPrint:any;
  listReleaseCode:any;
  PrinterName:any;
  GetLibrarian:any;
  allRun:any;
  allGroupTag:any;
  tagNumberToPrintRange :any;
  tagNumberFromPrintRange:any;
  FromTagNo:string;
  ToTagNo:string;
  date1: Date;
NoofDayslist:any;

  RunNoHide = false;
  workcenterHide = false;
  GroupTagNumberHide= false;
  TagNumberPrintHide= false;
  workcentercheck: boolean;
  isChecked:boolean= true;
  ALLRunNOChecked:boolean;
  isShowbutton:boolean=false;
  isShowRange:boolean=false;
  
  runno:string="";
  allRuncheck:string="";
  AllgroupTagNumber:string="";
  AllTagNumberToPrint:string="";
  GroupTagCount:string="";
  valueId:string;
  Manual:string;
  selected = '';
  isDisable:boolean= false;
  selectRunnumber:string;
  SelectedPrinterName:string;
  SelectedTemplateFile:string;
  SelectedTagId:string="";
  RunNoSelected:any;
  TagNo:any;
  GroupTagNo:any;
  Workcenter:any;
  Type:string;
  FromRange:string;
  ToRange :string;
  FromRangeselected:string;
  ToRangeselected :string;
  selectedNumberOfDays=5;
  selectedreleasecode:string=""; 

  RunNoItem={
    RunNo:"",
    isChecked:true
  }
  selectPrinterName:string;
  selectTemplateName:string;
  loader:string;
  isDisableCutLenght:boolean = true;
  selectCutLenght:string;
  //Logs:any;
  cutlenght:string;
  enablePrompting:boolean;
  cutvalue:string;
  isCheckedother:boolean;
  isCheckedAllGroup:boolean;
  isDisableTag:boolean;
  ProductionCenter:any;
  PCSenter="";
  ishidden:boolean= false;
  totalTagCount:string;
  Logs:any = [];
  LogsArray:any = [];
  PrintedBy:string="Admin"

  UniqueId :any=[] ;

  Pringtingflag:boolean =  false ;
  Pringtingflagfail:boolean =  false ;
  Pringtingflagcomp:boolean = false;
  UniqueIdStatus:any = [];
  LogStatus:any;
  dataStatus:any;
  RunNoHistory:any;
  Printmassage:any;
  Uniqmassage:any;
  PrintFlag:boolean = false;
  massage:string="";
  //dataStatusLogs:any;
  IsIdTagNumber:boolean;
  element: HTMLElement;
  getfile:string="";
  getreportfile: string="";
  IsDownload:boolean=true;
  IsDownloadReport:boolean=true;
  urlname:any;
  url:string;
  splitURL:string;
  user:any;
  printbcp:string;

  isPdf:boolean=true;
  crystalprinter1: string=PrintersName.PDF;
  crystalprinter2: string=PrintersName.printmeshWAB;
  crystalprinter3: string=PrintersName.printnmmesh3;
  crystalprinter4: string=PrintersName.printmeshWAB;

  selectCrystalPrinterName: string="";
  SelectCrystalTemplatename: string="";
  reportname1: string=ReportNames.cabreport1;
  reportname2: string=ReportNames.cabreport2;
  reportname3: string=ReportNames.cabreport3;
  reportname4: string=ReportNames.cabreport4;
  reportname5: string=ReportNames.cabreport5;
  reportname6: string=ReportNames.cabreport6;
  reportname7: string=ReportNames.cabreport7;
  reportname8: string=ReportNames.cabreport8;
  reportname9: string=ReportNames.cabreport9;
  reportname10: string=ReportNames.cabreport10;
  reportname11: string=ReportNames.cabreport11;
  isreport: string;
  istag: string;
  type: string;
  selectedvalue: string="";
  reportCount: number=0;
  selectedReport : any="";
  reportCountfinal: any;
  fromdate: Date;
  isCoupler: any="";
  a:string="";
  time: string="";
  now: string="";
  temp: any="";

  
  ngOnInit(): void {

    this.GetUserDetails(this.user);
    this.url = window.location.href;
    this.splitURL = "CAB"; // this.url.split("/", 10)[5].trim().split("?", 5)[0].trim();
    this.appcomp.GetUserDetails(this.user,this.splitURL);


    this.PDF = PrintersName.PDF;
    this.pnm = PrintersName.printnm;
    this.printbcp = PrintersName.printnmbcp;

    this.getfile = GetPDFFile.valuecab;
    this.getreportfile=GetPDFFile.value;
    this.selectCutLenght= "Please Select Cut Length";
    this.loader = 'assets/img/loader.gif';
    this.RunNoHide = true;
    this.workcenterHide = true;
    this.GroupTagNumberHide= true;
    this.TagNumberPrintHide = true;
    this.workcentercheck= true;
    this.IsDownloadReport=true;
    this.GetPrinterName();
    this.GetLibrarianFile();
    this.setNumberOfDays();
    this.GetProductionCenter();
    //this.TRIAL();
    //this.GETDATE();
  }
  

  // async getConnection()
  // {
  //   const data = await this.service.GetConnectionDetails().toPromise(); 
  //   if(data == undefined || data =="Record not exist")
  //   {
  //     alert("Please refresh the page again.");
  //   }
  //   else
  //   {
  //     alert(data)
  //   }
    
  // }

  GETDATE()
  { 
    const now = new Date();
    this.now=now.toLocaleString();
    this.time=this.now.replace("/","-");
    this.time=this.time.replace("/","-");
    this.time=this.time.replace(":","-");
    this.time=this.time.replace(":","-");
    this.time=this.time.replace(","," ");
    //alert(this.time);
    //alert(now.toLocaleString());
  }

  GetTagNumber2(val:any){
   // alert(val);
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

  IsAllReport(){
    try{
      const checkbox = document.getElementById('chkAllCrystalReport') as HTMLInputElement ;
      
        this.GetselectedReports();
        if(this.reportCount == this.reportCountfinal){
          checkbox.checked= true;
        }
        else{
          checkbox.checked= false;
        }
  
    }
    catch(err) {
      //console.log(err);
    }
  }

  
  GetselectedReports(){
    this.selectedReport=[];
    this.reportCountfinal=11; //change here number of reports
    this.reportCount=0;
    var inputElems = document.getElementsByTagName("input");
    for (var i=0; i < inputElems.length; i++) {
      if(inputElems[i].className === "form-check-input m-1 chkSelectCrystalReport"){
        if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
          this.selectedReport += inputElems[i].value.trim() + ",";
          this.reportCount=this.reportCount+1;
        }
      }
    }
    if(this.selectedReport.length > 0){
    this.selectedReport = this.selectedReport.substring(0, this.selectedReport.length - 1);
    }
    else{
      this.selectedReport ="";
    }
  }    
  
  chkAllReport() {
    try{
      
      
     
      const checkbox = document.getElementById('chkAllCrystalReport') as HTMLInputElement ;
      this.ChechedAll('form-check-input m-1 chkSelectCrystalReport','chkAllCrystalReport');
       
      if (checkbox?.checked) {
        //this.validate=true;
        
      }
      else{
        
        }
        // const checkbox3 = document.getElementById('chkAllItemNumber') as HTMLInputElement ;
        // checkbox3.checked= false;
        this.GetselectedReports();
        
    }
    catch(err) {
      console.log(err);
    }
  }
  
  ChechedAll(subclassname:string, classname:string) {
    const checkbox = document.getElementById(classname) as HTMLInputElement ;
    var inputElems = document.getElementsByTagName("input");
    for (var i=0; i < inputElems.length; i++) {
      if(inputElems[i].className === subclassname){
       if(checkbox.checked == true){
         inputElems[i].checked = true;
       }
       else{
         inputElems[i].checked = false;
       }
      }
    }
  }
  
  

 async GetProductionCenter(){
  this.PCSenter="";
  this.ProductionCenter=[];
    const data = await this.service.GetProductionCenter().toPromise();
    this.ProductionCenter = data;

    for (var i = 0; i < this.ProductionCenter.length; i++) {
     this.PCSenter += this.ProductionCenter[i].fld_plant_desc + ",";
    }
    this.PCSenter = this.PCSenter.substring(0, this.PCSenter.length - 1);
    //console.log(this.PCSenter);
  }

  setNumberOfDays(){
    let days = new  NoOfdaylist();
    this.NoofDayslist =  days.value;
  }

//// get releasecode SOno
  async  GetReleaseCode(event:string,days:number)  {
    try{
      //this.GetProductionCenter();
      if(event == ""){
        this.selectedNumberOfDays=5;
        alert("Please Select Release Code or SO No or Run No or BBS No");
        return
      }
     this.valueId = event; //.target.value;
     this.resetWCGroupTagNo();
     this.GroupTagCount = "Total Tag : 0";
     this.tagNumber = [];
     this.RunNoHide = true;
     this.SpinnerService.show('spinner0'); 
     this.listReleaseCode=[];
     if(this.valueId==='ReleaseCode'){
     
      // this.service.getReleaseCode(this.username,'CAB Production').subscribe(data => {
      //   this.listReleaseCode = data;
      // });
      debugger;
      const data = await this.service.getReleaseCode(days,'CAB Production').toPromise();
      debugger;
      this.listReleaseCode = data;
      //alert(data);
      this.selectedreleasecode="Select Release code";
     }
     else if(this.valueId==='SONo'){
      const data = await this.service.getSONo(days,'CAB Production').toPromise();
      this.listReleaseCode = data;
      this.selectedreleasecode="Select SO No";
     }
     else if(this.valueId==='RunNumber'){
      const data = await this.service.GetRunNo(days,'CAB Production').toPromise();
      this.listReleaseCode = data;
      //this.Number=data;
      this.selectedreleasecode="Select Run No";
     }
     else{
     // this.listReleaseCode.push="Select BBS No";
      const data = await this.service.getBBSNo(days,'CAB Production').toPromise();
      this.listReleaseCode = data;
     // this.selectedreleasecode="Select BBS No";
     }
     this.tagNumber = [];
     this.RunNoHide = true;
    }
    catch(err:any) {
      this.SpinnerService.hide('spinner0');
      alert(err.error);
    }
    this.SpinnerService.hide('spinner0'); 
    this.Type="All";
  }
  
   
///////////////////////////////////////////////////////////////////////////////////////////
 

////////////////////////////////////////////////////////////////////////////////////

  TagCount:number;
  WCCount:number;
  GTagCount:number;
//// Get Tag Numbers
async GetTagNumber(event:any){
try{
  this.SpinnerService.show('spinner1'); 
      this.resetWCGroupTagNo();
      this.tagNumber = [];
      this.GroupTagCount = "Total Tag : 0";
      // this.SelectedTagId = event.target.value.split(":", 2)[1].trim() ;
      this.SelectedTagId = event ;
      if(this.SelectedTagId == undefined){
        this.RunNoHide = true;
      }
      else{
        if(this.valueId==='ReleaseCode'){
        const data = await this.service.GetRunNumberReleasecode(this.SelectedTagId).toPromise();
        this.tagNumber = data;
        this.Number=data;
        for (var i = 0; i < this.tagNumber.length; i++) {
          this.tagNumber[i].isChecked = true;
        }
        this.TagCount = this.tagNumber.length;
        //alert(this.TagCount);
        this.getWorkCenter(this.tagNumber);
        }
        else if(this.valueId==='SONo'){
          const data = await this.service.GetRunNumberSONo(this.SelectedTagId).toPromise();
          this.tagNumber = data;
          this.Number=data;
          for (var i = 0; i < this.tagNumber.length; i++) {
            this.tagNumber[i].isChecked = true;
          }
          this.TagCount = this.tagNumber.length;
          this.getWorkCenter(this.tagNumber);
        }
        else if(this.valueId==='RunNumber'){
          this.tagNumber=[];
          //this.Number=[];
          this.RunNoItem.RunNo=this.SelectedTagId;
          this.RunNoItem.isChecked=true;
          this.tagNumber.push(this.RunNoItem);
          this.temp=this.SelectedTagId;
          for (var i = 0; i < this.tagNumber.length; i++) {
            this.tagNumber[i].isChecked = true;
          }
          this.TagCount = this.tagNumber.length;
          if(this.tagNumber.length>0){
            this.getWorkCenter(this.tagNumber);
          }
        }
        else{
          const data = await this.service.GetRunNumberBBSNo(this.SelectedTagId).toPromise();
          this.tagNumber = data;
          this.Number=data;
          for (var i = 0; i < this.tagNumber.length; i++) {
            this.tagNumber[i].isChecked = true;
          }
          this.TagCount = this.tagNumber.length;
          this.getWorkCenter(this.tagNumber);
      }

      this.RunNoHide = false;
    }
    this.SpinnerService.hide('spinner1');
  }
  catch(err:any) {
    this.SpinnerService.hide('spinner1');
    alert(err.error);
  }
  finally{
    //this.getreportfile=GetPDFFile.value+this.SelectedTagId+"_"+this.time+"";
  }
  
}

//// get Work Center
  getWorkCenter(TagId:any){
  try{
    this.runno="";
    if(TagId.length > 0){
        for (var i = 0; i < TagId.length; i++) {
            this.runno  += TagId[i].RunNo + ",";
        }
      this.getworkcenterselected(this.runno);
    }
  }
  catch(err) {
    alert(err);
  }
  }

  //// get Work Center on select
 async getworkcenterselected(TagId:any){
  try{
    this.SpinnerService.show('spinner2'); 
      if(TagId.length > 0){
          TagId = TagId.substring(0, TagId.length - 1);
          this.workcenterHide = false; 
          const data = await this.service.GetWorkCenterFromRunNo(TagId).toPromise();
          this.workcenter = data;
          this.WCCount = this.workcenter.length;
          //alert(this.WCCount);
          for(var i = 0; i < this.workcenter.length; i++) {
            this.workcenter[i].isChecked = true;
          }  
        this.GetGroupTagNumber(this.workcenter);
        this.SpinnerService.hide('spinner2'); 
      }
      else
      {
        this.workcenter = [];
        this.workcenterHide = true;
      }
    }
    catch(err:any) {
      this.SpinnerService.hide('spinner2'); 
      //alert(err.error);
      if(err.error == "Record not exist" ){
        this.GroupTagCount = "Total Tag : 0"; 
      }
    }
  }

  //// get Group Tag Number
GetGroupTagNumber(workId:any){
  try{
    this.GroupTagNumberHide= false;
    this.AllgroupTagNumber="";
      for (var i = 0; i < workId.length; i++) {
        this.AllgroupTagNumber += workId[i].ID + ",";
      }
      this.GetGroupTagNumberId(this.AllgroupTagNumber);
      this.GroupTagNumberHide= false;
      const checkbox = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
      checkbox.checked= true;
    }
    catch(err:any) {
      //alert(err.error);
    }
}
  
//// get Group Tag Number from ID
async GetGroupTagNumberId(workId:any){
  try{
    this.isCheckedAllGroup = true;
    this.SpinnerService.show('spinner3');
    workId = workId.substring(0, workId.length - 1);
   // this.runno = this.runno.substring(0, this.runno.length - 1);
   this.getSelectedRunNo();
    const data = await this.service.GetTagFromWC(this.RunNoSelected,workId).toPromise();
    this.groupTagNumber = data;
    this.GTagCount = this.groupTagNumber.length;
    //alert(this.GTagCount);
    for (var i = 0; i < this.groupTagNumber.length; i++) {
      this.groupTagNumber[i].isChecked = true;
      this.groupTagNumber[i].isDisable = false;
    }   
   
   this.isCheckedother = true;
    this.isDisableCutLenght= false;
    this.enablePrompting = false;

    this.SpinnerService.hide('spinner3');
    this.GetTagNumberToPrint(this.groupTagNumber);
  }
  catch(err:any) {
    this.SpinnerService.hide('spinner3');
    //alert(err.error);
    if(err.error == "Record not exist" ){
      this.GroupTagCount = "Total Tag : 0"; 
      this.isCheckedother = false;
    }
  }
}

  //// check/Uncheck all for Run No
  checkUncheckAll() {
    try{

      var inputElems = document.getElementsByTagName("input");
      for (var i=0; i < inputElems.length; i++) {
        if(inputElems[i].className === "form-check-input m-1 chkSelectRunNo"){
          if (inputElems[i].type === "checkbox" && inputElems[i].checked === false ){
            inputElems[i].checked = true;
          }
        }
      }

      this.GroupTagCount = "Total Tag : 0";
      this.allRuncheck = "";
      const checkbox = document.getElementById('chkAllSelectRunNo') as HTMLInputElement ;
      if (checkbox?.checked) {
        for (var i = 0; i < this.tagNumber.length; i++) {
          this.tagNumber[i].isChecked = true;
          this.allRuncheck += this.tagNumber[i].RunNo + ",";
        }
        this.getworkcenterselected(this.allRuncheck);
      }
      else{
        for (var i = 0; i < this.tagNumber.length; i++) {
          this.tagNumber[i].isChecked = false;
          this.resetWCGroupTagNo();
       }
      } 
      this.setCutlenght();
    }
    catch(err) {
      console.log(err);
    }
  }

  setCutlenght(){
    this.selectCutLenght= "Please Select Cut Length";
    this.isDisableCutLenght = true;
  }
resetWCGroupTagNo(){
  this.workcenter = [];
  this.groupTagNumber=[];
  this.tagNumberToPrint=[];
  this.workcenterHide = true;
  this.GroupTagNumberHide= true;
  this.TagNumberPrintHide= true;
}

   //// check/Uncheck all for work Center
  checkUncheckWorkCenter(){
    try{
      var inputElems = document.getElementsByTagName("input");
      for (var i=0; i < inputElems.length; i++) {
        if(inputElems[i].className === "form-check-input m-1 chkSelectworkcenter"){
          if (inputElems[i].type === "checkbox" && inputElems[i].checked === false ){
            inputElems[i].checked = true;
          }
        }
      }

      this.GroupTagCount = "Total Tag : 0";
      this.allRuncheck = "";
      const checkbox = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
      if (checkbox?.checked) {
        for (var i = 0; i < this.workcenter.length; i++) {
          this.workcenter[i].isChecked = true;
          this.allRuncheck += this.workcenter[i].ID + ",";
          }
          this.GetGroupTagNumberId(this.allRuncheck);
          this.GroupTagNumberHide= false;
      }
      else{
        for (var i = 0; i < this.workcenter.length; i++) {
          this.workcenter[i].isChecked = false;
          this.groupTagNumber=[];
          this.tagNumberToPrint=[];
          this.GroupTagNumberHide= true;
          this.TagNumberPrintHide= true;
      }
      }
      this.isCheckedAllGroup= true;
      this.setCutlenght();
      //this.Type = "All";
      this.ishidden = false;
    }
    catch(err) {
      console.log(err);
    }
  }
  
  //// checked all for Run No
  isAllSelected() {
    try{
      this.runno="";
      const checkbox = document.getElementById('chkAllSelectRunNo') as HTMLInputElement ;
        var inputElems = document.getElementsByTagName("input"),
        count = 0;
        for (var i=0; i < inputElems.length; i++) {
          if(inputElems[i].className === "form-check-input m-1 chkSelectRunNo"){
            if (inputElems[i].type === "checkbox" && inputElems[i].checked === false ){
              count++;
              checkbox.checked= false;
            }
          else {
              this.runno += inputElems[i].value + ",";
            }
          }
        }
      if(count === 0 ){
        checkbox.checked= true;
      }
      if(count === this.TagCount){
        this.setCutlenght();
        this.resetWCGroupTagNo();
        this.GroupTagCount = "Total Tag : 0";
      }
      else{
        this.getworkcenterselected(this.runno);
      }
      
    }
    catch(err) {
      console.log(err);
    }
}
workwc:any;
 //// checked all for work center 
async isAllSelectedworkcenter(){
  this.workwc="";
    const checkbox = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
      var inputElems = document.getElementsByTagName("input"),
      count = 0;
      for (var i=0; i < inputElems.length; i++) {
        if(inputElems[i].className === "form-check-input m-1 chkSelectworkcenter"){
          if (inputElems[i].type === "checkbox" && inputElems[i].checked === false ){
            count++;
            checkbox.checked= false;
          }
         else {
           // this.runno += inputElems[i].value + ",";
            this.workwc += inputElems[i].value + ",";
          }
        }
      }
    if(count === 0 ){
      checkbox.checked= true;
    }
    if(this.WCCount === count){
      this.groupTagNumber= [];
      this.tagNumberToPrint= [];
      this.GroupTagNumberHide= true;
      this.TagNumberPrintHide= true;
      this.GroupTagCount = "Total Tag : 0";
    }
    else{
    try{
      this.getSelectedRunNo();
      this.SpinnerService.show('spinner3');
      const data = await this.service.GetTagFromWC(this.RunNoSelected,this.workwc).toPromise();
      console.log(data);
      this.groupTagNumber = data;
      for (var i = 0; i < this.groupTagNumber.length; i++) {
        this.groupTagNumber[i].isChecked = true;
      } 
      this.isDisableCutLenght= false;  
      this.checkUncheckGroupTagNumber(false);
    }
    catch(err:any) {
      this.SpinnerService.hide('spinner3');
      //alert(err.error);
      this.groupTagNumber=[];
      this.tagNumberToPrint=[];
      this.isCheckedother = false;
      this.GroupTagCount = "Total Tag : 0";
    }
  }
  this.isCheckedAllGroup = true;
  this.GroupTagNumberHide = false;
    this.SpinnerService.hide('spinner3');
    this.setCutlenght();
}
selectedWC:any;
getselectedWC(){
  this.selectedWC=[];
  var inputElems = document.getElementsByTagName("input");
  for (var i=0; i < inputElems.length; i++) {
    if(inputElems[i].className === "form-check-input m-1 chkSelectworkcenter"){
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
        this.selectedWC += inputElems[i].value + ",";
      }
    }
  }
  if(this.selectedWC.length > 0){
  this.selectedWC = this.selectedWC.substring(0, this.selectedWC.length - 1);
  }
  else{
    this.selectedWC="";
  }
}

//// check/Uncheck all for Group Tag Number
async checkUncheckGroupTagNumber(Filter:boolean){
  try{
      var inputElems = document.getElementsByTagName("input");
      for (var i=0; i < inputElems.length; i++) {
        if(inputElems[i].className === "form-check-input m-1 chkGroupTagNo"){
          if (inputElems[i].type === "checkbox" && inputElems[i].checked === false ){
            inputElems[i].checked = true;
          }
        }
      }
      this.isCheckedother= true;
    this.tagNumberToPrint=[];
      this.allRuncheck="";
      const checkbox = document.getElementById('chkAllGroupTagNumber') as HTMLInputElement ;
      if (checkbox?.checked) {
        if(this.selectCutLenght == "Please Select Cut Length" || this.selectCutLenght == undefined){
          this.selectCutLenght="0";
        }
        const checkboxOther = document.getElementById('chkOtherTagNumber') as HTMLInputElement ;
        if(checkboxOther?.checked){
          this.IsOtherTag= true;
        }
        else{
          this.IsOtherTag= false;
        }
        this.isDisableCutLenght= false;
        for (var i = 0; i < this.groupTagNumber.length; i++) {
          this.groupTagNumber[i].isChecked = true;
          this.allRuncheck += this.groupTagNumber[i].Id + ",";
          }
          this.GroupTagNumberHide= false;
          this.TagNumberPrintHide= false;
          this.allRun=[];
          this.allGroupTag=[];
          for (var i = 0; i < this.Number.length; i++) {
            this.allRun += this.Number[i].RunNo + ",";
            this.runno += this.Number[i].RunNo + ",";
          }
          this.allRun = this.allRun.substring(0, this.allRun.length - 1);
          this.runno = this.runno.substring(0, this.runno.length - 1);
          this.getselectedWC();
          if(this.groupTagNumber.length>0){
            for (var i = 0; i < this.groupTagNumber.length; i++) {
              this.allGroupTag += this.groupTagNumber[i].TagNo + ",";
            }
            this.allGroupTag = this.allGroupTag.substring(0, this.allGroupTag.length - 1);
            try{
              if(this.selectCutLenght == "Please Select Cut Length"){
                this.selectCutLenght ="0";
              }
              this.SpinnerService.show('spinner4');
              const data = await this.service.GetTagFromGroupTag(this.allRun,this.allGroupTag,this.selectCutLenght,this.isCheckedother,this.selectedWC).toPromise();
              //alert(data + " 11");
              this.tagNumberToPrint = data;
              this.tagNumberToPrintRange = data;
              this.tagNumberFromPrintRange= data;
              
                for (var i = 0; i < this.tagNumberToPrint.length; i++) {
                  this.tagNumberToPrint[i].isChecked = true;
                }  
                this.SpinnerService.hide('spinner4');
                this.GroupTagCount = "Total Tag : "+ this.tagNumberToPrint.length ; 
            }
            catch(err:any) {
              this.SpinnerService.hide('spinner4');
              //alert(err.error);
              this.tagNumberToPrintRange=[];
            }
          }
          else{
           // this.ishidden= false;
           this.allGroupTag="";
            this.SpinnerService.show('spinner4');
            const data = await this.service.GetTagFromGroupTag(this.allRun,this.allGroupTag,this.selectCutLenght,true,this.selectedWC).toPromise();
            this.tagNumberToPrint = data;
            this.tagNumberToPrintRange = data;
            this.tagNumberFromPrintRange= data;

              for (var i = 0; i < this.tagNumberToPrint.length; i++) {
                this.tagNumberToPrint[i].isChecked = true;
              }  
              this.SpinnerService.hide('spinner4');
              this.GroupTagCount = "Total Tag : "+ this.tagNumberToPrint.length ; 
              //alert(this.tagNumberToPrint.length);
          }
         // this.GroupTagCount = "Total Tag : " +  this.tagNumberToPrint.length;
      }
      else{
        this.isDisableCutLenght= true;
        this.isCheckedother= false;
        this.selectCutLenght = "Please Select Cut Length";
        for (var i = 0; i < this.groupTagNumber.length; i++) {
          this.groupTagNumber[i].isChecked = false;
          this.tagNumberToPrint = [];
          this.TagNumberPrintHide= true;
      }
      this.GroupTagCount = "Total Tag : 0";
      }
  }
  catch(err) {
    this.SpinnerService.hide('spinner4');
    console.log(err);
  }
}
IsOtherTag:boolean;
//// select one by one checkbox for Group Tag Number
async isAllSelectedGroupTagNo(){
  try{
      this.allRun=[];
      this.runno="";
      this.isDisableCutLenght= false;
      this.TagNumberPrintHide= false;
      this.ALLRunNOChecked= true;
      // this.Type="All";
      // this.ishidden = true;

      this.GroupTagCount="Total Tag : 0" ;

      const checkboxOther = document.getElementById('chkOtherTagNumber') as HTMLInputElement ;
        if(checkboxOther?.checked){
          this.IsOtherTag= true;
        }
        else{
          this.IsOtherTag= false;
        }
        const checkbox = document.getElementById('chkAllGroupTagNumber') as HTMLInputElement ;
          var inputElems = document.getElementsByTagName("input"),
          count = 0;
          for (var i=0; i < inputElems.length; i++) {
            if(inputElems[i].className === "form-check-input m-1 chkGroupTagNo"){
              if (inputElems[i].type === "checkbox" && inputElems[i].checked === false ){
                count++;
                checkbox.checked= false;
              }
              else {
                this.runno += inputElems[i].value + ",";
              }
            }
          }
        if(count === 0 ){
          checkbox.checked= true;
        }
        if(this.GTagCount === count){
          this.tagNumberToPrint=[];
          this.TagNumberPrintHide= true;
        }
        else{
          if(this.selectCutLenght == "Please Select Cut Length"){
            this.selectCutLenght ="0";
         }
         this.getselectedWC();
          this.tagNumberToPrint=[];
          this.SpinnerService.show('spinner4');
          for (var i = 0; i < this.Number.length; i++) {
            this.allRun += this.Number[i].RunNo + ",";
          }
          this.allRun = this.allRun.substring(0, this.allRun.length - 1);
          this.runno = this.runno.substring(0, this.runno.length - 1);

          const data = await this.service.GetTagFromGroupTag(this.allRun,this.runno,this.selectCutLenght,this.IsOtherTag,this.selectedWC).toPromise();
          //alert(data + " 12");
          this.tagNumberToPrint = data;
          this.tagNumberToPrintRange = data;
          this.tagNumberFromPrintRange= data;
          
          for (var i = 0; i < this.tagNumberToPrint.length; i++) {
            this.tagNumberToPrint[i].isChecked = true;
          }    
          this.SpinnerService.hide('spinner4');  
          this.GroupTagCount = "Total Tag : " + this.tagNumberToPrint.length;
        }
       // alert(this.Type);
        if(this.Type == "All"){
          this.ishidden = true;
        }
        else{
          this.ishidden = false;
        }
      }
      catch(err:any) {
        this.SpinnerService.hide('spinner4');
       // alert(err.error);
      }
}

//// get Tag Number to Print
GetTagNumberToPrint(TagNumberId:any){
  try{
    this.TagNumberPrintHide=false;
    this.AllTagNumberToPrint="";
      for (var i = 0; i < TagNumberId.length; i++) {
        this.AllTagNumberToPrint += TagNumberId[i].TagNo + ",";
      }
      this.GetTagNumberToPrintId(this.AllTagNumberToPrint);
    }
    catch(err:any) { 
      alert(err.error);
    }
}

//// get Group Tag Number to Print from ID
async GetTagNumberToPrintId(TagNumberId:any){
  try{
    this.isCheckedother= true;
    this.getSelectedRunNo();
    this.tagNumberToPrint=[];
    this.SpinnerService.show('spinner4');
    this.ALLRunNOChecked= true;
    //this.IsIdTagNumber =  false;
    //alert("ok");
    // this.element = document.getElementById('IdTagNumber') as HTMLElement;
    // this.element.hidden;
    //IdTagNumber
    if(this.Type == "All"){
      this.ishidden = true;
    }
    else{
      this.ishidden = false;
    }
    this.getselectedWC();
    //const checkboxOther = document.getElementById('chkOtherTagNumber') as HTMLInputElement ;
    // if(checkboxOther?.checked){
    //   this.IsOtherTag= true;
    // }
    // else{
    //   this.IsOtherTag= false;
    // }
    //this.runno = this.runno.substring(0, this.runno.length - 1);
    this.AllTagNumberToPrint="";
    this.AllTagNumberToPrint = TagNumberId.substring(0, TagNumberId.length - 1);
    if(this.selectCutLenght == "Please Select Cut Length"){
      this.selectCutLenght ="0";
   }
    if(this.groupTagNumber.length>0){
    
      const data = await this.service.GetTagFromGroupTag(this.RunNoSelected,this.AllTagNumberToPrint,this.selectCutLenght,true,this.selectedWC).toPromise();
     // alert(data  + " 13");
      this.tagNumberToPrint = data;
      this.tagNumberToPrintRange = data;
      this.tagNumberFromPrintRange= data;

      for (var i = 0; i < this.tagNumberToPrint.length; i++) {
        this.tagNumberToPrint[i].isChecked = true;
        //this.tagNumberToPrint[i].isDisableTag = false;
      }   
      this.GroupTagCount= "Total Tag : " + this.tagNumberToPrint.length; 
    
    }
    this.SpinnerService.hide('spinner4');
    // const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
    // checkbox.checked= true;
    
  }
  catch(err:any) {
    this.SpinnerService.hide('spinner4');
    alert(err.error);
  }
}

//// check/Uncheck all for Tag Number to Print
checkUncheckTagNumbertoPrint(){
  const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
  if (checkbox?.checked) {
    for (var i = 0; i < this.tagNumberToPrint.length; i++) {
       this.tagNumberToPrint[i].isChecked = true;
    }
    this.GroupTagCount = "Total Tag : " + this.tagNumberToPrint.length;
  }
  else{
    for (var i = 0; i < this.tagNumberToPrint.length; i++) {
      this.tagNumberToPrint[i].isChecked = false;
   }
   this.GroupTagCount = "Total Tag : 0" ;
  }
  
}

//// check all for Tag Number to Print
isAllSelectedTagNotoPrint(){
  this.runno="";
  const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
    var inputElems = document.getElementsByTagName("input"),
    count = 0;
    for (var i=0; i < inputElems.length; i++) {
      if(inputElems[i].className === "form-check-input m-1 chkTagNoTagNotoPrint"){
        if (inputElems[i].type === "checkbox" && inputElems[i].checked === false ){
          checkbox.checked= false;
        }
       else {
          count++;
        }
      }
    }
  if(count === 0 ){
    checkbox.checked= true;
  }
  this.GroupTagCount = "Total Tag : " + count.toString();
}

demo: string="";
//runnoforprint:string = 'HB08132L0200,NB08212L0100';
getSelectedRunNo(){
  this.RunNoSelected=[];
  var inputElems = document.getElementsByTagName("input");
  for (var i=0; i < inputElems.length; i++) {
    if(inputElems[i].className === "form-check-input m-1 chkSelectRunNo"){
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
        this.RunNoSelected += inputElems[i].value + ",";
      }
    }
  }
  if(this.RunNoSelected!="")
  {
    this.RunNoSelected = this.RunNoSelected.substring(0, this.RunNoSelected.length - 1);
    this.demo= this.RunNoSelected.substring(0,1);
  }

}


async GetStatus(id:any){
  
  if(id.length > 0){
  for(var i=0; i < id.length; i++ ){
    if(id[i] != undefined){
     this.dataStatus = await this.service.GetStatus(id[i].UniqueId).toPromise();
      
   if(this.Logs.length==0){
    this.pushLogs(this.dataStatus);
    this.Pringtingflag = false;
    }
    else{
      for(var k =0; k < this.dataStatus.length ; k++){
       
        for(var h =0;h < this.Logs.length; h++){

          if(this.Logs[h].UniqueId == id[i].UniqueId){
            if(this.Logs[h].UniqueId === this.dataStatus[k].UniqueId && this.Logs[h].LogStatus === this.dataStatus[k].LogStatus){

            }
            else{
              this.pushLogs(this.dataStatus);
              delete id[i];
            }
          }
          else{
            let flag:boolean=true;
            for(var h =0;h < this.Logs.length; h++){
              if(this.Logs[h].UniqueId == id[i].UniqueId){
                flag= false;
                if(this.Logs[h].LogStatus != this.dataStatus[k].LogStatus || this.Logs[h].UniqueId != id[i].UniqueId){
                  flag= true;
                }
              }
              
            }
            if(flag){
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
finalpath: string="";

pushLogs(logdata:any){
  if(this.valueId=="RunNumber" || this.valueId=="BBSNo" || this.valueId=="SONo")
  {
    this.Tempfile= this.selectTemplateName.split("/")[3].trim() ;
  for(var j =0;j < logdata.length; j++){
    this.Logs.push({
      ProdType:"CAB",
      LogStatus: logdata[j].LogStatus,
      ProductType: logdata[j].ProductType,
      StartTime: logdata[j].StartTime,
      EndTime: logdata[j].EndTime,
      releaseCode: this.SelectedTagId,
      User: this.Username,
      UniqueId: logdata[j].UniqueId,
      TempletFile: this.Tempfile
    });
}

  }
  else
  {
    this.Tempfile= this.selectTemplateName.split("/")[3].trim() ;
    for(var j =0;j < logdata.length; j++){
      this.Logs.push({
        ProdType:"CAB",
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

TRIAL()
{
// const fs = require('fs')
// const length = fs.readdirSync('D:/Tag Print Application/Reports/CAB_REPORTS/0215P151').length;
// alert(length);
}

settimeoutfun()
{
  this.IsPrintdisabled=false;
  this.isPrintingStarted=true;
  setTimeout(() => {
    this.isPrintingCompleted=true;
    this.IsDownloadReport=false;
  }, 160000); 
}

async RunHistory(){
  this.GETDATE();
  this.isreport="";
  this.istag="";
  this.type=this.selected;
  this.IsDownloadReport=true;
  //this.selectedvalue=this.selectedreleasecode;
  const checkbox = document.getElementById('IsCrystalReport') as HTMLInputElement ;
  const checkbox2 = document.getElementById('IsTagReport') as HTMLInputElement ;
  //const checkbox3 = document.getElementById('IsCoupler') as HTMLInputElement ;
  if(checkbox.checked== true || checkbox2.checked==true)
  {

  }
  else
  {
    alert("Please check the checkbox of tags or report for print..")
    return;
  }

  if(checkbox.checked == true)
  {
      this.isreport="true";
      //  if(checkbox3.checked==true)
      //  {
      //    this.isCoupler="true";
      //  }
      //  else
      //  {
      //    this.isCoupler="false";
      //  }
      this.GetselectedReports();
      

      if(this.selectCrystalPrinterName=="")
      {
        alert("Please Select Printername to print the reports");
        return;
      }
      if(this.selectedReport=="")
      {
        alert("Select Report to Print");
        return;
      }
      
      // else{
      //   this.date1=formatDate(this.fromdate,'yyyy-MM-dd',"en-US");
      // }
      if(this.selectedReport.includes(ReportNames.cabreport7) || this.selectedReport.includes(ReportNames.cabreport9) || this.selectedReport.includes(ReportNames.cabreport10)|| this.selectedReport.includes(ReportNames.cabreport11))
      {
      if(!this.fromdate)
      {
       alert("Please Select Delivery Date For CAB Loading By delivery date in Report Section.");
       return;
      }
      this.date1=this.fromdate;
      }
      if(this.selectedReport.includes(ReportNames.cabreport7) || this.selectedReport.includes(ReportNames.cabreport9) || this.selectedReport.includes(ReportNames.cabreport10) || this.selectedReport.includes(ReportNames.cabreport11))
      {
        if(this.selectedReport.includes(ReportNames.cabreport1) || this.selectedReport.includes(ReportNames.cabreport2) || this.selectedReport.includes(ReportNames.cabreport3)|| this.selectedReport.includes(ReportNames.cabreport4)|| this.selectedReport.includes(ReportNames.cabreport5) || this.selectedReport.includes(ReportNames.cabreport6) || this.selectedReport.includes(ReportNames.cabreport8))
        {
        if(this.SelectedTagId=="")
        {
        alert("Release Code should not be empty");
        return;
        }
       }
      }
      else
      {
        
        if(this.SelectedTagId=="")
        {
        alert("Release Code should not be empty");
        return;
        }
       
      }
    
  }
  if(checkbox2.checked ==true)
  {
      this.istag="true";  
  }

  this.PrinterStatus();
  if(checkbox2.checked==true)
  {
  this.getSelectedRunNo();
  }

  if(checkbox2.checked==true)
  {
  const data = await this.service.RunHistory(this.RunNoSelected).toPromise();
  this.RunNoHistory = data;
  //alert(this.RunNoHistory[0].ErrorMsg);
  if(this.RunNoHistory[0].ErrorMsg.length > 0){
    if(confirm("Are you sure to continue \n" + this.RunNoHistory[0].ErrorMsg)) {
      this.Print();
    }
  }
  else{
    this.Print();
  }
}
if(checkbox2.checked!=true && checkbox.checked==true)
  {
    this.Print();

  }
}
 
IsPrintdisabled:boolean = false;
isPrintingStarted:boolean=false;
isPrintingCompleted:boolean=false;
async Print(){ 

    try{
      const checkbox4 = document.getElementById('IsTagReport') as HTMLInputElement ;
      this.IsPrintdisabled=false;
      this.isPrintingStarted=false;
      this.isPrintingCompleted=false;
      if(checkbox4.checked==true)
      {
      if(this.valueId == undefined){
        alert("Please Select Release Code");
        return
      } 
      else if (this.SelectedTagId.length < 0){
        alert("Please Select Tag Number");
        return
      }
      else if( this.selectPrinterName == undefined || this.selectPrinterName == "Select Printer Name" ){
        alert("Please Select Printer Name");
        return
      }
      else if(this.selectTemplateName == undefined || this.selectTemplateName == "Select Template File" ){
        alert("Please Select Template File");
        return
      }

      this.totalTagCount =   this.GroupTagCount.split(":", 2)[1].trim();
      if(this.totalTagCount <= "0"){
        alert("Please Select Tag Number");
        return;
      }
    
      const checkbox = document.getElementById('chkOtherTagNumber') as HTMLInputElement ;
      if(this.selectCutLenght == "Please Select Cut Length"){
         this.selectCutLenght ="0";
      }
    

      
      if(this.Type == "All"){
       this.getSelectedRunNo();
      }
      else if (this.Type == "Workcenter"){
        this.Workcenter=[];
        var inputElems = document.getElementsByTagName("input");
        for (var i=0; i < inputElems.length; i++) {
          if(inputElems[i].className === "form-check-input m-1 chkSelectworkcenter"){
            if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
              this.Workcenter += inputElems[i].value + ",";
            }
          }
        }
        if(this.Workcenter.length > 0){
        this.Workcenter = this.Workcenter.substring(0, this.Workcenter.length - 1);
        }
        else{
          this.Workcenter="";
        }
      }
      else if (this.Type == "Range"){
          this.FromRange = this.FromRangeselected
          this.ToRange = this.ToRangeselected
      }

      this.TagNo=[];
      var inputElems = document.getElementsByTagName("input");
      for (var i=0; i < inputElems.length; i++) {
        if(inputElems[i].className === "form-check-input m-1 chkTagNoTagNotoPrint"){
          if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
            this.TagNo += inputElems[i].value + ",";
          }
        }
      }
      if(this.TagNo.length > 0){
        this.TagNo = this.TagNo.substring(0, this.TagNo.length - 1);
      }
      else{
        this.TagNo="";
      }

      this.GroupTagNo=[];
      var inputElems = document.getElementsByTagName("input");
      for (var i=0; i < inputElems.length; i++) {
        if(inputElems[i].className === "form-check-input m-1 chkGroupTagNo"){
          if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
            this.GroupTagNo += inputElems[i].value + ",";
          }
        }
      }

      if(this.GroupTagNo.length > 0){
      this.GroupTagNo = this.GroupTagNo.substring(0, this.GroupTagNo.length - 1);
      }
      else{
        this.GroupTagNo ="";
      }
      }
      this.IsDownloadReport=true;
      
    const checkbox3 = document.getElementById('IsCrystalReport') as HTMLInputElement ;
    const checkbox2 = document.getElementById('IsTagReport') as HTMLInputElement ;
    if(this.SelectedTagId=="")
    {
      this.SelectedTagId=this.fromdate.toString();
      this.getreportfile=GetPDFFile.value+this.fromdate.toString()+"_"+this.time+"";
    }
    else{
      this.getreportfile=GetPDFFile.value+this.SelectedTagId+"_"+this.time+"";
    }
      this.IsPrintdisabled= true;
      this.selectedvalue=this.selectedReport;
    
      const data = await this.service.PrintTagTemplates(
          this.SelectedTagId,
          this.RunNoSelected,
          this.TagNo,
          this.Type,
          this.FromRange,
          this.ToRange,
          this.Workcenter,
          this.selectPrinterName,
          this.selectTemplateName,
          this.selectCutLenght,
          this.enablePrompting,
          this.GroupTagNo,
          this.PrintedBy,
          this.istag,
          this.isreport,
          this.selectCrystalPrinterName,
          this.SelectCrystalTemplatename,
          this.type,
          this.selectedvalue,
          this.date1,
          this.isCoupler,
          this.time
        ).toPromise();
        
      this.Printmassage = data;
      this.massage = this.Printmassage[0].UniqueId;

  // if(checkbox2.checked!=true && checkbox3.checked==true)
  // {
  //   if(this.selectedReport.includes(ReportNames.cabreport4) && this.selectedReport.includes(ReportNames.cabreport2))
  //   {
  //   this.IsPrintdisabled=false;
  //   this.isPrintingStarted=true;
  //   setTimeout(() => {
  //     this.isPrintingCompleted=true;
  //     this.IsDownloadReport=false;
  //   }, 170000);
  //   }
    
  //   else if(this.selectedReport.includes(ReportNames.cabreport2) || this.selectedReport.includes(ReportNames.cabreport7))
  //   {
  //     this.IsPrintdisabled=false;
  //   this.isPrintingStarted=true;
  //   setTimeout(() => {
  //     this.isPrintingCompleted=true;
  //     this.IsDownloadReport=false;
  //   }, 80000);
  //   }
  //   else if(this.selectedReport.includes(ReportNames.cabreport4))
  //   {
  //     this.IsPrintdisabled=false;
  //   this.isPrintingStarted=true;
  //   setTimeout(() => {
  //     this.isPrintingCompleted=true;
  //     this.IsDownloadReport=false;
  //   }, 10000);
  //   }
  //   else{
  //     this.IsPrintdisabled=false;
  //   this.isPrintingStarted=true;
  //   setTimeout(() => {
  //     this.isPrintingCompleted=true;
  //     this.IsDownloadReport=false;
  //   }, 30000);
  //   }
    
  // }
  
  if(checkbox3.checked==true)
  { 
    this.isPrintingCompleted=false;
    this.IsPrintdisabled=false;
    this.isPrintingStarted=true;
    if(this.SelectedTagId!="")
    {
    this.finalpath=this.SelectedTagId+"_"+this.time;
    }
    else
    {
      this.finalpath=this.fromdate+"_"+this.time;
    }
    setInterval(() => {
      //this.isPrintingCompleted=true;
      this.getcount(this.finalpath);
    }, 5000);
  }
  
  if(checkbox4.checked==true)
  {
      this.UniqueId.push({UniqueId: this.massage});
      this.PrintFlag= true;
      
      setInterval(() => {
        this.GetStatus(this.UniqueId);
      }, 10000);
  }
        // this.Logs.push({
        //   Print: "Print command sent to printer successfully : " +   this.SelectedTagId ,
        //   DateTime: formatDate(new Date(), 'dd/MM/yyyy  HH:MM:SS', 'en'),
        // });
        this.SpinnerService.hide('spinner0'); 
      
  }
  catch(err:any) {
    this.SpinnerService.hide('spinner0');
    alert(err.error);
  }
}

async getcount(path: string)
{
  this.GetselectedReports();
  const data = await this.service.GetFileCountCab(path).toPromise();
    if(data==this.reportCount){
      this.isPrintingCompleted=true;
      this.IsDownloadReport=false;
    }
}

async Reset(){
  try{
  this.Logs = [];
  var logg =  document.getElementById("IdlogDiv")?.innerText;
  this.selectedNumberOfDays=5;
  this.tagNumber=[];
  this.listReleaseCode=[];
  this.selected= '';
  this.resetWCGroupTagNo();
  this.selectCutLenght = "Please Select Cut Length";
  this.GroupTagCount = "Total Tag : 0";
  const data = await this.service.ResetEngine().toPromise();
  //alert(data);
  }
  catch(err:any) {
    alert(err.error);
  }

}

//// Printer Name
GetPrinterName(){
  try{
  this.service.GetPrinterName().subscribe(data => {
     this.PrinterName = data;
     this.selectPrinterName="BW_TAG C9065";
    });
  }
  catch(err:any) {
    alert(err.error);
  }
}

///  Librarian File / Templete file
GetLibrarianFile(){
  try{
    this.service.GetLibrarianFile().subscribe(data => {
       this.GetLibrarian = data;
       //this.selectTemplateName="lib://CAB_PROD_WEB/CAB_TAG_OFFICE_WITH_GORUP_WEB_APPLICATION.btw";
       this.selectTemplateName="lib://CABQADB2/CAB_TAG_OFFICE_WITH_GORUP_WEB_APPLICATION.btw";
       });
  }
  catch(err:any) {
    alert(err.error);
  }
}

GetAllTagNumber(event:any){
  this.Type = event.target.value;
  this.checkUncheckGroupTagNumberFilter();
  this.selectRunnumber='';
  this.isShowbutton=false;
  this.isShowRange=false;
  this.ishidden = true;
  this.isDisableCutLenght = false
}

Showbuttons(event:any){
  this.TagNumberPrintHide=true;
  this.Type = event.target.value;
  this.isShowbutton=true;
  this.isShowRange=false;
  this.checkUncheckGroupTagNumberFilter();
  this.ishidden = false;
  this.isDisableCutLenght = false
}

ShowRange(event:any){
 // this.tagNumberToPrint=[];
  this.TagNumberPrintHide=true;
  this.Type = event.target.value;
  this.checkUncheckGroupTagNumberFilter();
  this.isShowbutton=false;
  this.isShowRange=true;
  this.tagNumberToPrint=[];
  this.ishidden = false;
  this.isDisableCutLenght = false
}

async checkUncheckGroupTagNumberFilter(){
  try{
    this.tagNumberToPrint=[];
    this.allRuncheck="";
    // const checkbox = document.getElementById('chkAllGroupTagNumber') as HTMLInputElement ;
    // if (checkbox?.checked) {
      if(this.selectCutLenght == "Please Select Cut Length" || this.selectCutLenght == undefined){
        this.selectCutLenght="0";
      }
      const checkboxOther = document.getElementById('chkOtherTagNumber') as HTMLInputElement ;
      if(checkboxOther?.checked){
        this.IsOtherTag= true;
      }
      else{
        this.IsOtherTag= false;
      }
      
      this.isCheckedother= true;
      this.isDisableCutLenght= false;
      for (var i = 0; i < this.groupTagNumber.length; i++) {
        this.groupTagNumber[i].isChecked = true;
        this.allRuncheck += this.groupTagNumber[i].Id + ",";
        }

    this.GroupTagNo=[];
    var inputElems = document.getElementsByTagName("input");
    for (var i=0; i < inputElems.length; i++) {
      if(inputElems[i].className === "form-check-input m-1 chkGroupTagNo"){
        if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
          this.GroupTagNo += inputElems[i].value + ",";
        }
      }
    }

        this.GroupTagNumberHide= false;
        this.TagNumberPrintHide= false;
        this.allRun=[];
        this.allGroupTag=[];
        for (var i = 0; i < this.Number.length; i++) {
          this.allRun += this.Number[i].RunNo + ",";
          this.runno += this.Number[i].RunNo + ",";
        }
        this.allRun = this.allRun.substring(0, this.allRun.length - 1);
        this.runno = this.runno.substring(0, this.runno.length - 1);
        this.GroupTagNo = this.GroupTagNo.substring(0, this.GroupTagNo.length - 1);
        this.getselectedWC();
        if(this.groupTagNumber.length>0){
          // for (var i = 0; i < this.groupTagNumber.length; i++) {
          //   this.allGroupTag += this.groupTagNumber[i].TagNo + ",";
          // }
          
          try{
            if(this.selectCutLenght == "Please Select Cut Length"){
              this.selectCutLenght ="0";
            }
            this.SpinnerService.show('spinner4');
            const data = await this.service.GetTagFromGroupTag(this.allRun,this.GroupTagNo,this.selectCutLenght,this.IsOtherTag,this.selectedWC).toPromise();
            //alert(data + " 11");
            this.tagNumberToPrint = data;
            this.tagNumberToPrintRange = data;
            this.tagNumberFromPrintRange= data;
            
              for (var i = 0; i < this.tagNumberToPrint.length; i++) {
                this.tagNumberToPrint[i].isChecked = true;
              }  
              this.SpinnerService.hide('spinner4');
              this.GroupTagCount = "Total Tag : "+ this.tagNumberToPrint.length ; 
          }
          catch(err:any) {
            this.SpinnerService.hide('spinner4');
            //alert(err.error);
            this.tagNumberToPrintRange=[];
          }
        }
        else{
         // this.ishidden= false;
         this.allGroupTag="";
          this.SpinnerService.show('spinner4');
          const data = await this.service.GetTagFromGroupTag(this.allRun,this.GroupTagNo,this.selectCutLenght,true,this.selectedWC).toPromise();
          this.tagNumberToPrint = data;
          this.tagNumberToPrintRange = data;
          this.tagNumberFromPrintRange= data;
          
            for (var i = 0; i < this.tagNumberToPrint.length; i++) {
              this.tagNumberToPrint[i].isChecked = true;
            }  
            this.SpinnerService.hide('spinner4');
            this.GroupTagCount = "Total Tag : "+ this.tagNumberToPrint.length ; 
            //alert(this.tagNumberToPrint.length);
        }
      
    }
catch(err) {
  this.SpinnerService.hide('spinner4');
  console.log(err);
}
}

ResetNumber(){
  this.checkUncheckGroupTagNumber(true);
  this.selectRunnumber = '';
 // this.setCutlenght();
}
 
GetSelectTagNumber(){
const result = this.tagNumberToPrint.filter((user: any) =>
   user.TagNo.includes(this.selectRunnumber));

  this.tagNumberToPrint = result;
  this.GroupTagCount = "Total Tag : " + this.tagNumberToPrint.length;
}

numberOnly(event:any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}
 
FRange:string;
TRange:string;

GetRangeFrom(event:any){
  this.FromRangeselected = event.target.value.split(":", 2)[1].trim() ;
  this.FRange  = this.FromRangeselected.substring(1,this.FromRangeselected.length);
  if(this.TRange <= this.FRange){
    alert("Please Select less than From Range");
    this.tagNumberFromPrintRange=[];
    this.ShowTagInDropDown(true);
  }
}

GetRangeTo(event:any){
  this.ToRangeselected = event.target.value.split(":", 2)[1].trim() ;
  this.TRange  = this.ToRangeselected.substring(1,this.ToRangeselected.length);
  if(this.TRange <= this.FRange){
    alert("Please Select greater than From Range");
    this.tagNumberToPrintRange=[];
    this.ShowTagInDropDown(false);
  }
}


async ShowTagInDropDown(flag:boolean){
  
  if(!flag){
    this.tagNumberToPrintRange=[];
  }
  else{
    this.tagNumberFromPrintRange = [];
  }

  const checkbox1 = document.getElementById('chkOtherTagNumber') as HTMLInputElement ;
  if(checkbox1?.checked){
    this.IsOtherTag= true
  }
  else{
    this.IsOtherTag= false
  }
  if(this.selectCutLenght == "Please Select Cut Length"){
    this.selectCutLenght ="0";
  }
  this.getselectedWC();

  if(this.groupTagNumber.length>0){
    for (var i = 0; i < this.groupTagNumber.length; i++) {
      this.allGroupTag += this.groupTagNumber[i].TagNo + ",";
    }
  }
  if(this.allGroupTag.length > 0){
    this.allGroupTag = this.allGroupTag.substring(0, this.allGroupTag.length - 1);
  }
  else{
    this.allGroupTag=[];
  }

  for (var i = 0; i < this.Number.length; i++) {
    this.allRun += this.Number[i].RunNo + ",";
  }

  if(this.allRun.length > 0){
    this.allRun = this.allRun.substring(0, this.allRun.length - 1);
  }
  else{
    this.allRun=[];
  }
 
  const data = await this.service.GetTagFromGroupTag(this.allRun,this.allGroupTag,this.selectCutLenght,this.IsOtherTag,this.selectedWC).toPromise();
  if(!flag){
    this.tagNumberToPrintRange = data;
    this.ToTagNo = "Please Select";
  }
  else{
    this.tagNumberFromPrintRange = data;
    this.FromTagNo = "Please Select";
  }
}


 checkUncheckOtherTag(event:any){
 if( this.selectCutLenght == "Please Select Cut Length" ){
    this.selectCutLenght="0";
 }
 
 
 this.TagNumberPrintHide = false;
  let chk:boolean;
  this.isDisableCutLenght= false;
  const checkbox = document.getElementById('chkOtherTagNumber') as HTMLInputElement ;
    if(checkbox.checked == true){
      chk= true;
      this.enablePrompting = false;
      this.cutlenght = "0";
      this.isDisableCutLenght= false;
    }
    else{
      chk= false;
      //this.selectCutLenght= "Please Select Cut Length";
      this.enablePrompting = true;
      this.cutlenght = "0";
      this.isDisableCutLenght= false;
    }
    this.getTagNumber(chk,this.cutlenght)

    //alert(this.Type);
    if(this.Type == "All"){
        this.ishidden = true;
    }
    else{
      this.ishidden = false;
    }
  }


  SetTagNumber(event:any){
    this.cutvalue = event.target.value;
    let chk:boolean;
    const checkbox = document.getElementById('chkOtherTagNumber') as HTMLInputElement ;
    if(checkbox.checked == true){chk= true;}
      else{chk= false;}
    this.getTagNumber(chk,this.cutvalue)
  }

  GTagNoSelected:any;
  async getTagNumber(chk:boolean,cutlenght:string ){
    this.allRun=[];
    this.allGroupTag=[];
    this.tagNumberToPrint=[];
    if(this.valueId=="RunNumber")
    {
        this.allRun += this.temp; 
        this.runno += this.temp;
    }
    else
    {
      for (var i = 0; i < this.Number.length; i++) {
        this.allRun += this.Number[i].RunNo + ",";
        this.runno += this.Number[i].RunNo + ",";
      }
    }
//       GTagNoSelected:any;
// getSelectedGTagNo(){
  this.GTagNoSelected=[];
  var inputElems = document.getElementsByTagName("input");
  for (var i=0; i < inputElems.length; i++) {
    if(inputElems[i].className === "form-check-input m-1 chkGroupTagNo"){
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
        this.GTagNoSelected += inputElems[i].value + ",";
      }
    }
    const checkbox0 = document.getElementById('chkAllSelectRunNo') as HTMLInputElement ;
    const checkbox1 = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
    const checkbox2 = document.getElementById('chkAllGroupTagNumber') as HTMLInputElement ;
    checkbox0.checked= true;
    checkbox1.checked= true;
    checkbox2.checked= true;
  }
  this.getselectedWC();

  if(this.GTagNoSelected.length > 0){
    this.GTagNoSelected = this.GTagNoSelected.substring(0, this.GTagNoSelected.length - 1);
  }
  else{
    this.GTagNoSelected = "";
  }
  if(this.valueId!="RunNumber")
  {
    this.allRun = this.allRun.substring(0, this.allRun.length - 1);
  }
      
      try {
        this.SpinnerService.show('spinner4');
        const data = await this.service.GetTagFromGroupTag(this.allRun,this.GTagNoSelected,cutlenght,chk,this.selectedWC).toPromise();
        this.tagNumberToPrint = data;
        this.tagNumberToPrintRange = data;
        this.tagNumberFromPrintRange= data;
        
        this.SpinnerService.hide('spinner4');
          for (var i = 0; i < this.tagNumberToPrint.length; i++) {
            this.tagNumberToPrint[i].isChecked = true;
            //this.tagNumberToPrint[i].isTagNumberDisable = true;
          }
          
         // this.ishidden = true;
          if(this.tagNumberToPrint.length < 0){
            this.GroupTagCount = "Total Tag : 0"; 
          }
          else{
            this.GroupTagCount = "Total Tag : "+ this.tagNumberToPrint.length ; 
          }
      }
      catch(err:any) {
        this.SpinnerService.hide('spinner4');
        //alert(err.error);
        if(err.error == "Record not exist" ){
          this.GroupTagCount = "Total Tag : 0"; 
        }
      }
  }

PStatus:any;
FinalPrinterStatus:string;

async PrinterStatus()
 {
   this.isPdf=true;
  if(this.selectPrinterName == "PDF"){
    this.FinalPrinterStatus="";
    this.isPdf=false;
    return
  }
    this.PStatus=[];
    const data = await this.service.GetPrinterStatus(this.selectPrinterName).toPromise();
    this.PStatus = data;
    this.FinalPrinterStatus=this.PStatus[0].Status;
    
 }

}
