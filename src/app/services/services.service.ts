import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Roll, ReleaseCode, PrinterName, tagNumberToPrinTo, NoOfdaylist, GetLibrarianFile, GroupTagNumbers, TagNumberToPrint, TagNumber, WorkCenter, MalasiyaPrecutsample } from './cabmodel.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private myhttp: HttpClient) { }
  //TagUrl :string='http://172.25.1.144:8079/FM_API_NSH/api/';   /// 06
   TagUrl :string='http://10.79.160.15:8079/FM_API_NSH/api/';   /// 06

 // TagUrl: string = 'http://localhost:60771/FM_API_NSH/api/';   /// local


  //TagUrl :string='http://protag.natsteel.com.sg:8095/FM_API_NSH/api/';   /// 10
  //TagUrl :string = 'http://172.25.1.224:82/FM_API_NSH/api/';  /// 04

  //TagUrl :string='http://localhost:60771/api/';
  //TagUrl :string='http://192.168.36.212:60771/api/';

  listRoll: Roll[] = [];
  RollData: Roll = new Roll();
  tagNumber: TagNumber[] = [];
  objTagNumber = new TagNumber();
  listReleaseCode: ReleaseCode[] = [];
  ReleaseCodeData: ReleaseCode = new ReleaseCode();

  workcenter: WorkCenter[] = [];
  workcenterdata: WorkCenter = new WorkCenter();

  groupTagNumber: GroupTagNumbers[] = [];
  groupTagNumberdata: GroupTagNumbers = new GroupTagNumbers();

  tagNumberToPrint: TagNumberToPrint[] = [];
  tagNumberToPrintdata: TagNumberToPrint = new TagNumberToPrint();
  tagNumberToPrinTodata: tagNumberToPrinTo = new tagNumberToPrinTo();

  printerName: PrinterName[] = [];
  printerNamedata: PrinterName = new PrinterName();

  getLibrarianFile: GetLibrarianFile[] = [];
  getLibrariandata: GetLibrarianFile = new GetLibrarianFile();

  noOfdaylistdata: NoOfdaylist = new NoOfdaylist();
  PrintStatus: any = [];

  user: any;

  setGetUserName(UserId: number) {
    this.user = this.GetUserDetails(UserId);
    return this.user;
  }

  //protag User details
  GetUserDetails(UserId: number) {
    return this.myhttp.get(this.TagUrl + "BPCTagPrinting/GetUserDetails?UserId=" + UserId);
  }

  GetPrinterStatus(Name: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetPrinterStatus?Name=" + Name);
  }

  /// CAB Tag Prining .
  getReleaseCode(days: number, CABProd: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetReleaseCode?DaysCount=" + days + "&SelectedPc=" + CABProd + "");
  }

  // getReleaseCode(days:number, CABProd :string):Observable<ReleaseCode[]>{
  //   return this.myhttp.get<ReleaseCode[]>(this.TagUrl+"/GetReleaseCode?DaysCount="+days+"&SelectedPc="+CABProd+"");
  // }

  getSONo(days: number, CABProd: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetSoNo?DaysCount=" + days + "&SelectedPc=" + CABProd + "");
  }

  GetRunNo(days: number, CABProd: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetRunNo?DaysCount=" + days + "&SelectedPc=" + CABProd + "");
  }

  getBBSNo(days: number, CABProd: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetBBSNo?DaysCount=" + days + "&SelectedPc=" + CABProd + "");
  }

  GetProductionCenter() {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetProductionCenter");
  }
  /// Run number
  /// Release code list
  GetRunNumberReleasecode(id: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetRunNoList?ReleaseCode=" + id);
  }

  GetRunNumberBBSNo(id: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetRunNoBBSNoList?BBSNo=" + id);
  }

  GetRunNumberSONo(id: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetRunNoSoNoList?SoNo=" + id);
  }

  /// work center from run number
  GetWorkCenterFromRunNo(id: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetWorkCenterFromRunNo?RunNo=" + id);
  }

  GetTagFromWC(Runno: string, workcenter: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetTagFromWC?RunNo=" + Runno + "&workcenter=" + workcenter);
  }

  GetPrinterName() {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetPrinterName");
  }

  GetLibrarianFile() {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetLibrarianFile");
  }
  //http://localhost:60771/api/CABTagPrinting/GetLibrarianFile
  GetTagFromGroupTag(Runno: string, GroupTagNo: string, cutlenght: string, truefalse: boolean, Workcenter: string) {
    return this.myhttp.post(this.TagUrl + "CABTagPrinting/GetTagFromGroupTag",
      {
        'RunNo': Runno,
        'GroupTagNo': GroupTagNo,
        'CutLength': cutlenght,
        'IsOtherTag': truefalse,
        'Workcenter': Workcenter
      });
  }

  PrintTagTemplates(ReleaseCode: string, RunNo: string, TagNo: string, Type: string,
    FromRange: string, ToRange: string, Workcenter: string, PrinterName: string,
    TemplatePath: string, CutLength: string, enablePrompting: boolean, GroupTagNo: string, PrintedBy: string, istag: string, isreport: string, selectCrystalPrinterName: string, SelectCrystalTemplatename: string, type: string, selectedvalue: string, date1: Date, isCoupler: string, time: string) {
    return this.myhttp.post(this.TagUrl + "CABTagPrinting/PrintTagTemplates",
      {
        'ReleaseCode': ReleaseCode,
        'RunNo': RunNo,
        'TagNo': TagNo,
        'Type': Type,
        'FromRange': FromRange,
        'ToRange': ToRange,
        'Workcenter': Workcenter,
        'PrinterName': PrinterName,
        'TemplatePath': TemplatePath,
        'CutLength': CutLength,
        'EnablePrompting': enablePrompting,
        'GroupTagNo': GroupTagNo,
        'PrintedBy': PrintedBy,
        'istag': istag,
        'isreport': isreport,
        'selectCrystalPrinterName': selectCrystalPrinterName,
        'SelectCrystalTemplatename': SelectCrystalTemplatename,
        'type': type,
        'selectedvalue': selectedvalue,
        'date1': date1,
        'isCoupler': isCoupler,
        'time': time
      });
    // "Type":"All","Type":"Range","Type":"Select","Type":"Workcenter",
  }

  ResetEngine() {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/ResetEngine");
  }

  RunHistory(Runno: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/RunHistory?RunNo=" + Runno);
  }

  GetStatus(UniqueId: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetStatus?UniqueId=" + UniqueId);
  }

  //// MESH Tag Prining .


  MeshGetLibrarianFile() {
    return this.myhttp.get(this.TagUrl + "MESHTagPrinting/GetLibrarianFile");
  }

  MeshGetPrinterName() {
    return this.myhttp.get(this.TagUrl + "MESHTagPrinting/GetPrinterName");
  }

  MeshGetReleaseCode(FromDate: string, ToDate: string, selectionDatewise: string, DaysCount: number) {
    return this.myhttp.get(this.TagUrl + "MESHTagPrinting/GetReleaseCode?FromDate=" + FromDate + "&ToDate=" + ToDate + "&selectionDatewise=" + selectionDatewise + "&DaysCount=" + DaysCount);
  }

  MeshGetSoCode(FromDate: string, ToDate: string, selectionDatewise: string, DaysCount: number) {
    return this.myhttp.get(this.TagUrl + "MESHTagPrinting/GetSoNo?FromDate=" + FromDate + "&ToDate=" + ToDate + "&selectionDatewise=" + selectionDatewise + "&DaysCount=" + DaysCount);
  }

  MeshGetRunCode(FromDate: string, ToDate: string, selectionDatewise: string, DaysCount: number) {
    return this.myhttp.get(this.TagUrl + "MESHTagPrinting/GetRunNo?FromDate=" + FromDate + "&ToDate=" + ToDate + "&selectionDatewise=" + selectionDatewise + "&DaysCount=" + DaysCount);
  }

  MeshGetBBSCode(FromDate: string, ToDate: string, selectionDatewise: string, DaysCount: number) {
    return this.myhttp.get(this.TagUrl + "MESHTagPrinting/GetBBSNo?FromDate=" + FromDate + "&ToDate=" + ToDate + "&selectionDatewise=" + selectionDatewise + "&DaysCount=" + DaysCount);
  }

  MeshGetAllNumbers(selection: string, DaysCount: number) {
    return this.myhttp.get(this.TagUrl + "MESHTagPrinting/GetAllNumbers?selection=" + selection + "&DaysCount=" + DaysCount);
  }

  MeshGetWorkCenter(TagNo: string, selection: string) {
    return this.myhttp.post(this.TagUrl + "MESHTagPrinting/GetWorkCenter",
      {
        'RunNo': TagNo,
        'selection': selection
      });
  }

  MeshGetWorkCenterItemNo(TagNo: string, selection: string, SONumber: string) {
    return this.myhttp.post(this.TagUrl + "MESHTagPrinting/GetWorkCenterfromItemNo",
      {
        'ItemNumber': TagNo,
        'selection': selection,
        'SONumber': SONumber
      });
  }

  MeshGetTagNumber(TagNo: string, WorkCenter: string, selection: string, ItemNumber: string) {
    return this.myhttp.post(this.TagUrl + "MESHTagPrinting/GetTagNumber",
      {
        'RunNo': TagNo,
        'WorkCenter': WorkCenter,
        'selection': selection,
        'ItemNumber': ItemNumber
      });
  }

  MeshGetItemNumber(SONo: string) {
    return this.myhttp.post(this.TagUrl + "MESHTagPrinting/GetItemNumber",
      {
        'ItemNumber': SONo
      });
  }

  MeshPrintTagTemplates(MSD_PRT_BATCH_NO: string, SelectedTagId: string, selectPrinterName: string, selectTemplateName: string, PrintedBy: string, selectedworkcenter: string, istag: string, isreport: string, selectCrystalPrinterName: string, SelectCrystalTemplatename: string, type: string, selectedvalue: string, time: string, date: any) {
    return this.myhttp.post(this.TagUrl + "MESHTagPrinting/PrintTagTemplates",
      {
        'MSD_PRT_BATCH_NO': MSD_PRT_BATCH_NO,
        'TagNo': SelectedTagId,
        'PrinterName': selectPrinterName,
        'TemplatePath': selectTemplateName,
        'PrintedBy': 'MeshAdmin',
        'selectedworkcenter': selectedworkcenter,
        'istag': istag,
        'isreport': isreport,
        'selectCrystalPrinterName': selectCrystalPrinterName,
        'SelectCrystalTemplatename': SelectCrystalTemplatename,
        'type': type,
        'selectedvalue': selectedvalue,
        'time': time,
        'date': date
      });
  }

  MeshRunHistory(Runno: string) {
    return this.myhttp.get(this.TagUrl + "MESHTagPrinting/RunHistory?RunNo=" + Runno);
  }

  MeshGetStatus(UniqueId: string) {
    return this.myhttp.get(this.TagUrl + "MESHTagPrinting/GetStatus?UniqueId=" + UniqueId);
  }

  //// SNC  Tag Prining .

  SNCGetAllNumbers(selection: string, DaysCount: number) {
    return this.myhttp.get(this.TagUrl + "SNCTag/GetRunNumberOnSelection?Value=" + selection + "&NoOfDays=" + DaysCount);
  }

  SNCGetLibrarianFile() {
    return this.myhttp.get(this.TagUrl + "SNCTag/GetLibrarianFileSNC");
  }

  SNCGetPrinterName() {
    return this.myhttp.get(this.TagUrl + "SNCTag/GetPrinterNameSNC");
  }

  SNCGetReleaseCode(FromDate: string, ToDate: string, selectionDatewise: string, SelectedType: string) {
    return this.myhttp.get(this.TagUrl + "SNCTag/GetRCByDateSearch?FromDate=" + FromDate + "&ToDate=" + ToDate + "&Type=" + selectionDatewise + "&SelectedType=" + SelectedType);
  }

  GetRCSOByDateSearchSNC(FromDate: string, ToDate: string, selectionDatewise: string, SelectedType: string) {
    return this.myhttp.get(this.TagUrl + "SNCTag/GetRCSOByDateSearch?FromDate=" + FromDate + "&ToDate=" + ToDate + "&Type=" + selectionDatewise + "&SelectedType=" + SelectedType);
  }

  SNCGetWorkCenter(Type: string, TagNo: string, NoOfDays: number, ItemNo: string) {
    return this.myhttp.post(this.TagUrl + "SNCTag/GetWCBySingleValues",
      {
        'Type': Type,
        'Value': TagNo,
        'NoOfDays': NoOfDays,
        'ItemNo': ItemNo
      });
  }

  GetSNCTagsByWorkcenter(Value: string, Workcenter: string, NoOfDays: number, Type: string, ItemNo: string) {
    return this.myhttp.post(this.TagUrl + "SNCTag/GetSNCTagsByWorkcenter",
      {
        'Value': Value,
        'Workcenter': Workcenter,
        'NoOfDays': NoOfDays,
        'Type': Type,
        'ItemNo': ItemNo
      });
  }

  SNCRunHistory(Runno: string) {
    return this.myhttp.post(this.TagUrl + "SNCTag/SNCHistory",
      {
        'TagNo': Runno
      });
  }


  SNCThread(ReleaseCd: string, TagNo: string, Type: string, PrinterName: string, TemplatePath: string, PrintedBy: string, selectedworkcenter: string, istag: string, isreport: string, selectCrystalPrinterName: string, SelectCrystalTemplatename: string, selectedvalue: string) {
    return this.myhttp.post(this.TagUrl + "SNCTag/SNCThread",
      {
        'ReleaseCd': ReleaseCd,
        'TagNo': TagNo,
        'Type': Type,
        'PrinterName': PrinterName,
        'TemplatePath': TemplatePath,
        'PrintedBy': PrintedBy,
        'selectedworkcenter': selectedworkcenter,
        'istag': istag,
        'isreport': isreport,
        'selectCrystalPrinterName': selectCrystalPrinterName,
        'SelectCrystalTemplatename': SelectCrystalTemplatename,
        'selectedvalue': selectedvalue
      });
  }

  SNCGetWorkCenterItemNo(TagNo: string, selection: string) {
    return this.myhttp.post(this.TagUrl + "SNCTag/GetWorkCenterfromItemNo",
      {
        'ItemNumber': TagNo,
        'selection': selection
      });
  }

  SNCGetStatus(UniqueId: string) {
    return this.myhttp.get(this.TagUrl + "SNCTag/SNCGetStatus?UniqueId=" + UniqueId);
  }


  //// Carpet Tag Prining .

  CarpetGetPrinterName() {
    return this.myhttp.get(this.TagUrl + "CARPETagPrinting/GetPrinterName");
  }

  CarpetLibrarianFile() {
    return this.myhttp.get(this.TagUrl + "CARPETagPrinting/GetLibrarianFile");
  }

  getNumber(type: string, number: string) {
    return this.myhttp.get(this.TagUrl + "CARPETagPrinting/GetReleaseCodeCarpet?Type=" + type + "&Value=" + number);
  }

  getWorkcenterfromItem(type: string, number: string, itemno: string) {
    return this.myhttp.get(this.TagUrl + "CARPETagPrinting/GetWorkCenterFromItemNumberCarpet?Type=" + type + "&Value=" + number + "&ItemNo=" + itemno);
  }

  getWorkcenterfromReleasecode(type: string, number: string, itemno: string) {
    return this.myhttp.get(this.TagUrl + "CARPETagPrinting/GetWorkCenterFromItemNumberCarpet?Type=" + type + "&Value=" + number + "&ItemNo=" + itemno);
  }


  GetTagFromWorkcenter(type: string, workcenter: string, value: string, itemno: string) {
    return this.myhttp.get(this.TagUrl + "CARPETagPrinting/getTagNumberFromItemWC?Type=" + type + "&workcenter=" + workcenter + "&Value=" + value + "&ItemNo=" + itemno);
  }
  CarpetGetReleaseCode(fromdate: string, todate: string, Datewiseselect: string) {
    return this.myhttp.get(this.TagUrl + "CARPETagPrinting/GetReleaseCodeFromDate?fromdate=" + fromdate + "&todate=" + todate + "&Datewiseselect=" + Datewiseselect);
  }

  CarpetSONumber(fromdate: string, todate: string, Datewiseselect: string) {
    return this.myhttp.get(this.TagUrl + "CARPETagPrinting/GetSoNumberFromDate?fromdate=" + fromdate + "&todate=" + todate + "&Datewiseselect=" + Datewiseselect);
  }

  CarpetGetSoCode(fromdate: string, todate: string, Datewiseselect: string) {
    return this.myhttp.get(this.TagUrl + "CARPETagPrinting/GetReleaseCodeFromDate?fromdate=" + fromdate + "&todate=" + todate + "&Datewiseselect=" + Datewiseselect);
  }

  GetHistory(tagID: string) {
    return this.myhttp.get(this.TagUrl + "CARPETagPrinting/CARPETHistory?TagNo=" + tagID);
  }

  CARPETPrintTagTemplates(ReleaseCd: string, TagNo: string, Type: string, PrinterName: string, TemplatePath: string, PrintedBy: string) {
    return this.myhttp.post(this.TagUrl + "CARPETagPrinting/CARPETThread",
      {
        'ReleaseCd': ReleaseCd,
        'TagNo': TagNo,
        'Type': Type,
        'PrinterName': PrinterName,
        'TemplatePath': TemplatePath,
        'PrintedBy': PrintedBy,

      });
  }

  GetCarpetStatus(UniqueId: string) {
    return this.myhttp.get(this.TagUrl + "CARPETagPrinting/GetCarpetStatus?UniqueId=" + UniqueId);
  }

  CARPETGetAllNumbers(selection: string, DaysCount: number) {
    return this.myhttp.get(this.TagUrl + "CARPETagPrinting/GetCarpetReleaseSoByDate?Type=" + selection + "&NoOfDays=" + DaysCount);
  }

  //// PRC Tag Prining

  PRCGetAllNumbers(selection: string, DaysCount: number) {
    return this.myhttp.get(this.TagUrl + "PRCTagPrinting/GetPRCDetails_ByNoOfDays?Type=" + selection + "&NoOfDays=" + DaysCount);
  }

  GetPrinterNamePRC() {
    return this.myhttp.get(this.TagUrl + "PRCTagPrinting/GetPrinterNamePRC");
  }

  GetLibrarianFilePRC() {
    return this.myhttp.get(this.TagUrl + "PRCTagPrinting/GetLibrarianFilePRC");
  }

  GetWCBySingleValuesPRC(Type: string, Value: string, NoOfDays: number, ItemNo: string) {
    return this.myhttp.get(this.TagUrl + "PRCTagPrinting/GetWCBySingleValuesPRC?Type=" + Type + "&Value=" + Value + "&NoOfDays=" + NoOfDays + "&ItemNo=" + ItemNo);
  }

  GetRCByDateSearchPRC(fromdate: string, todate: string, Datewiseselect: string) {
    return this.myhttp.get(this.TagUrl + "PRCTagPrinting/GetRCByDateSearchPRC?FromDate=" + fromdate + "&ToDate=" + todate + "&Type=" + Datewiseselect);
  }

  GetPRCTagsByWorkcenter(Value: string, Workcenter: string, NoOfDays: number, Type: string, ItemNo: string) {
    return this.myhttp.get(this.TagUrl + "PRCTagPrinting/GetPRCTagsByWorkcenter?Value=" + Value + "&Workcenter=" + Workcenter + "&NoOfDays=" + NoOfDays + "&Type=" + Type + "&ItemNo=" + ItemNo);
  }

  PRCHistory(TagNo: string) {
    return this.myhttp.post(this.TagUrl + "PRCTagPrinting/PRCHistory",
      {
        'TagNo': TagNo
      });
  }

  PRCThread(ReleaseCd: string, TagNo: string, Type: string, PrinterName: string, TemplatePath: string, PrintedBy: string, istag: string, isreport: string, selectCrystalPrinterName: string, SelectCrystalTemplatename: string, type: string, selectedvalue: string, fromdate: string, Remark: string, time: string) {
    return this.myhttp.post(this.TagUrl + "PRCTagPrinting/PRCThread",
      {
        'ReleaseCd': ReleaseCd,
        'TagNo': TagNo,
        'Type': Type,
        'PrinterName': PrinterName,
        'TemplatePath': TemplatePath,
        'PrintedBy': 'PRCAdmin',
        'istag': istag,
        'isreport': isreport,
        'selectCrystalPrinterName': selectCrystalPrinterName,
        'SelectCrystalTemplatename': SelectCrystalTemplatename,
        'type': type,
        'selectedvalue': selectedvalue,
        'fromdate': fromdate,
        'Remark': Remark,
        'time': time

      });
  }

  GetStatusPRC(UniqueId: string) {
    return this.myhttp.get(this.TagUrl + "PRCTagPrinting/GetStatusPRC?UniqueId=" + UniqueId);
  }

  GetRCSOByDateSearchPRC(fromdate: string, todate: string, Datewiseselect: string) {
    return this.myhttp.get(this.TagUrl + "PRCTagPrinting/GetRCSOByDateSearchPRC?FromDate=" + fromdate + "&ToDate=" + todate + "&Type=" + Datewiseselect);
  }


  //// BPC Tag Prining

  BPCGetAllNumbers(selection: string, DaysCount: number) {
    return this.myhttp.get(this.TagUrl + "BPCTagPrinting/GetBPCDetails_ByNoOfDays?Type=" + selection + "&NoOfDays=" + DaysCount);
  }

  GetPrinterNameBPC() {
    return this.myhttp.get(this.TagUrl + "BPCTagPrinting/GetPrinterNameBPC");
  }

  GetLibrarianFileBPC() {
    return this.myhttp.get(this.TagUrl + "BPCTagPrinting/GetLibrarianFileBPC");
  }

  GetWCBySingleValues(Type: string, Value: string, NoOfDays: number, ItemNo: string) {
    return this.myhttp.get(this.TagUrl + "BPCTagPrinting/GetWCBySingleValues?Type=" + Type + "&Value=" + Value + "&NoOfDays=" + NoOfDays + "&ItemNo=" + ItemNo);
  }

  GetRCByDateSearch(fromdate: string, todate: string, Datewiseselect: string) {
    return this.myhttp.get(this.TagUrl + "BPCTagPrinting/GetRCByDateSearch?FromDate=" + fromdate + "&ToDate=" + todate + "&Type=" + Datewiseselect);
  }

  GetBPCTagsByWorkcenter(Value: string, Workcenter: string, NoOfDays: number, Type: string, ItemNo: string) {
    return this.myhttp.get(this.TagUrl + "BPCTagPrinting/GetBPCTagsByWorkcenter?Value=" + Value + "&Workcenter=" + Workcenter + "&NoOfDays=" + NoOfDays + "&Type=" + Type + "&ItemNo=" + ItemNo);
  }

  BPCHistory(TagNo: string) {
    return this.myhttp.post(this.TagUrl + "BPCTagPrinting/BPCHistory",
      {
        'TagNo': TagNo
      });
  }

  BPCThread(ReleaseCd: string, TagNo: string, Type: string, PrinterName: string, TemplatePath: string, PrintedBy: string, istag: string, isreport: string, selectCrystalPrinterName: string, SelectCrystalTemplatename: string, type: string, selectedvalue: string, fromdate: string, todate: string, time: string) {
    return this.myhttp.post(this.TagUrl + "BPCTagPrinting/BPCThread",
      {
        'ReleaseCd': ReleaseCd,
        'TagNo': TagNo,
        'Type': Type,
        'PrinterName': PrinterName,
        'TemplatePath': TemplatePath,
        'PrintedBy': 'BPCAdmin',
        'istag': istag,
        'isreport': isreport,
        'selectCrystalPrinterName': selectCrystalPrinterName,
        'SelectCrystalTemplatename': SelectCrystalTemplatename,
        'selectedvalue': selectedvalue,
        'fromdate': fromdate,
        'todate': todate,
        'time': time
      });
  }

  GetStatusBPC(UniqueId: string) {
    return this.myhttp.get(this.TagUrl + "BPCTagPrinting/GetStatusBPC?UniqueId=" + UniqueId);
  }

  GetRCSOByDateSearch(fromdate: string, todate: string, Datewiseselect: string) {
    return this.myhttp.get(this.TagUrl + "BPCTagPrinting/GetRCSOByDateSearch?FromDate=" + fromdate + "&ToDate=" + todate + "&Type=" + Datewiseselect);
  }

  //// Export Tag Prining

  printExport(rows: object) {
    return this.myhttp.post(this.TagUrl + "ExportTagPrinting/printExport", rows)
  }

  printExportTag(printername: string, templatefile: string) {
    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/PrintExportTag?printername=" + printername + "&templatefile=" + templatefile);
  }

  GetLibrarianExport() {
    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/GetLibrarianFile");
  }

  printexportprecut(rowsPrecut: object) {
    return this.myhttp.post(this.TagUrl + "ExportTagPrinting/printexportprecut", rowsPrecut)
  }

  printexportprecutsample(rowsPrecutSample: object) {
    return this.myhttp.post(this.TagUrl + "ExportTagPrinting/printexportprecutsample", rowsPrecutSample)
  }

  //start added by Manoj More for sample mesh 15 Oct 2026
  printexportprecutsampleExport(SONumber: string, ItemNumber: string, templatename: string, printername: string, OrderType: string) {
    return this.myhttp.get(this.TagUrl + "MeshManualPrinting/PrintMeshManualTagExport?SONumber=" + SONumber + "&ItemNumber=" + ItemNumber + "&templatename=" + templatename + "&printername=" + printername + "&OrderType=" + OrderType);
   }
 

  //end added by Manoj More for sample mesh 15 Oct 2026



  GetPrinterNameExport() {
    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/GetPrinterName");
  }

  GetProduct() {
    //return this.myhttp.get<MeshProduct[]>(this.TagUrl+"/GetMeshProduct");
    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/GetMeshProduct");
  }

  GetType() {

    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/GetMeshType");
  }

  GetGrade() {

    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/GetMeshGrade");
  }

  GetBatch() {

    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/GetMeshBatch");
  }

  GetProductPrecut() {

    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/GetPrecutProduct");
  }

  GetDeliverToPrecut() {

    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/GetDeliverToPrecut");
  }


  //for sample
  GetOrderType() {

    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/GetSampleOrderType");
  }

  GetSampleProduct() {

    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/GetSampleMeshProduct");
  }

  //end


  GetFolder() {

    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/GetFolder");
  }

  LoadToXml(NewProductMesh: string, NewGradeMesh: string, NewTypeMesh: string, NewBatchNoMesh: string) {
    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/LoadToXml?NewProductMesh=" + NewProductMesh + "&NewGradeMesh=" + NewGradeMesh + "&NewTypeMesh=" + NewTypeMesh + "&NewBatchNoMesh=" + NewBatchNoMesh);

  }

  LoadToxmlPrecut(NewProductPrecut: string, NewDeliveryLoc: string) {
    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/LoadToxmlPrecut?NewProductPrecut=" + NewProductPrecut + "&NewDeliveryLoc=" + NewDeliveryLoc);
  }

  //added for sample mesh
  LoadToxmlPrecutSample(NewProductPrecut: string, NewDeliveryLoc: string) {
    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/LoadToxmlPrecutSample?NewProductPrecut=" + NewProductPrecut + "&NewDeliveryLoc=" + NewDeliveryLoc);
  }

  LoadToxmlPrecutSampleExport(SONumber: string, ItemNumber: string, OrderType: string) {
    return this.myhttp.get(this.TagUrl + "ExportTagPrinting/LoadToxmlPrecutSampleExport?SONumber=" + SONumber + "&ItemNo=" + ItemNumber + "&OrderType=" + OrderType);
  }


  //// BCP  Tag Prining .

  BCPGetAllNumbers(SelectedPc: string, CDate: string, selectionType: string) {
    return this.myhttp.get(this.TagUrl + "BCPTagPrinting/GetReleaseSORunBBS?SelectedPc=" + SelectedPc + "&CDate=" + CDate + "&selectionType=" + selectionType);
  }

  BCPGetLibrarianFile() {
    return this.myhttp.get(this.TagUrl + "BCPTagPrinting/GetLibrarianFile");
  }

  BCPGetPrinterName() {
    return this.myhttp.get(this.TagUrl + "BCPTagPrinting/GetPrinterName");
  }

  GetHall(SelectedTagId: string, SelectedType: string) {
    return this.myhttp.get(this.TagUrl + "BCPTagPrinting/GetHall?Value=" + SelectedTagId + "&selectionType=" + SelectedType);
  }

  GetMachineGroup(SelectedTagId: string, SelectedType: string, Hall: string) {
    return this.myhttp.get(this.TagUrl + "BCPTagPrinting/GetMachineGroup?selectionType=" + SelectedType + "&Value=" + SelectedTagId + "&Hall=" + Hall);
  }

  GetWorkCenterBCP(SelectedTagId: string, SelectedType: string) {
    return this.myhttp.get(this.TagUrl + "BCPTagPrinting/GetWorkCenterBCP?Value=" + SelectedTagId + "&selectionType=" + SelectedType);
  }

  GetTagFromWCBCP(SelectedTagId: string, SelectedType: string, WorkCenter: string) {
    return this.myhttp.get(this.TagUrl + "BCPTagPrinting/GetTagFromWCBCP?Value=" + SelectedTagId + "&workcenter=" + WorkCenter + "&selectionType=" + SelectedType);
  }

  GetTagFromGroupTagBCP(SelectedTagId: string, GroupTagNo: string, IsOtherTag: boolean, Workcenter: string, SelectedType: string) {
    return this.myhttp.post(this.TagUrl + "BCPTagPrinting/GetTagFromGroupTagBCP",
      {
        'Value': SelectedTagId,
        'GroupTagNo': GroupTagNo,
        'IsOtherTag': IsOtherTag,
        'Workcenter': Workcenter,
        'selectionType': SelectedType
      });
  }


  BCPThread(SelectedTagId: string, RunNo: string, TagNo: string, Type: string, FromRange: string, ToRange: string, PrinterName: string,
    TemplatePath: string, SelectedType: string, EnablePrompting: boolean, PrintedBy: string, GroupTagNo: string) {
    return this.myhttp.post(this.TagUrl + "BCPTagPrinting/PrintTagTemplates",
      {
        'Value': SelectedTagId,
        'RunNo': RunNo,
        'TagNo': TagNo,
        'Type': Type,
        'FromRange': FromRange,
        'ToRange': ToRange,
        'PrinterName': PrinterName,
        'TemplatePath': TemplatePath,
        'selectionType': SelectedType,
        'EnablePrompting': EnablePrompting,
        'PrintedBy': PrintedBy,
        'GroupTagNo': GroupTagNo
      });
  }

  BCPRunHistory(SelectedTagId: string, selectionType: string) {
    return this.myhttp.post(this.TagUrl + "BCPTagPrinting/BCPHistory",
      {
        'Value': SelectedTagId,
        'selectionType': selectionType
      });
  }

  BCPGetStatus(UniqueId: string) {
    return this.myhttp.get(this.TagUrl + "BCPTagPrinting/GetStatusBCP?UniqueId=" + UniqueId);
  }


  GetBCPTagsByWorkcenter(Value: string, Workcenter: string, NoOfDays: number, Type: string, ItemNo: string) {
    return this.myhttp.post(this.TagUrl + "BCPTagPrinting/GetSNCTagsByWorkcenter",
      {
        'Value': Value,
        'Workcenter': Workcenter,
        'NoOfDays': NoOfDays,
        'Type': Type,
        'ItemNo': ItemNo
      });
  }


  BCPGetWorkCenterItemNo(TagNo: string, selection: string) {
    return this.myhttp.post(this.TagUrl + "BCPTagPrinting/GetWorkCenterfromItemNo",
      {
        'ItemNumber': TagNo,
        'selection': selection
      });
  }

  //start: added by vishal wani
  GetFileCountCab(finalpath: string) {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetFileCount?Value=" + finalpath);
  }

  GetFileCountMesh(finalpath: string) {
    return this.myhttp.get(this.TagUrl + "MESHTagPrinting/GetFileCount?Value=" + finalpath);
  }

  GetFileCountBpc(finalpath: string) {
    return this.myhttp.get(this.TagUrl + "BPCTagPrinting/GetFileCount?Value=" + finalpath);
  }

  GetFileCountPrc(finalpath: string) {
    return this.myhttp.get(this.TagUrl + "PRCTagPrinting/GetFileCount?Value=" + finalpath);
  }

  GetFileCountSnc(finalpath: string) {
    return this.myhttp.get(this.TagUrl + "SNCTag/GetFileCount?Value=" + finalpath);
  }
  //end: added by vishal wani

  //added by vishal wani
  PrintCabManual(var1: string, var2: string, selectPrinterName: string, selectTemplateName: string, ishash: string) {
    return this.myhttp.get(this.TagUrl + "CABManualPrinting/PrintCabManual?var1=" + var1 + "&var2=" + var2 + "&selectPrinterName=" + selectPrinterName + "&selectTemplateName=" + selectTemplateName + "&ishash=" + ishash);
  }
  GetLibrarianFileCABManual() {
    return this.myhttp.get(this.TagUrl + "CABManualPrinting/GetLibrarianFile");
  }

  GetConnectionDetails() {
    return this.myhttp.get(this.TagUrl + "CABTagPrinting/GetConnectionDetails");
  }
  //end: added by vishal wani
  //start : sample mesh
  GetLibrarianFileSampleMesh() {
    return this.myhttp.get(this.TagUrl + "MeshManualPrinting/GetLibrarianFile");
  }

  getSODetails(SONumber: string, ItemNumber: string) {
    return this.myhttp.get(this.TagUrl + "MeshManualPrinting/GetSOdetails?SONumber=" + SONumber + "&ItemNumber=" + ItemNumber + "");
  }

  PrintMeshManualTag(SONumber: string, ItemNumber: string, templatename: string, printername: string) {
    return this.myhttp.get(this.TagUrl + "MeshManualPrinting/PrintMeshManualTag?SONumber=" + SONumber + "&ItemNumber=" + ItemNumber + "&templatename=" + templatename + "&printername=" + printername + "");
  }


  GetGrade2() {
  return this.myhttp.post(
    this.TagUrl + "MeshManualPrinting/TestPost",
    {}
  );
}

  //end : sample mesh


}