import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Membro } from 'src/app/core/models/membro.model';
import { AccountService } from 'src/app/core/services/account.service';
import { CargoService } from 'src/app/core/services/cargo.service';
import { FuncaoService } from 'src/app/core/services/funcao.service';
import { GrupoService } from 'src/app/core/services/grupo.service';
import { IgrejaService } from 'src/app/core/services/igreja.service';
import { MembroService } from 'src/app/core/services/membro.service';
import { ViacepService } from 'src/app/core/services/viacep.service';
import * as moment from 'moment';

@Component({
  selector: 'app-membro-form',
  templateUrl: './membro-form.component.html',
  styleUrls: ['./membro-form.component.scss']
})
export class MembroFormComponent implements OnInit {
  form: FormGroup;
  formReady: boolean = false;
  userInfo: any;
  novo: boolean = true;
  reg: Membro;
  loading: boolean = false;
  sexos: SelectItem[];
  estadoCivis: SelectItem[];
  escolaridades: SelectItem[];
  tipoSanguineos: SelectItem[];
  ufs: SelectItem[];
  igrejas: SelectItem[];
  cargos: SelectItem[];
  grupos: SelectItem[];
  funcoes: SelectItem[];


  constructor(
      private service: MembroService,
      private ref: DynamicDialogRef,
      private config: DynamicDialogConfig,
      private messageService: MessageService,
      private accountService: AccountService,
      private viacepService: ViacepService,
      private igrejaService: IgrejaService,
      private cargoService: CargoService,
      private grupoService: GrupoService,
      private funcaoService: FuncaoService
  ) {
      this.sexos = [
            {label: 'Masculino', value: 'Masculino'},
            {label: 'Feminino', value: 'Feminino'},
      ];

      this.estadoCivis = [
        {label: 'Solteiro', value: 'Solteiro'},
        {label: 'Casado', value: 'Casado'},
        {label: 'União Estável', value: 'União Estável'},
        {label: 'Divorciado', value: 'Divorciado'},
        {label: 'Viúvo', value: 'Viúvo'},
      ];

      this.escolaridades = [
        {label: 'Ensino Fundamental', value: 'Ensino Fundamental'},
        {label: 'Ensino Médio', value: 'Ensino Médio'},
        {label: 'Ensino Superior', value: 'Ensino Superior'},
        {label: 'Pós Graduação', value: 'Pós Graduação'},
        {label: 'Mestrado', value: 'Mestrado'},
        {label: 'Doutorado', value: 'Doutorado'},
        {label: 'Curso Técnico', value: 'Curso Técnico'},
      ];

      this.tipoSanguineos = [
        {label: 'A+', value: 'A+'},
        {label: 'A-', value: 'A-'},
        {label: 'B+', value: 'B+'},
        {label: 'B-', value: 'B-'},
        {label: 'AB+', value: 'AB+'},
        {label: 'AB-', value: 'AB-'},
        {label: 'O+', value: 'O+'},
        {label: 'O-', value: 'O-'},
      ];
  }

