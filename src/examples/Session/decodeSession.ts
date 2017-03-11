
import * as Json from "../../JsonDecoder";
import { Session, User, Payment, Tracking, session_json, session_json2, session_json_invalid } from "./Session";

export const decodeSession : Json.Decoder<Session> = Json.object<Session>({
  id : Json.string,
  name : Json.object<User>({
    firstname : Json.string,
    lastname : Json.string
  }),
  payment : Json.object<Payment>({
    iban : Json.string,
    valid : Json.boolean,
    account_holder : Json.maybe<undefined|User>(undefined, Json.object<User>({
      firstname : Json.string,
      lastname : Json.string      
    }))
  }),
  tracking : Json.object<Tracking>({
    uid : Json.string,
    ga : Json.string
  }),
  addons : Json.array(Json.string)
});

// without annotations
export const decodeSession1 : Json.Decoder<Session> = Json.object({
  id : Json.string,
  name : Json.object({
    firstname : Json.string,
    lastname : Json.string
  }),
  payment : Json.object({
    iban : Json.string,
    valid : Json.boolean,
    account_holder : Json.maybe(undefined, Json.object({
      firstname : Json.string,
      lastname : Json.string      
    }))
  }),
  tracking : Json.object({
    uid : Json.string,
    ga : Json.string
  }),
  addons : Json.array(Json.string)
});

export function test():void {
  console.log("decodeSession session_json", JSON.stringify(decodeSession.run(session_json)));
  console.log("decodeSession1 session_json", JSON.stringify(decodeSession1.run(session_json)));
	console.log("decodeSession session_json2", JSON.stringify(decodeSession.run(session_json2)));
	console.log("decodeSession1 session_json2", JSON.stringify(decodeSession1.run(session_json2)));
	console.log("decodeSession session_json_invalid", JSON.stringify(decodeSession.run(session_json_invalid)));
	console.log("decodeSession1 session_json_invalid", JSON.stringify(decodeSession1.run(session_json_invalid)));
}

test();