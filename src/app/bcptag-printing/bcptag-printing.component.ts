import { NgxSpinnerService } from "ngx-spinner"; 
import { ServicesService } from './../services/services.service';
import { Component, OnInit } from '@angular/core';
import { NoOfdaylist, TagNumber,PrintersName,GetPDFFile } from './../services/cabmodel.model';
import { formatDate } from '@angular/common';
import { ThisReceiver } from "@angular/compiler";
import * as $ from 'jquery'
import { AppComponent } from "../app.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-bcptag-printing',
  templateUrl: './bcptag-printing.component.html',
  styleUrls: ['./bcptag-printing.component.css']
})
export class BCPTagPrintingComponent implements OnInit {

  constructor(public service:ServicesService,private SpinnerService: NgxSpinnerService ,
    private router: ActivatedRoute,
    private appcomp :AppComponent) {
    this.router.queryParams.subscribe((queryParam:any) =>
    {
      this.user = queryParam.user
    });
   }

  pnm:string;
  PDF:string;

  ReleaseCode:string;
  IsItemNoHidden:boolean = true;
  ItemNumber:any;  GetLibrarian:any;   PrinterName:any;
  selectTemplateName:string;
  selectPrinterName:string;
  NoofDayslist:any;   selectedNumberOfDays=5;
  selected = '';   tagNumber:any; ProductionHall:any;MachineGroup:any;
  RunNoHide:boolean= true;workcenterHide:boolean=true;
  HallHide:boolean=true; MachineHide:boolean=true;
  dt1:string;dt2:string; CDate:string; Datewiseselect:string;
  listReleaseCode:any;
  TotalRunNumber:any; WorkCenter:any;GroupTag:any;
  TagNumberPrintHide:boolean=true; ishidden:boolean=true;
  tagNumberToPrint:any;seletedrunno:any;selectedworkcenter:any
  TagCount:number=0;SelectedItmeNumber:any;
  workcentercount:number=0;Runnocount:number=0; selectedItemNumber:any; 
  ItemNumbercount:number; SelectedTagId:string;
  radiobutton:boolean=false; loader:string;selectRunnumber:string;selectFilter:string;
  seletedTagNo:any;Tagnocount:number=0;
  Printmassage:any;
  massage:string;TotalTagCount:number;
  UniqueId :any=[] ;
  PrintedBy:string="BCPAdmin"; selectedreleasecode:string;
  LogStatus:any;  dataStatus:any;  Logs:any = [];
  chflag:string="";
  isLogActive:boolean=false;
  SelectedPc:any;ProductionCenter:any;ProductionCentercount:number=0;
  GroupTagHide:boolean= true; IsOtherTag:boolean;
  tagNumberFromPrintRange :any;tagNumberToPrintRange:any
  getfile:string="";
  IsDownload:boolean=true;
  url:string;
  splitURL:string;
  user:any;
  printbcp:string;

  ngOnInit(): void {

    this.GetUserDetails(this.user);
    this.url = window.location.href;
    this.splitURL = "BCP"; // this.url.split("/", 10)[5].trim().split("?", 5)[0].trim();
    this.appcomp.GetUserDetails(this.user,this.splitURL);


    this.getfile = GetPDFFile.valuebcp;
    this.PDF = PrintersName.PDF;
    this.pnm = PrintersName.printnm;
    this.printbcp = PrintersName.printnmbcp;
    this.loader = 'assets/img/loader.gif';
    this.ReleaseCode = "Release Code";
    this.selectFilter="All";
    this.GetLibrarianFile();
    this.GetPrinterName();
    this.GetProductionCenter();
    const checkbox2 = document.getElementById('RadioAll') as HTMLInputElement ;
    checkbox2.checked = true;
  }

  
  UserDetails:any;
  Valuess:any;
  Username:string;

  async GetUserDetails(user:number){
    try{
      this.UserDetails = "";
      const data = await this.service.GetUserDetails(user).toPromise();
      this.UserDetails = data;
      this.Username = this.UserDetails[0].UserNames;
      sessionStorage.setItem('Username',this.Valuess);
    }
    catch (err: any) {
      //sessionStorage.removeItem('Username');
      //window.location.href = 'http://172.25.1.144:8079/FM_NSH/';
      //sessionStorage.setItem('Username',"manoj");
      //alert(err.error);
    }
  }


  GetProductionCenter(){
    try{
      this.service.GetProductionCenter().subscribe(data => {
          this.ProductionCenter = data;
          for (var i = 0; i < this.ProductionCenter.length; i++) {
            this.ProductionCenter[i].isChecked = true;
          }
      });

      const checkbox = document.getElementById('chkAllProductionCenter') as HTMLInputElement ;
      checkbox.checked= true;  
    }
    catch(err:any) {
      //alert(err.error);
    }
  }

