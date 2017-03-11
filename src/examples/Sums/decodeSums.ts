
import * as Json from "../../JsonDecoder";
import { Sums, sums_json1, sums_json2, sums_json_invalid } from "./Sums";



let decodeSums1 : Json.Decoder<Sums> = Json.object<Sums>({
  xxx: Json.oneOf<boolean|number>([Json.boolean, Json.number]), 
  yyy: Json.nullable(Json.string),
  zzz: Json.oneOf<string|boolean|number>([Json.string, Json.boolean, Json.number])
});

let decodeSums2 : Json.Decoder<Sums> = Json.object<Sums>({
  xxx: Json.oneOf<boolean|number>([Json.boolean, Json.number]), 
  yyy: Json.oneOf([Json.string, Json.isnull(null)]), // why does this work without type annotation?
  zzz: Json.oneOf<string|boolean|number>([Json.string, Json.boolean, Json.number])
});

export function test():void {
	console.log(JSON.stringify(decodeSums1.run(sums_json1)));
	console.log(JSON.stringify(decodeSums1.run(sums_json2)));
	console.log(JSON.stringify(decodeSums1.run(sums_json_invalid)));

	console.log(JSON.stringify(decodeSums2.run(sums_json1)));
	console.log(JSON.stringify(decodeSums2.run(sums_json2)));
	console.log(JSON.stringify(decodeSums2.run(sums_json_invalid)));
}

test();