  ngOnInit(): void {
      this.userInfo = this.accountService.getUserInfo();
      this.getUfs();
      this.getIgrejas();
      this.getCargos();
      this.getFuncoes();
      this.getGrupos();

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
          sexo: new FormControl(''),
          nascimento: new FormControl('01/01/2000'),
          estadoCivil: new FormControl(''),
          naturalidade: new FormControl(''),
          identidade: new FormControl(''),
          cpf: new FormControl(''),
          escolaridade: new FormControl(''),
          profissao: new FormControl(''),
          inativo: new FormControl(false),
          tipoSanguineo: new FormControl(''),
          codigo: new FormControl(''),
          secretkey: new FormControl(''),
          email: new FormControl('', [Validators.email]),
          password: new FormControl(''),
          celular: new FormControl(''),
          telefone: new FormControl(''),
          cep: new FormControl(''),
          uf: new FormControl(''),
          localidade: new FormControl(''),
          bairro: new FormControl(''),
          logradouro: new FormControl(''),
          numero: new FormControl(''),
          conjugueNome: new FormControl(''),
          paiNome: new FormControl(''),
          maeNome: new FormControl(''),
          conversaoData: new FormControl(''),
          batismoData: new FormControl(''),
          batismoIgreja: new FormControl(''),
          convertido: new FormControl(false),
          batizado: new FormControl(false),
          tipo: new FormControl(''),
          convencao: new FormControl(''),
          entradaData: new FormControl(''),
          entradaMotivo: new FormControl(''),
          igrejaOrigem: new FormControl(''),
          igrejaDestino: new FormControl(''),
          saidaData: new FormControl(''),
          saidaMotivo: new FormControl(''),
          igreja: new FormControl(null),
          grupos: new FormControl(null),
          funcoes: new FormControl(null),
          cargo: new FormControl(null),
          igrejagrupo: new FormControl(this.userInfo.igrejagrupo),
      });
  }

  popularForm(data: Membro) {
      this.form.controls['id'].setValue(data.id);
      this.form.controls['nome'].setValue(data.nome);
        this.form.controls['sexo'].setValue(data.sexo);
        this.form.controls['nascimento'].setValue(data.nascimento);
        this.form.controls['estadoCivil'].setValue(data.estadoCivil);
        this.form.controls['naturalidade'].setValue(data.naturalidade);
        this.form.controls['identidade'].setValue(data.identidade);
        this.form.controls['cpf'].setValue(data.cpf);
        this.form.controls['escolaridade'].setValue(data.escolaridade);
        this.form.controls['profissao'].setValue(data.profissao);
        this.form.controls['inativo'].setValue(data.inativo);
        this.form.controls['tipoSanguineo'].setValue(data.tipoSanguineo);
        this.form.controls['codigo'].setValue(data.codigo);
        this.form.controls['secretkey'].setValue(data.secretkey);
        this.form.controls['email'].setValue(data.email);
        this.form.controls['password'].setValue(data.password);
        this.form.controls['celular'].setValue(data.celular);
        this.form.controls['telefone'].setValue(data.telefone);
        this.form.controls['cep'].setValue(data.cep);
        this.form.controls['uf'].setValue(data.uf);
        this.form.controls['localidade'].setValue(data.localidade);
        this.form.controls['bairro'].setValue(data.bairro);
        this.form.controls['logradouro'].setValue(data.logradouro);
        this.form.controls['numero'].setValue(data.numero);
        this.form.controls['conjugueNome'].setValue(data.conjugueNome);
        this.form.controls['paiNome'].setValue(data.paiNome);
        this.form.controls['maeNome'].setValue(data.maeNome);
        if(data.conversaoData) {
            this.form.controls['conversaoData'].setValue(moment(data.conversaoData).format('DD/MM/YYYY'));
        } else {
            this.form.controls['conversaoData'].setValue(data.conversaoData);
        }
        if(data.batismoData) {
            this.form.controls['batismoData'].setValue(moment(data.batismoData).format('DD/MM/YYYY'));
        } else {
            this.form.controls['batismoData'].setValue(data.batismoData);
        }
        this.form.controls['batismoIgreja'].setValue(data.batismoIgreja);
        this.form.controls['convertido'].setValue(data.convertido);
        this.form.controls['batizado'].setValue(data.batizado);
        this.form.controls['tipo'].setValue(data.tipo);
        this.form.controls['convencao'].setValue(data.convencao);
        if(data.entradaData) {
            this.form.controls['entradaData'].setValue(moment(data.entradaData).format('DD/MM/YYYY'));
        } else {
            this.form.controls['entradaData'].setValue(data.entradaData);
        }
        this.form.controls['entradaMotivo'].setValue(data.entradaMotivo);
        this.form.controls['igrejaOrigem'].setValue(data.igrejaOrigem);
        this.form.controls['igrejaDestino'].setValue(data.igrejaDestino);
        if(data.saidaData) {
            this.form.controls['saidaData'].setValue(moment(data.saidaData).format('DD/MM/YYYY'));
        } else {
            this.form.controls['saidaData'].setValue(data.saidaData);
        }
        this.form.controls['saidaMotivo'].setValue(data.saidaMotivo);
        this.form.controls['igreja'].setValue(data.igreja);
        this.form.controls['grupos'].setValue(data.grupos);
        this.form.controls['funcoes'].setValue(data.funcoes);
        this.form.controls['cargo'].setValue(data.cargo);
        this.form.controls['igrejagrupo'].setValue(data.igrejagrupo);
  }

  formataRegistro() {

      this.reg = {...this.form.value};
      if(this.reg.nascimento) {
        this.reg.nascimento = moment(this.reg.nascimento, 'DD/MM/YYYY').toDate();
      }

      if(this.reg.conversaoData) {
        this.reg.conversaoData = moment(this.reg.conversaoData, 'DD/MM/YYYY').toDate();
      }

      if(this.reg.batismoData) {
        this.reg.batismoData = moment(this.reg.batismoData, 'DD/MM/YYYY').toDate();
      }

      if(this.reg.entradaData) {
        this.reg.entradaData = moment(this.reg.entradaData, 'DD/MM/YYYY').toDate();
      }

      if(this.reg.saidaData) {
        this.reg.saidaData = moment(this.reg.saidaData, 'DD/MM/YYYY').toDate();
      }

      if(!this.reg.secretkey) {
        delete this.reg.secretkey;
      }

      if(!this.reg.password) {
        delete this.reg.password;
      }
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
              this.reg.secretkey = res.secretkey
              this.form.controls['secretkey'].setValue(res.secretkey);
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

  getUfs() {
    this.viacepService.getUfs().subscribe((res) => {
        this.ufs = res.map((uf: any) => {
            return {label: uf.nome, value: uf.sigla};
        });
    });
  }

  searchCep() {
    this.viacepService.get(this.form.value.cep).subscribe((res) => {
        this.form.controls['uf'].setValue(res.uf);
        this.form.controls['localidade'].setValue(res.localidade);
        this.form.controls['bairro'].setValue(res.bairro);
        this.form.controls['logradouro'].setValue(res.logradouro);
    });
  }

  getIgrejas() {
    this.igrejaService.getAllByIgrejagrupo(this.userInfo.igrejagrupo.id).subscribe((res) => {
        this.igrejas = res.map((igreja: any) => {
            return { label: igreja.nome, value: { ...igreja } };
        });
    });
  }

  getCargos() {
    this.cargoService.getAllByIgrejagrupo(this.userInfo.igrejagrupo.id).subscribe((res) => {
        this.cargos = res.map((cargo: any) => {
            return { label: cargo.nome, value: { ...cargo } };
        });
    });
  }

  getFuncoes() {
    this.funcaoService.getAllByIgrejagrupo(this.userInfo.igrejagrupo.id).subscribe((res) => {
        this.funcoes = res.map((funcao: any) => {
            return { label: funcao.nome, value: { ...funcao } };
        });
    });
  }

  getGrupos() {
    this.grupoService.getAllByIgrejagrupo(this.userInfo.igrejagrupo.id).subscribe((res) => {
        this.grupos = res.map((grupo: any) => {
            return { label: grupo.nome, value: { ...grupo } };
        });
    });
  }
}
