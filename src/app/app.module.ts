import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemFormComponent } from './item/item-form/item-form.component';

import { ItemService } from './item/item.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarMenuComponent,
    ItemListComponent,
    ItemFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MenuModule,
    TableModule,
    ButtonModule,
    RadioButtonModule,
    CheckboxModule,
    CalendarModule,
    ConfirmDialogModule,
    ToastModule,
    CardModule,
    CurrencyMaskModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    ConfirmationService,
    MessageService,
    ItemService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

registerLocaleData(ptBr);
