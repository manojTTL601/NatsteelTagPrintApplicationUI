
export class Cabmodel {
}

export class User {
    MST_User_ID: number = 0;
    LoginId: string
}

export class Roll {
    MST_Role_ID: number = 0;
    RoleName: string
}

export class ReleaseCode {
    Id: number = 0;
    Value: string;
}

export class TagNumber {
    RunNo: string;
    isChecked: boolean;
}

export class WorkCenter {
    ID: number;
    workcenter: number;
    TagNoID: number;
    TagNumber: number;
    isChecked: boolean;
    Value: string;
}

export class GroupTagNumbers {
    Id: number;
    GroupTagNumber: number;
    WorkCenterId: number;
    isChecked: boolean;
    TagNo: string;
    isDisable: boolean = false;
}

export class TagNumberToPrint {
    Id: number;
    TagNumberToPrint: number;
    GroupTagNumberId: number;
    isChecked: Boolean;
    TagNo: string;
    isTagNumberDisable: boolean = false;
}
export class tagNumberToPrinTo {
    TagNo: string;
    isDisableTag: boolean;
}

export class PrinterName {
    Id: string;
    Name: string;
}

export class GetLibrarianFile {
    Id: string;
    Name: string;
}

export class NoOfdaylist {
    value = [
        { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 },
        { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 }, { value: 16 },
        { value: 17 }, { value: 18 }, { value: 19 }, { value: 20 }, { value: 21 }, { value: 22 }, { value: 23 }, { value: 24 },
        { value: 25 }, { value: 26 }, { value: 27 }, { value: 28 }, { value: 29 }, { value: 30 }, { value: 31 }, { value: 32 },
        { value: 33 }, { value: 34 }, { value: 35 }, { value: 36 }, { value: 37 }, { value: 38 }, { value: 39 }, { value: 40 },
        { value: 50 }, { value: 60 }, { value: 90 }, { value: 120 }, { value: 150 }, { value: 180 }, { value: 200 }
    ];
}


export class MeshProduct {
    Value: string;
}

export class ProductMesh {

    Value: any;
}

export class GetLibrarian {
    Id: string;
    Name: string;
}

export class TypeMesh {


}

export class GradeMesh {

    Value: any;
}

export class BatchMesh {

    Value: any;
}

export class ProductPrecut {
    Value: any;
}

export class DeliverToPrecut {
    Value: any;
}

export class MeshTemplateValue {
    Value: any;
}


export class MalasiyaSirim {
    product: string;
    qtysize: string;
    grade: string;
    type: string;
    unitWt: string;
    DOM: string;
    remark: string;
    batchNo: string;
    heatNo: string;
    noOfTag: string;
    tagNumber: string;
    printername: string;
    templatefile: string;
}

export class MalasiyaPrecut {
    product: string;
    qtysize: string;
    deliverto: string;
    acrscert: string;
    remark: string;
    custpo: string;
    noOfTag: string;
    tagNumber: string;
    printername: string;
    templatefile: string;


}


export class MalasiyaPrecutsample {
    product: string;
    qtysize: string;
    ordertype: string;
    eurocode: string;
    remark: string;
    reqdate: string;
    noOfTag: string;
    tagNumber: string;
    printername: string;
    templatefile: string;


}

export class ReportDetails {
    Report: string;
}


export class LoadxmlMesh {

    NewProductMesh: any;
    NewGradeMesh: any;
    NewTypeMesh: any;
    NewBatchNoMesh: any;

}

export class LoadxmlPrecut {

    NewProductPrecut: any;
    NewDeliveryLoc: any;

}


export class NoOfTags {
    value = [
        { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 },
        { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 }, { value: 16 },
        { value: 17 }, { value: 18 }, { value: 19 }, { value: 20 }, { value: 21 }, { value: 22 }, { value: 23 }, { value: 24 },
        { value: 25 }, { value: 26 }, { value: 27 }, { value: 28 }, { value: 29 }, { value: 30 }, { value: 31 }, { value: 32 },
        { value: 33 }, { value: 34 }, { value: 35 }, { value: 36 }, { value: 37 }, { value: 38 }, { value: 39 }, { value: 40 },
        { value: 50 }, { value: 60 }, { value: 90 }, { value: 120 }, { value: 150 }, { value: 180 }, { value: 200 }
    ];
}

