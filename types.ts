
export interface MobilePhone {
  id: string;
  name: string;
  brand: string;
  price: number;
  currency: string;
  image: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    camera: string;
    battery: string;
    os: string;
  };
  releaseDate: string;
  rating: number;
  isTrending?: boolean;
}

export interface Brand {
  name: string;
  count: number;
  logo?: string;
}

export enum ViewMode {
  GRID = 'GRID',
  LIST = 'LIST',
}
