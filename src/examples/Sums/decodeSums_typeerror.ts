
import * as Json from "../../JsonDecoder";
import { Sums } from "./Sums";

/*
let decodeSums1 : Json.Decoder<Sums> = Json.object<Sums>({
  xxx: Json.oneOf<boolean|number|null>([Json.boolean, Json.number]), // null not assignable: does not compile
  yyy: Json.nullable(Json.string),
  zzz: Json.oneOf<string|boolean|number>([Json.string, Json.boolean, Json.number])
});
*/

/*
let decodeSums2 : Json.Decoder<Sums> = Json.object<Sums>({
  xxx: Json.oneOf<boolean|number>([Json.boolean, Json.number]), 
  yyy: Json.oneOf([Json.string, Json.isnull(null)]), 
  zzz: Json.oneOf([Json.string, Json.boolean, Json.number]) // missing type annotation: does not compile
});
*/