export class totaltags {
    Value: number;
}

export class NoOfdaylistcarpet {
    value = [
        { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 },
        { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 }, { value: 16 },
        { value: 17 }, { value: 18 }, { value: 19 }, { value: 20 }, { value: 21 }, { value: 22 }, { value: 23 }, { value: 24 },
        { value: 25 }, { value: 26 }, { value: 27 }, { value: 28 }, { value: 29 }, { value: 30 }, { value: 31 }, { value: 32 },
        { value: 33 }, { value: 34 }, { value: 35 }, { value: 36 }, { value: 37 }, { value: 38 }, { value: 39 }, { value: 40 },
        { value: 41 }, { value: 42 }, { value: 43 }, { value: 44 }, { value: 45 }, { value: 46 }, { value: 47 }, { value: 48 },
        { value: 49 }, { value: 50 }, { value: 51 }, { value: 52 }, { value: 53 }, { value: 54 }, { value: 55 }, { value: 56 },
        { value: 57 }, { value: 58 }, { value: 59 }, { value: 60 }, { value: 61 }, { value: 62 }, { value: 63 }, { value: 64 },
        { value: 65 }, { value: 66 }, { value: 67 }, { value: 68 }, { value: 69 }, { value: 70 }, { value: 71 }, { value: 72 }, { value: 73 }, { value: 74 },
        { value: 75 }, { value: 76 }, { value: 77 }, { value: 78 }, { value: 79 }, { value: 80 }, { value: 81 }, { value: 82 }, { value: 83 }, { value: 84 },
        { value: 85 }, { value: 86 }, { value: 87 }, { value: 88 }, { value: 89 }, { value: 90 }, { value: 91 }, { value: 92 }, { value: 93 }, { value: 94 },
        { value: 95 }, { value: 99 }, { value: 97 }, { value: 98 }, { value: 99 }, { value: 100 }, { value: 101 }, { value: 102 }, { value: 103 },
        { value: 104 }, { value: 105 },
        { value: 106 }, { value: 107 }, { value: 108 }, { value: 109 }, { value: 110 }
    ];
}

export class GetPDFFile {
    //http://172.25.1.224:82/FM_API_NSH


    //06 server
    public static valuecab: string = "http://10.79.160.15:8079/FM_API_NSH/api/CABTagPrinting/ShowDir";    //06
    public static valuemesh: string = "http://10.79.160.15:8079/FM_API_NSH/api/MESHTagPrinting/ShowDir";    //06
    public static valuesnc: string = "http://10.79.160.15:8079/FM_API_NSH/api/SNCTag/ShowDir";    //06
    public static valueprc: string = "http://10.79.160.15:8079/FM_API_NSH/api/PRCTagPrinting/ShowDir";    //06
    public static valuebpc: string = "http://10.79.160.15:8079/FM_API_NSH/api/BPCTagPrinting/ShowDir";    //06
    public static valuecarpet: string = "http://10.79.160.15:8079/FM_API_NSH/api/CARPETagPrinting/ShowDir";    //06
    public static valuebcp: string = "http://10.79.160.15:8079/FM_API_NSH/api/BCPTagPrinting/ShowDir";    //06
    public static valuecabmanual: string = "http://10.79.160.15:8079/FM_API_NSH/api/CABManualPrinting/ShowDir";    //06
    public static valueSampleMeshmanual: string = "http://10.79.160.15:8079/FM_API_NSH/api/MeshManualPrinting/ShowDir";    //06

    public static value: string = "http://10.79.160.15:8079/FM_API_NSH/api/CABTagPrinting/ShowReportDir?releasecode=";    //06
    public static valuebpcReport: string = "http://10.79.160.15:8079/FM_API_NSH/api/BPCTagPrinting/ShowReportDir?releasecode="; //06  
    public static valueprcReport: string = "http://10.79.160.15:8079/FM_API_NSH/api/PRCTagPrinting/ShowReportDir?releasecode="; //06    
    //  //public static valuemeshReport:string = "http://localhost:60771/api/MESHTagPrinting/ShowReportDir?releasecode="; //local PC 
    public static valuemeshReport: string = "http://10.79.160.15:8079/FM_API_NSH/api/MESHTagPrinting/ShowReportDir?releasecode="; //06 
    public static valuesncReport: string = "http://10.79.160.15:8079/FM_API_NSH/api/SNCTag/ShowReportDir";
    public static valueExportTagReport: string = "http://10.79.160.15:8079/FM_API_NSH/api/ExportTagPrinting/ShowDir";    //06


