import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule,
  ]
})
export class SharedModule { }
