import { UnitMeasurementType } from '../unit-measurement/unit-measurement.enum';

export interface Item {
  id?: number;
  name: string;
  unitMeasurement: UnitMeasurementType;
  quantity?: number;
  price: number;
  perishableProduct: boolean;
  expirationDate?: Date;
  manufactureDate: Date;
}
