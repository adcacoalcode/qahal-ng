import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Igreja } from 'src/app/core/models/igreja.model';
import { AccountService } from 'src/app/core/services/account.service';
import { IgrejaService } from 'src/app/core/services/igreja.service';
import { ViacepService } from 'src/app/core/services/viacep.service';

@Component({
    selector: 'app-igreja-form',
    templateUrl: './igreja-form.component.html',
    styleUrls: ['./igreja-form.component.scss'],
})
export class IgrejaFormComponent implements OnInit {
    form: FormGroup;
    formReady: boolean = false;
    userInfo: any;
    novo: boolean = true;
    reg: Igreja;
    loading: boolean = false;

    constructor(
        private service: IgrejaService,
        private ref: DynamicDialogRef,
        private config: DynamicDialogConfig,
        private viacepService: ViacepService,
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
            cep: new FormControl(''),
            uf: new FormControl(''),
            localidade: new FormControl(''),
            bairro: new FormControl(''),
            logradouro: new FormControl(''),
            numero: new FormControl(''),
            complemento: new FormControl(''),
            igrejagrupo: new FormControl(this.userInfo.igrejagrupo),
        });
    }

    popularForm(data: Igreja) {
        this.form.controls['id'].setValue(data.id);
        this.form.controls['nome'].setValue(data.nome);
        this.form.controls['cep'].setValue(data.cep);
        this.form.controls['uf'].setValue(data.uf);
        this.form.controls['localidade'].setValue(data.localidade);
        this.form.controls['bairro'].setValue(data.bairro);
        this.form.controls['logradouro'].setValue(data.logradouro);
        this.form.controls['numero'].setValue(data.numero);
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

    cepChange() {
      this.viacepService.get(this.form.controls['cep'].value).subscribe((res) => {
        this.form.controls['uf'].setValue(res.uf);
        this.form.controls['localidade'].setValue(res.localidade);
        this.form.controls['bairro'].setValue(res.bairro);
        this.form.controls['logradouro'].setValue(res.logradouro);
      },
      (error) => {
        this.messageService.add({ severity: 'warn', summary: 'Atenção!', detail: 'Insira um cep válido', life: 3000 });
      }
      );
    }
}
