import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { ExibeCardsComponent } from './componentes/exibe-cards/exibe-cards.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { CustomReuseStrategy } from './custom-reuse-estrategy';

const routes: Routes = [
  {
    path: 'bares-formulario/:id',
    component: FormularioComponent
  },
  {
    path: '',
    component: ExibeCardsComponent,
    data: {
      reuseComponent: true
    }
  },
  {
    path: 'cafes',
    component: ExibeCardsComponent,
    data: {
      reuseComponent: true
    }
  },
  {
    path: 'bares-formulario',
    component: FormularioComponent
  },
  {
    path: 'cafes-formulario',
    component: FormularioComponent
  },
  {
    path: 'cafes-formulario/:id',
    component: FormularioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ]
})
export class AppRoutingModule { }
