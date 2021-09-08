import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ItemService } from '../item.service';
import { UnitMeasurementType } from './../../unit-measurement/unit-measurement.enum';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup = this.formBuilder.group(
    {
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[a-z\s]+$/i),
      ]),
      unitMeasurement: this.formBuilder.control(UnitMeasurementType.Liter, [
        Validators.required,
      ]),
      quantity: this.formBuilder.control('', [Validators.required]),
      price: this.formBuilder.control('', [
        Validators.required,
        Validators.min(0.01),
      ]),
      perishableProduct: this.formBuilder.control(false, [Validators.required]),
      expirationDate: this.formBuilder.control(''),
      manufactureDate: this.formBuilder.control('', [Validators.required]),
    },
    { validators: this.validate }
  );

  unitMeasurementOptions = [
    { label: 'Litros', value: UnitMeasurementType.Liter },
    { label: 'Quilogramas', value: UnitMeasurementType.Kilogram },
    { label: 'Unidades', value: UnitMeasurementType.Unit },
  ];

  validate(group: AbstractControl): { [key: string]: boolean } {
    const quantity = group.get('quantity')?.value;
    const perishableProduct = group.get('perishableProduct')?.value;
    const expirationDate = group.get('expirationDate')?.value;
    const manufactureDate = group.get('manufactureDate')?.value;

    let errors = {};

    if (quantity <= 0) {
      errors = { ...errors, quantityRequired: true };
    }
    if (expirationDate && manufactureDate > expirationDate) {
      errors = { ...errors, manufactureGreaterThanExpiration: true };
    }
    if (perishableProduct && !expirationDate) {
      errors = { ...errors, expirationDateRequired: true };
    }

    return errors;
  }

  constructor(
    private itemService: ItemService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.itemForm.get('unitMeasurement')?.valueChanges.subscribe((value) => {
      if (value === UnitMeasurementType.Unit) {
        const quantity = Math.floor(this.itemForm.get('quantity')?.value || 0);

        this.itemForm.patchValue({ quantity });
      }
    });

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.itemService.getItem(id).subscribe((item) => {
        const { expirationDate, manufactureDate, ...rest } = item;

        this.itemForm.patchValue({
          expirationDate: expirationDate ? new Date(expirationDate) : null,
          manufactureDate: manufactureDate ? new Date(manufactureDate) : null,
          ...rest,
        });
      });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.itemForm.get(controlName);

    return !!control && control.invalid && (control.touched || control.dirty);
  }

  getQuantityPrecision(): number {
    const unitMeasurement = this.itemForm.get('unitMeasurement')?.value;

    return unitMeasurement === UnitMeasurementType.Unit ? 0 : 3;
  }

  getUnitMeasurementLabel(): string {
    return this.itemForm.get('unitMeasurement')?.value;
  }

  isProductExpired(): boolean {
    const expirationDate = this.itemForm.get('expirationDate')?.value;

    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    return expirationDate && new Date(expirationDate) < now;
  }

  submitForm(e: Event): void {
    e.preventDefault();

    let detail;

    const formValue = this.itemForm.value;
    const id = this.route.snapshot.params['id'];

    try {
      if (!id) {
        this.itemService.addItem(formValue);
        detail = 'Item adicionado com sucesso.';
      } else {
        this.itemService.alterItem(id, formValue);
        detail = 'Item alterado com sucesso.';
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail,
      });

      this.router.navigate(['']);
    } catch (error) {
      if (error instanceof Error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: error.message,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: String(error),
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['']);
  }
}
