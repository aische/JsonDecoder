
export type BT<a> = {
  value : a,
  left? : BT<a>,
  right? : BT<a>
};


// can be decoded as BT<number>
export const json_bt1 : any = { value:1, left: { value:13, right: { value:1, left: { value:13 }, right: { value:12, right: { value:1, left: { value:13, right: { value:1, left: { value:13 }, right: { value:12 }} }, right: { value:12 }} }} }, right: { value:12 }};

export const json_bt1_invalid : any = { value:1, left: { value:13, right: { value:1, left: { xxxxx_value:13 }, right: { value:12, right: { value:1, left: { value:13, right: { value:1, left: { value:13 }, right: { value:12 }} }, right: { value:12 }} }} }, right: { value:12 }};

