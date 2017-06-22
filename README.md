# JsonDecoder for Typescript 

ts version 2.2.1

#### running the examples

cd src
npm install
tsc main.ts
node main.js


#### Example

    import * as Json from "./JsonDecoder";

    type SomeDataType = {
        id: string,
        name: {
            firstname: string,
            lastname: string
        },
        hobbies: Array<string>,
        numbersAndStrings: Array<number|string>,
        optionalBoolean?: boolean
    };

    const decodeSomeDataType = Json.object<SomeDataType>({
        id: Json.string,
        name: Json.object({
            firstname: Json.string,
            lastname: Json.string
        }),
        hobbies: Json.array(Json.string),
        numbersAndStrings: Json.array(Json.oneOf<number|string>([Json.number, Json.string])),
        optionalBoolean: Json.maybe(undefined, Json.boolean)
    });

    console.log(decodeSomeDataType.run({
        id: "xy-12342",
        name: {
            firstname: "John",
            lastname: "Doe"
        },
        hobbies: [
            "Tennis",
            "Sleeping"
        ],
        numbersAndStrings: [
            1, 
            2,
            "foo",
            3,
            "bar"
        ]
    }));


#### Combinators

    string : Decoder<string>
    
    number : Decoder<number>
    
    boolean : Decoder<boolean>
    
    maybe: <a>(defaultValue: a, decoder: Decoder<a>): Decoder<a>
    
    nullable: <a>(decoder: Decoder<a>): Decoder<null|a>
    
    isnull: <a>(defaultValue:a): Decoder<a>
    
    isundefined: <a>(defaultValue:a): Decoder<a>

    isexactly: <a>(value:a): Decoder<a>
    
    array: (decoder: Decoder<a>): Decoder<Array<a>>
    
    keyValues: <a>(decoder: Decoder<a>): Decoder<{[name:string]: a}>
    
    oneOf: (decoders: Array<Decoder<a>>): Decoder<a>
    
    constant: <a>(value:a): Decoder<a>
    
    lazy: <a>(mkDecoder: () => Decoder<a>): Decoder<a>
    
    object: <a>(decoders: DecoderObject<a>): Decoder<a>

    type DecoderObject<a> = {[t in keyof a]: Decoder<a[t]>}
    
    decoder.map(f)
    
    decoder.then(f)
    
    decoder.run(json)
    
    decoder.runThen(json, onOk, onErr)

    decoder.runPromise(json) : Promise<a>
    
