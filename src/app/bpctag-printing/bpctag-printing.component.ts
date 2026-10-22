import { formatDate, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ServicesService } from './../services/services.service';
import { NoOfdaylist ,PrintersName,GetPDFFile,ReportDetails, ReportNames} from './../services/cabmodel.model';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-bpctag-printing',
  templateUrl: './bpctag-printing.component.html',
  styleUrls: ['./bpctag-printing.component.css']
})
export class BPCTagPrintingComponent implements OnInit 
{
  constructor(public service: ServicesService, private SpinnerService: NgxSpinnerService, 
    private router: ActivatedRoute,
    private appcomp :AppComponent) {
    this.router.queryParams.subscribe((queryParam:any) =>
    {
      this.user = queryParam.user
    });
   }

  pnm:string;
  PDF:string;
  selected = '';
  ReleaseCode: string;
  selectTemplateName: string;  selectPrinterName: string;
  PrinterName: any;  GetLibrarian: any;
  WorkCenter = "";  Workcenter: any = "";  WCenter: any;
  Type: string;  Value: string;  NoOfDays: any;
  ItemNo: string = "";  Itemno: any = "";
  ReleaseOrSo: string;
  workcenterHide: boolean=true;  GroupTagNumberHide: boolean = false;
  isDisable: boolean = false;
  groupTagNumber: string;  isCheckedAllGroup: boolean = true;
  IsItemNoHidden: boolean = true;
  selectedworkcenter: any;
  release: string = "";  sono: string = "";
  Datewiseselect: any = "";
  tagNumber: any = "";
  RunNoHide: boolean = false;TagNumberPrintHide: any;
  dt1: any = "";  dt2: any = "";
  fromdate: any="";
  todate: any="";
  isDivDisabled: boolean;
  workcentercount: number = 0;
  Tagstring: string = ""; TagString: any;  
  ishidden: boolean = true;
  selectedReleaseCode: any=""; releasecount: number = 0;
  selecteditemNo: any; itemcount: number = 0;
  totaltagnumber: number = 0; totalItemNo: number = 0;
  message:string;  UniqueId :any=[] ;
  PrintedBy:string="BPCAdmin";
  LogStatus:any;  dataStatus:any;  Logs:any=[];
  Printmessage:any; isLogActive:boolean=false;
  NoofDayslist:any;selectedNumberOfDays:number;
  selectFilter:string;
  tagnumbercount: number = 0;
  selectedtagnumber: any = "";selectRunnumber:string;
  totalworkcenter: number = 0;totalTags: string;
  SelectedTagId:string; listReleaseCode:any; 
  getfile:string="";
  IsDownload:boolean=true;
  url:string;
  splitURL:string;
  user:any;
  crystalprinter1: string=PrintersName.PDF;
  crystalprinter2: string=PrintersName.printmeshWAB;
  crystalprinter3: string=PrintersName.printnmmesh3;
  crystalprinter4: string=PrintersName.printmptp;
  selectCrystalPrinterName: string="";
  SelectCrystalTemplatename: string;
  reportname1: string= ReportNames.bpcreport1;
  reportname2: string=ReportNames.bpcreport2;
  reportname3: string=ReportNames.bpcreport3;
  reportname4: string=ReportNames.bpcreport4;
  isreport: string;
  istag: string;
  type: string;
  selectedvalue: string;
  reportCount: number=0;
  selectedReport : any;
  reportCountfinal: any;
  public objReportDetails: ReportDetails[]=[];
  public rows: Array<{ selectproductmesh: string}> = [];
  public datePipe: DatePipe;
  getreportfile: string="";
  IsDownloadReport:boolean=true;
  time: string="";
  now: string="";

  ngOnInit(): void 
  {
    this.GetUserDetails(this.user);
    this.url = window.location.href;
    this.splitURL ="BPC"; //  this.url.split("/", 10)[5].trim().split("?", 5)[0].trim();
    this.appcomp.GetUserDetails(this.user,this.splitURL);


    this.PDF = PrintersName.PDF;
    this.pnm = PrintersName.printnm;
    this.getfile = GetPDFFile.valuebpc;
    this.GetPrinterName();
    this.GetLibrarianFile();
    this.setNumberOfDays();
    this.resetRunWCItemTagNo();
    this.selectFilter="All";
    //this.getreportfile="http://localhost:60771/api/BPCTagPrinting/ShowReportDir";
    this.getreportfile=GetPDFFile.valuebpcReport;
    //this.GETDATE();
    //this.GetProductionCenter();
  }

  UserDetails:any;
  Valuess:any;
  Username:string;

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


  GetReleaseCode() 
  {
    this.resetRunWCItemTagNo();
    this.ResetTagWCItemRelease();
    this.ReleaseOrSo="";
    this.selected="ReleaseCode";
    this.ReleaseCode = "Release Code";
    this.GetAllNumbers(this.selected,this.selectedNumberOfDays);
    this.ItemNoHideClear(true);       
  }

  GetSONumber() 
  {
    this.resetRunWCItemTagNo();
    this.ResetTagWCItemRelease();
    this.ReleaseOrSo="";
    this.selected="SoNo";
    this.ReleaseCode = "SO Number";
    this.GetAllNumbers(this.selected,this.selectedNumberOfDays);
    this.ItemNoHideClear(false);    
  }

  ItemNoHideClear(flag: boolean) 
  {
    this.IsItemNoHidden = flag;
    this.Itemno = [];
  }
  
  setNumberOfDays() 
  {
    let days = new  NoOfdaylist();
    this.NoofDayslist =  days.value;
  }

