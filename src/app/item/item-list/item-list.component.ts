import { UnitMeasurementType } from './../../unit-measurement/unit-measurement.enum';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ItemService } from './../item.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private service: ItemService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getItems().subscribe((items) => (this.items = items));
  }

  addItem() {
    this.router.navigate(['create']);
  }

  editItem(id: number) {
    this.router.navigate([id]);
  }

  removeItem(id: number) {
    this.confirmationService.confirm({
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      message: 'Tem certeza que deseja excluir este item?',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.service.removeItem(id);

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Item excluído com sucesso.',
        });

        this.service.getItems().subscribe((items) => (this.items = items));
      },
    });
  }

  isNumber(value: any) {
    return !isNaN(value);
  }

  isUnit(unitMeasurement: string): boolean {
    return unitMeasurement === UnitMeasurementType.Unit;
  }
}
