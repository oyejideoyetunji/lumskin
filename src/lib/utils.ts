export function delimitNumber(number: number) {
    return number < 1000
        ? number.toString()
        : number
            .toString()
            .split(".")
            .map((num, idx) => {
                return idx === 0
                    ? num
                        .split('')
                        .reverse()
                        .map((el, idx) => {
                            return idx % 3 === 0 && idx !== 0
                                ? `${el},`
                                : el;
                        })
                        .reverse()
                        .join("")
                    : num;
            })
            .join(".");
}