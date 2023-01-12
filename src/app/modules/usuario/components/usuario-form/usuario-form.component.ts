import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/core/models/user.model';
import { AccountService } from 'src/app/core/services/account.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})


export class UsuarioFormComponent implements OnInit {
  form: FormGroup;
  formReady: boolean = false;
  userInfo: any;
  novo: boolean = true;
  reg: User;
  loading: boolean = false;

  constructor(
      private service: UserService,
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
          email: new FormControl('', [Validators.email]),
          password: new FormControl(''),
      });
  }

  popularForm(data: User) {
      this.form.controls['id'].setValue(data.id);
      this.form.controls['nome'].setValue(data.nome);
      this.form.controls['igrejagrupo'].setValue(data.igrejagrupo);
      this.form.controls['email'].setValue(data.email);
      this.form.controls['password'].setValue(data.password);
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
          error: (err) => {
              this.loading = false;
              this.messageService.add({severity: 'error', summary: 'Erro', detail: err.error.message, life: 3000});
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