  GetReleaseCode(code:string,CDate:string){
    this.SpinnerService.show('spinner0'); 
    this.resetRunWCItemTagNo();
    this.ReleaseCode = "Release Code";
    this.selected='ReleaseCode';
   // this.ItemNoHideClear(true);
    this.GetselectedProductionCenter();
    this.GetAllNumbers(code,CDate,this.SelectedPc);
    this.SpinnerService.hide('spinner0'); 
  }
  GetSONumber(code:string,CDate:string){
    this.SpinnerService.show('spinner0'); 
    this.resetRunWCItemTagNo();
    this.ReleaseCode = "SO Number";
    this.selected='SONo';
   // this.ItemNoHideClear(false);
    this.GetselectedProductionCenter();
    this.GetAllNumbers(code,CDate,this.SelectedPc);
    this.SpinnerService.hide('spinner0'); 
  }
  GetRunNumber(code:string,CDate:string){
    this.SpinnerService.show('spinner0'); 
    this.resetRunWCItemTagNo();
    this.ReleaseCode = "Run Number";
    this.selected='RunNo';
   // this.ItemNoHideClear(true);
    this.GetselectedProductionCenter();
    this.GetAllNumbers(code,CDate,this.SelectedPc);
    this.SpinnerService.hide('spinner0'); 
  }
  GetBBSNo(code:string,CDate:string){
    this.SpinnerService.show('spinner0'); 
    this.resetRunWCItemTagNo();
    this.ReleaseCode = "BBS No";
    this.selected='BBSNo';
   // this.ItemNoHideClear(true);
    this.GetselectedProductionCenter();
    this.GetAllNumbers(code,CDate,this.SelectedPc);
    this.SpinnerService.hide('spinner0'); 
  }

