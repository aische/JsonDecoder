
export type TaggedJson 
  = { tag: "null", value: null }
  | { tag: "string", value: string }
  | { tag: "number", value: number }
  | { tag: "boolean", value: boolean }
  | { tag: "array", value: Array<TaggedJson> }
  | { tag: "object", value: {[name:string]: TaggedJson} };