    //10 server
    //  public static valuecab:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/CABTagPrinting/ShowDir";    //10
    //  public static valuemesh:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/MESHTagPrinting/ShowDir";    //10
    //  public static valuesnc:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/SNCTag/ShowDir";    //10
    //  public static valueprc:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/PRCTagPrinting/ShowDir";    //10
    //  public static valuebpc:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/BPCTagPrinting/ShowDir";    //10
    //  public static valuecarpet:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/CARPETagPrinting/ShowDir";    //10
    //  public static valuebcp:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/BCPTagPrinting/ShowDir";    //10
    //  public static valuecabmanual:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/CABManualPrinting/ShowDir";    //10
    //  public static valueSampleMeshmanual:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/MeshManualPrinting/ShowDir";    //10

    //  public static value:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/CABTagPrinting/ShowReportDir?releasecode=";    //16
    //   public static valuebpcReport:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/BPCTagPrinting/ShowReportDir?releasecode="; //10  
    //   public static valueprcReport:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/PRCTagPrinting/ShowReportDir?releasecode="; //10    
    //   public static valuemeshReport:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/MESHTagPrinting/ShowReportDir?releasecode="; //10
    //   //public static valuemeshReport:string = "http://protag.natsteel.com.sg:8095/FM_API_NSH/api/MESHTagPrinting/ShowReportDir?releasecode="; //10 
    //   public static valuesncReport: string="http://protag.natsteel.com.sg:8095/FM_API_NSH/api/SNCTag/ShowReportDir";   




    // public static valuecab:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/CABTagPrinting/ShowDir";    //10
    // public static valuemesh:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/MESHTagPrinting/ShowDir";    //10
    // public static valuesnc:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/SNCTag/ShowDir";    //10
    // public static valueprc:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/PRCTagPrinting/ShowDir";    //10
    // public static valuebpc:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/BPCTagPrinting/ShowDir";    //10
    // public static valuecarpet:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/CARPETagPrinting/ShowDir";    //10
    // public static valuebcp:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/BCPTagPrinting/ShowDir";    //10
    // public static valuecabmanual:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/CABManualPrinting/ShowDir";    //10

    //  public static value:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/CABTagPrinting/ShowReportDir?releasecode=";    //06
    //  public static valuebpcReport:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/BPCTagPrinting/ShowReportDir?releasecode="; //06  
    //  public static valueprcReport:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/PRCTagPrinting/ShowReportDir?releasecode="; //06    
    //  public static valuemeshReport:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/MESHTagPrinting/ShowReportDir?releasecode="; //06 
    //  public static valuesncReport: string="http://protag.natsteel.com.sg:8095/FM_API_TAG/api/SNCTag/ShowReportDir";   
    //public static valuecab:string = "http://protag.natsteel.com.sg:8095/FM_API_TAG/api/CABTagPrinting/ShowDir";    //10
    // public static valuemesh:string = "http://172.25.1.144:8079/FM_API_NSH/api/MESHTagPrinting/ShowDir";    //06
    // public static valuesnc:string = "http://172.25.1.144:8079/FM_API_NSH/api/SNCTag/ShowDir";    //06
    // public static valueprc:string = "http://172.25.1.144:8079/FM_API_NSH/api//PRCTagPrinting/ShowDir";    //06
    // public static valuebpc:string = "http://172.25.1.144:8079/FM_API_NSH/api/BPCTagPrinting/ShowDir";    //06
    // public static valuecarpet:string = "http://172.25.1.144:8079/FM_API_NSH/api/CARPETagPrinting/ShowDir";    //06
    // public static valuebcp:string = "http://172.25.1.144:8079/FM_API_NSH/api/BCPTagPrinting/ShowDir";    //06