  GetRunNUmberfromDate(code:string,CDate:string){
    this.SpinnerService.show('spinner0'); 
    this.GetselectedProductionCenter();
    this.GetAllNumbers(code,CDate,this.SelectedPc);
    this.SpinnerService.hide('spinner0'); 
  }

//// Librarian File Name
GetLibrarianFile(){
  try{
    this.service.BCPGetLibrarianFile().subscribe(data => {
        this.GetLibrarian = data;
       // this.selectTemplateName="lib://CAB_PROD_WEB/BCP_TAG_OFFICE_WITH_GROUP.btw";
       this.selectTemplateName="lib://CABQADB2/BCP_TAG_OFFICE_WITH_GROUP.btw";
        });
  }
  catch(err:any) {
    //alert(err.error);
  }
}

//// Printer Name
GetPrinterName(){
  try{
  this.service.BCPGetPrinterName().subscribe(data => {
     this.PrinterName = data;
     this.selectPrinterName="Brother HL-L2385DW LASER PRINTER";
    });
  }
  catch(err:any) {
    //alert(err.error);
  }
}

// async GetAllCode(dt1:string,dt2:string,Datewiseselect:string,NoOfDays:number){
//   try{
//     const checkbox = document.getElementById('chkAllSelectRunNo') as HTMLInputElement ;
//     checkbox.checked = false;
//     const checkbox2 = document.getElementById('chkAllItemNumber') as HTMLInputElement ;
//     checkbox2.checked = false;
    
//     if(this.selected == undefined){
//       alert("Please Select Release Code");
//       return
//     } 
//     else if (this.dt1 == ""){
//       alert("Please Select From Date");
//       return
//     }
    
//       const fromdate = formatDate(dt1, 'ddMMyyyy', 'en-US');
//       const todate = formatDate(dt2, 'ddMMyyyy', 'en-US');
//       this.SpinnerService.show('spinner1'); 
//       // const fromdate = '01122021';
//       // const todate =  '12102022';
//       this.tagNumber=[];
//       if(this.selected == "release_code"){
//         const data = await this.service.BCPGetReleaseCode(fromdate,todate,Datewiseselect,this.selected).toPromise();
//         this.tagNumber = data;
//       }
//       else if(this.selected == "SONo"){
//         const data = await this.service.GetRCSOByDateSearchBCP(fromdate,todate,Datewiseselect,this.selected).toPromise();
//         this.tagNumber = data;
//       }
//       else if(this.selected == "RUN_NO"){
//         const data = await this.service.BCPGetReleaseCode(fromdate,todate,Datewiseselect,this.selected).toPromise();
//         this.tagNumber = data;
//       }
//       else if(this.selected == "BBS_NO"){
//         const data = await this.service.BCPGetReleaseCode(fromdate,todate,Datewiseselect,this.selected).toPromise();
//         this.tagNumber = data;
//       }
//         //const data = await this.service.GetAllCode('01122021','10102022','Production_Date',3).toPromise();
      
//       this.RunNoHide = false;
//       this.SpinnerService.hide('spinner1'); 
//     }
//     catch(err:any) {
//       this.SpinnerService.hide('spinner1'); 
//       //alert(err.error);
//     }
// }

async GetHall(event:any){
  try{
    this.resetfromTag();
    this.SelectedTagId="";
   // this.resetWCItemTagNodropdown();
    this.SpinnerService.show('spinner0'); 
    //this.SelectedTagId = event.target.value.split(":", 2)[1].trim() ;
    this.SelectedTagId = event ;
    // if(this.SelectedTagId == ""){
    //   this.isDivDisabled=false;
    // }
    // else
    // {
    //   this.isDivDisabled=true;
    // }

    const data = await this.service.GetHall(this.SelectedTagId,this.selected).toPromise();
    this.ProductionHall = data;
    // this.MachineGroup = data;
    // this.WorkCenter= data;
    // this.GroupTag = data;
    // this.tagNumberToPrint= data;
    // this.getworkcenterselected(this.SelectedTagId);
    this.SpinnerService.hide('spinner0'); 
    // const checkbox = document.getElementById('chkAllSelectHall') as HTMLInputElement ;
    // checkbox.checked = true;
    this.HallHide= false;
    // this.MachineHide = false;
    // this.workcenterHide= false;
    // this.TagNumberPrintHide = false;
   
  }
  catch(err:any) {
    this.SpinnerService.hide('spinner0'); 
    //alert(err.error);
  }
}

async GetAllNumbers(selected:string,Cdate:string,SelectedPc:string){
  try{
    this.tagNumber=[];
    this.RunNoHide=true;
    if(selected == ''){
     // alert("Please select Release Code, SO No, Run Number, BBS No")
      return
    }
    if(Cdate == '' || Cdate == undefined){
     // alert("Please select Date")
      return
    }
    this.SpinnerService.show('spinner0'); 
    const data = await this.service.BCPGetAllNumbers(SelectedPc,Cdate,selected).toPromise();
    this.listReleaseCode = data;
    this.SpinnerService.hide('spinner0'); 
     
  }
  catch(err:any) {
    this.SpinnerService.hide('spinner0'); 
    //alert(err.error);
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

resetRunWCItemTagNo(){

  this.SelectedTagId="";
  // if(this.SelectedTagId == ""){
  //   this.isDivDisabled=false;
  // }
  // else
  // {
  //   this.isDivDisabled=true;
  // }

  this.Datewiseselect = '';
  this.selected = '';
  this.selectRunnumber='';
  this.selectedNumberOfDays=5;
  this.dt1='';
  this.dt2='';
  this.listReleaseCode=[];
  this.Datewiseselect='';
  this.tagNumber=[];
  this.RunNoHide = true;
  this.WorkCenter=[];
  this.workcenterHide = true;
  this.tagNumberToPrint=[];
  this.TagNumberPrintHide = true;
  this.TagCount = 0;
}

resetfromTag(){
  const checkbox = document.getElementById('chkAllSelectHall') as HTMLInputElement ;
  checkbox.checked= false;
  const checkbox1 = document.getElementById('chkAllMachineGroup') as HTMLInputElement ;
  checkbox1.checked= false;
  const checkbox2 = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
  checkbox2.checked= false;
  const checkbox3 = document.getElementById('chkAllGroupTag') as HTMLInputElement ;
  checkbox3.checked= false;
  this.ProductionHall=[];
  this.HallHide= true;
  this.MachineGroup=[];
  this.MachineHide= true;
  this.WorkCenter=[];
  this.workcenterHide = true;
  this.GroupTag=[];
  this.GroupTagHide = true;
  this.tagNumberToPrint=[];
  this.TagNumberPrintHide = true;
  this.TagCount = 0;
}

resetfromHall(){
  const checkbox1 = document.getElementById('chkAllMachineGroup') as HTMLInputElement ;
  checkbox1.checked= false;
  const checkbox2 = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
  checkbox2.checked= false;
  const checkbox3 = document.getElementById('chkAllGroupTag') as HTMLInputElement ;
  checkbox3.checked= false;
  this.MachineGroup=[];
  this.MachineHide= true;
  this.WorkCenter=[];
  this.workcenterHide = true;
  this.GroupTag=[];
  this.GroupTagHide = true;
  this.tagNumberToPrint=[];
  this.TagNumberPrintHide = true;
  this.TagCount = 0;
}

resetfromMachine(){
  const checkbox2 = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
  checkbox2.checked= false;
  const checkbox3 = document.getElementById('chkAllGroupTag') as HTMLInputElement ;
  checkbox3.checked= false;
  this.WorkCenter=[];
  this.workcenterHide = true;
  this.GroupTag=[];
  this.GroupTagHide = true;
  this.tagNumberToPrint=[];
  this.TagNumberPrintHide = true;
  this.TagCount = 0;
}

resetfromworkcenter(){
  this.GroupTag=[];
  this.GroupTagHide = true;
  const checkbox1 = document.getElementById('chkAllGroupTag') as HTMLInputElement ;
  const checkbox2 = document.getElementById('chkOtherTag') as HTMLInputElement ;
  checkbox1.checked = false;
  checkbox2.checked = false;
  this.tagNumberToPrint=[];
  this.TagNumberPrintHide = true;
  this.TagCount = 0;
}

resetWCItemTagNodropdown(){
  this.tagNumber=[];
  this.RunNoHide = true;
  this.WorkCenter=[];
  this.workcenterHide = true;
  this.tagNumberToPrint=[];
  this.TagNumberPrintHide = true;
  this.TagCount = 0;
}

resetItemTagNo(){
  this.tagNumberToPrint=[];
  this.TagNumberPrintHide = true;
  this.TagCount = 0;
}

resetWorkcenterTagNo(){
  this.WorkCenter=[];
  this.workcenterHide = true;
  // this.ItemSoNumber=[];
  // this.ItemNumberHide= true;
  this.tagNumberToPrint=[];
  this.TagNumberPrintHide = true;
  this.TagCount = 0;
}

checkUncheckAll() {
  try{
    const checkbox = document.getElementById('chkAllSelectRunNo') as HTMLInputElement ;
    const checkbox2 = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
    
      this.ChechedAll('form-check-input m-1 chkSelectRunNo','chkAllSelectRunNo');
     
        if (checkbox?.checked) {

          this.GetselectedRunNo();
          this.ItemNumber=[];
          this.getworkcenterselected(this.seletedrunno);
          checkbox2.checked=false;
        }
        else{
          for (var i = 0; i < this.tagNumber.length; i++) {
            this.tagNumber[i].isChecked = false;
            this.resetfromHall();
          }
        }
  }
  catch(err) {
    console.log(err);
  }
}

checkUncheckAllHall() {
  try{
    const checkbox = document.getElementById('chkAllSelectHall') as HTMLInputElement ;
    const checkbox2 = document.getElementById('chkAllMachineGroup') as HTMLInputElement ;
      this.ChechedAll('form-check-input m-1 chkSelectHall','chkAllSelectHall');
        if (checkbox?.checked) {
          this.GetselectedHall();
          // this.ItemNumber=[];
           this.getMachineGroupselected(this.seletedHall);
          checkbox2.checked=false;
        }
        else{
          // for (var i = 0; i < this.seletedHall.length; i++) {
          //   this.seletedHall[i].isChecked = false;
          // }
          this.resetfromHall();
        }
  }
  catch(err) {
    console.log(err);
  }
}

isCheckedAllMachine(){
  this.ChechedAll('form-check-input m-1 chkMachineGroup','chkAllMachineGroup');
  const checkbox = document.getElementById('chkAllMachineGroup') as HTMLInputElement ;
  const checkbox2 = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
      if (checkbox?.checked) {
        this.GetselectedMachine();
        // this.ItemNumber=[];
         this.getworkcenterselected(this.seletedMachine);
        checkbox2.checked=false;
      }
      else{
        // for (var i = 0; i < this.seletedHall.length; i++) {
        //   this.seletedHall[i].isChecked = false;
        // }
        this.resetfromMachine();
      }
}

isAllSelectedMachine(){
  try{
    const checkbox = document.getElementById('chkAllMachineGroup') as HTMLInputElement ;
    this.GetselectedMachine();
    this.selectedMachineGroup=[];
    
    if(this.MachineGroup.length == this.Machinecount){
      checkbox.checked= true;
    }
    else{
      checkbox.checked= false;
    }

    if(this.seletedMachine.length <= 0){
        this.resetfromMachine();
    }
    else{
      this.getworkcenterselected(this.seletedMachine);
    }
  }
  catch(err) {
    console.log(err);
  }
}

GetselectedProductionCenter(){
  this.SelectedPc=[];
  this.ProductionCentercount =0;
  var inputElems = document.getElementsByTagName("input");
  for (var i=0; i < inputElems.length; i++) {
    
    if(inputElems[i].className === "form-check-input m-1 chkSelectProductionCenter"){
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
        this.SelectedPc += inputElems[i].value + ",";
        this.ProductionCentercount ++;
      }
    }
  }
  if(this.SelectedPc.length > 0){
  this.SelectedPc = this.SelectedPc.substring(0, this.SelectedPc.length - 1);
  }
  else{
    this.SelectedPc ="";
  }
}

seletedHall:any;
Hallcount:number;
seletedMachine:any;
Machinecount:number;

GetselectedHall(){
  this.seletedHall=[];
  this.Hallcount=0;
  var inputElems = document.getElementsByTagName("input");
  for (var i=0; i < inputElems.length; i++) {
    
    if(inputElems[i].className === "form-check-input m-1 chkSelectHall"){
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
        this.seletedHall += inputElems[i].value.trim() + ",";
        this.Hallcount++;
      }
    }
  }
  if(this.seletedHall.length > 0){
  this.seletedHall = this.seletedHall.substring(0, this.seletedHall.length - 1);
  }
  else{
    this.seletedHall ="";
  }
}

GetselectedMachine(){
  this.seletedMachine=[];
  this.Machinecount=0;
  var inputElems = document.getElementsByTagName("input");
  for (var i=0; i < inputElems.length; i++) {
    
    if(inputElems[i].className === "form-check-input m-1 chkMachineGroup"){
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
        this.seletedMachine += inputElems[i].value + ",";
        this.Machinecount++;
      }
    }
  }
  if(this.seletedMachine.length > 0){
  this.seletedMachine = this.seletedMachine.substring(0, this.seletedMachine.length - 1);
  }
  else{
    this.seletedMachine ="";
  }
}

