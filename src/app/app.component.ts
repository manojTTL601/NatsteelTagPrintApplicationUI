import { GetPDFFile,GetUser } from './services/cabmodel.model';
import { ServicesService } from './services/services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tag Printing';
  PageName:string;
  setclass_cab:boolean;setclass_mesh:boolean;setclass_snc:boolean;
  setclass_prc:boolean;setclass_bpc:boolean;setclass_carpet:boolean;setclass_export:boolean;
  setclass_bcp:boolean;
  setclass_cabmaunal:boolean;
  setclass_samplemeshtaggeneration: boolean;
  //setclass_meshmanualtag: boolean;
  setclass_meshmanualtag: boolean;
  nm:string ='';
  user:any;
  UserId:number;
  UserDetails:any;
  //GetPDFFile:string;
  getfile:GetPDFFile= new  GetPDFFile();
  Value:string="";
constructor(private router: ActivatedRoute,public service:ServicesService, private router2: Router) { 
  // this.router.queryParams.subscribe((queryParam:any) =>
  // {
  //  this.user = queryParam.user
  //   if(this.user != undefined){
  //     this.GetUserDetails();
  //  }
  //  //alert("App");
  // });
  // this.Value =  GetUser.Value;
  // alert(this.Value + "okok");
 // this.Value =  sessionStorage.getItem('Username');
  // console.log("UserNameas : " + this.Value);
  // this.GetUserDetails();
  //this.user = this.router.snapshot.paramMap.get('user');
}

// Logout(){
//   sessionStorage.removeItem('Username');
//   window.location.href = 'http://172.25.1.144:8079/FM_NSH/';
// }

Logout(){
  sessionStorage.removeItem('Username');
  window.location.href = 'http://protag.natsteel.com.sg:8095/fm_nsh';
}

GoBack(){
  window.location.href = "http://protag.natsteel.com.sg:8095/FM_NSH/Home/HomeIndex";
}
href:any;
ngOnInit(): void {
  
  
 // this.Value =  this.user ; //GetUser.Value;
  //alert(this.Value + "okok");
  // this.router.queryParams.subscribe((queryParam:any) =>
  // {
  //  this.user = queryParam.user
  //  console.log(this.user);
  //   //this.GetUserDetails();
  //  //alert("App");
  // });
 // this.GetUserDetails();
}
 
// async GetUserDetails(){
//   try{
//     this.UserDetails = "";
//     const data = await this.service.GetUserDetails(this.user).toPromise();
//     this.UserDetails = data;
//     this.Value = this.UserDetails[0].UserNames;
//     sessionStorage.setItem('Username',this.Value);
//   }
//   catch (err: any) {
//     //sessionStorage.removeItem('Username');
//     //window.location.href = 'http://172.25.1.144:8079/FM_NSH/';
//     //sessionStorage.setItem('Username',"manoj");
//     //alert(err.error);
//   }
// }

async GetUserDetails(user:number,url:any){
  try{
   this.PageName=url;
    this.UserId = user;
    this.UserDetails = "";
    
    const data = await this.service.GetUserDetails(this.UserId).toPromise();
    this.UserDetails = data;
    this.Value = this.UserDetails[0].UserNames;
    GetUser.Value = this.UserDetails[0].UserNames;
    sessionStorage.setItem('Username',this.Value);
  }
  catch (err: any) {
    //sessionStorage.removeItem('Username');
    //window.location.href = 'http://172.25.1.144:8079/FM_NSH/';
    //sessionStorage.setItem('Username',"manoj");
    //alert(err.error);
  }
}


showpagename(name:string){
    this.PageName = name;
    name = name.toUpperCase();
    if(name.trim() == "CAB"){
      this.setActiveclass();
      this.setclass_cab=true;
    }
    else if(name.trim() == "MESH"){
      this.setActiveclass();
      this.setclass_mesh=true;
    }
    else if(name.trim() == "SNC"){
      this.setActiveclass();
      this.setclass_snc=true;
    }
    else if(name.trim() == "PRC"){
      this.setActiveclass();
      this.setclass_prc=true;
    }
    else if(name.trim() == "BPC"){
      this.setActiveclass();
      this.setclass_bpc=true;
    }
    else if(name.trim() == "CARPET"){
      this.setActiveclass();
      this.setclass_carpet=true;
    }
    else if(name.trim() == "EXPORT"){
      this.setActiveclass();
      this.setclass_export=true;
    }
    else if(name.trim() == "BCP"){
      this.setActiveclass();
      this.setclass_bcp=true;
    }
    else if(name.trim() == "CABMANUAL"){
      this.setActiveclass();
      this.setclass_cabmaunal=true;
    }
    else if(name.trim() == "samplemesh"){
      this.setActiveclass();
      this.setclass_meshmanualtag=true;
    }
    else if(name.trim()=="samplemeshtaggeneration")
    {
      this.setActiveclass();
      this.setclass_samplemeshtaggeneration=true;
    }
    const dynamic = name.toLowerCase();
    this.router2.navigate([ '/' + dynamic ]);
  }

  setActiveclass(){
    this.setclass_cab=false;
    this.setclass_mesh=false;
    this.setclass_snc=false;
    this.setclass_prc=false;
    this.setclass_bpc=false;
    this.setclass_carpet=false;
    this.setclass_export=false;
    this.setclass_bcp= false;
    this.setclass_cabmaunal=false;
    this.setclass_meshmanualtag=false;
  }
}




