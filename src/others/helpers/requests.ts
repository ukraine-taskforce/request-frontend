
export type SupplyWithAmount = {
  id: string;
  amount: number;
};

export enum RequestStatus {
  New,
  InTransit,
  Delivered,
  Invalid,
  Expired,
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
        id: "water",
        amount: 13,
      },
      {
        id: "food",
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
        id: "water",
        amount: 26,
      },
      {
        id: "food",
        amount: 9
      }
    ],
    status: RequestStatus.New,
    userComments: "can wait a few days",
    date: new Date(2022, 4, 27),
    deliveryDate: undefined,
  },
];
