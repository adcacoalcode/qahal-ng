import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Grupo } from 'src/app/core/models/grupo.model';
import { AccountService } from 'src/app/core/services/account.service';
import { GrupoService } from 'src/app/core/services/grupo.service';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss']
})
export class GrupoFormComponent implements OnInit {
  form: FormGroup;
  formReady: boolean = false;
  userInfo: any;
  novo: boolean = true;
  reg: Grupo;
  loading: boolean = false;

  constructor(
      private service: GrupoService,
      private ref: DynamicDialogRef,
      private config: DynamicDialogConfig,
      private messageService: MessageService,
      private accountService: AccountService
  ) {}

  ngOnInit(): void {
      this.userInfo = this.accountService.getUserInfo();

      this.configuraForm();
      if (this.config.data && this.config.data.id) {
          this.novo = false;
          this.service.get(this.config.data.id).subscribe((res) => {
              this.popularForm(res);
              this.reg = {...res}
              this.formReady = true;
          });
      }
  }

  configuraForm() {
      this.form = new FormGroup({
          id: new FormControl(null),
          nome: new FormControl('', [Validators.required]),
          igrejagrupo: new FormControl(this.userInfo.igrejagrupo),
      });
  }

  popularForm(data: Grupo) {
      this.form.controls['id'].setValue(data.id);
      this.form.controls['nome'].setValue(data.nome);
      this.form.controls['igrejagrupo'].setValue(data.igrejagrupo);
  }

  formataRegistro() {

      this.reg = {...this.form.value};
  }

  onSubmit() {
      console.log(this.form.value);
      this.formataRegistro();
      if(this.novo) {
          this.insertRecord();
      } else {
          this.updateRecord();
      }
  }

  insertRecord() {
      this.loading = true;
      this.service.post(this.reg).subscribe({
          next: (res) => {
              this.novo = false;
              this.loading = false;
              this.reg.id = res.id
              this.form.controls['id'].setValue(res.id);
              this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registro inserido com sucesso', life: 3000});
          },
          error: (error) => {
              this.loading = false;
              this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao inserir registro', life: 3000});
          }
      });
  }

  updateRecord() {
      this.loading = true;
      this.service.put(this.reg).subscribe({
          next: (res) => {
              this.loading = false;
              this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registro alterado com sucesso', life: 3000});
          },
          error: (error) => {
              this.loading = false;
              this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao alterar registro', life: 3000});
          }
      });
  }
}
