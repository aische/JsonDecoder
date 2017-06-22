
import * as BT from "./BT/decodeBT";
import * as TaggedJson from "./TaggedJson/decodeTaggedJson";
import * as User from "./User/decodeUser";
import * as Sums from "./Sums/decodeSums";
import * as Session from "./Session/decodeSession";

export function test():void {
  BT.test();
  TaggedJson.test();
  User.test();
  Sums.test();
  Session.test();
}
