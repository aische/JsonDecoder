
import * as Json from "../../JsonDecoder";
import { BT, json_bt1, json_bt1_invalid } from "./BT";


export function decodeBT1<a>(decoder: Json.Decoder<a>) : Json.Decoder<BT<a>> {
  return Json.object<BT<a>>({
    value: decoder,
    left: Json.maybe<undefined|BT<a>>(undefined, Json.lazy(() => decodeBT1(decoder))),
    right: Json.maybe<undefined|BT<a>>(undefined, Json.lazy(() => decodeBT1(decoder)))
  });
}



// strict version: expects valid BT or undefined
export function decodeBT<a>(decoder: Json.Decoder<a>) : Json.Decoder<BT<a>> {
  return Json.object<BT<a>>({
    value: decoder,
    left: Json.oneOf([Json.isundefined(undefined), Json.lazy(() => decodeBT(decoder))]),
    right: Json.oneOf([Json.isundefined(undefined), Json.lazy(() => decodeBT(decoder))])
  });
}

export function test():void {
	console.log("decodeBT1: json_bt1", JSON.stringify(decodeBT1(Json.number).run(json_bt1)));
	console.log("decodeBT1: json_bt1_invalid", JSON.stringify(decodeBT1(Json.number).run(json_bt1_invalid)));
	console.log("decodeBT: json_bt1", JSON.stringify(decodeBT(Json.number).run(json_bt1)));
	console.log("decodeBT: json_bt1_invalid", JSON.stringify(decodeBT(Json.number).run(json_bt1_invalid)));
}

test();
