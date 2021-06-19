export interface Order {
  pasta: string;
  size: string;
  flavor: string;
}

export interface OfferProps {
  pizza: Order;
  offerInfos: {
    description: string;
  };
}

export interface User {
  name: string;
  email: string;
  password: string;
  points: number;
  isAuthenticated: boolean;
}
