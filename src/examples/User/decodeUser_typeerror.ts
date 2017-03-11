
import * as Json from "../../JsonDecoder";
import { User, user_json, user_json_invalid } from "./User";

let decodeUser : Json.Decoder<User> = Json.object<User>({
  firstname : Json.string, 
  lastname : Json.string, 
  age : Json.number,
  active: Json.string // string instead of expected boolean: expected type error
});
console.log("decodeUser user_json", decodeUser.run(user_json));
console.log("decodeUser user_json_invalid", decodeUser.run(user_json_invalid));

