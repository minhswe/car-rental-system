export enum UserRole {
  ADMIN = "Admin",
  PROVIDER = "Provider",
  CUSTOMER = "Customer",
}

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  INPROCESS = "in-process",
}

export enum VehicleMake {
  //Hãng xe Nhật Bản
  TOYOTA = "Toyota",
  HONDA = "Honda",
  MAZDA = "Mazda",
  MITSUBISHI = "Mitsubishi",
  NISSAN = "Nissan",
  SUZUKI = "Suzuki",
  ISUZU = "Isuzu",
  SUBARU = "Subaru",
  LEXUS = "Lexus",

  //Hãng xe Hàn Quốc
  HYUNDAI = "Hyundai",
  KIA = "Kia",
  GENESIS = "Genesis",

  //Hãng xe Mỹ
  FORD = "Ford",
  CHEVROLET = "Chevrolet",

  //Hãng xe Việt Nam
  VINFAST = "VinFast",

  //Hãng xe Đức
  MERCEDES_BENZ = "Mercedes-Benz",
  BMW = "BMW",
  AUDI = "Audi",
  VOLKSWAGEN = "Volkswagen",
  PORSCHE = "Porsche",

  //Hãng xe Anh
  LAND_ROVER = "Land Rover",
  JAGUAR = "Jaguar",
  MINI = "Mini",

  //Hãng xe Ý
  FERRARI = "Ferrari",
  LAMBORGHINI = "Lamborghini",
  MASERATI = "Maserati",
  ALFA_ROMEO = "Alfa Romeo",

  //Hãng xe Pháp
  PEUGEOT = "Peugeot",
  RENAULT = "Renault",

  //Hãng xe Trung Quốc
  BYD = "BYD",
  DONGFENG = "Dongfeng",
  HAVAL = "Haval",
  GEELY = "Geely",
  ZEEKR = "Zeekr",
  AION = "Aion",
  WULING = "Wuling",

  //Hãng xe khác
  VOLVO = "Volvo", //Thụy Điển
  SSANGYONG = "SsangYong", // Hàn Quốc
  JEEP = "Jeep", // Mỹ
  RAM = "Ram", // Mỹ
  SKODA = "Skoda", //Cộng hòa Séc
  BENTLEY = "Bentley", // Anh
  ROLLS_ROYCE = "Rolls-Royce", // Anh
  ASTON_MARTIN = "Aston Martin", // Anh
  JAECOO = "Jaecoo", // Trung Quốc
  OMODA = "Omoda", // Trung Quốc
  HONGQI = "Hongqi", //Trung Quốc
  MG = "MG", //Trung Quốc
  INFINITI = "Infiniti", // Nhật Bản
  FIAT = "Fiat", // Ý
  TERACO = "Teraco", // Hàn Quốc (xe tải)
}

export enum VehicleFuelType {
  PETROL = "Petrol",
  DIESEL = "Diesel",
  ELECTRIC = "Electric",
  HYBRID = "Hybrid",
}

export enum VehicleTransmission {
  MANUAL = "Manual",
  AUTOMATIC = "Automatic",
  CVT = "CVT",
}

export enum VehicleStatus {
  AVAILABLE = "Available",
  UNAVAILABLE = "Unavailable",
  IN_MAINTENANCE = "In Maintenance",
  BOOKED = "Booked",
  WAITING_FOR_APPROVAL = "Waiting for Approval",
  WWAITING_FOR_PICKUP = "Waiting for Pickup",
  REJECTED = "Rejected",
}

export enum MessageSenderType {
  USER = "User",
  PROVIDER = "Provider",
}

export enum VehicleInsurance {
  BAOVIET = "Bảo Việt",
  PVI = "PVI",
  PTI = "PTI",
  BIC = "BIC",
  MIC = "MIC",
  BAOMINH = "Bảo Minh",
  VIETTELMONEY = "Viettel Money",
  VNI = "VNI",
  LIBERTY = "Liberty",
  MOMO = "MoMo",
  PIJICO = "Pjico",
  AIA = "AIA",
  ANOTHER = "Others...",
}
