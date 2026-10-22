import { CARPETTagPrintingComponent } from './carpettag-printing/carpettag-printing.component';
import { BPCTagPrintingComponent } from './bpctag-printing/bpctag-printing.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CABPrintingComponent } from './cabprinting/cabprinting.component';
import { HttpClientModule } from  '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { MeshprintingComponent } from './meshprinting/meshprinting.component';
import { SNCTagPrintingComponent } from './snctag-printing/snctag-printing.component';
import { PRCTagPrintingComponent } from './prctag-printing/prctag-printing.component';
import { ExportTagComponent } from './export-tag/export-tag.component';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { BCPTagPrintingComponent } from './bcptag-printing/bcptag-printing.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CabManualComponent } from './cab-manual/cab-manual.component';
import { MeshManualTagComponent } from './mesh-manual-tag/mesh-manual-tag.component';
import { SamplemeshtaggenerationComponent } from './samplemeshtaggeneration/samplemeshtaggeneration.component';
 
@NgModule({    
  
  declarations: [
    AppComponent,
    CABPrintingComponent,
    MeshprintingComponent,
    SNCTagPrintingComponent,
    PRCTagPrintingComponent,
    BPCTagPrintingComponent,
    CARPETTagPrintingComponent,
    ExportTagComponent,
    BCPTagPrintingComponent,
    CabManualComponent,
    MeshManualTagComponent,
    SamplemeshtaggenerationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelectModule
  ],
  providers: [
    {
      provide : LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
