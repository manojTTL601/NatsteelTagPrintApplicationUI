import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../services/services.service';
import { NoOfTags, LoadxmlMesh, MalasiyaSirim, MalasiyaPrecut,MalasiyaPrecutsample,PrintersName, totaltags, MeshProduct, PrinterName } from './../services/cabmodel.model';
import { NgxSpinnerService } from "ngx-spinner"; 
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-samplemeshtaggeneration',
  templateUrl: './samplemeshtaggeneration.component.html',
  styleUrls: ['./samplemeshtaggeneration.component.css']
})
export class SamplemeshtaggenerationComponent implements OnInit {
  ItemsArray: any[] = [];
  public selectproductmesh: string;
  public selectnewproductemesh: string;
  public selecttypemesh: string;
  public selectGrademesh: string;
  public selectHeatmesh: string;
  public selectnewGrademesh: string;
  public selectbatchnoMesh: string;
  public SelectedUnitWtmesh: string;
  public selectedQtySizeMesh: string;
  public SelectedRemarkMesh: string;
  public selectedDOMMesh: string;
  //public selectHeatmesh: string;
  public selectedtNoofTagMesh: string;
  public product: string;
  public grade: string;
  public type: string;
  public batchno: string;
  public tagTypeValidation: string;
  public appendQtySize: string;
  //public selectHeatmesh:string;
  //precut
  public selecteddelivery: string;
  public selectedproduct: string;
  public selectedcustpo: string;
  public selectedqtysize: string;
  public selectednooftag: string;
  public selectedtype: string;
  public productprecut: string;
  public deliverto: string;
  public ordertype: string;
  public sampleproduct: string;

  //sample mesh
  public sampleselectedproduct: string;
  public sampleselectnewproduct: string;
  public sampleselecteddelivery: string;
  public selectnewdeliverylocationsample: string;
  toggledeliverylocsample: boolean= true;
  public selectnewsampleselectedOrderType: string;
  public sampleselectedOrderType: string;
  public sampleselectednooftag: string;
  public sampleselectedremarkprecut: string;
  public selectedqtysizesample: string;

  public reqdate: string;


  selectedEurocode: string;


  public selectedremarkprecut: string;

  public objLoadxmlMesh: LoadxmlMesh[];

  public objMalasiyaSirim: MalasiyaSirim[] = [];

  public objMalasiyaPrecut: MalasiyaPrecut[]=[];

  public objMalasiyaPrecutsample: MalasiyaPrecutsample[]=[];

  public totaltag: totaltags[] = [];


  public rows: Array<{ selectproductmesh: string, selectedQtySizeMesh: string, selectGrademesh: string, selecttypemesh: string, SelectedUnitWtmesh: string, selectedDOMMesh: string, SelectedRemarkMesh: string, selectbatchnoMesh: string, selectHeatmesh: string, selectedtNoofTagMesh: string, editFieldNamemesh:any }> = [];

  public rowsupdated: Array<{ selectproductmesh: string, selectedQtySizeMesh: string, selectGrademesh: string, selecttypemesh: string, SelectedUnitWtmesh: string, selectedDOMMesh: string, SelectedRemarkMesh: string, selectbatchnoMesh: string, selectHeatmesh: string, selectedtNoofTagMesh: string }> = [];
 
  public rowsPrecut: Array<{ product: string, qtysize: string, deliverto: string, acrscert: string, remark: string, custpo: string, noOfTag: string ,editFieldName: any}> = [];

  public rowsPrecutSample: Array<{ product: string, qtysize: string, ordertype: string, eurocode: string, remark: string, reqdate: string, noOfTag: string ,editFieldName: any}> = [];

  selectedtaggenerationtype: string;
  selectRunnumber: any;
  selectedTagType: string;
  selectedtagtype: string;
  //selectedproduct: any;
  //selectedtype: any;
  selectnewproduct: any;
  selectnewtype: any;
  //selectedqtysize: any;
  //selectedcustpo: any;
  selecteremark: any;
  //selectednooftag: any;
  selectacrscert: any;
  selectTemplateMesh: any;
  selectTemplatePrecut: any;
  selectedtPrinterPrecut: any;
  selectedtPrinterMesh: any;
  selectNewBatchNo: any;
  selectbatchno: any;
  selectnewgrademesh: any;
  GetLib: any;
  // selecteddelivery: any;
  selectnewGrade: any;
  selectnewTypemesh: any;
  MeshTemplateValue: any;
  MeshFormHide: false;
  PrecutFormHide: false;
  selectedGrade: any;
  i: number;
  isloading:boolean=false;
  counter: number;
  printcounter :number;
  selectPrinterName: any;
  PrecutTemplateValue: any;
  selectTemplateMesh2: any;
  toggleTemplate1: boolean = false;
  toggleTemplate2: boolean = false;
  PrinterName: any;
  isDisable: boolean = false;
  NoofTags: any;
  optionValue: any;
  selectedTaggenrationType: any;
  ProductPrecut: any;
  ProductMesh: any;
  sampleproductmesh: any;
  sampleordertype: any;
  TypeMesh: any;
  loadxml: any;
  tagtypeid: any;
  precuttagtypeid: any;
  GradeMesh: any;
  unitweight: any;
  BatchMesh: any;
  spinnerName: string;
  spinnerType: string;
  toggletagtype: boolean=false;
  //GetLibrarian:any;
  selectTemplateName: any;
  DeliverToPrecut: any;
  selectnewdeliverylocation: any;
  MeshTemplateDisable: boolean = false;
  display = true
  displayprecut = true
  isMeshVisible: boolean = false
  isPrecutVisible: boolean = false
  isPrintingStarted: boolean= false;
  isPrintingCompleted: boolean=false;
  isSampleMeshVisible: boolean=false
  toggleButtonProduct: boolean = true
  toggleButtonGrade: boolean = true
  toggleButtonType: boolean = true
  toggleButtonBatch: boolean = true
  togglebuttonproductsample: boolean= true;
  isHeatNo: boolean = false
  togglebuttonproductprecut: boolean = true
  toggledeliveryloc: boolean = true
  updatedProduct: any;
  updatedQtySize : any;
  updatedRemark: any;
  updatedCustPo: any;
  updatedNoofTag: any;
  updatedDeliveryloc: any;
  updatedACRSCert : any;
  updatedproduct: any;
  updatedqtysize:any;
  updateddeliverto:any;
  updatedacrs:any;
  updatedremark:any;
  updatedcustpo:any;
  updatednooftag:any;
  appendqtysizemesh:any;

