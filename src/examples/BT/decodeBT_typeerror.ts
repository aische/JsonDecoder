
import * as Json from "../../JsonDecoder";
import { BT, json_bt1, json_bt1_invalid } from "./BT";

/*
export function decodeBT1_invalid1<a>(decoder: Json.Decoder<a>) : Json.Decoder<BT<a>> {
  return Json.object<BT<a>>({
    xxx_value: decoder, // wrong property name, does not compile
    left: Json.maybe<undefined|BT<a>>(undefined, Json.lazy(() => decodeBT1_invalid1(decoder))),
    right: Json.maybe<undefined|BT<a>>(undefined, Json.lazy(() => decodeBT1_invalid1(decoder)))
  });
}
*/

export function decodeBT1_invalid2<a>(decoder: Json.Decoder<a>) : Json.Decoder<BT<a>> {
  return Json.object<BT<a>>({
    value: decoder,
    left: Json.lazy(() => decodeBT1_invalid2(decoder)), // this does compile, but will not work at runtime because no bottom case.
    right: Json.maybe<undefined|BT<a>>(undefined, Json.lazy(() => decodeBT1_invalid2(decoder)))
  });
}


/*
export function decodeBT_invalid1<a>(decoder: Json.Decoder<a>) : Json.Decoder<BT<a>> {
  return Json.object<BT<a>>({
    value: decoder,
    left: Json.oneOf([Json.isundefined(null), Json.lazy(() => decodeBT_invalid1(decoder))]), // null instead of undefined, does not compile
    right: Json.oneOf([Json.isundefined(undefined), Json.lazy(() => decodeBT_invalid1(decoder))])
  });
}
*/

