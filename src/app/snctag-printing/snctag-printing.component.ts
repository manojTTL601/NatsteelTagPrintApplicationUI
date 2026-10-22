import { NgxSpinnerService } from "ngx-spinner"; 
import { ServicesService } from './../services/services.service';
import { Component, OnInit } from '@angular/core';
import { NoOfdaylist, TagNumber,GetUser, GetPDFFile,PrintersName, ReportNames } from './../services/cabmodel.model';
import { formatDate } from '@angular/common';
import { AppComponent } from "../app.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-snctag-printing',
  templateUrl: './snctag-printing.component.html',
  styleUrls: ['./snctag-printing.component.css']
})
export class SNCTagPrintingComponent implements OnInit {

  constructor(public service:ServicesService,private SpinnerService: NgxSpinnerService,
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
  isDivDisabled:boolean;  IsItemNoHidden:boolean = true;
  ItemNumber:any;  GetLibrarian:any;   PrinterName:any;
  selectTemplateName:string;
  selectPrinterName:string;
  NoofDayslist:any;   selectedNumberOfDays=5;
  selected = '';   tagNumber:any;
  RunNoHide:boolean= true;workcenterHide:boolean=true;
  dt1:string;dt2:string;Datewiseselect:string;
  listReleaseCode:any;
  TotalRunNumber:any; WorkCenter:any;
  TagNumberPrintHide:boolean=true; ishidden:boolean=false;
  tagNumberToPrint:any;seletedrunno:any;selectedworkcenter:any
  TagCount:number=0;SelectedItmeNumber:any;
  ItemNumberHide:boolean= false;ItemSoNumber:any;
  workcentercount:number=0;Runnocount:number=0; selectedItemNumber:any; 
  ItemNumbercount:number; SelectedTagId:string;
  radiobutton:boolean=false; loader:string;selectRunnumber:string;selectFilter:string;
  seletedTagNo:any;Tagnocount:number=0;
  Printmassage:any;
  massage:string;TotalTagCount:number;
  UniqueId :any=[] ;
  PrintedBy:string="SNCAdmin"; selectedreleasecode:string;
  LogStatus:any;  dataStatus:any;  Logs:any = [];
  chflag:string="";
  isLogActive:boolean=false;
  getfile:string="";
  IsDownload:boolean=true;
  url:string;
  splitURL:string;
  isreport: string="";
  istag: string="";
  SelectCrystalTemplatename: string="";
  crystalTemplatename: string="D:\\Bartender 2021\\Mesh Crystal Report\\WeldingScheduleSummary.btw";
  crystalprinter1: string=PrintersName.printmeshWAB;
  crystalprinter2: string=PrintersName.printnmmesh3;
  crystalprinter3: string=PrintersName.PDF;
  reportname1: string=ReportNames.scnReport1;
  type : string;
  selectedvalue: string="";
  selectCrystalPrinterName: string="";
  isPrintingStarted:boolean=false;
  isPrintingCompleted:boolean=false;
  IsDownloadReport:boolean=true;
  getreportfile:string=GetPDFFile.valuesncReport;

  ngOnInit(): void {
    this.GetUserDetails(this.user);
    this.url = window.location.href;
    this.splitURL = "SNC" ;//this.url.split("/", 10)[5].trim().split("?", 5)[0].trim();
    this.appcomp.GetUserDetails(this.user,this.splitURL);
   
    this.getfile = GetPDFFile.valuesnc;
    this.PDF = PrintersName.PDF;
    this.pnm = PrintersName.printnm;
    this.loader = 'assets/img/loader.gif';
    this.ReleaseCode = "Release Code";
    this.selectFilter="All";
    this.GetLibrarianFile();
    this.GetPrinterName();
    this.setNumberOfDays();
  }
  UserDetails:any;
  Value:any;
  user:any;
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

  GetReleaseCode(code:string,days:number){
    this.SpinnerService.show('spinner0'); 
    this.resetRunWCItemTagNo();
    this.ReleaseCode = "Release Code";
    this.selected='ReleaseCode';
    this.ItemNoHideClear(true);
    this.GetAllNumbers(code,days);
    this.SpinnerService.hide('spinner0'); 
  }
  GetSONumber(code:string,days:number){
    this.SpinnerService.show('spinner0'); 
    this.resetRunWCItemTagNo();
    this.ReleaseCode = "SO Number";
    this.selected='SONo';
    this.ItemNoHideClear(false);
    this.GetAllNumbers(code,days);
    this.SpinnerService.hide('spinner0'); 
  }
  GetRunNumber(code:string,days:number){
    this.SpinnerService.show('spinner0'); 
    this.resetRunWCItemTagNo();
    this.ReleaseCode = "Run Number";
    this.selected='RunNumber';
    this.ItemNoHideClear(true);
    this.GetAllNumbers(code,days);
    this.SpinnerService.hide('spinner0'); 
  }
  GetBBSNo(code:string,days:number){
    this.SpinnerService.show('spinner0'); 
    this.resetRunWCItemTagNo();
    this.ReleaseCode = "BBS No";
    this.selected='BBSNo';
    this.ItemNoHideClear(true);
    this.GetAllNumbers(code,days);
    this.SpinnerService.hide('spinner0'); 
  }

  ItemNoHideClear(flag:boolean){
    this.IsItemNoHidden= flag;
    this.ItemNumber = [];
  }

  SearchDisable(event:any){
    var scc = event.target.value;
    if(scc == ""){
      this.isDivDisabled=false;
    }
    else
    {
      this.isDivDisabled=true;
    }
  }

  setNumberOfDays(){
    let days = new  NoOfdaylist();
    this.NoofDayslist =  days.value;
  }
//// Librarian File Name
GetLibrarianFile(){
  try{
    this.service.SNCGetLibrarianFile().subscribe(data => {
        this.GetLibrarian = data;
        //this.selectTemplateName="lib://SNC_PROD_WEB/SNCTAG_Review.btw";
        this.selectTemplateName="lib://SNCQADB2/SNCTAG_Review.btw";
        });
  }
  catch(err:any) {
    //alert(err.error);
  }
}

//// Printer Name
GetPrinterName(){
  try{
  this.service.SNCGetPrinterName().subscribe(data => {
     this.PrinterName = data;
     this.selectPrinterName="BW_TAG C9065";
    });
  }
  catch(err:any) {
    //alert(err.error);
  }
}

async GetAllCode(dt1:string,dt2:string,Datewiseselect:string,NoOfDays:number){
  try{
    const checkbox = document.getElementById('chkAllSelectRunNo') as HTMLInputElement ;
    checkbox.checked = false;
    const checkbox2 = document.getElementById('chkAllItemNumber') as HTMLInputElement ;
    checkbox2.checked = false;
    
    if(this.selected == undefined){
      alert("Please Select Release Code");
      return
    } 
    else if (this.Datewiseselect == undefined){
      alert("Please Select Any Date");
      return
    }
    else if (this.dt1 == ""){
      alert("Please Select From Date");
      return
    }
    else if (this.dt2 == ""){
      alert("Please Select To Date");
      return
    }
      const fromdate = formatDate(dt1, 'ddMMyyyy', 'en-US');
      const todate = formatDate(dt2, 'ddMMyyyy', 'en-US');
      this.SpinnerService.show('spinner1'); 
      // const fromdate = '01122021';
      // const todate =  '12102022';
      this.tagNumber=[];
      if(this.selected == "ReleaseCode"){
        const data = await this.service.SNCGetReleaseCode(fromdate,todate,Datewiseselect,this.selected).toPromise();
        this.tagNumber = data;
      }
      else if(this.selected == "SONo"){
        const data = await this.service.GetRCSOByDateSearchSNC(fromdate,todate,Datewiseselect,this.selected).toPromise();
        this.tagNumber = data;
      }
      else if(this.selected == "RunNumber"){
        const data = await this.service.SNCGetReleaseCode(fromdate,todate,Datewiseselect,this.selected).toPromise();
        this.tagNumber = data;
      }
      else if(this.selected == "BBSNo"){
        const data = await this.service.SNCGetReleaseCode(fromdate,todate,Datewiseselect,this.selected).toPromise();
        this.tagNumber = data;
      }
        //const data = await this.service.GetAllCode('01122021','10102022','Production_Date',3).toPromise();
      
      this.RunNoHide = false;
      this.SpinnerService.hide('spinner1'); 
    }
    catch(err:any) {
      this.SpinnerService.hide('spinner1'); 
      //alert(err.error);
    }
}

GetTagNumber(event:any){
  try{
    this.SelectedTagId="";
    this.resetWCItemTagNodropdown();
    this.SpinnerService.show('spinner0'); 
    //this.SelectedTagId = event.target.value.split(":", 2)[1].trim() ;
    this.SelectedTagId = event ;
    if(this.SelectedTagId == ""){
      this.isDivDisabled=false;
    }
    else
    {
      this.isDivDisabled=true;
    }

    this.getworkcenterselected(this.SelectedTagId);
    this.SpinnerService.hide('spinner0'); 
    const checkbox = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
    checkbox.checked = false;
    const checkbox2 = document.getElementById('chkAllItemNumber') as HTMLInputElement ;
    checkbox2.checked = false;
  }
  catch(err:any) {
    this.SpinnerService.hide('spinner0'); 
    //alert(err.error);
  }
}

async GetAllNumbers(selected:string,NoOfDays:number){
  try{
    this.tagNumber=[];
    this.RunNoHide=true;
    if(selected == ''){
      alert("Please select Release Code,Run Number, SO No or BBS No")
      return
    }
    this.SpinnerService.show('spinner0'); 
    const data = await this.service.SNCGetAllNumbers(selected,NoOfDays).toPromise();
    this.listReleaseCode = data;
    this.SpinnerService.hide('spinner0'); 
    
     if(this.selected =='SONo'){
      this.selectedreleasecode ='Select SO No';
     }
     else if(this.selected =='ReleaseCode'){
      this.selectedreleasecode ='Select Release code';
     }
     else if(this.selected =='RunNumber'){
      this.selectedreleasecode ='Select Run No';
     }
     else{
      this.selectedreleasecode ='Select BBS No';
     }
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
  if(this.SelectedTagId == ""){
    this.isDivDisabled=false;
  }
  else
  {
    this.isDivDisabled=true;
  }

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
  this.ItemSoNumber=[];
  this.ItemNumber=[];
  this.ItemNumberHide= true;
  this.tagNumberToPrint=[];
  this.TagNumberPrintHide = true;
  this.TagCount = 0;
}

resetWCItemTagNo(){
  this.WorkCenter=[];
  this.workcenterHide = true;
  this.ItemSoNumber=[];
  this.ItemNumberHide= true;
  this.tagNumberToPrint=[];
  this.TagNumberPrintHide = true;
  this.TagCount = 0;
}
resetWCItemTagNodropdown(){
  this.tagNumber=[];
  this.RunNoHide = true;
  this.WorkCenter=[];
  this.workcenterHide = true;
  this.ItemSoNumber=[];
  this.ItemNumberHide= true;
  this.tagNumberToPrint=[];
  this.TagNumberPrintHide = true;
  this.TagCount = 0;
}

resetItemTagNo(){
  this.ItemSoNumber=[];
  this.ItemNumberHide= true;
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
    if(this.selected != "SONo"){

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
            this.resetWCItemTagNo();
          }
        }
    }
    else
    {
      alert("Please select only one SO Number");
      checkbox.checked=false;
      return 
    }
     
  }
  catch(err) {
    console.log(err);
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
  else if(this.Runnocount <= 0){
    this.seletedrunno = this.SelectedTagId;
  }
  else{
    this.seletedrunno ="";
  }
}

GetselectedWorkcenter(){
  this.selectedworkcenter=[];
  this.workcentercount=0;
  this.reportCount=0;
  var inputElems = document.getElementsByTagName("input");
  for (var i=0; i < inputElems.length; i++) {
    if(inputElems[i].className === "form-check-input m-1 chkSelectworkcenter"){
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true ){
        this.selectedworkcenter += inputElems[i].value.trim() + ",";
        this.workcentercount++;
        this.reportCount++;
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


CheckedReleaseCode():string{
  this.chflag = "go";
  if(this.seletedrunno == ""){
    if(this.selectedreleasecode != ""){
      this.seletedrunno = this.selectedreleasecode;
    }
    else{
      alert("Please select Release Code");
      this.chflag = "cancel";
    }
  }
  return this.chflag;
}

chkAllWorkCenter() {
  try{
    this.ChechedAll('form-check-input m-1 chkSelectworkcenter','chkAllWorkCenter');
    
    const checkbox = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
    const checkbox2 = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
      if (checkbox?.checked) {
        this.GetselectedRunNo();
        this.GetselectedWorkcenter();
        var ch = this.CheckedReleaseCode();
        if(ch == "cancel"){
          return
        }
        this.getTagNumberselected(this.seletedrunno,this.selectedworkcenter);
        checkbox2.checked=false;
      }
      else{
        for (var i = 0; i < this.WorkCenter.length; i++) {
          this.WorkCenter[i].isChecked = false;
          this.resetItemTagNo();
        }
      }
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
      this.GetworkcenterFromSO(this.selectedItemNumber);
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
      this.GetselectedRunNo();
      this.GetselectedWorkcenter();
      if(this.WorkCenter.length == this.workcentercount){
        checkbox.checked= true;
      }
      else{
        checkbox.checked= false;
      }

      var ch = this.CheckedReleaseCode();
      if(ch == "cancel"){
        return
      }

      this.getTagNumberselected(this.seletedrunno,this.selectedworkcenter);
  }
  catch(err) {
    //console.log(err);
  }
}

RunnocountforSO:number=0;

isAllSelected() {
  try{
      this.RunnocountforSO=0;
      var inputElems = document.getElementsByTagName("input");
      for (var i=0; i < inputElems.length; i++) {
        if(inputElems[i].className == "form-check-input m-1 chkSelectRunNo"){
          if (inputElems[i].checked == true ){
              this.RunnocountforSO ++;
              if(this.selected == "SONo" && this.RunnocountforSO >= 2){
              alert("Please select only one SO Number");
              inputElems[i].checked = false;
              return 
            }
          }
        }
      }

      if(this.selected != "SONo"){
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
       else{
        this.GetselectedRunNo();
        this.getworkcenterselected(this.seletedrunno);
       }
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
    this.GetworkcenterFromSO(this.selectedItemNumber);
  }
  catch(err) {
    //console.log(err);
  }
}

async getworkcenterselected(TagId:any){
  try{
    if(this.selected != "SONo"){
      this.SpinnerService.show("spinner2");
      this.WorkCenter=[];
      if(this.selectedItemNumber <= 0){
        this.selectedItemNumber="";
      }
      const data = await this.service.SNCGetWorkCenter(this.selected,TagId,this.selectedNumberOfDays,this.selectedItemNumber).toPromise();
      this.WorkCenter = data;
      this.workcenterHide = false;
      this.SpinnerService.hide("spinner2");
    }
    else{
      this.SpinnerService.show("spinner3");
      this.ItemNumber=[];
      if(this.selectedItemNumber <= 0){
        this.selectedItemNumber="";
      }
      const data = await this.service.SNCGetWorkCenter(this.selected,TagId,this.selectedNumberOfDays,this.selectedItemNumber).toPromise();
      this.ItemNumber = data;
      this.ItemNumberHide = false;
      this.SpinnerService.hide("spinner3");
    }
  }
  catch(err:any) {
    this.SpinnerService.hide("spinner2");
    this.SpinnerService.hide("spinner3");
    //alert(err.error);
  }
}

 async GetworkcenterFromSO(TagId:any){
  try{
      this.SpinnerService.show("spinner2");
      this.WorkCenter=[];
      const data = await this.service.SNCGetWorkCenterItemNo(TagId,this.selected).toPromise();
      this.WorkCenter = data;
      this.workcenterHide = false;
      this.SpinnerService.hide("spinner2");
  }
  catch(err:any) {
      this.SpinnerService.hide("spinner2");
      //alert(err.error);
  }
}

async getTagNumberselected(TagId:any,workcenter:any){
  try{
    this.ishidden=true;
    this.SpinnerService.show("spinner4");
    this.tagNumberToPrint=[];
    const data = await this.service.GetSNCTagsByWorkcenter(TagId,workcenter,this.selectedNumberOfDays,this.selected,this.selectedItemNumber).toPromise();
    this.tagNumberToPrint = data;
    for (var i = 0; i < this.tagNumberToPrint.length; i++) {
      this.tagNumberToPrint[i].isChecked = true;
    }
    this.TagNumberPrintHide = false;
    this.ishidden=false;
    this.TagCount = this.tagNumberToPrint.length;
    this.TotalTagCount = this.tagNumberToPrint.length;
    this.GetselectedTagNo();
    this.SpinnerService.hide("spinner4");
    this.setFilter();
    const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
    checkbox.checked= true;
  }
  catch(err:any) {
    this.SpinnerService.hide("spinner4");
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
      user.fld_snc_tag_no.includes(this.selectRunnumber));
    
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
      this.GetselectedRunNo();
      this.GetselectedWorkcenter();

      if(this.selected == "SONo"){
        this.GetselectedItemNumber();
      }
      else{
        this.selectedItemNumber = "";
      }

      if(this.seletedrunno == ""){
        if(this.selectedreleasecode != ""){
          this.seletedrunno = this.selectedreleasecode;
        }
        else{
          alert("Please select Release Code");
          return
        }
      }

      this.tagNumberToPrint=[];
      const data = await this.service.GetSNCTagsByWorkcenter(this.seletedrunno,this.selectedworkcenter,this.selectedNumberOfDays,this.selected,this.selectedItemNumber).toPromise();
      this.tagNumberToPrint = data;
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
  this.ShowTagNumber();
  this.selectRunnumber = '';
  this.selectFilter= "All";
}

IsPrintdisabled:boolean = false;
finalpath: string="SNCREPORT";
async Print(){

  try{
    this.getreportfile="http://protag.natsteel.com.sg:8095/FM_API_NSH/api/SNCTag/ShowReportDir";
    this.IsPrintdisabled= true;
    const checkbox = document.getElementById('IsCrystalReport') as HTMLInputElement ;
    const checkbox2 = document.getElementById('IsTagReport') as HTMLInputElement ;
    const data = await this.service.SNCThread(
      this.seletedrunno,
      this.seletedTagNo,
      this.selected,
      this.selectPrinterName,
      this.selectTemplateName,
      this.PrintedBy,
      this.selectedworkcenter,
      this.istag,
      this.isreport,
      this.selectCrystalPrinterName,
      this.SelectCrystalTemplatename,
      this.selectedvalue
    ).toPromise();
    
  this.Printmassage = data;
  
  
  if(checkbox.checked==true)
  {
  setInterval(() => {
    //this.isPrintingCompleted=true;
    this.getcount(this.finalpath);
  }, 10000);
  }

  if(checkbox2.checked==true){
  this.massage = this.Printmassage[0].UniqueId;
  this.UniqueId.push({UniqueId: this.massage});
  setInterval(() => {
    this.GetStatus(this.UniqueId);
  }, 10000);
 }
  
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
        this.dataStatus = await this.service.SNCGetStatus(id[i].UniqueId).toPromise();
 
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
      ProdType:"SNC",
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
  this.isPrintingStarted=false;
  this.isPrintingCompleted=false;
  this.IsDownloadReport=true;
  this.isreport="";
  this.istag="";
  this.type=this.selected;
  this.selectedvalue=this.selectedreleasecode;
  const checkbox = document.getElementById('IsCrystalReport') as HTMLInputElement ;
  const checkbox2 = document.getElementById('IsTagReport') as HTMLInputElement ;
  if(checkbox.checked== true || checkbox2.checked==true)
  {
    if(checkbox.checked==true)
    {
      if(this.selectCrystalPrinterName=="")
      {
        alert("Select printername to print the report")
        return;
      }
      if(this.SelectCrystalTemplatename==""){
        alert("Select Template Name to print the report");
        return;
      }
    }
  }
  else
  {
    alert("Please check the Print tag or Print Report Checkbox")
    return;
  }

  if(checkbox.checked == true)
  {
    this.isPrintingCompleted=false;
    //this.IsPrintdisabled=false;
    this.isPrintingStarted=true;
    this.isreport="true";
  }
  if(checkbox2.checked ==true)
  {
      this.istag="true";  

  }


  if(this.selected == undefined || this.selected == ""){
    alert("Please Select Release Code ,SO No,BBS No, Run Number");
    return 
  } 

    this.GetselectedRunNo();
    this.GetselectedWorkcenter();
    if(this.selected == "SONo"){
      this.GetselectedItemNumber();
    }
    else{
      this.selectedItemNumber = "";
    }
    this.GetselectedTagNo();

    var ch = this.CheckedReleaseCode();
    if(ch == "cancel"){
      return
    }
  // if(this.Runnocount <= 0){
  //   alert("Please Select Release Code");
  //   return
  // }
  if(this.workcentercount <= 0){
    alert("Please Select Work Center");
    return
  }
  if(checkbox2.checked==true)
  {
  
  if(this.Tagnocount <= 0){
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
  
  const data = await this.service.SNCRunHistory(this.seletedrunno).toPromise();
  this.RunNoHistory = data;
  if(this.RunNoHistory[0].ErrorMsg.length > 0){
    if(confirm("Are you sure to continue \n" + this.RunNoHistory[0].ErrorMsg)) {
     this.Print();
    }
  }
  else
  {
    this.Print();
  }
}
  else{
    this.Print();
  }
}

PStatus:any;
FinalPrinterStatus:string;
reportCount: any;
async getcount(path: string)
{
  //this.GetselectedReports();
  this.GetselectedWorkcenter();
  const data = await this.service.GetFileCountSnc(path).toPromise();
    if(data==this.reportCount){
      this.isPrintingCompleted=true;
      this.IsDownloadReport=false;
      this.IsPrintdisabled=false;
      //this.IsDownload=false;
    }
}

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
