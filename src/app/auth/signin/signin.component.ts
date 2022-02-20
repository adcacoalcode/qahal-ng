import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { AccountService } from 'src/app/core/services/account.service';
import { IgrejagrupoService } from 'src/app/core/services/igrejagrupo.service';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Igrejagrupo } from 'src/app/core/models/igrejagrupo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formulario: FormGroup;
  reg: User
  formReady: boolean = false;
  processando: boolean = false;

  constructor(private accountService: AccountService, private igrejagrupoService: IgrejagrupoService,
    private userService: UserService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    moment.locale('pt-br');
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });

    this.configuraFormulario();
    this.formReady = true;

  }

  configuraFormulario() {
    this.formulario = new FormGroup({
      nome: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      igrejagrupo: new FormControl(null),
    });
  }

  formataRegistro() {
    this.reg = {...this.formulario.value};
    //this.reg.igrejagrupo = { vencimentoLicenca: moment().add(15, 'days').format('YYYY-MM-DD') };
  }

  async onSubmit() {
    console.log("SUBMIT")
    this.formataRegistro();

    if(!this.reg.nome) {
      this.messageService.add({severity:'error', summary:'Nome', detail:'Informe o nome'});
      return;
    }
    console.log(this.reg);
    this.userService.post(this.reg).subscribe(
      (res) => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado com sucesso!' });
        this.reg.id = res.id;
        const igrejaGrupo: Igrejagrupo = { vencimentoLicenca: moment().add(15, 'days').format('YYYY-MM-DD') }
        this.igrejagrupoService.post(igrejaGrupo).subscribe(
          (res) => {
            igrejaGrupo.id = res.id;
            this.reg.igrejagrupo = igrejaGrupo;
            this.userService.put(this.reg).subscribe(
              (res) => {
                const container = document.querySelector(".container");
                container.classList.remove("sign-up-mode");
              }
            );
          });
      },
      (err) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error.message });
      }
    )
  }

  login() {
    this.formataRegistro()
    const credenciais = {email: this.reg.email, password: this.reg.password};
    this.accountService.login(credenciais).then(logado => {
      if(logado) {
        this.router.navigateByUrl('/igrejas');
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Login realizado com sucesso!' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Login ou senha inválidos' });
      }
    })
  }

}
