export interface UserI {
  data: {
    [users: string]: [
      {
        ['name']: {
          secondLastName: string;
          lastName: string;
          names: string;
          displayName: string;
        };
        ['avatar']: {original: string; small: string};
        _id: string;
        email: string;
      }
    ];
  };
}
