
export type SupplyWithAmount = {
  id: string;
  amount: number;
};

export enum RequestStatus {
  New = 0,
  InTransit = 1,
  Delivered = 2,
  Invalid = 3,
  Expired = 4,
};

export type Request = {
  id: number;
  city_id: number;
  userName: string;
  userPhoneNumber: string;
  userComments: string;
  supplies: SupplyWithAmount[];
  status: RequestStatus;
  date: Date;
  deliveryDate: Date | undefined;
};

// TODO: Remove when we have a BE ready.
export const fakeRequests: Request[] = [
  {
    id: 1,
    city_id: 13,
    userName: "Anton",
    userPhoneNumber: "911",
    supplies: [
      {
        id: "Baby: Cookies",
        amount: 13,
      },
      {
        id: "Breakfast: Cereal",
        amount: 7
      }
    ],
    status: RequestStatus.New,
    userComments: "really really need it",
    date: new Date(2022, 4, 27),
    deliveryDate: undefined,
  },
  {
    id: 2,
    city_id: 23,
    userName: "Anton",
    userPhoneNumber: "911",
    supplies: [
      {
        id: "Breakfast: Granola",
        amount: 26,
      },
      {
        id: "Household: Dish Soap",
        amount: 9
      }
    ],
    status: RequestStatus.New,
    userComments: "can wait a few days",
    date: new Date(2022, 4, 27),
    deliveryDate: undefined,
  },
];
