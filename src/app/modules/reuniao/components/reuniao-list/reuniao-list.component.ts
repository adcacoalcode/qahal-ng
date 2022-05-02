import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Reuniao } from 'src/app/core/models/reuniao.model';
import { AccountService } from 'src/app/core/services/account.service';
import { ReuniaoService } from 'src/app/core/services/reuniao.service';
import { ReuniaoFormComponent } from '../reuniao-form/reuniao-form.component';

@Component({
  selector: 'app-reuniao-list',
  templateUrl: './reuniao-list.component.html',
  styleUrls: ['./reuniao-list.component.scss'],
  providers: [DialogService]
})
export class ReuniaoListComponent implements OnInit {
  regs: Reuniao[] = [];

  reg: Reuniao;

  selectedRegs: Reuniao[];
  loading: boolean = false;

  cols: any[];
  userInfo: any;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private service: ReuniaoService, private dialogService: DialogService,
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
      const ref = this.dialogService.open(ReuniaoFormComponent, {
        data: {
          id: undefined
        },
        header: 'Reuniao',
        width: '70%'
      });

      ref.onClose.subscribe(res => {
        console.log(res)
        this.updateUI();
      });
    }

    edit(reg: Reuniao) {
      this.reg = { ...reg };
      const ref = this.dialogService.open(ReuniaoFormComponent, {
        data: {
          id: reg.id
        },
        header: 'Reuniao',
        width: '70%'
      });

      ref.onClose.subscribe(res => {
        console.log(res)
        this.updateUI();
      });
    }

    delete(reg: Reuniao) {
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
