
import * as Json from "../../JsonDecoder";
import { TaggedJson } from "./TaggedJson";

// no type parameter for 'oneOf', but works
export const decodeTaggedJson_valid : Json.Decoder<TaggedJson> =
  Json.oneOf([
    Json.isnull<TaggedJson>({tag: "null", value: null}),
    Json.string.map<TaggedJson>(value => ({tag: "string", value: value})),
    Json.number.map<TaggedJson>(value => ({tag: "number", value: value})),
    Json.boolean.map<TaggedJson>(value => ({tag: "boolean", value: value})),
    Json.lazy(() => Json.array<TaggedJson>(decodeTaggedJson_valid).map<TaggedJson>(value => ({tag: "array", value: value}))),
    Json.lazy(() => Json.keyValues<TaggedJson>(decodeTaggedJson_valid).map<TaggedJson>(value => ({tag: "object", value: value})))
  ]);

/*
export const decodeTaggedJson_invalid1 : Json.Decoder<TaggedJson> =
  Json.oneOf<TaggedJson>([
    Json.isnull<TaggedJson>({tag: "null", value: null}),
    Json.string.map(value => ({tag: "string", value: value})), // no type parameter for 'map', does not compile
    Json.number.map<TaggedJson>(value => ({tag: "number", value: value})),
    Json.boolean.map<TaggedJson>(value => ({tag: "boolean", value: value})),
    Json.lazy(() => Json.array<TaggedJson>(decodeTaggedJson_invalid1).map<TaggedJson>(value => ({tag: "array", value: value}))),
    Json.lazy(() => Json.keyValues<TaggedJson>(decodeTaggedJson_invalid1).map<TaggedJson>(value => ({tag: "object", value: value})))
  ]);
*/

/*
export const decodeTaggedJson_invalid2 : Json.Decoder<TaggedJson> =
  Json.oneOf<TaggedJson>([
    Json.isnull<TaggedJson>({tag: "null", value: null}),
    Json.string.map<TaggedJson>(value => ({tag: "string", value: value})), 
    Json.number.map<TaggedJson>(value => ({tag: "string", value: value})), // using tag "string" instead of "number": does not compile
    Json.boolean.map<TaggedJson>(value => ({tag: "boolean", value: value})),
    Json.lazy(() => Json.array<TaggedJson>(decodeTaggedJson_invalid2).map<TaggedJson>(value => ({tag: "array", value: value}))),
    Json.lazy(() => Json.keyValues<TaggedJson>(decodeTaggedJson_invalid2).map<TaggedJson>(value => ({tag: "object", value: value})))
  ]);
*/

