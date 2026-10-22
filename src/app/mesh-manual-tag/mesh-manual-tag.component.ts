import { Component, OnInit } from '@angular/core';
import { PrintersName, GetPDFFile } from '../services/cabmodel.model';
import { ServicesService } from '../services/services.service';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mesh-manual-tag',
  templateUrl: './mesh-manual-tag.component.html',
  styleUrls: ['./mesh-manual-tag.component.css'],
})
export class MeshManualTagComponent implements OnInit {
  constructor(public service:ServicesService,
    private router: ActivatedRoute,
    private appcomp :AppComponent
    ) {

      this.router.queryParams.subscribe((queryParam:any) =>
      {
        this.user = queryParam.user
      });
    }

    
    user:any;
  IsDownload: boolean = true;
  IsDisabled: boolean = false;
  IsPrintingStarted: boolean =true;
  IsPrintingFailed: boolean= true;
  IsPrintingCompleted: boolean= true;
  IsWait: boolean=true;
  pname1: any = PrintersName.PDF;
  pname2: any = PrintersName.printnm;
  pname3: any=  PrintersName.ZebraPrinter;
  selectPrinterName: any = '';
  var1: string = "";
  var2: string ="";
  SoNumber: string = '';
  ItemNumber: string = '';
  getfile = GetPDFFile.valueSampleMeshmanual;
  updatedSoNumber: any = '';
  updatedProjectName: any = '';
  updateCustomerName: any = '';
  updatedProduct: any = '';
  updatedQty: any = '';
  updatedSize: any = '';
  updatedPO: any = '';
  updatedConfirmdate: any = '';
  selectTemplateName: any="";
  GetLibrarian:any;
  sodetails: any;
  result:any;
  UserDetails:any;
  Value:any;
  Username:string;
  url:string;
  splitURL:string;

  
  //public row: Array<{ SoNumber: string, CustomerName: string, ProjectName: string, Product: string, Qty: string, Size: string, PO: string ,ConfirmDate: any, editFieldName: any}> = [];
  public rowsPrecutSample: Array<{
    SoNumber: string;
    CustomerName: string;
    ProjectName: string;
    Product: string;
    Qty: string;
    Size: string;
    PO: string;
    ConfirmDate: any;
    editFieldName: any;
  }> = [];
  ngOnInit(): void {

    this.GetUserDetails(this.user);
    this.url = window.location.href;
    this.splitURL = "samplemesh" ; //this.url.split("/", 10)[5].trim().split("?", 5)[0].trim();
    this.appcomp.GetUserDetails(this.user,this.splitURL);

    this.getfile = GetPDFFile.valueSampleMeshmanual;
    this.GetLibrarianFile();
    
    

  }

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


  GetLibrarianFile(){
    try{
      this.service.GetLibrarianFileSampleMesh().subscribe(data => {
         this.GetLibrarian = data;
         this.selectTemplateName="lib://SampleMesh_PROD_WEB/SampleMeshManualTag.btw";
         });
    }
    catch(err:any) {
      alert(err.error);
    }
  }
  
  printdata() {

    this.IsDisabled=true;
    this.IsPrintingStarted=false;
    this.IsDownload=true;
    this.IsDisabled=true;
    this.IsPrintingFailed=true;
    this.IsPrintingCompleted=true;
    
    this.service.PrintMeshManualTag(this.var1,this.var2,this.selectTemplateName,this.selectPrinterName).subscribe(data => {
      this.result = data;
      alert(data);
      if(this.result=="Printed Successfully.")
      {
         this.IsDownload=false;
         this.IsDisabled=false;
         this.IsPrintingStarted=true;
         this.IsPrintingFailed=true;
         this.IsPrintingCompleted=false;
      }
      else
      {
        this.IsDownload=true;
        this.IsDisabled=false;
        this.IsPrintingStarted=true;
        this.IsPrintingFailed=false;
        this.IsPrintingCompleted=true;
      }
      });
  
  }

  edit(row: any, field: any) {
    row.editFieldName = field;
  }

  updateCustomer(row: any, field: any) {
    row.CustomerName = field;
    row.editFieldName = '';
  }

  Cancel(row: any) {
    row.editFieldName = '';
  }

  updatedQuantity(row: any, field: any) {
    row.Qty = field;
    row.editFieldName = '';
  }
  updatededSize(row1: any, field: any) {
    row1.Size = field;
    row1.editFieldName = '';
  }

  updatepo(row1: any, field: any) {
    row1.PO = field;
    row1.editFieldName = '';
  }

  updateConfirmdate(row1: any, field: any) {
    row1.ConfirmDate = field;
    row1.editFieldName = '';
  }

  updateProduct(row1: any, field: any) {
    row1.Product = field;
    row1.editFieldName = '';
  }

  updateProjectName(row1: any, field: any) {
    row1.ProjectName = field;
    row1.editFieldName = '';
  }

  updateSoNumber(row1: any, field: any) {
    row1.SoNumber = field;
    row1.editFieldName = '';
  }

  deleteprecutsample(i: number) {
    this.rowsPrecutSample.splice(i, 1);
  }

  Submit()
  {
    this.IsPrintingStarted=true;
    this.IsDownload=true;
    //this.IsDisabled=true;
    this.IsPrintingFailed=true;
    this.IsPrintingCompleted=true;
    
    if(this.var1!="")
    {
    if(this.var1.trim().length<10)
    {
      alert("Please Enter Valid SO Number");
      return;
    }
   }
   else{
     alert("Please enter SO Number");
     return;
   }
   if(this.selectPrinterName=="")
   {
     alert("Please select Printername");
     return;
   }
   else
   {
     if(this.selectTemplateName=="")
     {
      alert("Please select TemplateFile");
      return;
     }
   }

   this.IsWait=false;
   this.service.getSODetails(this.var1,this.var2).subscribe(data => {
    if(data=="Record not exist")
    {
      this.sodetails=null;
       alert(data);  
    }
    else
    {
      this.sodetails = data;
    }
    this.IsWait=true;
    });

   


  }
}
