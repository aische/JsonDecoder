
import * as Json from "../../JsonDecoder";
import { User, user_json, user_json_invalid } from "./User";

export const decodeUser : Json.Decoder<User> = Json.object<User>({
  firstname : Json.string, 
  lastname : Json.string, 
  age : Json.number,
  active: Json.boolean
});

export function test():void {
	console.log("decodeUser user_json", decodeUser.run(user_json));
	console.log("decodeUser user_json_invalid", decodeUser.run(user_json_invalid));
}