GetselectedRunNo(){
  this.seletedrunno=[];
  this.Runnocount=0;
  var inputElems = document.getElementsByTagName("input");
  for (var i=0; i < inputElems.length; i++) {
    
    if(inputElems[i].className === "form-check-input m-1 chkSelectRunNo"){
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
        this.seletedrunno += inputElems[i].value + ",";
        this.Runnocount++;
      }
    }
  }
  if(this.seletedrunno.length > 0){
  this.seletedrunno = this.seletedrunno.substring(0, this.seletedrunno.length - 1);
  }
  else{
    this.seletedrunno ="";
  }
}

GetselectedWorkcenter(){
  this.selectedworkcenter=[];
  this.workcentercount=0;
  var inputElems = document.getElementsByTagName("input");
  for (var i=0; i < inputElems.length; i++) {
    if(inputElems[i].className === "form-check-input m-1 chkSelectworkcenter"){
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
       var wc = inputElems[i].value.trim();
       this.selectedworkcenter +=   wc.split("[", 2)[0].trim() + ",";
        //this.selectedworkcenter += inputElems[i].value.trim() + ",";
        this.workcentercount++;
      }
    }
  }
  if(this.selectedworkcenter.length > 0){
  this.selectedworkcenter = this.selectedworkcenter.substring(0, this.selectedworkcenter.length - 1);
  }
  else{
    this.selectedworkcenter ="";
  }
}    

