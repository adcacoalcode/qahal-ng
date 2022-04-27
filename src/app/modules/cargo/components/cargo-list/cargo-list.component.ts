import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Cargo } from 'src/app/core/models/cargo.model';
import { AccountService } from 'src/app/core/services/account.service';
import { CargoService } from 'src/app/core/services/cargo.service';
import { CargoFormComponent } from '../cargo-form/cargo-form.component';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.scss'],
  providers: [DialogService]
})
export class CargoListComponent implements OnInit {
  regs: Cargo[] = [];

  reg: Cargo;

  selectedRegs: Cargo[];
  loading: boolean = false;

  cols: any[];
  userInfo: any;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private service: CargoService, private dialogService: DialogService,
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
      const ref = this.dialogService.open(CargoFormComponent, {
        data: {
          id: undefined
        },
        header: 'Cargo',
        width: '70%'
      });
  
      ref.onClose.subscribe(res => {
        console.log(res)
        this.updateUI();
      });
    }
  
    edit(reg: Cargo) {
      this.reg = { ...reg };
      const ref = this.dialogService.open(CargoFormComponent, {
        data: {
          id: reg.id
        },
        header: 'Cargo',
        width: '70%'
      });
  
      ref.onClose.subscribe(res => {
        console.log(res)
        this.updateUI();
      });
    }
  
    delete(reg: Cargo) {
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