  //my var

  //array: [];
  array: any[] = [];


  pnm:string;
  PDF:string;
  mptp: string="Microsoft Print to PDF";
  url:string;
  splitURL:string;
  user:any;

  constructor(public service: ServicesService,
    private SpinnerService: NgxSpinnerService,
    private router: ActivatedRoute, 
    private appcomp :AppComponent) {
     this.router.queryParams.subscribe((queryParam:any) =>
     {
       this.user = queryParam.user
     });
    }

  ngOnInit(): void {
    this.GetUserDetails(this.user);
    this.url = window.location.href;
    this.splitURL = "Sample Mesh"; // this.url.split("/", 10)[5].trim().split("?", 5)[0].trim();
    this.appcomp.GetUserDetails(this.user,this.splitURL);
    // //
    this.PDF = PrintersName.PDF;
    this.pnm = PrintersName.printnm;
    this.emptyall();
    this.GetPrinterName();
    this.NoOfTags();
    this.loadtotaltags();
    this.counter=0;
    this.printcounter=0;
    //this.GetLibrarian();

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

  //added
  loadtotaltags() {
    for (let i = 1; i <= 500; i++) {
      this.totaltag.push({ Value: i })
    }

  }

  emptyall() {
    this.selectproductmesh = "";
    this.selectedQtySizeMesh = "";
    this.selectGrademesh = "";
    this.selecttypemesh = "";
    this.SelectedUnitWtmesh = "";
    this.selectedDOMMesh = "";
    this.SelectedRemarkMesh = "";
    this.selectbatchnoMesh = "";
    this.selectHeatmesh = "";
    this.selectedtype="";
    this.selectednooftag="";
    this.selectedremarkprecut="";
    this.selectedqtysize="";
    this.selectedcustpo="";
    this.selecteddelivery="";
    this.selectedproduct="";
    this.selectnewproduct="";
    this.selectnewdeliverylocation="";
    this.selectnewproductemesh="";
    this.selectnewTypemesh="";
    this.selectnewGrademesh="";
    this.selectNewBatchNo="";


  }

  buttonClicked(product: string, grade: string, type: string, batchno: string) {

    this.product = product;
    this.grade = grade;
    this.type = type;
    this.batchno = batchno;

    this.rows.push({ selectproductmesh: this.product, selectedQtySizeMesh: this.selectedQtySizeMesh, selectGrademesh: this.grade, selecttypemesh: this.type, SelectedUnitWtmesh: this.SelectedUnitWtmesh, selectedDOMMesh: this.selectedDOMMesh, SelectedRemarkMesh: this.SelectedRemarkMesh, selectbatchnoMesh: this.batchno, selectHeatmesh: this.selectHeatmesh, selectedtNoofTagMesh: this.selectedtNoofTagMesh, editFieldNamemesh:"" });
  }

  buttonClickedPrecut(product: string, deliverto: string) {
    this.productprecut = product;
    this.deliverto = deliverto;
    this.rowsPrecut.push({ product: this.productprecut, qtysize: this.selectedqtysize, deliverto: this.deliverto, acrscert: this.selectedtype, remark: this.selectedremarkprecut, custpo: this.selectedcustpo, noOfTag: this.selectednooftag, editFieldName:"" });
    //Array<{ product: string, qtysize: string, deliverto: string, acrscert: string, remark: string, custpo: string, noOfTag: string, tagNumber: string}> = [];
  }
  //added

  buttonClickedPrecutSample(product: string, ordertype: string) {
    this.sampleproduct = product;
    this.ordertype = ordertype;
    this.rowsPrecutSample.push({ product: this.sampleproduct, qtysize: this.selectedqtysizesample, ordertype: this.ordertype, eurocode: this.selectedEurocode, remark: this.sampleselectedremarkprecut, reqdate: this.reqdate, noOfTag: this.sampleselectednooftag, editFieldName:"" });
    //Array<{ product: string, qtysize: string, deliverto: string, acrscert: string, remark: string, custpo: string, noOfTag: string, tagNumber: string}> = [];
  }
  
  //librarian file
  GetLibrarian() {
    try {
      this.service.GetLibrarianExport().subscribe(data => {
        this.GetLib = data;
        //this.selectTemplateName="Select Template File";
      });
    }
    catch (err: any) {
      alert(err.error);
    }
  }
  //end librarian file


  // public data: { [key: string]: Object }[] = [ { Id: '1', Game: 'Malasiya Sirim Mesh Tag' },
  //            { Id: 2, Game: 'Malasiya Sirim Precut Wires Tag'}];

  LoadToxmlPrecutSample() {

    try{
      if(this.selectedqtysizesample != "" && this.sampleselectednooftag != "" && this.selectedEurocode != "")
      {
        if (this.sampleselectnewproduct != "" || this.selectnewsampleselectedOrderType != "") {
          this.service.LoadToxmlPrecutSample(this.sampleselectnewproduct.toString(), this.selectnewsampleselectedOrderType.toString()).subscribe(data => {
            //this.loadxml = data;
            //alert(data);
            this.sampleselectedproduct = "";
            this.sampleselectedOrderType = "";
            this.sampleselectnewproduct="";
            this.selectnewsampleselectedOrderType="";
            this.GetSampleProduct();
            this.GetOrderType();
    
          });
      }
   }
   else
   {
     alert("Please fill all the required fields. * indicates required field.");
     return;
   }

   let splitcount= this.selectedqtysizesample.split("*").length;

   for(let i=0; i< splitcount;i++)
   {
    this.appendqtysizemesh=this.selectedqtysizesample.replace("*", "x");
    this.selectedqtysizesample = this.appendqtysizemesh;
   }

      if ((this.sampleselectedproduct != "" || this.sampleselectnewproduct != "") && (this.sampleselectedOrderType != "" || this.selectnewsampleselectedOrderType != "") && this.selectedqtysizesample != "" && this.sampleselectednooftag != "" && this.selectedEurocode != "") {
        if (this.sampleselectnewproduct == "" && this.selectnewsampleselectedOrderType == "") {
          this.buttonClickedPrecutSample(this.sampleselectedproduct, this.sampleselectedOrderType);
          this.reset();
        }
        else if(this.sampleselectnewproduct == "" && this.selectnewsampleselectedOrderType != "")
        {
          this.buttonClickedPrecutSample(this.sampleselectedproduct, this.selectnewsampleselectedOrderType);
          this.reset();
        }
        else if(this.sampleselectnewproduct != "" && this.selectnewsampleselectedOrderType == "")
        {
          this.buttonClickedPrecutSample(this.sampleselectnewproduct, this.sampleselectedOrderType);
          this.reset();
        }
        else if(this.sampleselectnewproduct != "" && this.selectnewsampleselectedOrderType != "")
        {
          this.buttonClickedPrecutSample(this.sampleselectnewproduct, this.selectnewsampleselectedOrderType);
          this.reset();
        }
      }
      else {
        alert("Please fill required fields. * indicates required field.");
        return;
      }
  
    }
    catch(err:any)
    {
      alert(err.error);
    }
    


  }


  LoadToxmlPrecut() {

    try{
      if(this.selectedqtysize != "" && this.selectednooftag != "" && this.selectedtype != "")
      {
        if (this.selectnewproduct != "" || this.selectnewdeliverylocation != "") {
          this.service.LoadToxmlPrecut(this.selectnewproduct.toString(), this.selectnewdeliverylocation.toString()).subscribe(data => {
            //this.loadxml = data;
            //alert(data);
            this.selectedproduct = "";
            this.selecteddelivery = "";
            this.selectnewproduct="";
            this.selectnewdeliverylocation="";
            this.GetProductPrecut();
            this.GetDeliverToPrecut();
    
          });
      }
   }
   else
   {
     alert("Please fill all the required fields. * indicates required field.");
     return;
   }

   let splitcount= this.selectedqtysize.split("*").length;

   for(let i=0; i< splitcount;i++)
   {
    this.appendqtysizemesh=this.selectedqtysize.replace("*", "x");
    this.selectedqtysize = this.appendqtysizemesh;
   }

   
  
      if ((this.selectedproduct != "" || this.selectnewproduct != "") && (this.selecteddelivery != "" || this.selectnewdeliverylocation != "") && this.selectedqtysize != "" && this.selectednooftag != "" && this.selectedtype != "") {
        if (this.selectnewproduct == "" && this.selectnewdeliverylocation == "") {
          this.buttonClickedPrecut(this.selectedproduct, this.selecteddelivery);
          this.reset();
        }
        else if(this.selectnewproduct == "" && this.selectnewdeliverylocation != "")
        {
          this.buttonClickedPrecut(this.selectedproduct, this.selectnewdeliverylocation);
          this.reset();
        }
        else if(this.selectnewproduct != "" && this.selectnewdeliverylocation == "")
        {
          this.buttonClickedPrecut(this.selectnewproduct, this.selecteddelivery);
          this.reset();
        }
        else if(this.selectnewproduct != "" && this.selectnewdeliverylocation != "")
        {
          this.buttonClickedPrecut(this.selectnewproduct, this.selectnewdeliverylocation);
          this.reset();
        }
      }
      else {
        alert("Please fill required fields. * indicates required field.");
        return;
      }
  
    }
    catch(err:any)
    {
      alert(err.error);
    }
    


  }




  LoadToxml(tagtypeid2: any) {
    this.tagtypeid = tagtypeid2
    try {

      if (this.tagtypeid == "3") {
        alert("Please Select Tag Type");
        return;
      }
      else if (this.selectnewGrademesh != "" || this.selectNewBatchNo != "" || this.selectnewTypemesh != "" || this.selectnewproductemesh != "") {

        if (this.tagtypeid == "1") {

        }
        else {
          this.selectHeatmesh = "";
        }
        this.service.LoadToXml(this.selectnewproductemesh.toString(), this.selectnewGrademesh.toString(), this.selectnewTypemesh.toString(), this.selectNewBatchNo.toString()).subscribe(data => {
          this.loadxml = data;
          //alert(data);
          this.selectnewGrademesh = "";
          this.selectNewBatchNo = "";
          this.selectnewTypemesh = "";
          this.selectnewproductemesh = "";
          this.GetProduct();
          this.GetBatch();
          this.GetGrade();
          this.GetType();
          //this.GetLibrarian();

        });

      }

      let splitcount= this.selectedQtySizeMesh.split("*").length;
      for(let i=0; i<splitcount;i++)
      {
        this.appendQtySize = this.selectedQtySizeMesh.replace("*", "x");
        this.selectedQtySizeMesh = this.appendQtySize;
      }
      
      if (this.rows.length == 0) {
        if ((this.selectproductmesh != "" || this.selectnewproductemesh != "") && this.selectedQtySizeMesh != "" && this.selectedtNoofTagMesh != "") {
          if (this.selectnewproductemesh == "" && this.selectnewGrademesh == "" && this.selectnewTypemesh == "" && this.selectNewBatchNo == "") {
            this.buttonClicked(this.selectproductmesh, this.selectGrademesh, this.selecttypemesh, this.selectbatchnoMesh);
            this.reset();
          }
          else if (this.selectnewproductemesh == "" && this.selectnewGrademesh == "" && this.selectnewTypemesh == "" && this.selectNewBatchNo != "") {
            this.buttonClicked(this.selectproductmesh, this.selectGrademesh, this.selecttypemesh, this.selectNewBatchNo);
            this.reset();
          }
          else if (this.selectnewproductemesh == "" && this.selectnewGrademesh == "" && this.selectnewTypemesh != "" && this.selectNewBatchNo != "") {
            this.buttonClicked(this.selectproductmesh, this.selectGrademesh, this.selectnewTypemesh, this.selectNewBatchNo);
            this.reset();
          }
          else if (this.selectnewproductemesh == "" && this.selectnewGrademesh != "" && this.selectnewTypemesh != "" && this.selectNewBatchNo != "") {
            this.buttonClicked(this.selectproductmesh, this.selectnewGrademesh, this.selectnewTypemesh, this.selectNewBatchNo);
            this.reset();
          }
          else if (this.selectnewproductemesh != "" && this.selectnewGrademesh != "" && this.selectnewTypemesh != "" && this.selectNewBatchNo != "") {
            this.buttonClicked(this.selectnewproductemesh, this.selectnewGrademesh, this.selectnewTypemesh, this.selectNewBatchNo);
            this.reset();
          }
          else if (this.selectnewproductemesh == "" && this.selectnewGrademesh != "" && this.selectnewTypemesh == "" && this.selectNewBatchNo != "") {
            this.buttonClicked(this.selectproductmesh, this.selectnewGrademesh, this.selecttypemesh, this.selectNewBatchNo);
            this.reset();
          }
          else if (this.selectnewproductemesh == "" && this.selectnewGrademesh != "" && this.selectnewTypemesh != "" && this.selectNewBatchNo == "") {
            this.buttonClicked(this.selectproductmesh, this.selectnewGrademesh, this.selectnewTypemesh, this.selectbatchnoMesh);
            this.reset();
          }
          else if (this.selectnewproductemesh != "" && this.selectnewGrademesh != "" && this.selectnewTypemesh == "" && this.selectNewBatchNo == "") {
            this.buttonClicked(this.selectnewproductemesh, this.selectnewGrademesh, this.selecttypemesh, this.selectbatchnoMesh);
            this.reset();
          }
          else if (this.selectnewproductemesh != "" && this.selectnewGrademesh == "" && this.selectnewTypemesh == "" && this.selectNewBatchNo != "") {
            this.buttonClicked(this.selectnewproductemesh, this.selectGrademesh, this.selecttypemesh, this.selectNewBatchNo);
            this.reset();
          }
          else if (this.selectnewproductemesh != "" && this.selectnewGrademesh == "" && this.selectnewTypemesh != "" && this.selectNewBatchNo == "") {
            this.buttonClicked(this.selectnewproductemesh, this.selectGrademesh, this.selectnewTypemesh, this.selectbatchnoMesh);
            this.reset();
          }
          else if (this.selectnewproductemesh != "" && this.selectnewGrademesh != "" && this.selectnewTypemesh == "" && this.selectNewBatchNo == "") {
            this.buttonClicked(this.selectnewproductemesh, this.selectnewGrademesh, this.selecttypemesh, this.selectbatchnoMesh);
            this.reset();
          }
          else if (this.selectnewproductemesh != "" && this.selectnewGrademesh == "" && this.selectnewTypemesh == "" && this.selectNewBatchNo == "") {
            this.buttonClicked(this.selectnewproductemesh, this.selectGrademesh, this.selecttypemesh, this.selectbatchnoMesh);
            this.reset();
          }
          else if (this.selectnewproductemesh == "" && this.selectnewGrademesh != "" && this.selectnewTypemesh == "" && this.selectNewBatchNo == "") {
            this.buttonClicked(this.selectproductmesh, this.selectnewGrademesh, this.selecttypemesh, this.selectbatchnoMesh);
            this.reset();
          }
          else if (this.selectnewproductemesh == "" && this.selectnewGrademesh == "" && this.selectnewTypemesh != "" && this.selectNewBatchNo == "") {
            this.buttonClicked(this.selectproductmesh, this.selectGrademesh, this.selectnewTypemesh, this.selectbatchnoMesh);
            this.reset();
          }

          this.tagTypeValidation = this.tagtypeid;

        }
        else {
          alert("Please select required fileds. * indicates required field.");
          return;
        }

      }
      else {
        if (this.tagTypeValidation == this.tagtypeid) {
          if ((this.selectproductmesh != "" || this.selectnewproductemesh != "") && this.selectedQtySizeMesh != "" && this.selectedtNoofTagMesh != "") {
            if (this.selectnewproductemesh == "" && this.selectnewGrademesh == "" && this.selectnewTypemesh == "" && this.selectNewBatchNo == "") {
              this.buttonClicked(this.selectproductmesh, this.selectGrademesh, this.selecttypemesh, this.selectbatchnoMesh);
              this.reset();
            }
            else if (this.selectnewproductemesh == "" && this.selectnewGrademesh == "" && this.selectnewTypemesh == "" && this.selectNewBatchNo != "") {
              this.buttonClicked(this.selectproductmesh, this.selectGrademesh, this.selecttypemesh, this.selectNewBatchNo);
              this.reset();
            }
            else if (this.selectnewproductemesh == "" && this.selectnewGrademesh == "" && this.selectnewTypemesh != "" && this.selectNewBatchNo != "") {
              this.buttonClicked(this.selectproductmesh, this.selectGrademesh, this.selectnewTypemesh, this.selectNewBatchNo);
              this.reset();
            }
            else if (this.selectnewproductemesh == "" && this.selectnewGrademesh != "" && this.selectnewTypemesh != "" && this.selectNewBatchNo != "") {
              this.buttonClicked(this.selectproductmesh, this.selectnewGrademesh, this.selectnewTypemesh, this.selectNewBatchNo);
              this.reset();
            }
            else if (this.selectnewproductemesh != "" && this.selectnewGrademesh != "" && this.selectnewTypemesh != "" && this.selectNewBatchNo != "") {
              this.buttonClicked(this.selectnewproductemesh, this.selectnewGrademesh, this.selectnewTypemesh, this.selectNewBatchNo);
              this.reset();
            }
            else if (this.selectnewproductemesh == "" && this.selectnewGrademesh != "" && this.selectnewTypemesh == "" && this.selectNewBatchNo != "") {
              this.buttonClicked(this.selectproductmesh, this.selectnewGrademesh, this.selecttypemesh, this.selectNewBatchNo);
              this.reset();
            }
            else if (this.selectnewproductemesh == "" && this.selectnewGrademesh != "" && this.selectnewTypemesh != "" && this.selectNewBatchNo == "") {
              this.buttonClicked(this.selectproductmesh, this.selectnewGrademesh, this.selectnewTypemesh, this.selectbatchnoMesh);
              this.reset();
            }
            else if (this.selectnewproductemesh != "" && this.selectnewGrademesh != "" && this.selectnewTypemesh == "" && this.selectNewBatchNo == "") {
              this.buttonClicked(this.selectnewproductemesh, this.selectnewGrademesh, this.selecttypemesh, this.selectbatchnoMesh);
              this.reset();
            }
            else if (this.selectnewproductemesh != "" && this.selectnewGrademesh == "" && this.selectnewTypemesh == "" && this.selectNewBatchNo != "") {
              this.buttonClicked(this.selectnewproductemesh, this.selectGrademesh, this.selecttypemesh, this.selectNewBatchNo);
              this.reset();
            }
            else if (this.selectnewproductemesh != "" && this.selectnewGrademesh == "" && this.selectnewTypemesh != "" && this.selectNewBatchNo == "") {
              this.buttonClicked(this.selectnewproductemesh, this.selectGrademesh, this.selectnewTypemesh, this.selectbatchnoMesh);
              this.reset();
            }
            else if (this.selectnewproductemesh != "" && this.selectnewGrademesh != "" && this.selectnewTypemesh == "" && this.selectNewBatchNo == "") {
              this.buttonClicked(this.selectnewproductemesh, this.selectnewGrademesh, this.selecttypemesh, this.selectbatchnoMesh);
              this.reset();
            }
            else if (this.selectnewproductemesh != "" && this.selectnewGrademesh == "" && this.selectnewTypemesh == "" && this.selectNewBatchNo == "") {
              this.buttonClicked(this.selectnewproductemesh, this.selectGrademesh, this.selecttypemesh, this.selectbatchnoMesh);
              this.reset();
            }
            else if (this.selectnewproductemesh == "" && this.selectnewGrademesh != "" && this.selectnewTypemesh == "" && this.selectNewBatchNo == "") {
              this.buttonClicked(this.selectproductmesh, this.selectnewGrademesh, this.selecttypemesh, this.selectbatchnoMesh);
              this.reset();
            }
            else if (this.selectnewproductemesh == "" && this.selectnewGrademesh == "" && this.selectnewTypemesh != "" && this.selectNewBatchNo == "") {
              this.buttonClicked(this.selectproductmesh, this.selectGrademesh, this.selectnewTypemesh, this.selectbatchnoMesh);
              this.reset();
            }

            //this.tagTypeValidation=this.tagtypeid;

          }
          else {
            alert("Please select required fileds. * indicates required field.");
            return;
          }
        }
        else {
          alert("Please select same tag type that you have selected before.")
          return;
        }
      }

    }
    catch (err: any) {
      alert(err.error);
    }
    finally {
        if(this.rows.length!=0)
        {
          this.toggletagtype=true;
        }
        else
        {
          this.toggletagtype=false;
        }
    }

  }


  //update table
  edit(row: any, field: any)
  {
    // this.rowsPrecut.forEach(element => {
    //   element.isEdit=false;
    // })

     row.editFieldName= field;
  }

  editmesh(rows: any, field: any)
  {
    rows.editFieldNamemesh=field;
  }

  Cancel(row: any)
  {
    row.editFieldName='';
  }


  CancelMesh(row: any)
  {
    row.editFieldNamemesh='';
  }

  updatemesh(row:any,field:any, identifiermesh: any)
  { 
    if(identifiermesh=='selectproductmesh')
    {
      row.selectproductmesh=field;
      row.editFieldNamemesh='';
    }
    else if(identifiermesh=='selectedQtySizeMesh')
    {
      row.selectedQtySizeMesh=field;
      row.editFieldNamemesh='';
    }
    else if(identifiermesh=='selectGrademesh')
    {
      row.selectGrademesh=field;
      row.editFieldNamemesh='';
    }
    else if(identifiermesh=='selecttypemesh')
    {
      row.selecttypemesh=field;
      row.editFieldNamemesh='';
    }
    else if(identifiermesh=='SelectedUnitWtmesh')
    {
      row.SelectedUnitWtmesh=field;
      row.editFieldNamemesh='';
    }
    else if(identifiermesh=='selectedDOMMesh')
    {
      row.selectedDOMMesh=field;
      row.editFieldNamemesh='';
    }
    else if(identifiermesh=='SelectedRemarkMesh')
    {
      row.SelectedRemarkMesh=field;
      row.editFieldNamemesh='';
    }
    else if(identifiermesh=='selectbatchnoMesh')
    {
      row.selectbatchnoMesh=field;
      row.editFieldNamemesh='';
    }
    else if(identifiermesh=='selectedtNoofTagMesh')
    {
      row.selectedtNoofTagMesh=field;
      row.editFieldNamemesh='';
    }
    
  }


  update(row:any,field:any)
  { 
    row.product=field;
    row.editFieldName='';
  }

  updateqtysize(row:any,field:any)
  { 
    row.qtysize=field;
    row.editFieldName='';
  }

  updatedeliverto(row:any,field:any)
  { 
    row.ordertype=field;
      row.editFieldName='';
  }
  updatedremarks(row:any,field:any)
  { 
    row.remark=field;
    row.editFieldName='';
  }
  updatedacrscert(row:any,field:any)
  { 
    row.eurocode=field;
    row.editFieldName='';
  }
  updatedacustpo(row1:any,field:any)
  { 
    row1.reqdate=field;
      row1.editFieldName='';
  }
  updatedanooftag(row2:any,field:any)
  { 
    row2.noOfTag=field;
    row2.editFieldName='';
  }
  
  LoadToTable() {

    this.ItemsArray = [this.selectproductmesh, this.selectedQtySizeMesh, this.selectnewGrademesh, this.selecttypemesh, this.SelectedUnitWtmesh, this.selectedDOMMesh, this.SelectedRemarkMesh, this.selectbatchnoMesh, this.selectHeatmesh, this.selectedtNoofTagMesh];
    console.log(this.ItemsArray);
    this.abc();
  }

  abc() {
    debugger
    this.array = [];
    this.ItemsArray.forEach((element: any) => {
      this.array.push(element);
      console.log(this.array);
    });
    this.reset();
  }


  reset() {
    //mesh
    this.selectGrademesh = "";
    this.selectnewGrademesh = "";
    this.selectNewBatchNo = "";
    this.selectedDOMMesh = "";
    this.selectproductmesh = "";
    this.selectnewproductemesh = "";
    this.selecttypemesh = "";
    this.selectnewTypemesh = "";
    this.selectedQtySizeMesh = "";
    this.selectbatchnoMesh = "";
    this.selectedtNoofTagMesh = "";
    this.selectHeatmesh = "";
    this.SelectedRemarkMesh = "";
    this.SelectedUnitWtmesh = "";
    //precut
    this.selectedproduct = "";
    this.selecteddelivery = "";
    this.selectedcustpo = "";
    this.selectedqtysize = "";
    this.selectedremarkprecut = "";
    this.selectednooftag = "";
    this.selectedtype = "";

    //sample mesh
    this.sampleselectedproduct = "";
    this.sampleselectedOrderType = "";
    this.selectnewsampleselectedOrderType="";
    this.reqdate = "";
    this.selectedqtysizesample = "";
    this.sampleselectedremarkprecut = "";
    this.sampleselectednooftag = "";
    this.selectedEurocode="";
    //this.selectedtype = "";


  }

  resetall() {
    this.rows.splice(0, this.rows.length);
    this.rowsPrecut.splice(0, this.rowsPrecut.length);

    this.selectGrademesh = "";
    this.selectnewGrademesh = "";
    this.selectNewBatchNo = "";
    this.selectedDOMMesh = "";
    this.selectproductmesh = "";
    this.selectnewproductemesh = "";
    this.selecttypemesh = "";
    this.selectnewTypemesh = "";
    this.selectedQtySizeMesh = "";
    this.selectbatchnoMesh = "";
    this.selectedtNoofTagMesh = "";
    this.selectHeatmesh = "";
    this.SelectedRemarkMesh = "";
    this.SelectedUnitWtmesh = "";
    //this.selectedtPrinterMesh="";
    //this.selectedtPrinterPrecut="";
    this.selectTemplateMesh="";
    this.selectTemplateName="";
  }

  resetprecutform()
  {
    this.rowsPrecut.splice(0, this.rowsPrecut.length);
    this.selectedproduct="";
    this.selecteddelivery="";
    this.selectedcustpo="";
    this.selectedqtysize="";
    this.selectnewproduct="";
    this.selectnewdeliverylocation="";

    this.selectedremarkprecut="";
    this.selectednooftag="";
    this.selectedtype="";
    
  }

  resetprecutsampleform()
  {
    this.rowsPrecutSample.splice(0, this.rowsPrecutSample.length);
    this.sampleselectedproduct = "";
    this.sampleselectedOrderType = "";
    this.reqdate = "";
    this.selectedqtysizesample = "";
    this.sampleselectedremarkprecut = "";
    this.sampleselectednooftag = ""; 
    this.selectedEurocode="";   
  }

  // private abc(): LoadxmlMesh {
  // const a = LoadxmlMesh {
  //   NewBatchNoMesh: this.selectproductmesh.toString();
  // };
  // return a;
  // }


  //for sample mesh

  GetSampleProduct() {
    try {
      this.service.GetSampleProduct().subscribe(data => {
        this.sampleproductmesh = data;
        //this.selectproductmesh = "please select product";
        //  this.selectPrinterName="Select Printer Name";
      });
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  GetOrderType() {
    try {
      this.service.GetOrderType().subscribe(data => {
        this.sampleordertype = data;

        //  this.selectPrinterName="Select Printer Name";
      });
    }
    catch (err: any) {
      alert(err.error);
    }
  }
  //

  GetProduct() {
    try {
      this.service.GetProduct().subscribe(data => {
        this.ProductMesh = data;
        //this.selectproductmesh = "please select product";
        //  this.selectPrinterName="Select Printer Name";
      });
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  GetGrade() {
    try {
      this.service.GetGrade().subscribe(data => {
        this.GradeMesh = data;
        //this.selectGrademesh = "please select grade";
        //  this.selectPrinterName="Select Printer Name";
      });
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  GetType() {
    try {
      this.service.GetType().subscribe(data => {
        this.TypeMesh = data;
        //this.selecttypemesh = "please select type"
        //  this.selectPrinterName="Select Printer Name";
      });
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  GetBatch() {
    try {
      this.service.GetBatch().subscribe(data => {
        this.BatchMesh = data;
        //this.selectbatchnoMesh = "please select batch number"
        //  this.selectPrinterName="Select Printer Name";
      });
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  GetProductPrecut() {
    try {
      this.service.GetProductPrecut().subscribe(data => {
        this.ProductPrecut = data;
        this.selectedproduct = "please select product"
        //  this.selectPrinterName="Select Printer Name";
      });
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  GetDeliverToPrecut() {
    try {
      this.service.GetDeliverToPrecut().subscribe(data => {
        this.DeliverToPrecut = data;

        //  this.selectPrinterName="Select Printer Name";
      });
    }
    catch (err: any) {
      alert(err.error);
    }
  }


  // GetFolder()
  // {
  //  this.service.GetFolder();
  // }

  GetForm(event: any) {
    let valueId = event.target.value
    try {


      if (valueId == "0") {

        this.isMeshVisible = true;
        this.isPrecutVisible = false;
        this.isSampleMeshVisible=false;
        this.toggletagtype=false;
        this.isPrintingCompleted=false;
        this.isPrintingStarted=false;
        this.GetProduct();
        this.GetBatch();
        this.GetGrade();
        this.GetType();
        //this.GetLibrarian();

        this.resetall();
        this.resetprecutform();
        this.resetprecutsampleform();
      }
      else if (valueId == "1") {
        this.isMeshVisible = false;
        this.isPrecutVisible = true;
        this.isSampleMeshVisible=false;
        this.toggletagtype=false;
        this.GetProductPrecut();
        this.GetDeliverToPrecut();
        this.selectnewproduct="";
        this.selectnewdeliverylocation="";
        this.selectedtPrinterPrecut="";
        this.selectTemplatePrecut="";
        this.selectednooftag="";
        this.selectedtype="";
        this.selectedremarkprecut="";
        this.selectedqtysize="";
        this.selectedcustpo="";
        this.selecteddelivery="";
        this.selectedproduct="";
        //this.GetLibrarian();
        this.PrecutTemplateValue = "lib://EXPORT_PROD_WEB/MalasiyaPrecutTag.btw";
        this.isPrintingCompleted=false;
        this.isPrintingStarted=false;
        this.resetall();
        this.resetprecutform();
        this.resetprecutsampleform();
      }
      else if(valueId=="2")
      {
        this.isMeshVisible = false
        this.isPrecutVisible = false 
        this.isSampleMeshVisible=true;
        this.GetOrderType();
        this.GetSampleProduct();
        this.sampleselectnewproduct="";
        this.sampleordertype="";
        this.resetall();
        this.resetprecutform();
        this.resetprecutsampleform();
        this.PrecutTemplateValue = "lib://EXPORT_PROD_WEB/SampleMeshPrecutTag.btw";
        this.isPrintingCompleted=false;
        this.isPrintingStarted=false;
        
      }

    }
    catch (err: any) {
      alert(err.error);
    }
  }

  delete(i: number) {
    try{
      this.rows.splice(i, 1);
    }
    catch(err:any)
    {
      alert(err.error);
    }
    finally{
      if(this.rows.length!=0)
      {
        this.toggletagtype=true;
      }
      else
      {
        this.toggletagtype=false;
      }
    }
    
  }

  deleteprecut(i: number)
  {
     this.rowsPrecut.splice(i, 1);
  }

  deleteprecutsample(i: number)
  {
     this.rowsPrecutSample.splice(i, 1);
  }

  //// Printer Name
  GetPrinterName() {
    try {
      this.service.GetPrinterNameExport().subscribe(data => {
        this.PrinterName = data;
        this.selectPrinterName = "Select Printer Name";
      });
    }
    catch (err: any) {
      alert(err.error);
    }
  }


  enableProduct() {
    this.toggleButtonProduct = false;
    this.selectproductmesh = "";
  }

  enableGrade() {
    this.toggleButtonGrade = false;
    this.selectGrademesh = "";
  }

  enableType() {
    this.toggleButtonType = false;
    this.selecttypemesh = "";
  }

  enableBatch() {
    this.toggleButtonBatch = false;
    this.selectbatchnoMesh = "";
  }

  disableNewProductMesh() {
    this.selectnewproductemesh = "";
    this.toggleButtonProduct = true;
  }
  disableNewGradeMesh() {
    this.selectnewGrademesh = "";
    this.toggleButtonGrade = true;
  }
  disableNewTypeMesh() {
    this.selectnewTypemesh = "";
    this.toggleButtonType = true;
  }
  disableNewBatchMesh() {
    this.selectNewBatchNo = "";
    this.toggleButtonBatch = true;
  }




  GetSubForm(event: any) {
    let valueId = event.target.value
    try {
      
      if (valueId == "0") {

        this.isHeatNo = false;
        this.selectTemplateMesh = "lib://EXPORT_PROD_WEB/MeshTag.btw";
        this.toggleTemplate1 = true;
        this.toggleTemplate2 = false;


      }
      else if (valueId == "1") {
        this.isHeatNo = true;
        this.selectTemplateMesh = "lib://EXPORT_PROD_WEB/PrecutWiresTag.btw";
        this.toggleTemplate2 = true;
        this.toggleTemplate1 = false;


      }
      else if (valueId == "2") {
        this.isHeatNo = true;
        this.selectTemplateMesh = "lib://EXPORT_PROD_WEB/SampleMeshPrecutTag.btw";
        this.toggleTemplate2 = true;
        this.toggleTemplate1 = false;


      }

    }
    catch (err: any) {
      alert(err.error);
    }

  }

  disableNewProduct() {
    this.selectnewproduct="";
    this.togglebuttonproductprecut = true;
  }


  disablesampleNewProduct() {
    this.sampleselectnewproduct="";
    this.togglebuttonproductsample = true;
  }

  disablesampleNewOrderType() {
    this.selectnewsampleselectedOrderType="";
    this.toggledeliverylocsample = true;
  }


  enablenewproductprecut() {
    this.togglebuttonproductprecut = false;
    this.selectedproduct="";
  }

  enablenewproductprecutsample() {
    this.togglebuttonproductsample = false;
    this.sampleselectedproduct="";
  }

  enablenewOrderType() {
    this.toggledeliverylocsample = false;
    this.sampleselectedOrderType="";
  }

  disabledelivery() {
    this.selectnewdeliverylocation="";
    this.toggledeliveryloc = true;
  }

  enabledeliveryloc() {
    this.toggledeliveryloc = false;
    this.selecteddelivery="";
  }

  NoOfTags() {
    let tags = new NoOfTags();
    this.NoofTags = tags.value;
  }
  
  printExport() {
    // this.isloading=true;
    // this.spinnerName="sp1";
    // this.spinnerType="ball-clip-rotate-multiple";
    // this.SpinnerService.show(this.spinnerName);
   
    
    try{
      if(this.counter==0)
      {
        
        for (let i in this.rows) {
          this.objMalasiyaSirim.push({
            product: this.rows[i].selectproductmesh, qtysize: this.rows[i].selectedQtySizeMesh, grade: this.rows[i].selectGrademesh, type: this.rows[i].selecttypemesh, unitWt: this.rows[i].SelectedUnitWtmesh, DOM: this.rows[i].selectedDOMMesh, remark: this.rows[i].SelectedRemarkMesh, batchNo: this.rows[i].selectbatchnoMesh, heatNo: this.rows[i].selectHeatmesh, noOfTag: this.rows[i].selectedtNoofTagMesh, tagNumber: '1', printername: this.selectedtPrinterMesh, templatefile: this.selectTemplateMesh
          });
        }
    
        if (this.rows.length != 0) {
          if (this.selectTemplateMesh != "" && this.selectedtPrinterMesh != "") {
            this.counter=1;
            this.service.printExport(this.objMalasiyaSirim).subscribe(data => {
                if(data!="")
                {
                  this.counter=0;
                  alert(data);
                }
            });
          }
          else {
            alert("please select Required field. * indicates required field.");
            return;
          }
    
          // if (this.selectTemplateMesh != "" && this.selectedtPrinterMesh != "") {
          //   this.service.printExportTag(this.selectedtPrinterMesh, this.selectTemplateMesh).subscribe(data => {
    
    
          //   });
    
          // }
          // else {
    
          // }
    
        }
        else {
          alert("please add some data into the table before print.")
        }
      }
      else{
        alert("Please wait... Printing has already started...")
      }
      
    }
    catch(err: any){
         alert(err.error);
    }
    finally
    {
      for (let i = 0; i < this.rows.length; i++) {
        this.objMalasiyaSirim.pop();
      }
    }
    
    
    //this.objMalasiyaSirim.r

  }

  //row.product , row.qtysize, row.deliverto, row.acrscert, row.remark, row.custpo, row.noOfTag
  editPrecut(i : any, productUpdate: any, qtysizeUpdate: any, delivertoUpdate: any, acrscertUpdate: any, remarkUpdate:any, custpoUpdate:any, noOfTagUpdate: any)
  {
    // this.updatedProduct=productUpdate;
    // this.updatedQtySize=qtysizeUpdate;
    
     
     this.rows.splice(i,1);
     this.rowsPrecut.push({product: productUpdate, qtysize: qtysizeUpdate, deliverto: delivertoUpdate, acrscert: acrscertUpdate, remark: remarkUpdate, custpo: custpoUpdate, noOfTag:noOfTagUpdate, editFieldName:""});
  }

  printexportprecut()
  {

    try{
      if(this.printcounter==0)
      {
       
        for (let i in this.rowsPrecut) {
          this.objMalasiyaPrecut.push({product: this.rowsPrecut[i].product, qtysize: this.rowsPrecut[i].qtysize,deliverto: this.rowsPrecut[i].deliverto,acrscert: this.rowsPrecut[i].acrscert,remark: this.rowsPrecut[i].remark,custpo: this.rowsPrecut[i].custpo, noOfTag: this.rowsPrecut[i].noOfTag, tagNumber:"1", printername: this.selectedtPrinterPrecut, templatefile:this.selectTemplatePrecut});
          }
          
          if (this.rowsPrecut.length != 0) {
            if (this.selectTemplatePrecut != "" && this.selectedtPrinterPrecut != "") {
              this.counter=1;
              this.printcounter=1;
              this.service.printexportprecut(this.objMalasiyaPrecut).subscribe(data => {
                 if(data!="")
                 {
                   this.printcounter=0;
                   alert(data);
                 }
                 
              });
            }
            else {
              alert("please select Required field. * indicates required field.");
            }
      
          }
          else {
            alert("please add some data into the table before print.")
          }
      }
      else
      {
        alert("Please wait... Printing has already started...")
      }
      
    }
    catch(err: any){
      alert(err.error);   
    }
    finally{
      for (let i = 0; i < this.rowsPrecut.length; i++) {
        this.objMalasiyaPrecut.pop();
      }
  
    }

    
        
  }

//added by vishal wani for sample mesh 5 jan 2023
printexportprecutsample()
  {
    this.isPrintingStarted=false;
    this.isPrintingCompleted=false;

    try{
      if(this.printcounter==0)
      {
       
        for (let i in this.rowsPrecutSample) {
          this.objMalasiyaPrecutsample.push({product: this.rowsPrecutSample[i].product, qtysize: this.rowsPrecutSample[i].qtysize,ordertype: this.rowsPrecutSample[i].ordertype,eurocode: this.rowsPrecutSample[i].eurocode,remark: this.rowsPrecutSample[i].remark,reqdate: this.rowsPrecutSample[i].reqdate, noOfTag: this.rowsPrecutSample[i].noOfTag, tagNumber:"1", printername: this.selectedtPrinterPrecut, templatefile:this.selectTemplatePrecut});
          }
          
          if (this.rowsPrecutSample.length != 0) {
            if (this.selectTemplatePrecut != "" && this.selectedtPrinterPrecut != "") {
              this.counter=1;
              this.printcounter=1;
              this.isPrintingStarted=true;
              this.isPrintingCompleted=false;
              this.service.printexportprecutsample(this.objMalasiyaPrecutsample).subscribe(data => {
                 if(data!="")
                 {
                   this.printcounter=0;
                   alert(data);
                   this.isPrintingCompleted=true;
                   this.isPrintingStarted=false;
                 }
                 
              });
            }
            else {
              alert("please select Required field. * indicates required field.");
            }
      
          }
          else {
            alert("please add some data into the table before print.")
          }
      }
      else
      {
        alert("Please wait... Printing has already started...")
      }
      
    }
    catch(err: any){
      alert(err.error);   
    }
    finally{
      for (let i = 0; i < this.rowsPrecutSample.length; i++) {
        this.objMalasiyaPrecutsample.pop();
      }
  
    }

    
        
  }

  resetobj() {
    //this.objMalasiyaSirim=new MalasiyaSirim();
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
