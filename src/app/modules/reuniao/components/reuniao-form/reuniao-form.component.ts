import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Reuniao } from 'src/app/core/models/reuniao.model';
import { AccountService } from 'src/app/core/services/account.service';
import { ReuniaoService } from 'src/app/core/services/reuniao.service';

@Component({
  selector: 'app-reuniao-form',
  templateUrl: './reuniao-form.component.html',
  styleUrls: ['./reuniao-form.component.scss']
})
export class ReuniaoFormComponent implements OnInit {
  form: FormGroup;
  formReady: boolean = false;
  userInfo: any;
  novo: boolean = true;
  reg: Reuniao;
  loading: boolean = false;

  constructor(
      private service: ReuniaoService,
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
          titulo: new FormControl('', [Validators.required]),
          assunto: new FormControl(''),
          conteudo: new FormControl(''),
          data: new FormControl(''),
          horarioIni: new FormControl(''),
          horarioFim: new FormControl(''),
          prensencaAberta: new FormControl(false),
          responsavel: new FormControl(null),
          cargo: new FormControl(null),
          funcao: new FormControl(null),
          grupo: new FormControl(null),
          igrejagrupo: new FormControl(this.userInfo.igrejagrupo),
      });
  }

  popularForm(data: Reuniao) {
      this.form.controls['id'].setValue(data.id);
      this.form.controls['titulo'].setValue(data.titulo);
      this.form.controls['assunto'].setValue(data.assunto);
      this.form.controls['conteudo'].setValue(data.conteudo);
      this.form.controls['data'].setValue(data.data);
      this.form.controls['horarioIni'].setValue(data.horarioIni);
      this.form.controls['horarioFim'].setValue(data.horarioFim);
      this.form.controls['prensencaAberta'].setValue(data.prensencaAberta);
      this.form.controls['responsavel'].setValue(data.responsavel);
      this.form.controls['cargo'].setValue(data.cargo);
      this.form.controls['funcao'].setValue(data.funcao);
      this.form.controls['grupo'].setValue(data.grupo);
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
