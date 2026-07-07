export interface ICar {
  id: string;
  licensePlate: string;
  brand: string;
  model: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}