  GetLibrarianFile() 
  {
    try 
    {
      this.service.GetLibrarianFileBPC().subscribe(data => {
        this.GetLibrarian = data;
        //this.selectTemplateName = "lib://BPC_PROD_WEB/BPCIndependent.btw";
        this.selectTemplateName = "lib://BPCQADB2/BPCIndependent.btw";
      });
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  GetPrinterName() 
  {
    try 
    {
      this.service.GetPrinterNameBPC().subscribe(data => {
        this.PrinterName = data;
        this.selectPrinterName="BW_TAG C9065";
      });
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  GetTagNumber(event:any){
    try{
      this.SelectedTagId="";
      /// reset all Relasecode Number, Item No , Work center,  Tag Number call that method here....
      this.SpinnerService.show('spinner0'); 
      this.SelectedTagId = event.target.value.split(":", 2)[1].trim() ;
      if(this.SelectedTagId == ""){
        this.isDivDisabled=false;
      }
      else
      {
        this.isDivDisabled=true;
      }
  
     // this.GetAllNumbers(this.SelectedTagId);
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
      alert("Please select Release Code,Run Number")
      return
    }
    this.SpinnerService.show('spinner0'); 
    const data = await this.service.BPCGetAllNumbers(selected,NoOfDays).toPromise();
    this.listReleaseCode = data;
    this.SpinnerService.hide('spinner0'); 
    
     if(this.selected =='SoNo'){
      this.ReleaseOrSo ='Select SO No';
     }
     else{
      this.ReleaseOrSo ='Select Release Code';
     }
    
  }
  catch(err:any) {
    this.SpinnerService.hide('spinner0'); 
    //alert(err.error);
  }
}

  async GetWCBySingleValues(Type: string, NoOfDays: number) 
  {
    try
    {
      if (Type == "ReleaseCode") 
      {
        //alert(Type+this.ReleaseOrSo+NoOfDays);
        this.WorkCenter = "";
        this.Workcenter = [];
        this.workcenterHide=false;
        this.GetselectedReleaseCode();
        this.SpinnerService.show('spinner2');
        const data = await this.service.GetWCBySingleValues(Type, this.selectedReleaseCode, NoOfDays, "").toPromise();
        this.Workcenter = data;
        //this.GroupTagNumberHide=false;
        for (var i = 0; i < this.Workcenter.length; i++) {
          this.WorkCenter += this.Workcenter[i] + ",";
        }
        this.totalworkcenter = this.Workcenter.length;
        this.WorkCenter = this.WorkCenter.substring(0, this.WorkCenter.length - 1);
        this.SpinnerService.hide('spinner2');
      }
      else 
      {
        this.SpinnerService.show("spinner3");
        this.ItemNo = "";
        this.Itemno = [];
        this.GetselectedReleaseCode();
        const data = await this.service.GetWCBySingleValues(Type, this.selectedReleaseCode, NoOfDays, "").toPromise();
        this.GroupTagNumberHide=false;
        this.Itemno = data;
        for (var i = 0; i < this.Itemno.length; i++) {
          this.ItemNo += this.ItemNo[i] + ",";
        }
        this.ItemNo = this.ItemNo.substring(0, this.ItemNo.length - 1);
        this.SpinnerService.hide("spinner3");
      }
    }
    catch
    {
      this.SpinnerService.show('spinner2');
      this.SpinnerService.hide("spinner3");
    }
    
  }

  GetWCByDropdown(event:any){
    try{

      this.RunNoHide = true;
      this.tagNumber=[];  
      this.SelectedTagId="";
      this.Datewiseselect="";
      this.ResetTagWCItemRelease();
      this.RunNoHide = true;
      this.tagNumber=[];  
      this.SpinnerService.show('spinner0'); 
     // this.SelectedTagId = event.target.value.split(":", 2)[1].trim() ;
      this.SelectedTagId = event ;
      if(this.SelectedTagId == ""){
        this.isDivDisabled=false;
      }
      else
      {
        this.isDivDisabled=true;
      }
  
      //this.getworkcenterselected(this.SelectedTagId);
      this.GetselectedReleaseCode();
          //this.GetWCOrItemNoByReleaseOrSoNo(this.selectedReleaseCode);
          this.GetWCOrItemNoByReleaseOrSoNo();
      this.SpinnerService.hide('spinner0'); 
      const checkbox = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
      checkbox.checked = false;
    }
    catch(err:any) {
      this.SpinnerService.hide('spinner0'); 
      //alert(err.error);
    }
    finally{
      if(this.selectedReleaseCode!="")
      {
        this.getreportfile=GetPDFFile.valuebpcReport+this.selectedReleaseCode+"_"+this.time+"";
      }
      else if(this.fromdate!="")
      {
        this.getreportfile=GetPDFFile.valuebpcReport+this.fromdate.toString()+"_"+this.time+"";
      }
      
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
    this.reportCountfinal=4; //change here as per number of reports
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
  

  async GetBPCTagsByWorkcenter(Value: string, Workcenter: string, NoOfDays: number, Type: string, ItemNo: string) 
  {
    try
    {
      this.SpinnerService.show('spinner4');
      this.Tagstring = "";
      this.TagString = [];
      const data = await this.service.GetBPCTagsByWorkcenter(Value, Workcenter, NoOfDays, Type, ItemNo).toPromise();
      this.TagString = data;

      for (var i = 0; i < this.TagString.length; i++) 
      {
        this.Tagstring += this.TagString[i] + ",";
      }
      this.Tagstring = this.Tagstring.substring(0, this.Tagstring.length - 1);
      this.SpinnerService.hide('spinner4');
    }
    catch
    {
      this.SpinnerService.hide('spinner4');
    }
    
  }

  async GetAllCode(dt1: string, dt2: string, Datewiseselect: string,selected:string) 
  {
    try 
    { 
      if(this.selected == "" || this.selected == undefined)
      {
        alert("Please Select ReleaseCode or So Number Option");  
        return  
      }  
      else if (this.Datewiseselect == undefined || this.Datewiseselect == "") 
      {  
        alert("Please Select Any Date");  
        return  
      }  
      else if (this.dt1 == "")
      {  
        alert("Please Select From Date");  
        return  
      }  
      else if (this.dt2 == "")
      {  
        alert("Please Select To Date");  
        return  
      }          
      const fromdate = dt1;//formatDate(dt1, 'ddMMyyyy', 'en-US');
      const todate = dt2;//formatDate(dt2, 'ddMMyyyy', 'en-US');
      this.SpinnerService.show('spinner1');      
      this.tagNumber = [];
      const checkbox = document.getElementById('chkAllSelectRunNo') as HTMLInputElement;
       
      if (this.selected == "ReleaseCode")
      {
        this.RunNoHide=false;
        checkbox.checked=false;

        const data = await this.service.GetRCByDateSearch(fromdate, todate, Datewiseselect).toPromise();
        this.tagNumber = data;
      }
      else if (this.selected == "SoNo") 
      {
        this.RunNoHide=false;
        checkbox.checked=false;
        const data = await this.service.GetRCSOByDateSearch(fromdate, todate, Datewiseselect).toPromise();
        this.tagNumber = data;
      }
      //const data = await this.service.GetAllCode('01122021','10102022','Production_Date',3).toPromise();
      this.RunNoHide = false;
      this.SpinnerService.hide('spinner1');
    }
    catch (err: any) 
    {
      this.SpinnerService.hide('spinner1');
      //alert(err.error);
    }
  }

  async GetWCOrItemNoByReleaseOrSoNo() 
  { 
    try
    {
      //this.SelectedTagId = event.target.value.split(":", 2)[1].trim() ;
      if(this.selected == "" || this.selected == undefined)
      {
        alert("Please Select ReleaseCode or So Number Option");  
        return; 
      }
      // else if (this.SelectedTagId=="")
      // {
      //   alert("Please Enter Release Or So Number in Textbox");
      //   return;
      // }  
      
      if (this.selected == "ReleaseCode") 
      {
        this.SpinnerService.show('spinner2'); 
        this.workcenterHide=false;
        //alert(Type+this.ReleaseOrSo+NoOfDays);
        this.WorkCenter = "";
        this.Workcenter = [];
        this.GetselectedReleaseCode();  
        const data = await this.service.GetWCBySingleValues("ReleaseCode", this.selectedReleaseCode, this.selectedNumberOfDays, "").toPromise();
        this.Workcenter = data;  
        for (var i = 0; i < this.Workcenter.length; i++) 
        {
          this.WorkCenter += this.Workcenter[i] + ",";
        }
        this.totalworkcenter = this.Workcenter.length;
        //this.WorkCenter = this.WorkCenter.substring(0, this.WorkCenter.length - 1);
        this.SpinnerService.hide('spinner2');  
      }
      else 
      {
        // if (this.ItemNo == "" )
        // {
        this.GroupTagNumberHide=false;
        //this.GroupTagNumberHide=false;
        this.SpinnerService.show("spinner3");
        //this.ItemNo = "";
        this.Itemno = [] ;
        //this.GetselecteditemNo();
        const checkbox=document.getElementById('chkAllGroupTagNumber') as HTMLInputElement;
        checkbox.checked=false;
        this.GetselectedReleaseCode();
        const data = await this.service.GetWCBySingleValues("SoNo", this.selectedReleaseCode, this.selectedNumberOfDays, '').toPromise();
        this.Itemno = data;
      
        for (var i = 0; i < this.Itemno.length; i++) 
        {
          this.ItemNo += this.Itemno[i] + ",";
        }
          this.totalItemNo = this.Itemno.length;
          this.SpinnerService.hide("spinner3");
              //this.ItemNo = this.ItemNo.substring(0, this.ItemNo.length - 1);
    //   }
    //  else
    //  {
    //     this.SpinnerService.show('spinner2');
    //     this.WorkCenter = "";
    //     this.Workcenter = [] = "";
    //     this.GetselectedReleaseCode();
    //     this.GetselecteditemNo();
    //     const data = await this.service.GetWCBySingleValues("SoNo", this.selectedReleaseCode, this.selectedNumberOfDays, this.selecteditemNo).toPromise();
    //     this.Workcenter = data;
        
    //     for (var i = 0; i < this.Workcenter.length; i++) 
    //       {
    //         this.WorkCenter += this.Workcenter[i] + ",";
    //       }
    //     this.WorkCenter = this.Workcenter.length;
    //     this.SpinnerService.hide('spinner2');
    //   }
      }
    }
    catch
    {
      this.SpinnerService.hide("spinner3");
      this.SpinnerService.hide('spinner2');
    }
  }


  chkAllReport() {
    try{
      const checkbox = document.getElementById('chkAllCrystalReport') as HTMLInputElement ;
      this.ChechkedAll('form-check-input m-1 chkSelectCrystalReport','chkAllCrystalReport');      
      if (checkbox?.checked) {
        
      }
      else{
        
        }
        
    }
    catch(err) {
      console.log(err);
    }
    this.GetselectedReports();
  }
 

  async GetWCFromNoitemNumber() 
  {
    try
    {
         this.SpinnerService.show('spinner2');
          this.WorkCenter = "";
          this.Workcenter = [] = "";
          this.GetselecteditemNo();
          if (this.selecteditemNo=="")
          {
            this.SpinnerService.hide('spinner2');
            return;
          }
          this.GetselectedReleaseCode();
          const data = await this.service.GetWCBySingleValues("SoNo", this.selectedReleaseCode, this.selectedNumberOfDays, this.selecteditemNo).toPromise();
          this.Workcenter = data;
      
          for (var i = 0; i < this.Workcenter.length; i++) 
          {
              this.WorkCenter += this.Workcenter[i] + ",";
          }
          this.WorkCenter = this.Workcenter.length;
          this.SpinnerService.hide('spinner2');
    }
    catch
    {
      this.SpinnerService.hide('spinner2');
    }
  }


  GetselectedWorkcenter() 
  {
    this.workcentercount = 0;
    this.selectedworkcenter = [];
    var inputElems = document.getElementsByTagName("input");
    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].className === "form-check-input m-1 chkSelectworkcenter") {
        if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
          this.selectedworkcenter += inputElems[i].value.trim() + ",";
          this.workcentercount++;
        }
      }
    }
    if (this.selectedworkcenter.length > 0) {
      this.selectedworkcenter = this.selectedworkcenter.substring(0, this.selectedworkcenter.length - 1);
    }
    else {
      this.selectedworkcenter = "";
    }
  }

  ChechkedAll(subclassname:string, classname:string) {
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
  
 
  GetselectedTagNumbers() 
  {
    this.tagnumbercount = 0;
    this.selectedtagnumber = [];
    var inputElems = document.getElementsByTagName("input");
    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].className === "form-check-input m-1 chkTagNoTagNotoPrint") {
        if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
          this.selectedtagnumber += inputElems[i].value.trim() + ",";
          this.tagnumbercount++;
        }
      }
    }
    if (this.selectedtagnumber.length > 0) {
      this.selectedtagnumber = this.selectedtagnumber.substring(0, this.selectedtagnumber.length - 1);
    }
    else {
      this.selectedtagnumber = "";
    }
  }

  checkUncheckAll() 
  {
    try 
    {
      this.ResetTagWCItemRelease();
      this.workcenterHide=false;
      const checkbox = document.getElementById('chkAllSelectRunNo') as HTMLInputElement;
      //const checkbox2 = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
      if (this.selected != "SoNo") 
      {
        this.RunNoHide=false;
        //this.ChechedAll('form-check-input m-1 chkGroupTagNo', 'chkAllGroupTagNumber');
        this.ChechedAll('form-check-input m-1 chkSelectRunNo', 'chkAllSelectRunNo');
        const checkbox = document.getElementById('chkAllSelectRunNo') as HTMLInputElement;
        //const checkbox2 = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement;
        if (checkbox?.checked) 
        {
          //this.GetselectedReleaseCode();
          this.GetWCOrItemNoByReleaseOrSoNo();
        }
        else 
        {
          for (var i = 0; i < this.WorkCenter.length; i++) {
            //this.WorkCenter[i].isChecked = false;
            //this.resetItemTagNo();
          }
        }        
      }
      else 
      {
        alert("Please select only one SO Number");
        checkbox.checked = false;
        return
      }
    }
    catch (err) 
    {
      console.log(err);
    }
    finally
    
    {
      this.GetselectedReleaseCode();
      if(this.selectedReleaseCode=="")
      {
        this.ResetTagWCItemRelease();
      }      
    }
  }

  isAllSelectedworkcenter() 
  { 
    try
    {
      this.workcentercount=0;
      const checkbox = document.getElementById('chkAllWorkCenter') as HTMLInputElement;   
      var inputElems = document.getElementsByTagName("input");
      for (var i = 0; i < inputElems.length; i++) {
        if (inputElems[i].className === "form-check-input m-1 chkSelectworkcenter") {
          if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
            this.selectedworkcenter += inputElems[i].value.trim() + ",";
            this.workcentercount++;
          }
        }
      }
      if (this.workcentercount==this.Workcenter.length)
      {
        checkbox.checked=true;
      }
      else
      {
        checkbox.checked=false;
      }
      this.GetselectedWorkcenter();  
      //this.GetWCOrItemNoByReleaseOrSoNo(this.selectedReleaseCode);
      this.GetBPCTagsfromWorkcenter();
      this.TagNumberPrintHide=false;
      const checkbox2 = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement;
      checkbox2.checked=false;
      // if (this.totalworkcenter == this.workcentercount) {
      //   checkbox.checked = true;
      // }
      // else {
      //   checkbox.checked = false;
      // }
      // this.TagNumberPrintHide=false;
    }
    catch(err)
    {
      console.log(err);
    }
    finally
    {
      this.GetselectedWorkcenter();
      if(this.selectedworkcenter=="")
      {
          //this.ResetTagWCItemRelease();
          this.TagNumberPrintHide = true;  
          this.tagnumbercount = 0;
          this.TagString=[];         
      }      
    }    
  }

  checkUncheckWorkCenter() 
  {
    try 
    {
      //const checkbox = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
      //const checkbox2 = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
      //if(this.selected != "SONo"){
      this.TagNumberPrintHide=false;
      //this.ChechedAll('form-check-input m-1 chkGroupTagNo', 'chkAllGroupTagNumber');
      this.ChechedAll('form-check-input m-1 chkSelectworkcenter', 'chkAllWorkCenter');
      const checkbox = document.getElementById('chkAllWorkCenter') as HTMLInputElement;
      //const checkbox2 = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement;
      const checkbox2 = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement;
      checkbox2.checked=false;
      if (checkbox?.checked) 
      {
        //this.GetselectedRunNo();
        //this.GetselectedReleaseCode();
        //this.GetselectedWorkcenter();        
        //checkbox2.checked = false;
        this.GetBPCTagsfromWorkcenter();
      }
      else 
      {
        for (var i = 0; i < this.WorkCenter.length; i++) {
          //this.WorkCenter[i].isChecked = false;
          //this.resetItemTagNo();
        }
      }
      // var inputElems = document.getElementsByTagName("input");
      //     for (var i=0; i < inputElems.length; i++) {
      //       if(inputElems[i].className === "form-check-input m-1 chkSelectworkcenter"){
      //         if (inputElems[i].type === "checkbox" && inputElems[i].checked === false ){
      //           inputElems[i].checked = true;
      //         }
      //       }
      //     }

      // if (checkbox?.checked) {

      //   this.GetselecteditemNo();
      //   this.GetselectedReleaseCode();
      //   //this.getworkcenterselected(this.seletedrunno);
      //   checkbox.checked=false;
      // }
      // else{
      //   for (var i = 0; i < this.tagNumber.length; i++) {
      //     this.tagNumber[i].isChecked = false;
      //     //this.resetWCItemTagNo();
      //   }
      // }
      // }
      // else
      // {
      //   alert("Please select only one SO Number");
      //   checkbox.checked=false;
      //   return 
      // }         
    }
    catch (err) {
      console.log(err);
    }
    finally
    {
      this.GetselectedWorkcenter();
      if(this.selectedworkcenter=="")
      {
          //this.ResetTagWCItemRelease();
          this.TagNumberPrintHide = true;  
          this.tagnumbercount = 0;
          this.TagString=[];  
      }      
    }
  }
  
  async GetBPCTagsfromWorkcenter() 
  {
    try
    {
      if (this.Datewiseselect != undefined || this.Datewiseselect != "") 
      {
        if (this.selected == "ReleaseCode") 
        {
          this.SpinnerService.show('spinner4'); 
          this.GetselectedReleaseCode();
          this.GetselectedWorkcenter();
          //this.selectedReleaseCode = "1010B13001";
          const data = await this.service.GetBPCTagsByWorkcenter(this.selectedReleaseCode, this.selectedworkcenter, this.selectedNumberOfDays, 'ReleaseCode', '').toPromise();
          this.TagString = data;
          const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
          checkbox.checked= true;  
          for (var i = 0; i < this.TagString.length; i++) 
          {
            this.TagString[i].isChecked = true;
          }
          this.totaltagnumber = this.TagString.length;
          // for (var i = 0; i < this.TagString.length; i++) {
          //   this.Tagstring += this.TagString[i] + ",";
          // }
          // this.totalTags = this.TagString.length;
          // this.Tagstring = this.Tagstring.substring(0, this.Tagstring.length - 1);
          this.SpinnerService.hide('spinner4');
          
        }
        else
        {
          this.SpinnerService.show('spinner4');
          this.GetselectedReleaseCode();
          this.GetselectedWorkcenter();
          this.GetselecteditemNo();
          //this.selectedReleaseCode = "1010B13001";
          const data = await this.service.GetBPCTagsByWorkcenter(this.selectedReleaseCode, this.selectedworkcenter, this.selectedNumberOfDays, 'SoNo', this.selecteditemNo).toPromise();
          this.TagString = data;
          this.totaltagnumber = this.TagString.length;
          // for (var i = 0; i < this.TagString.length; i++) {
          //   this.Tagstring += this.TagString[i] + ",";
          // }
          // this.totalTags = this.TagString.length;
          // this.Tagstring = this.Tagstring.substring(0, this.Tagstring.length - 1);
          this.SpinnerService.hide('spinner4');
        }      
      }
      else
      {
        if (this.selected == "ReleaseCode") 
        {
          this.SpinnerService.show('spinner4'); 
          //this.GetselectedReleaseCode();
          this.GetselectedWorkcenter();
          this.GetselectedReleaseCode();
          //this.selectedReleaseCode = "1010B13001";
          const data = await this.service.GetBPCTagsByWorkcenter(this.selectedReleaseCode, this.selectedworkcenter, this.selectedNumberOfDays, 'ReleaseCode', '').toPromise();
          this.TagString = data;
          this.totaltagnumber = this.TagString.length;
          // for (var i = 0; i < this.TagString.length; i++) {
          //   this.Tagstring += this.TagString[i] + ",";
          // }
          // this.totalTags = this.TagString.length;
          // this.Tagstring = this.Tagstring.substring(0, this.Tagstring.length - 1);
          this.SpinnerService.hide('spinner4');
        }
        else
        {
          this.SpinnerService.show('spinner4');
          //this.GetselectedReleaseCode();
          this.GetselectedWorkcenter();
          this.GetselecteditemNo();
          this.GetselectedReleaseCode();
          //this.selectedReleaseCode = "1010B13001";
          const data = await this.service.GetBPCTagsByWorkcenter(this.selectedReleaseCode, this.selectedworkcenter, this.selectedNumberOfDays, 'SoNo', this.selecteditemNo).toPromise();
          this.TagString = data;
          this.totaltagnumber = this.TagString.length;
          // for (var i = 0; i < this.TagString.length; i++) {
          //   this.Tagstring += this.TagString[i] + ",";
          // }
          // this.totalTags = this.TagString.length;
          // this.Tagstring = this.Tagstring.substring(0, this.Tagstring.length - 1);
          this.SpinnerService.hide('spinner4');
        }      
      } 
    }
    catch
    {
      this.SpinnerService.hide('spinner4');
    }       
  }

  isAllSelectedGroupTagNo() 
  {
    try
    {
      this.itemcount=0;
      this.workcenterHide=false;
      const checkbox = document.getElementById('chkAllGroupTagNumber') as HTMLInputElement;
      var inputElems = document.getElementsByTagName("input");
      for (var i = 0; i < inputElems.length; i++) {
        if (inputElems[i].className === "form-check-input m-1 chkGroupTagNo") {
          if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
            this.selecteditemNo += inputElems[i].value.trim() + ",";
            this.itemcount++;
          }
        }
      }
      if (this.itemcount==this.Itemno.length)
      {
        checkbox.checked=true;
      }
      else
      {
        checkbox.checked=false;
      }
      this.GetWCFromNoitemNumber();      
    }
    catch(err)
    {
      console.log(err);
    }
    finally
    {
      this.GetselecteditemNo();
      if(this.selecteditemNo=="")
      {
          this.TagNumberPrintHide = true;  
          this.tagnumbercount = 0;
          this.TagString=[]; 
          this.selectedworkcenter=[]; 
          this.Workcenter=[];  
          this.workcenterHide = true; 
      }      
    }    
  }
  
  checkUncheckGroupTagNumber() 
  {
    try
    {
      this.workcenterHide=false; 
      this.ChechedAll('form-check-input m-1 chkGroupTagNo', 'chkAllGroupTagNumber'); 
      const checkbox = document.getElementById('chkAllGroupTagNumber') as HTMLInputElement;
      if (checkbox?.checked)
      {
      }
      else
      {
        this.Workcenter=[];
        this.TagString=[];
        this.workcenterHide=true;
        this.TagNumberPrintHide=true;
        return;
      }  
      this.GetWCFromNoitemNumber();
    }
    catch(err)
    {
        console.log(err);
    }    
    finally
    {
      this.GetselecteditemNo();
      if(this.selecteditemNo=="")
      {
          this.TagNumberPrintHide = true;  
          this.tagnumbercount = 0;
          this.TagString=[]; 
          this.selectedworkcenter=[]; 
          this.Workcenter=[];  
          this.workcenterHide = true; 
      }      
    }
  }

  releasecount1: number = 0;
  isAllSelected() 
  {
    try 
    {      
      if (this.selected != "SoNo") 
      {        
        this.GetselectedReleaseCode();
        this.GetWCOrItemNoByReleaseOrSoNo();  
        const checkbox = document.getElementById('chkAllSelectRunNo') as HTMLInputElement;        
        if (this.releasecount == this.releasecount1) 
        {
          checkbox.checked = true;
        }
        else 
        {
          checkbox.checked = false;
        }

        //this.getworkcenterselected(this.seletedrunno);
      }
      else 
      {
        this.GroupTagNumberHide=false;
        this.releasecount1 = 0;
        var inputElems = document.getElementsByTagName("input");
        for (var i = 0; i < inputElems.length; i++) 
        {
          if (inputElems[i].className == "form-check-input m-1 chkSelectRunNo") {
            if (inputElems[i].checked == true) 
            {
              this.releasecount1++;
              if (this.selected == "SoNo" && this.releasecount1 >= 2) {
                alert("Please select only one SO Number");
                inputElems[i].checked = false;
                return
              }
            }
          }
        }
        //this.GetselectedReleaseCode();
        this.ItemNo="";
        this.GetWCOrItemNoByReleaseOrSoNo();  
        //this.GetselectedReleaseCode();
        //this.selectedReleaseCode = this.selectedReleaseCode.substring(0, this.selectedReleaseCode.length - 1);
        //this.GetWCOrItemNoByReleaseOrSoNo(this.selectedReleaseCode);
      }
    }
    catch (err) 
    {
      console.log(err);
    }
    finally
    {
      this.GetselectedReleaseCode();
      if(this.selectedReleaseCode=="")
      {
        this.ResetTagWCItemRelease();
      }      
    }
  }


  isAllSelectedTagNotoPrint() 
  {
    const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement;
    //this.GetselectedRunNo();
    this.GetselectedTagNumbers()

    if (this.totaltagnumber == this.tagnumbercount) {
      checkbox.checked = true;
    }
    else {
      checkbox.checked = false;
    }
  }

  checkUncheckTagNumbertoPrint() 
  {
    try 
    {
      //const checkbox = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
      //const checkbox2 = document.getElementById('chkAllWorkCenter') as HTMLInputElement ;
      //if(this.selected != "SONo"){
      this.ChechedAll('form-check-input m-1 chkTagNoTagNotoPrint', 'chkAllTagNumbertoPrint');
      const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement;
      //const checkbox2 = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;

      if (checkbox?.checked) 
      {
        //this.GetselectedRunNo();
        //this.GetselectedReleaseCode();
        //this.GetselectedWorkcenter();        
        //checkbox2.checked=false;
        //this.GetBPCTagsfromWorkcenter();
      }
      else 
      {
        for (var i = 0; i < this.WorkCenter.length; i++) {
          //this.WorkCenter[i].isChecked = false;
          //this.resetItemTagNo();
        }
      }
      // var inputElems = document.getElementsByTagName("input");
      //     for (var i=0; i < inputElems.length; i++) {
      //       if(inputElems[i].className === "form-check-input m-1 chkSelectworkcenter"){
      //         if (inputElems[i].type === "checkbox" && inputElems[i].checked === false ){
      //           inputElems[i].checked = true;
      //         }
      //       }
      //     }

      // if (checkbox?.checked) {

      //   this.GetselecteditemNo();
      //   this.GetselectedReleaseCode();
      //   //this.getworkcenterselected(this.seletedrunno);
      //   checkbox.checked=false;
      // }
      // else{
      //   for (var i = 0; i < this.tagNumber.length; i++) {
      //     this.tagNumber[i].isChecked = false;
      //     //this.resetWCItemTagNo();
      //   }
      // }
      // }
      // else
      // {
      //   alert("Please select only one SO Number");
      //   checkbox.checked=false;
      //   return 
      // }         
    }
    catch (err) 
    {
      console.log(err);
    }
  }

  ChechedAll(subclassname: string, classname: string) 
  {
    const checkbox = document.getElementById(classname) as HTMLInputElement;
    var inputElems = document.getElementsByTagName("input");
    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].className === subclassname) {
        if (checkbox.checked == true) {
          inputElems[i].checked = true;
        }
        else 
        {
          inputElems[i].checked = false;
        }
      }
    }
  }

  // ChechedAll(classname:string) {
  //   var inputElems = document.getElementsByTagName("input");
  //     for (var i=0; i < inputElems.length; i++) {
  //       if(inputElems[i].className === classname){
  //         if (inputElems[i].type === "checkbox" && inputElems[i].checked === false ){
  //           inputElems[i].checked = true;
  //         }
  //         else{
  //           inputElems[i].checked = false;
  //         }
  //       }
  //     }
  // }

  GetselectedReleaseCode() 
  {
    if (this.Datewiseselect != undefined && this.Datewiseselect != "") 
    {
      this.selectedReleaseCode = [];
      var inputElems = document.getElementsByTagName("input");
      for (var i = 0; i < inputElems.length; i++) {
        if (inputElems[i].className === "form-check-input m-1 chkSelectRunNo") 
        {
          if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
            this.selectedReleaseCode += inputElems[i].value.trim() + ",";
            this.releasecount++;
          }
        }
      }
      if (this.selectedReleaseCode.length > 0) {
        this.selectedReleaseCode = this.selectedReleaseCode.substring(0, this.selectedReleaseCode.length - 1);
      }
      else 
      {
        this.selectedReleaseCode = "";
      }
    }
    else
    {
      this.selectedReleaseCode =this.ReleaseOrSo;
    }    
    if(this.releasecount <= 0){
      this.selectedReleaseCode = this.SelectedTagId;
    }
  }

  GetselecteditemNo() 
  {
    this.selecteditemNo = [];
    var inputElems = document.getElementsByTagName("input");
    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].className === "form-check-input m-1 chkGroupTagNo") {
        if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
          this.selecteditemNo += inputElems[i].value.trim() + ",";
          this.itemcount++;
        }
      }
    }
    if (this.selecteditemNo.length > 0) {
      this.selecteditemNo = this.selecteditemNo.substring(0, this.selecteditemNo.length - 1);
    }
    else {
      this.selecteditemNo = "";
    }
  }

  totalreports: any="";
  BPCHistory:any="";
  date2:any="";

  date1:any="";
  async RunHistory() {
  this.GETDATE();
  const checkbox3 = document.getElementById('IsCrystalReport') as HTMLInputElement ;
  this.isPrintingStarted=false;
  this.isPrintingCompleted=false;
  
  if(checkbox3.checked==true)
  {
  if(this.fromdate!="")
  {
    this.date1=formatDate(this.fromdate,'yyyy-MM-dd',"en-US");
  }
  if(this.todate!="")
  {
    this.date2=formatDate(this.todate,'yyyy-MM-dd',"en-US");
  }
  if(this.selectedReport!=undefined)
  {
    this.totalreports=this.selectedReport.split(',');
  }
  if(this.selectCrystalPrinterName=="")
  {
    alert("Please Select Printername for Report.");
    return;
  }
  else if(this.totalreports=="")
  {
    if(checkbox3.checked==true){
      alert("Please Select Templatename for to print the report.");
      return;
    }
  }
 this.GetselectedReports();
  if(this.selectedReport.includes(ReportNames.bpcreport2) && this.selectedReport.includes(ReportNames.bpcreport1))
  {
    if(this.fromdate=="" && this.todate=="")
    {
      alert("Please Select FromDate and ToDate from Report Section.");
      return;
    }
  }
  else if(this.selectedReport.includes(ReportNames.bpcreport2))
  {
    if(this.fromdate=="")
    {
      alert("Please Select FromDate For BPC Loading Plan by Delivery from Report Section.");
      return;
    }
  }
  if(this.selectedReport.includes(ReportNames.bpcreport1))
  {
    if(this.fromdate=="" || this.todate==""){
      alert("Please Select FromDate And ToDate For BPC CRSR Report from Report Section.");
      return;
    }
  }
  if(this.selectedReport.includes(ReportNames.bpcreport3) || this.selectedReport.includes(ReportNames.bpcreport4))
  {
   if(this.SelectedTagId=="")
   {
     alert("release code should not be empty");
     return;
   } 
  }
  }
  //alert(this.totalreports);

  this.isreport="";
  this.istag="";
  this.type=this.selected;
  this.selectedvalue=this.selectedReleaseCode;
  const checkbox = document.getElementById('IsCrystalReport') as HTMLInputElement ;
  const checkbox2 = document.getElementById('IsTagReport') as HTMLInputElement ;
  if(checkbox.checked== true || checkbox2.checked==true)
  {
    if(this.selectedReleaseCode=="")
    {
    if(this.fromdate!="")
    {
       this.selectedReleaseCode="BPC_Report"+ this.fromdate;
    }
  }
  }
  else
  {
    alert("Please check the checkbox of tags or report for print..")
    return;
  }

  if(checkbox.checked == true)
  {
      this.isreport="true";
  }
  if(checkbox2.checked ==true)
  {
      this.istag="true";  

  }

    this.PrinterStatus();
    this.GetselectedTagNumbers();

    if(checkbox2.checked==true)
  {
    const data = await this.service.BPCHistory(this.selectedtagnumber).toPromise();
    this.BPCHistory = data;
    //alert(this.RunNoHistory[0].ErrorMsg);
    if (this.BPCHistory[0].ErrorMsg.length > 0) {
      if (confirm("Are you sure to continue \n" + this.BPCHistory[0].ErrorMsg)) {
        this.Print();
      }
    }
    else 
    {
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
  finalpath: string="";

  async getcount(path: string)
{
  this.GetselectedReports();
  const data = await this.service.GetFileCountBpc(path).toPromise();
    if(data==this.reportCount){
      this.isPrintingCompleted=true;
      this.IsDownloadReport=false;
    }
}


  async Print(){

    try{
      const checkbox3 = document.getElementById('IsCrystalReport') as HTMLInputElement ;
      const checkbox2 = document.getElementById('IsTagReport') as HTMLInputElement ;
  
      this.IsPrintdisabled=false;
      this.isPrintingStarted=false;
      if(checkbox3.checked==true && checkbox2.checked==false)
      {
        if(this.fromdate!="")
        {
           //this.selectedReleaseCode="BPC_Report"+ this.fromdate.toString();
        }
        
      }
      else{
      if(this.selected == undefined || this.selected == ""){
        alert("Please Select Release Code or SO Number");
        return
      } 
    }
    if(checkbox3.checked==true)
    {
      this.getreportfile=GetPDFFile.valuebpcReport+this.selectedReleaseCode+"_"+this.time+"";
    }
    else{
      
      this.GetselectedReleaseCode();
    }
        
        this.GetselectedWorkcenter();
        if(this.selected == "SONo"){
          //this.GetselectedItemNumber();
        }
        else
        {
          //this.selectedItemNumber = "";
        }
        this.GetselectedTagNumbers();
  
      // if(this.releasecount <= 0){
      //   alert("Please Select Release Code");
      //   return;
      // }
      //else 
      if(checkbox2.checked==true)
      {
      if(this.workcentercount <= 0){
        alert("Please Select Work Center");
        return;
      }
      else if(this.tagnumbercount <= 0){
        alert("Please Select Tag Number");
        return;
      }
      else if( this.selectPrinterName == undefined || this.selectPrinterName == "Select Printer Name" ){
        alert("Please Select Printer Name");
        return
      }
      else if(this.selectTemplateName == undefined || this.selectTemplateName == "Select Template File" ){
        alert("Please Select Template File");
        return
      }
    }
    this.GetselectedReports();
      this.IsDownloadReport=true;
      this.selectedvalue=this.selectedReport;
      this.IsPrintdisabled= true;
      
      if(this.SelectedTagId!="")
      {
        this.getreportfile=GetPDFFile.valuebpcReport+this.SelectedTagId+"_"+this.time+"";
      }
      
      const data = await this.service.BPCThread(
        this.selectedReleaseCode,
        this.selectedtagnumber,
        'All',
        this.selectPrinterName,
        this.selectTemplateName,
        this.PrintedBy,
        this.istag,
        this.isreport,
        this.selectCrystalPrinterName,
        this.SelectCrystalTemplatename,
        this.type,
        this.selectedvalue,
        this.date1,
        this.date2,
        this.time
      ).toPromise();
      
    this.Printmessage = data;

  // if(checkbox2.checked!=true && checkbox3.checked==true)
  //  {
  //    if(this.selectedReport.includes(ReportNames.bpcreport4))
  //    {
  //     this.IsPrintdisabled=false;
  //     this.isPrintingStarted=true;
  //     setTimeout(() => {
  //       this.isPrintingCompleted=true;
  //       this.IsDownloadReport=false;
  //     }, 130000);
  //    }
  //    else{
  //     this.IsPrintdisabled=false;
  //     this.isPrintingStarted=true;
  //     setTimeout(() => {
  //       this.isPrintingCompleted=true;
  //       this.IsDownloadReport=false;
  //     }, 20000);
  //    }
    
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
    else{
      this.finalpath=this.fromdate+"_"+this.time;
    }
    setInterval(() => {
      //this.isPrintingCompleted=true;
      this.getcount(this.finalpath);
    }, 5000);
  }

  if(checkbox2.checked==true)
  {
    this.message = this.Printmessage[0].UniqueId;
    this.UniqueId.push({UniqueId: this.message});
     if(checkbox2.checked==true)
     {
    setInterval(() => {
      this.GetStatus(this.UniqueId);
    }, 10000);
  }
}
    
    }
    catch(err:any) {
      this.SpinnerService.hide("spinner0");
      //alert(err.error);
    }
  }
  
  async GetStatus(id:any){
    
    if(id.length > 0){
      for(var i=0; i < id.length; i++ ){
          if(id[i] != undefined){
          this.dataStatus = await this.service.GetStatusBPC(id[i].UniqueId).toPromise();
  
          if(this.Logs.length==0){
            this.pushLogs(this.dataStatus);
            // setTimeout(() => {
            //   //this.SetClasstoLog();  
            //  }, 100);
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
                     // this.IsDownload= true;
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
        ProdType:"BPC",
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
    if(this.message === Unique){
     this.IsPrintdisabled = false;
    }
  }

  }

  getTempFileName(){
    this.Tempfile =  this.selectTemplateName.split("/")[3].trim() ;
  }

  SearchDisable(event: any) 
  {
    this.ResetTagWCItemRelease();
    this.Datewiseselect = "";
    this.GroupTagNumberHide= false;
    var scc = event.target.value;
    if (scc == "") 
    {
      this.isDivDisabled = false;
    }
    else 
    {
      this.isDivDisabled = true;
    }
  }

  // SetClasstoLog()
  // {
  //   this.isLogActive = true;     
  // }

  resetRunWCItemTagNo()
  {
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
    this.selectedReleaseCode='';  
    this.selectedNumberOfDays=5;  
    this.dt1='';  
    this.dt2='';      
    this.tagNumber=[];  
    this.RunNoHide = true;
    this.selectedworkcenter=[];  
    this.Workcenter=[];  
    this.workcenterHide = true;  
    this.Itemno=[];  
    this.GroupTagNumberHide= true;  
    this.selectedtagnumber=[];  
    this.TagNumberPrintHide = true;  
    this.tagnumbercount = 0;
    this.TagString=[];  
  }

  resetDatewise()
  {    
    this.selectedReleaseCode='';  
    this.selectedNumberOfDays=30;  
    this.dt1='';  
    this.dt2='';       
    this.tagNumber=[];  
    this.RunNoHide = true;
    this.selectedworkcenter=[];  
    this.Workcenter=[];  
    this.workcenterHide = true;  
    this.Itemno=[];  
    this.GroupTagNumberHide= true;  
    this.selectedtagnumber=[];  
    this.TagNumberPrintHide = true;  
    this.tagnumbercount = 0;
    this.TagString=[];   
  }


  ResetTagWCItemRelease()
  {
    this.selectedworkcenter=[]; 
    this.Workcenter=[];  
    this.workcenterHide = true;  
    this.selectedtagnumber=[];  
    this.TagNumberPrintHide = true;  
    this.tagnumbercount = 0;  
    this.Itemno=[];  
    this.GroupTagNumberHide= true; 
    //this.RunNoHide = true;
    //this.selectedReleaseCode=[];
    //this.ReleaseCode="";
    this.TagString=[]; 
    this.Value="";
  }
  
   SelectorAll()
   {
     if( this.selectFilter != "All")
     {
       this.ishidden=true;  
     }  
     else
     {  
       this.ishidden=false;  
     }
   }

   GetSelectTagNumber()
   {
     try
     {  
       const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;  
       checkbox.checked= true;  
       const result = this.TagString.filter((user: any) =>
   
         user.fld_bpc_tag_no.includes(this.selectRunnumber));   
         this.TagString = result;  
         for (var i = 0; i < this.TagString.length; i++) 
         {  
           this.TagString[i].isChecked = true;  
         }  
         this.GetselectedTagNumbers();  
         this.tagnumbercount =   this.TagString.length;  
       }  
       catch(err:any)
       {  
         //this.SpinnerService.hide("spinner4");  
         //alert(err.error);  
       }  
     }
 
     ResetNumber()
     {
       this.ShowTagNumber();    
       this.selectRunnumber = '';    
       this.selectFilter= "All";    
     }
 
     
 async ShowTagNumber()
 {
   try
   {
       this.SpinnerService.show("spinner4");
       
       
       this.GetselectedReleaseCode();
       this.GetselectedWorkcenter(); 
       if(this.selected == "SoNo")
       {
         this.GetselectedReleaseCode();
       }
       else
       {
         this.selecteditemNo = "";
       }
 
       if(this.selectRunnumber == "")
       {
         if(this.selectedReleaseCode != "")
         {
           //this.selectRunnumber = this.selectedReleaseCode;
         }
         else
         {
           alert("Please selelect Release Code");
           return
         }
       }
 
       this.TagString=[];
       const data = await this.service.GetBPCTagsByWorkcenter(this.selectedReleaseCode,this.selectedworkcenter,this.selectedNumberOfDays,this.selected,this.selecteditemNo).toPromise();
       this.TagString = data;
       for (var i = 0; i < this.TagString.length; i++) 
       {
         this.TagString[i].isChecked = true;
       }
       this.GetselectedTagNumbers();
       this.tagnumbercount = this.TagString.length;
       this.SpinnerService.hide("spinner4");
       const checkbox = document.getElementById('chkAllTagNumbertoPrint') as HTMLInputElement ;
       checkbox.checked= true;
       this.selectRunnumber = '';
       if( this.selectFilter == "All")
       {
         this.ishidden=true;
       }
       else
       {
         this.ishidden=false;
       }
    }
    catch(err:any)
    {
       this.SpinnerService.hide("spinner4");
       //alert(err.error);
    }
 }

 async Reset()
 {
    this.resetRunWCItemTagNo();
    this.tagnumbercount = 0;
    this.TagString=[];
    const data = await this.service.ResetEngine().toPromise();
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
 async timeout(time: any)
 {
  setTimeout(() => {
    this.isPrintingCompleted=true;
    this.IsDownloadReport=false;
  }, time);
 }
 
}
