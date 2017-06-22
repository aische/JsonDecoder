/*
	string : Decoder<string>
	number : Decoder<number>
	boolean : Decoder<boolean>
	maybe: <a>(defaultValue: a, decoder: Decoder<a>): Decoder<a>
	nullable: <a>(decoder: Decoder<a>): Decoder<null|a>
	isnull: <a>(defaultValue:a): Decoder<a>
	isundefined: <a>(defaultValue:a): Decoder<a>
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
*/

export type Result<a> 
	= { ok : true, result : a }
	| { ok : false, error : string };

export function ok<a>(result:a):Result<a> {
	return { ok : true, result : result };
}

export function err<a>(error:string):Result<a> {
	return { ok : false, error : error };
}

export class Decoder<a> {
	constructor(
		private decode : (json:any) => Result<a>
	) { }

	run (json:any): Result<a> {
		return this.decode(json);
	}

	runThen<b>(json : any, onOk : (result : a) => b, onErr : (error : string) => b) : b {
		let r = this.run(json);
		if (r.ok == true) {
			return onOk(r.result);
		} else {
			return onErr(r.error);		
		}
	}

	runPromise<b>(json : any) : Promise<a> { 
		return new Promise<a>((resolve, reject) => { 
    		let r = this.run(json);
			if (r.ok == true) {
				return resolve(r.result);
			} else {
				return reject(r.error);		
			}
		});
	}

	map <b>(f: (value:a) => b): Decoder<b> {
		return new Decoder<b>(
			(json:any) => {
				let r = this.decode(json);
				// "if (r.ok == true)" looks funny, but without "== true" SublimeText will show an error, although it compiles with tsc 2.1.6
				if (r.ok == true) {					
					return ok(f(r.result));
				} else {
					return r; 
				}
			}
		);
	}

	then <b>(f: (value:a) => Decoder<b>): Decoder<b> {
		return new Decoder<b>(
			(json:any) => {
				let r = this.decode(json);
				if (r.ok == true) {					
					return f(r.result).run(json);
				} else {
					return r; 
				}
			}
		);
	}

	/*
	// is a "cast" method needed? or can we cast to a union in the result type annotation without such a method?
	unite<b>():Decoder<a|b> { 
		return new Decoder<a|b>(
			(json:any) => <Result<a|b>>this.decode(json)
		);
	}
	*/
}

export function lazy <a>(mkDecoder: () => Decoder<a>): Decoder<a> {
	return new Decoder((json:any) => mkDecoder().run(json));
}

export const string : Decoder<string> = new Decoder<string>(
	(json:any) => {
		if (typeof json === "string") {
			return ok<string>(json);
		} else {
			return err<string>("not a string: " + JSON.stringify(json));
		}
	}
);

export const number : Decoder<number> = new Decoder<number>(
	(json:any) => {
		if (typeof json === "number") {
			return ok<number>(json);
		} else {
			return err<number>("not a number: " + JSON.stringify(json));
		}
	}
);

export const boolean : Decoder<boolean> = new Decoder<boolean>(
	(json:any) => {
		if (typeof json === "boolean") {
			return ok<boolean>(json);
		} else {
			return err<boolean>("not a boolean: " + JSON.stringify(json));
		}
	}
);

export type DecoderObject<a> = {
	[t in keyof a]: Decoder<a[t]>
};

export function object <a>(decoders: DecoderObject<a>): Decoder<a> {
	return new Decoder<a>(
		(json:any) => {
			if ((json !== null) && (typeof json == "object")) {
				let result : any = {};
				for(let key in decoders) {
					if (decoders.hasOwnProperty(key)) {
						let r = decoders[key].run(json[key]);
						if (r.ok == true) {					
							result[key] = r.result;
						} else {
							return err<a>("at key " + key + ": " + r.error);
						}
					}
				}
				return ok<a>(result);
			} else {
				return err<a>("not an object: " + JSON.stringify(json))
			}
		}
	);	
}

export function maybe <a>(defaultValue:a, decoder: Decoder<a>) : Decoder<a> {
	return new Decoder<a>(
		(json:any) => {
			let r = decoder.run(json);
			if (r.ok == true) {					
				return r;
			} else {
				return ok<a>(defaultValue); 
			}
		}
	);	
}

export function nullable <a>(decoder: Decoder<a>) : Decoder<a|null> {
	return new Decoder<a|null>(
		(json:any) => {
			let r = decoder.run(json);
			if (r.ok == true) {					
				return r;
			} else {
				return ok<a|null>(null); 
			}
		}
	);	
}

export function oneOf<a>(decoders: Array<Decoder<a>>) : Decoder<a> {
	return new Decoder<a>(
		(json:any) => {
			for (let i:number = 0; i<decoders.length; i++) {
				let r = decoders[i].run(json);
				if (r.ok == true) {					
					return r;
				} 
			}
			return err<a>("no matching decoder: " + JSON.stringify(json));
		}
	);	
}

export const keyValues = <a>(decoder: Decoder<a>): Decoder<{[name:string]: a}> => {
	return new Decoder<{[name:string]: a}>(
		json => {
			if ((json !== null) && (typeof json === "object")) {
				let obj : {[name:string]: a} = {};
				for (let key in json) {
					if (json.hasOwnProperty(key)) {
						let r = decoder.run(json[key]);
						if (r.ok == true) {					
							obj[key] = r.result;
						} else {
							return err<{[name:string]: a}>(r.error);
						}
					}
				}
				return ok<{[name:string]: a}>(obj);
			} else {
				return err<{[name:string]: a}>("not an object: " + JSON.stringify(json))
			}
		}
	);	
};

export const array = <a>(decoder: Decoder<a>): Decoder<Array<a>> => {
	return new Decoder<Array<a>>(
		json => {
			if (json instanceof Array) {
				let arr : Array<a> = [];
				for (let i=0; i<json.length; i++) {
					let r = decoder.run(json[i]);
					if (r.ok == true) {					
						arr.push(r.result);
					} else {
						return err<Array<a>>(r.error);
					}
				}
				return ok<Array<a>>(arr);
			} else {
				return err<Array<a>>("not an array: " + JSON.stringify(json));
			}
		}
	);
};

export function isnull <a>(defaultValue:a): Decoder<a> {
	return new Decoder(
		(json:any) => {
			if (json === null) {
				return ok<a>(defaultValue);
			} else {
				return err<a>("is not null: " + JSON.stringify(json));
			}
		}
	);
}

export function isundefined <a>(defaultValue:a): Decoder<a> {
	return new Decoder(
		(json:any) => {
			if (json === undefined) {
				return ok<a>(defaultValue);
			} else {
				return err<a>("is not undefined: " + JSON.stringify(json));
			}
		}
	);
}

export const constant = <a>(value:a): Decoder<a> => {
	return new Decoder<a>((json:any) => ok(value));
};


export function isexactly <a>(value:a): Decoder<a> {
	return new Decoder(
		(json:any) => {
			if (json === value) {
				return ok<a>(value);
			} else {
				return err<a>("is not exactly '" + value + "': " + JSON.stringify(json));
			}
		}
	);
}

