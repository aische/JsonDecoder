
export type User = {
  firstname : string,
  lastname : string,
  age : number,
  active : boolean
};

export const user_json : any = {
  firstname : "John",
  lastname : "Doe",
  age : 99,
  active : false
};

export const user_json_invalid : any = {
  firstname : "John",
  lastName : "Doe", // invalid camelCase
  age : 99,
  active : false
};

