import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultsPageRoutingModule } from './results-routing.module';

import { ResultsPage } from './results.page';
import {SafeHtmlPipe} from "../safe-html.pipe";
import {TypingComponent} from "../typing/typing.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsPageRoutingModule,
    SafeHtmlPipe,
    TypingComponent
  ],
  declarations: [ResultsPage]
})
export class ResultsPageModule {}
