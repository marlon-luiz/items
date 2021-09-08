import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemFormComponent } from './item/item-form/item-form.component';

const routes: Routes = [
  { path: '', component: ItemListComponent },
  { path: 'create', component: ItemFormComponent },
  { path: ':id', component: ItemFormComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