    // public static valuecab:string = "http://172.25.1.224:82/FM_API_NSH_TagAPI/api/CABTagPrinting/ShowDir";    //04
    // public static valuemesh:string = "http://172.25.1.224:82/FM_API_NSH_TagAPI/api/MESHTagPrinting/ShowDir";   //04
    // public static valuesnc:string = "http://172.25.1.224:82/FM_API_NSH_TagAPI/api/SNCTag/ShowDir";    //04
    // public static valueprc:string = "http://172.25.1.224:82/FM_API_NSH_TagAPI/api/PRCTagPrinting/ShowDir";    //04
    // public static valuebpc:string = "http://172.25.1.224:82/FM_API_NSH_TagAPI/api/BPCTagPrinting/ShowDir";    //04
    // public static valuecarpet:string = "http://172.25.1.224:82/FM_API_NSH_TagAPI/api/CARPETagPrinting/ShowDir";    //04
    // public static valuebcp:string = "http://172.25.1.224:82/FM_API_NSH_TagAPI/api/BCPTagPrinting/ShowDir";    //04

    // public static value:string = "http://172.25.1.144:8079/api/BPCTagPrinting/ShowDir";   //06
    // public static value:string = "http://172.25.1.224:82/FM_API_NSH_TagAPI/api/BPCTagPrinting/ShowDir";  //04
    //public static value:string = "http://localhost:60771/api/CABTagPrinting/ShowReportDir";  //local
}

export class PrintersName {
    public static PDF: string = "PDF";

    // 10
    // public static printnm:string = "C9065 BW_TAG" ; 
    // public static printnmmesh1:string = "C9065 COLOUR_PAPER";   
    // public static printnmmesh2:string = "C9065 COLOUR_TAG";    
    // public static printnmmesh3:string = "C9065 BW_PAPER";

    // 06/04
    public static printnm: string = "BW_TAG C9065";
    public static printnmmesh1: string = "COLOUR_TAG C9065";
    public static printnmmesh2: string = "COLOUR_PAPER C9065";
    public static printnmmesh3: string = "BW_PAPER C9065";
    public static printnmbcp: string = "Brother HL-L2385DW LASER PRINTER";
    public static printmeshbpp: string = "Bullzip PDF Printer";
    public static printmeshWAB: string = "WABL2_PLANNING_FX ApeosPort-IV 4070 PCL 6";
    public static printmptp: string = "Microsoft Print to PDF";
    public static ZebraPrinter: string = "Mesh_Office_ZebraPrinter_ZT510";
}

export class ReportNames {
    public static cabreport1: string = "CAB Loading Advice";
    public static cabreport2: string = "CAB Loading Plan";
    public static cabreport3: string = "CAB Feed Material";
    public static cabreport4: string = "CAB Cutting List";
    public static cabreport5: string = "CAB Internal Loading Plan";
    public static cabreport6: string = "CCB Production Plan";
    public static cabreport7: string = "CAB Loading_Plan By Delivery Date";
    public static cabreport8: string = "CAB Loading Advice Coupler";
    public static cabreport9: string = "CAB SB Loading Advice"
    public static cabreport10: string = "CAB Morning Wave"
    public static cabreport11: string = "SB Delivery Plan"

    public static bpcreport1: string = "BPC CRSR Report";
    public static bpcreport2: string = "BPC Loading_Plan by Delivery";
    public static bpcreport3: string = "BPC Loading Plan";
    public static bpcreport4: string = "BPC Report";

    public static prcreport1: string = "PRC Delivery Report";
    public static prcreport2: string = "PRC Drawing";
    public static prcreport3: string = "PRC Report";
    public static prcreport4: string = "Big Diameter Mesh Material Requirement for Caging";

    public static meshreport1: string = "Loading Plan";
    public static meshreport2: string = "Welding Schedule Summary";
    public static meshreport3: string = "Loading Plan Summary report";
    public static meshreport4: string = "MSH Delivery Plan";
    public static meshreport5: string = "MSH Feed Material";

    public static scnReport1: string = "SNC Schedule Summary";

}

export class GetUser {
    public static Value: string;
    public static comname: string;

}

