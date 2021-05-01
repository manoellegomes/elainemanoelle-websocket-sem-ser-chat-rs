import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidosDetailsComponent } from './pedidos-details/pedidos-details.component';
import { AddPedidosComponent } from './add-pedidos/add-pedidos.component';
import { EditPedidosComponent } from './edit-pedidos/edit-pedidos.component';

const routes: Routes = [
  {
    path: 'pedidos',
    component: PedidosComponent,
    data: { title: 'List of Pedidos' }
  },
  {
    path: 'pedidos-details/:id',
    component: PedidosDetailsComponent,
    data: { title: 'Pedidos Details' }
  },
  {
    path: 'add-pedidos',
    component: AddPedidosComponent,
    data: { title: 'Adicionar Pedido' }
  },
  {
    path: 'edit-pedidos/:id',
    component: EditPedidosComponent,
    data: { title: 'Edit Pedidos' }
  },
  { path: '',
    redirectTo: '/pedidos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
