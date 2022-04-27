import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Funcao } from 'src/app/core/models/funcao.model';
import { AccountService } from 'src/app/core/services/account.service';
import { FuncaoService } from 'src/app/core/services/funcao.service';
import { FuncaoFormComponent } from '../funcao-form/funcao-form.component';

@Component({
  selector: 'app-funcao-list',
  templateUrl: './funcao-list.component.html',
  styleUrls: ['./funcao-list.component.scss'],
  providers: [DialogService]
})
export class FuncaoListComponent implements OnInit {
  regs: Funcao[] = [];

  reg: Funcao;

  selectedRegs: Funcao[];
  loading: boolean = false;

  cols: any[];
  userInfo: any;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private service: FuncaoService, private dialogService: DialogService,
    private accountService: AccountService) { }

    ngOnInit() {
      this.userInfo = this.accountService.getUserInfo();
  
      this.cols = [
        { field: 'nome', header: 'Nome', width: '85%' },
        { field: 'acao', header: 'Ações', width: '15%' },
      ];
  
      this.updateUI();
    }
  
    async updateUI() {
      this.loading = true;
      this.service.getAllByIgrejagrupo(this.userInfo.igrejagrupo.id).subscribe({
        next: (regs) => {
          this.regs = regs;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao carregar registros', life: 3000 });
        }
      }
      );
    }
  
    openNew() {
      this.reg = {};
      const ref = this.dialogService.open(FuncaoFormComponent, {
        data: {
          id: undefined
        },
        header: 'Funcao',
        width: '70%'
      });
  
      ref.onClose.subscribe(res => {
        console.log(res)
        this.updateUI();
      });
    }
  
    edit(reg: Funcao) {
      this.reg = { ...reg };
      const ref = this.dialogService.open(FuncaoFormComponent, {
        data: {
          id: reg.id
        },
        header: 'Funcao',
        width: '70%'
      });
  
      ref.onClose.subscribe(res => {
        console.log(res)
        this.updateUI();
      });
    }
  
    delete(reg: Funcao) {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir esse registro?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.regs = this.regs.filter(val => val.id !== reg.id);
          this.service.delete(reg.id).subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluído com sucesso', life: 3000 });
              this.updateUI();
            },
            error: () => {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir registro', life: 3000 });
            },
          });
        }
      });
    }

}
