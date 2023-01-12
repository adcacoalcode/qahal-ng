import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';
import { CrudComponent } from './components/crud/crud.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { AuthGuard } from './core/guards/auth.guard';
@NgModule({
    imports: [
        RouterModule.forRoot(
            [
            {

                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardComponent},
                    {
                        path: 'igrejas',
                        loadChildren: () => import('./modules/igreja/igreja.module').then(m => m.IgrejaModule)
                    },
                    {
                        path: 'cargos',
                        loadChildren: () => import('./modules/cargo/cargo.module').then(m => m.CargoModule)
                    },
                    {
                        path: 'funcoes',
                        loadChildren: () => import('./modules/funcao/funcao.module').then(m => m.FuncaoModule)
                    },
                    {
                        path: 'grupos',
                        loadChildren: () => import('./modules/grupo/grupo.module').then(m => m.GrupoModule)
                    },
                    {
                        path: 'membros',
                        loadChildren: () => import('./modules/membro/membro.module').then(m => m.MembroModule)
                    },
                    {
                        path: 'reunioes',
                        loadChildren: () => import('./modules/reuniao/reuniao.module').then(m => m.ReuniaoModule)
                    },
                    {
                        path: 'usuarios',
                        loadChildren: () => import('./modules/usuario/usuario.module').then(m => m.UsuarioModule)
                    },
                    {path: 'uikit/formlayout', component: FormLayoutComponent},
                    {path: 'uikit/input', component: InputComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateComponent},
                    {path: 'uikit/button', component: ButtonComponent},
                    {path: 'uikit/table', component: TableComponent},
                    {path: 'uikit/list', component: ListComponent},
                    {path: 'uikit/tree', component: TreeComponent},
                    {path: 'uikit/panel', component: PanelsComponent},
                    {path: 'uikit/overlay', component: OverlaysComponent},
                    {path: 'uikit/media', component: MediaComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/message', component: MessagesComponent},
                    {path: 'uikit/misc', component: MiscComponent},
                    {path: 'uikit/charts', component: ChartsComponent},
                    {path: 'uikit/file', component: FileComponent},
                    {path: 'pages/crud', component: CrudComponent},
                    {path: 'pages/timeline', component: TimelineComponent},
                    {path: 'pages/empty', component: EmptyComponent},
                    {path: 'icons', component: IconsComponent},
                    {path: 'blocks', component: BlocksComponent},
                    {path: 'documentation', component: DocumentationComponent}
                ],
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard]
            },
            {path:'pages/landing', component: LandingComponent},
            {path:'pages/login', component: LoginComponent},
            {path:'pages/error', component: ErrorComponent},
            {path:'pages/notfound', component: NotfoundComponent},
            {path:'pages/access', component: AccessComponent},
            //{path: '**', redirectTo: 'pages/notfound'},
        ],
        {
            scrollPositionRestoration: 'enabled',
            anchorScrolling:'enabled',
            preloadingStrategy: PreloadAllModules,
            relativeLinkResolution: 'legacy',
            useHash: true
        }),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