GetselectedItemNumber(){
  this.selectedItemNumber=[];
  this.ItemNumbercount=0;
  var inputElems = document.getElementsByTagName("input");
  for (var i=0; i < inputElems.length; i++) {
    if(inputElems[i].className === "form-check-input m-1 chkItemNumber"){
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
        this.selectedItemNumber += inputElems[i].value.trim() + ",";
        this.ItemNumbercount++;
      }
    }
  }
  if(this.selectedItemNumber.length > 0){
  this.selectedItemNumber = this.selectedItemNumber.substring(0, this.selectedItemNumber.length - 1);
  }
  else{
    this.selectedItemNumber ="";
  }
} 


GetselectedTagNo(){
  this.seletedTagNo=[];
  this.Tagnocount=0;
  var inputElems = document.getElementsByTagName("input");
  for (var i=0; i < inputElems.length; i++) {
    
    if(inputElems[i].className === "form-check-input m-1 chkTagNoTagNotoPrint"){
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
        this.seletedTagNo += inputElems[i].value + ",";
        this.Tagnocount++;
      }
    }
  }
  if(this.seletedTagNo.length > 0){
  this.seletedTagNo = this.seletedTagNo.substring(0, this.seletedTagNo.length - 1);
  }
  else{
    this.seletedTagNo ="";
  }
}

chkAllGroupTag(){
  this.ChechedAll('form-check-input m-1 chkSelectGroupTag','chkAllGroupTag');
  const checkbox = document.getElementById('chkAllGroupTag') as HTMLInputElement ;
  const checkbox1 = document.getElementById('chkOtherTag') as HTMLInputElement ;
  if (checkbox?.checked){
    checkbox1.checked = true;
  }
  else{
    checkbox1.checked = false;
  }
  this.getTagNumberselected();
}

chkOtherTag(){

}

IsAllGroupTag(){
  try{
    const checkbox = document.getElementById('chkAllGroupTag') as HTMLInputElement ;
      // this.GetselectedRunNo();
      this.GetselectedGroupTag();
      if(this.GroupTag.length == this.GroupTagcount){
        checkbox.checked= true;
      }
      else{
        checkbox.checked= false;
      }
 
     this.getTagNumberselected();
  }
  catch(err) {
    //console.log(err);
  }
}

selectedGroupTag:any;
GroupTagcount:number;
GetselectedGroupTag(){
  this.selectedGroupTag=[];
  this.GroupTagcount=0;
  var inputElems = document.getElementsByTagName("input");
  for (var i=0; i < inputElems.length; i++) {
    if(inputElems[i].className === "form-check-input m-1 chkSelectGroupTag"){
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
        this.selectedGroupTag += inputElems[i].value.trim() + ",";
        this.GroupTagcount++;
      }
    }
  }
  if(this.selectedGroupTag.length > 0){
  this.selectedGroupTag = this.selectedGroupTag.substring(0, this.selectedGroupTag.length - 1);
  }
  else{
    this.selectedGroupTag ="";
  }
}

