import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Igreja } from 'src/app/core/models/igreja.model';
import { AccountService } from 'src/app/core/services/account.service';
import { IgrejaService } from 'src/app/core/services/igreja.service';
import { IgrejaFormComponent } from '../igreja-form/igreja-form.component';

@Component({
  selector: 'app-igreja-list',
  templateUrl: './igreja-list.component.html',
  styleUrls: ['./igreja-list.component.scss'],
  providers: [DialogService]
})
export class IgrejaListComponent implements OnInit {
  regs: Igreja[] = [];

  reg: Igreja;

  selectedRegs: Igreja[];
  loading: boolean = false;

  cols: any[];
  userInfo: any;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private service: IgrejaService, private dialogService: DialogService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.userInfo = this.accountService.getUserInfo();

    this.cols = [
      { field: 'nome', header: 'Nome', width: '45%' },
      { field: 'bairro', header: 'Bairro', width: '40%' },
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
    const ref = this.dialogService.open(IgrejaFormComponent, {
      data: {
        id: undefined
      },
      header: 'Igreja',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      console.log(res)
      this.updateUI();
    });
  }

  edit(reg: Igreja) {
    this.reg = { ...reg };
    const ref = this.dialogService.open(IgrejaFormComponent, {
      data: {
        id: reg.id
      },
      header: 'Igreja',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      console.log(res)
      this.updateUI();
    });
  }

  delete(reg: Igreja) {
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
