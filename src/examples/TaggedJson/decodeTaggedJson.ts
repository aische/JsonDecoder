
import * as Json from "../../JsonDecoder";
import { TaggedJson } from "./TaggedJson";

export const decodeTaggedJson : Json.Decoder<TaggedJson> =
  Json.oneOf<TaggedJson>([
    Json.isnull<TaggedJson>({tag: "null", value: null}),
    Json.string.map<TaggedJson>(value => ({tag: "string", value: value})),
    Json.number.map<TaggedJson>(value => ({tag: "number", value: value})),
    Json.boolean.map<TaggedJson>(value => ({tag: "boolean", value: value})),
    Json.lazy(() => Json.array<TaggedJson>(decodeTaggedJson).map<TaggedJson>(value => ({tag: "array", value: value}))),
    Json.lazy(() => Json.keyValues<TaggedJson>(decodeTaggedJson).map<TaggedJson>(value => ({tag: "object", value: value})))
  ]);

export function test():void {
	console.log(JSON.stringify(decodeTaggedJson.run({x:1, y:{a:3,b:true,c:"hello"}, z:[1,2,3, true, "xy"]})));
}

test();