chkAllWorkCenter() {
  try{
    this.ChechedAll('form-check-input m-1 chkSelectworkcenter','chkAllWorkCenter');
    
    const checkbox = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
    // const checkbox2 = document.getElementById('chkAllGroupTag') as HTMLInputElement ;
    // const checkbox3 = document.getElementById('chkOtherTag') as HTMLInputElement ;
    
      if (checkbox?.checked) {
        this.GetselectedWorkcenter();
        this.getGroupNumberselected(this.selectedworkcenter);
        //checkbox2.checked=false;
      }
      else{
        for (var i = 0; i < this.WorkCenter.length; i++) {
          this.WorkCenter[i].isChecked = false;
          this.resetfromworkcenter();
        }
      }
      this.GroupTagHide= false;
  }
  catch(err) {
    console.log(err);
  }
}

isCheckedAllItemNo(){
  try{
    const checkbox = document.getElementById('chkAllItemNumber') as HTMLInputElement ;
    const checkbox2 = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;

    this.ChechedAll('form-check-input m-1 chkItemNumber','chkAllItemNumber');
     
    if (checkbox?.checked) {
      this.GetselectedItemNumber();
      //this.GetworkcenterFromSO(this.selectedItemNumber);
      checkbox2.checked=false;
    }
    else{
      for (var i = 0; i < this.ItemNumber.length; i++) {
        this.ItemNumber[i].isChecked = false;
        this.resetWorkcenterTagNo();
      }
    }
    }
    catch(err) {
      //console.log(err);
    }
}

IsAllWorkCenter(){
  try{
    const checkbox = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
      this.GetselectedWorkcenter();
      if(this.WorkCenter.length == this.workcentercount){
        checkbox.checked= true;
      }
      else{
        checkbox.checked= false;
      }
      if(this.WorkCenter.length <=0){
        this.resetfromworkcenter();
      }
      else{
        this.getGroupNumberselected(this.selectedworkcenter);
        this.GroupTagHide= false;
      }

      
  }
  catch(err) {
    //console.log(err);
  }
}

selectedMachineGroup:any;

isAllSelectedHall() {
  try{
       
          const checkbox = document.getElementById('chkAllSelectHall') as HTMLInputElement ;
          this.GetselectedHall();
          this.selectedMachineGroup=[];
          if(this.ProductionHall.length == this.Hallcount){
            checkbox.checked= true;
          }
          else{
            checkbox.checked= false;
          }
          if(this.seletedHall.length <= 0){
            this.resetfromHall();
          }
          else{
            this.getMachineGroupselected(this.seletedHall);
          }
           
          //  this.tagNumberToPrint=[];
          //  this.TagCount= 0;
       
    }
  catch(err) {
    //console.log(err);
  }
}

RunnocountforSO:number=0;

isAllSelected() {
  try{
      this.RunnocountforSO=0;
      
          const checkbox = document.getElementById('chkAllSelectRunNo') as HTMLInputElement ;
          this.GetselectedRunNo();
          this.selectedItemNumber=[];
          if(this.tagNumber.length == this.Runnocount){
            checkbox.checked= true;
          }
          else{
            checkbox.checked= false;
          }
          this.getworkcenterselected(this.seletedrunno);
          this.tagNumberToPrint=[];
          this.TagCount= 0;

    }
  catch(err) {
    //console.log(err);
  }
}

IsAllItemNumber(){
  try{
    this.RunnocountforSO=0;
    var inputElems = document.getElementsByTagName("input");
    for (var i=0; i < inputElems.length; i++) {
      if(inputElems[i].className == "form-check-input m-1 chkItemNumber"){
        if (inputElems[i].checked == true ){
            this.RunnocountforSO++;
        }
      }
    }
    const checkbox = document.getElementById('chkAllItemNumber') as HTMLInputElement ;
    this.GetselectedItemNumber();
    if(this.ItemNumber.length == this.RunnocountforSO){
      checkbox.checked= true;
    }
    else{
      checkbox.checked= false;
    }
   // this.GetworkcenterFromSO(this.selectedItemNumber);
  }
  catch(err) {
    //console.log(err);
  }
}

checkUncheckAllProdCenter(){
  this.ChechedAll('form-check-input m-1 chkSelectProductionCenter','chkAllProductionCenter');
}

IsAllProdCenter(){
  try{
    const checkbox = document.getElementById('chkAllProductionCenter') as HTMLInputElement ;
      this.GetselectedProductionCenter();
      if(this.ProductionCenter.length == this.ProductionCentercount){
        checkbox.checked= true;
      }
      else{
        checkbox.checked= false;
      }
      //this.getTagNumberselected(this.seletedrunno,this.selectedworkcenter);
  }
  catch(err) {
    //console.log(err);
  }
}

async getMachineGroupselected(hall:any){
  try{
    this.SpinnerService.show("spinner2");
    this.MachineGroup=[];
    const data = await this.service.GetMachineGroup(this.SelectedTagId,this.selected,hall).toPromise();
    this.MachineGroup = data;
    this.MachineHide = false;
    this.SpinnerService.hide("spinner2");
  }
  catch(err:any) {
    this.SpinnerService.hide("spinner2");
    //alert(err.error);
  }
}

