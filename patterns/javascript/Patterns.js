const inverted = (n) => {
    for (let i = n; i >= 1; i--) {
        console.log(" ".repeat(n - i) + "*".repeat(2 * i - 1));
    }
};

const diamond = (n) => {
    pyramid(n);
    for (let i = n - 1; i >= 1; i--) {
        console.log(" ".repeat(n - i) + "*".repeat(2 * i - 1));
    }
};

const hollowPyramid = (n) => {
    for (let i = 1; i <= n; i++) {
        if (i === 1) {
            console.log(" ".repeat(n - 1) + "*");
        } else if (i === n) {
            console.log("*".repeat(2 * n - 1));
        } else {
            console.log(" ".repeat(n - i) + "*" + " ".repeat(2 * i - 3) + "*");
        }
    }
};

const pascals = (n) => {
    let row = [1];
    for (let i = 0; i < n; i++) {
        const rowStr = row.join(" ");
        const padding = " ".repeat(Math.floor((2 * n - rowStr.length) / 2));
        console.log(padding + rowStr);

        const nextRow = [1];
        for (let j = 0; j < row.length - 1; j++) {
            nextRow.push(row[j] + row[j + 1]);
        }
        nextRow.push(1);
        row = nextRow;
    }
};

const hourglass = (n) => {
    inverted(n);
    for (let i = 2; i <= n; i++) {
        console.log(" ".repeat(n - i) + "*".repeat(2 * i - 1));
    }
};

const zigzag = (n) => {
    const height = 4;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < height; j++) {
            if (j === 0 || j === height - 1) {
                console.log("*".repeat(n));
            } else {
                console.log(" ".repeat(n - i - 1) + "*");
            }
        }
    }
};


const main = () => {
    const args = process.argv.slice(2);
    const pattern = args[0] || "pyramid";
    const n = parseInt(args[1], 10) || 5;

    const funcs = {
        pyramid,
        inverted,
        diamond,
        hollow_pyramid: hollowPyramid,
        pascals,
        hourglass,
        zigzag,
    };

    if (funcs[pattern]) {
        funcs[pattern](n);
    } else {
        console.log("Unknown pattern. Choose from:", Object.keys(funcs).join(", "));
    }
};

main();