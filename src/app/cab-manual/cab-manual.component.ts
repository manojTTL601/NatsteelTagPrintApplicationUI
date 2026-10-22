import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { PrintersName,GetPDFFile } from '../services/cabmodel.model';
import { window } from 'rxjs';
@Component({
  selector: 'app-cab-manual',
  templateUrl: './cab-manual.component.html',
  styleUrls: ['./cab-manual.component.css']
})
export class CabManualComponent implements OnInit {

  constructor(public service:ServicesService) { }

  var1: string="";
  var2:any="";
  selectTemplateName:any="";
  GetLibrarian:any="";
  pname1: any=PrintersName.PDF;
  pname2: any=PrintersName.printmptp;
  selectPrinterName:any="";
  IsDownload:boolean=true;
  isPrintingStarted:boolean=false;
  isPrintingCompleted:boolean=false;
  ishash:any="";

  getfile = GetPDFFile.valuecabmanual;
  ngOnInit(): void {
    this.GetLibrarianFile();
    this. getfile = GetPDFFile.valuecabmanual;
  }

  GetLibrarianFile(){
    try{
      this.service.GetLibrarianFileCABManual().subscribe(data => {
         this.GetLibrarian = data;
         this.selectTemplateName="lib://CABMANUAL_PROD_WEB/CAB_Manual_Tag.btw";
         });
    }
    catch(err:any) {
      alert(err.error);
    }
  }
  
  async printdata()
  {
    this.isPrintingCompleted=false;
    this.isPrintingStarted=false;
    if(this.var1=="")
    {
      alert("Please enter value");
    }
    else if(this.selectPrinterName=="")
    {
      alert("Please select printername")
    }
    this.var2="xyz";
    this.var1=this.var1.toString();
    this.selectTemplateName="lib://CABMANUAL_PROD_WEB/CAB_Manual_Tag.btw";
    if(this.var1.includes('#'))
    {
    this.ishash="yes";  
    this.var1=this.var1.replace('#','@');
    }
    this.isPrintingStarted=true;
    const data = await this.service.PrintCabManual(this.var1,this.var2,this.selectPrinterName,this.selectTemplateName,this.ishash).toPromise();
    this.var2=data;
    this.isPrintingCompleted=true;
    alert(this.var2);
    this.IsDownload=false;
    // this.dataService.downloadPDF(url).subscribe(res => {
    //   const fileURL = URL.createObjectURL(res);
    //   window.open(fileURL, '_blank');
    // });
  }
}