async getworkcenterselected(Machine:any){
  try{
    
      this.SpinnerService.show("spinner3");
      this.WorkCenter=[];
      const data = await this.service.GetWorkCenterBCP(this.SelectedTagId,this.selected).toPromise();
      this.WorkCenter = data;
      this.workcenterHide = false;
      this.SpinnerService.hide("spinner3");
  }
  catch(err:any) {
    this.SpinnerService.hide("spinner3");
    //alert(err.error);
  }
} 

async getGroupNumberselected(workcenter:any){
  try{
    this.ishidden=true;
    this.SpinnerService.show("spinner4");
    this.GroupTag=[];
    if(workcenter != null){
      const data = await this.service.GetTagFromWCBCP(this.SelectedTagId,this.selected,workcenter).toPromise();
      this.GroupTag = data;
    }
    this.GroupTagHide = false;
    this.SpinnerService.hide("spinner4");  //added by vvw
  }
  catch(err:any) {
    this.SpinnerService.hide("spinner4");
    //alert(err.error);
  }
}

async getTagNumberselected(){
  try{
    this.ishidden=true;
    this.SpinnerService.show("spinner5");
    this.tagNumberToPrint=[];
    const checkbox1 = document.getElementById('chkOtherTag') as HTMLInputElement ;
    if(checkbox1?.checked){
      this.IsOtherTag= true
    }
    else{
      this.IsOtherTag= false
    }
    this.GetselectedWorkcenter();
    this.GetselectedGroupTag();
    const data = await this.service.GetTagFromGroupTagBCP(this.SelectedTagId,this.selectedGroupTag,this.IsOtherTag,this.selectedworkcenter, this.selected).toPromise();
    this.tagNumberToPrint = data;
    this.tagNumberToPrintRange = data;
    this.tagNumberFromPrintRange= data;
    for (var i = 0; i < this.tagNumberToPrint.length; i++) {
      this.tagNumberToPrint[i].isChecked = true;
    }
     this.TagNumberPrintHide = false;
    // this.ishidden=true;
     this.TagCount = this.tagNumberToPrint.length;
    // this.TotalTagCount = this.tagNumberToPrint.length;
     this.GetselectedTagNo();
     this.SpinnerService.hide("spinner5");
    //  if(this.tagNumberToPrint.length <=0){
    //   this.TagCount = 0;
    //  }
    this.setFilter();
    // const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
    // checkbox.checked= true;
  }
  catch(err:any) {
    this.SpinnerService.hide("spinner5");
    //alert(err.error);
  }
}

setFilter(){
  if( this.selectFilter == "All"){
    this.ishidden=true;
  }
  else{
    this.ishidden=false;
  }
}

async Reset(){
  this.resetRunWCItemTagNo();
  this.TagCount = 0;
  const data = await this.service.ResetEngine().toPromise();
}

GetSelectTagNumber(){
  try{
    const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
    checkbox.checked= true;

    const result = this.tagNumberToPrint.filter((user: any) =>
      user.TagNo.includes(this.selectRunnumber));
    
      this.tagNumberToPrint = result;
      for (var i = 0; i < this.tagNumberToPrint.length; i++) {
        this.tagNumberToPrint[i].isChecked = true;
      }
      this.GetselectedTagNo();
      this.TagCount =   this.tagNumberToPrint.length;
      this.selectRunnumber = '';
    }
    catch(err:any) {
      //this.SpinnerService.hide("spinner4");
      //alert(err.error);
    }
  }

async ShowTagNumber(){
  try{
      this.SpinnerService.show("spinner4");
      if( this.selectFilter != "All"){
        this.ishidden=true;
      }
      else{
        this.ishidden=false;
      }
      this.GetselectedWorkcenter();
  
      this.tagNumberToPrint=[];
      const data = await this.service.GetBCPTagsByWorkcenter(this.seletedrunno,this.selectedworkcenter,this.selectedNumberOfDays,this.selected,this.selectedItemNumber).toPromise();
      this.tagNumberToPrint = data;
      this.tagNumberToPrintRange = data
      this.tagNumberFromPrintRange= data;
      for (var i = 0; i < this.tagNumberToPrint.length; i++) {
        this.tagNumberToPrint[i].isChecked = true;
      }
      this.GetselectedTagNo();
      this.TagCount = this.tagNumberToPrint.length;
      this.SpinnerService.hide("spinner4");
      const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
      checkbox.checked= true;

    }
    catch(err:any) {
      this.SpinnerService.hide("spinner4");
      //alert(err.error);
    }
}

ResetNumber(){
  //this.ShowTagNumber();
  this.getTagNumberselected();
  this.selectRunnumber = '';
  this.selectFilter= "All";
}

FromRange:string;
ToRange:string;
IsPrintdisabled:boolean = false;

