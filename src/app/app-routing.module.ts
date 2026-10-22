import { BCPTagPrintingComponent } from './bcptag-printing/bcptag-printing.component';
import { ExportTagComponent } from './export-tag/export-tag.component';
import { CARPETTagPrintingComponent } from './carpettag-printing/carpettag-printing.component';
import { BPCTagPrintingComponent } from './bpctag-printing/bpctag-printing.component';
import { PRCTagPrintingComponent } from './prctag-printing/prctag-printing.component';
import { SNCTagPrintingComponent } from './snctag-printing/snctag-printing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CABPrintingComponent } from './cabprinting/cabprinting.component'; 
import { MeshprintingComponent } from './meshprinting/meshprinting.component';
import { CabManualComponent } from './cab-manual/cab-manual.component';
import { MeshManualTagComponent } from './mesh-manual-tag/mesh-manual-tag.component';
import { SamplemeshtaggenerationComponent } from './samplemeshtaggeneration/samplemeshtaggeneration.component';

const routes: Routes = [
  {path:'cab', component:CABPrintingComponent},
  {path:'mesh', component:MeshprintingComponent},
  {path:'snc', component:SNCTagPrintingComponent},
  {path:'prc', component:PRCTagPrintingComponent},
  {path:'bpc', component:BPCTagPrintingComponent},
  {path:'carpet', component:CARPETTagPrintingComponent},
  {path:'export', component:ExportTagComponent},
  {path:'bcp', component:BCPTagPrintingComponent},
  {path:'cabmanual', component:CabManualComponent},
  {path:'samplemesh', component:MeshManualTagComponent},
  {path:'samplemeshtaggeneration', component:SamplemeshtaggenerationComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
