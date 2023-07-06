const int = {
	isA: (a: number | string) => tonumber(a) !== undefined && (a as number) % 1 === 0,
	sizeof: (int: number) => {
		let bytes = 1;
		int < 0 && (int = -int - 1);

		// Limit to 127 to simulate a signed int
		while (int > 127 && bytes <= 6) {
			bytes++;
			int = int >> 8;
		}

		return bytes;
	},
	compress: (num: number) => {
		const size = int.sizeof(num);

		// Limit the size to 6 bytes to avoid using more bytes than necessary.
		return size <= 6 ? string.pack(`i${size}`, num) : num;
	},
	decompress: (compressed: string | number): number => {
		if (type(compressed) === "number") return math.floor(compressed as number);
		const length = (compressed as string).size();

		return string.unpack(`i${length}`, compressed as string)[0] as number;
	},
};

export = int;