async Print(){
  try{
    this.IsPrintdisabled= true;

    const data = await this.service.BCPThread(
      this.SelectedTagId,
      '',
      this.seletedTagNo,
      this.selectFilter,
      this.FromRange,
      this.ToRange,
      this.selectPrinterName,
      this.selectTemplateName,
      this.selected,
      false,
      this.PrintedBy,
      ''
    ).toPromise();
    
  this.Printmassage = data;
  this.massage = this.Printmassage[0].UniqueId;

  this.UniqueId.push({UniqueId: this.massage});
  setInterval(() => {
    this.GetStatus(this.UniqueId);
  }, 10000);
  
  }
  catch(err:any) {
    this.SpinnerService.hide("spinner0");
    //alert(err.error);
  }
}

SetClasstoLog(){
this.isLogActive = true;
}


async GetStatus(id:any){
  if(id.length > 0){
    for(var i=0; i < id.length; i++ ){
        if(id[i] != undefined){
        this.dataStatus = await this.service.BCPGetStatus(id[i].UniqueId).toPromise();
 
        if(this.Logs.length==0){
          this.pushLogs(this.dataStatus);
          setTimeout(() => {
            this.SetClasstoLog();
           }, 100);
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


pushLogs(logdata:any){
  this.Tempfile= this.selectTemplateName.split("/")[3].trim() ;
  for(var j =0;j < logdata.length; j++){
    this.Logs.push({
      ProdType:"BCP",
      LogStatus: logdata[j].LogStatus,
      ProductType: logdata[j].ProductType,
      StartTime: logdata[j].StartTime,
      EndTime: logdata[j].EndTime,
      releaseCode: logdata[j].RunNo,
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

async chkAllTagNumber(){
  this.ChechedAll('form-check-input m-1 chkTagNoTagNotoPrint','chkAllTagNumbertoPrint');
  const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
  if(checkbox.checked == true){
    this.GetselectedTagNo();
    this.TagCount = this.Tagnocount;
  }
  else{
    this.TagCount = 0;
  }
}

IsAllTagNumber(){
  try{
    const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
      this.GetselectedTagNo();
      if(this.TotalTagCount == this.Tagnocount){
        checkbox.checked= true;
      }
      else{
        checkbox.checked= false;
      }

      this.TagCount = this.Tagnocount;
      
  }
  catch(err) {
    //console.log(err);
  }
}

RunNoHistory:any;
async RunHistory(){
  this.PrinterStatus();
  if(this.selected == undefined || this.selected == ""){
    alert("Please Select Release Code, SO No, Run Number, BBS No");
    return 
  }  

  this.GetselectedWorkcenter();
  this.GetselectedTagNo();
  
  if(this.workcentercount <= 0){
    alert("Please Select Work Center");
    return
  }
  else if(this.Tagnocount <= 0){
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

  const data = await this.service.BCPRunHistory(this.SelectedTagId,this.selected,).toPromise();
  this.RunNoHistory = data;
  if(this.RunNoHistory[0].ErrorMsg.length > 0){
    if(confirm("Are you sure to continue \n" + this.RunNoHistory[0].ErrorMsg)) {
      this.Print();
    }
  }
  else{
    this.Print();
  }
}

Type:string;
isShowbutton:boolean=false;
isShowRange:boolean=false;
isDisable:boolean= false;

GetAllTagNumber(event:any){
  const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
  checkbox.checked= true;
  this.Type = event.target.value;
  this.isShowbutton=false;
  this.isShowRange=false;
  this.ishidden = true;
  this.TagNumberPrintHide= true;
}

Showbuttons(event:any){
  const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
  checkbox.checked= true;
  this.TagNumberPrintHide= false;
  this.Type = event.target.value;
  this.isShowbutton=true;
  this.isShowRange=false;
  this.ishidden = false;
  this.selectFilter="Select";
}

ShowRange(event:any){
  this.TagNumberPrintHide=true;
  this.Type = event.target.value;
  this.isShowbutton=false;
  this.isShowRange=true;
 // this.tagNumberToPrint=[];
  this.ishidden = true;
  this.selectFilter="Range";
}

FromRangeselected:string;
ToRangeselected:string;
FRange:string;
TRange:string;
FromTagNo:string = "Please Select";
ToTagNo:string = "Please Select";
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

  const checkbox1 = document.getElementById('chkOtherTag') as HTMLInputElement ;
  if(checkbox1?.checked){
    this.IsOtherTag= true
  }
  else{
    this.IsOtherTag= false
  }
  this.GetselectedWorkcenter();
  this.GetselectedGroupTag();
  const data = await this.service.GetTagFromGroupTagBCP(this.SelectedTagId,this.selectedGroupTag,this.IsOtherTag,this.selectedworkcenter, this.selected).toPromise();
  if(!flag){
    this.tagNumberToPrintRange = data;
    this.ToTagNo = "Please Select";
  }
  else{
    this.tagNumberFromPrintRange = data;
    this.FromTagNo = "Please Select";
  }
}

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
