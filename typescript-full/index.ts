//anatonation :

//@ts-ignore
let str: string = "harshith";
str = "sai";
console.log(str + " " + "this an string");
// str = 1000
// console.log(str)//error it cannot be number

//numbers
//@ts-ignore
let num: number = 10;
num = 6;
console.log(num + " " + "this an number");
// num = "harshith"
// console.log(num)//error it cannot be string

//bolean
//@ts-ignore
let bol: boolean = true;
bol = false;
console.log(bol + " " + "this an bolean");
// bol = 10
// console.log(bol)//error it cannot be number

//undefined
let val: undefined;
console.log(val + " " + "this an undefined");
// val = 10
// console.log(val)//error it cannot be number

// 'null' type
let value: null = null; // 'value' is explicitly of type 'null'
console.log(value + " " + "this is null"); // This will print "null this is null"

// type `bigint`
let largeNumber: bigint = 9007199254740991n; // The 'n' suffix denotes a BigInt literal
console.log(largeNumber); // Outputs: 9007199254740991n

//
