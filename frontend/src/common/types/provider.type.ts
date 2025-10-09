export interface RenterCustomer {
  _id: string;
  id: string;
  username: string;
  email: string;
}

export interface RenterVehicle {
  _id: string;
  make: string;
  model: string;
  licensePlate: string;
  pricePerDay: number;
  providerId: string;
}

export interface ProviderRenterBooking {
  _id: string;
  bookingStartAt: string;
  bookingEndAt: string;
  totalPrice: number;
  status: string;
  vehicleId: RenterVehicle;
  customerId: string;
  customer?: RenterCustomer | null;
}

export interface ProviderRenterResponse {
  message: string;
  data: ProviderRenterBooking[];
}
