
import * as Json from "../../JsonDecoder";
import { User, user_json, user_json_invalid } from "./User";

export const decodeUser : Json.Decoder<User> = Json.object<User>({
  firstname : Json.string, 
  lastname : Json.string, 
  age : Json.number,
  active: Json.boolean
});

export function test():void {
	decodeUser.runPromise(user_json).then((res) => {
		return console.log("decodeUser user_json", res);	
	});
	decodeUser.runPromise(user_json_invalid).then((res) => {
		return console.log("decodeUser user_json_invalid", res);	
	}).catch((rej) => {
		return console.log("rejected: decodeUser user_json_invalid", rej);	
	})
}

