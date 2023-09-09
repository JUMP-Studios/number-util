import { HttpService } from "@rbxts/services";

const Base16 = {
	isA: (a: string) => {
		return type(a) === "string" && a.size() % 2 === 0 && tonumber(a, 16) !== undefined;
	},
	toDecimal: (a: string) => {
		return tonumber(a, 10);
	},
	compress: (a: string) => {
		if (!Base16.isA(a)) return;

		return string.gsub(a, "..", (twoChars) => {
			return string.char(tonumber(twoChars, 16) as number);
		})[0] as string;
	},
	decompress: (a: string) => {
		if (type(a) !== "string") return;

		return a.gsub(".", (c) => {
			return string.format("%02X", c.byte()[0]);
		})[0];
	},
	random: (length: number, object?: Record<string, unknown> | Map<string, unknown>): string => {
		if (length % 2 !== 0) throw "Cannot pass an odd length string";

		let random = (string.gsub(HttpService.GenerateGUID(false), "-", "") as unknown as string)
			.sub(1, length)
			.upper();

		if ((object as Record<string, unknown>)?.[random] !== undefined) {
			random = Base16.random(length, object)!;
		}

		return random;
	},
};

export = Base16;
