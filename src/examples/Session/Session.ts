
export type User = {
  firstname : string,
  lastname : string  
};

export type Payment = {
  iban : string,
  valid : boolean,
  account_holder? : User
};

export type Tracking = {
  uid : string,
  ga : string  
};

export type Session = {
  id : string,
  name : User,
  payment : Payment,
  tracking : Tracking,
  addons : Array<string>
};

export const session_json : any = {
  id : "xy-12345",
  name : {
    firstname : "John",
    lastname : "Doe"
  },
  payment : {
    iban : "DE123456435343434343",
    valid : false,
  },
  tracking : {
    uid : "3242314-jk4jle-3124324",
    ga : "djsakdasjdkasdkaskdl"
  },
  addons : [
    "foo",
    "bar"
  ]
};

export const session_json2 : any = {
  id : "xy-12345",
  name : {
    firstname : "John",
    lastname : "Doe"
  },
  payment : {
    iban : "DE123456435343434343",
    valid : false,
    account_holder: {
      firstname : "Donald",
      lastname : "Duck"
    }
  },
  tracking : {
    uid : "3242314-jk4jle-3124324",
    ga : "djsakdasjdkasdkaskdl"
  },
  addons : [
    "foo",
    "bar"
  ]
};

export const session_json_invalid : any = {
  id : "xy-12345",
  name : {
    firstname : "John",
    lastname : "Doe"
  },
  payment : {
    iban : "DE123456435343434343",
    valid : false,
  },
  tracking : {
    uid : "3242314-jk4jle-3124324",
    ga : "djsakdasjdkasdkaskdl"
  },
  addons : [
    "foo",
    "bar",
    true
  ]
};
