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

let symbol: symbol = Symbol();
//union-type
let userId: string | number;
userId = "suuc9873du21b";

//function
function adds(a: number, b: number): number {
  return a + b;
}
adds(3, 5);

let fun = function (a: number, b: string = "harshith"): string {
  return a + b;
};
fun(2, "b");

//arrays---------------------------1

let arr: number[] = [1, 2, 3, 4, 5];
let arr1: (string | number)[] = [1, 2, "har", 9, "sai"];
let arr3: readonly number[] = [1, 2, 3, 4, 5];
//tuples
let arr2: [boolean, number, string] = [true, 1, "h"];

// arr[0] = "har" error
arr[0] = 0; //correct
arr1[0] = "sai"; //correct
arr2.push(2);
arr2.push(true);
arr2.pop();
console.log(arr2);
// arr3.push() error  readonly array
arr3.map((n: number): void => console.log(n));

//limitaitons of tuples
let arr4: [boolean, number, string] = [true, 1, "h"];
//arr4 = [1, 2, 3]; // Error: Type 'number' is not assignable to type 'boolean'.
//arr4 = [true, 1, "h", "extra"]; // Error: Source has 4 elements but target allows only 3.
arr4.push(5);
arr4.shift(); //.unshift() and .shift() modify the array’s length and could disrupt the fixed structure of the tuple, which TypeScript is designed to prevent.
console.log(arr4);
// Objects---------------------------2
let myObj: object;
myObj = [];
console.log(typeof myObj);
// myObj = bands
myObj = {};

const exampleObj = {
  prop1: "Dave",
  prop2: true,
};

exampleObj.prop1 = "John";

interface Guitarist {
  name?: string;
  active: boolean;
  albums: (string | number)[];
}

let evh: Guitarist = {
  name: "Eddie",
  active: false,
  albums: [1984, 5150, "OU812"],
};

let jp: Guitarist = {
  active: true,
  albums: ["I", "II", "IV"],
};

const greetGuitarist = (guitarist: Guitarist) => {
  if (guitarist.name) {
    return `Hello ${guitarist.name.toUpperCase()}!`;
  }
  return "Hello!";
};

console.log(greetGuitarist(jp));

// Enums
// "Unlike most TypeScript features, Enums are not a type-level addition to JavaScript but something added to the language and runtime."

enum Grade {
  U = 1,
  D,
  C,
  B,
  A,
}

console.log(Grade.U, Grade.D);

// Type Aliases--------------------------3
type stringOrNumber = string | number;

type stringOrNumberArray = (string | number)[];

type Guitarists = {
  name?: string;
  active: boolean;
  albums: stringOrNumberArray;
};

type UserId = stringOrNumber;

// Literal types
let myName: "Dave";

let userName: "Dave" | "John" | "Amy";
userName = "Amy";

// functions
const add = (a: number, b: number): number => {
  return a + b;
};

const logMsg = (message: any): void => {
  console.log(message);
};

logMsg("Hello!");
logMsg(add(2, 3));

let subtract = function (c: number, d: number): number {
  return c - d;
};

type mathFunction = (a: number, b: number) => number;
// interface mathFunction {
//     (a: number, b: number): number
// }

let multiply: mathFunction = function (c, d) {
  return c * d;
};

logMsg(multiply(2, 2));

// optional parameters
const addAll = (a: number, b: number, c?: number): number => {
  if (typeof c !== "undefined") {
    return a + b + c;
  }
  return a + b;
};

// default param value
const sumAll = (a: number = 10, b: number, c: number = 2): number => {
  return a + b + c;
};

logMsg(addAll(2, 3, 2));
logMsg(addAll(2, 3));
logMsg(sumAll(2, 3));
logMsg(sumAll(undefined, 3));

// Rest Parameters
const total = (a: number, ...nums: number[]): number => {
  return a + nums.reduce((prev, curr) => prev + curr);
};

logMsg(total(10, 2, 3));

const createError = (errMsg: string): never => {
  throw new Error(errMsg);
};

const infinite = () => {
  let i: number = 1;
  while (true) {
    i++;
    if (i > 100) break;
  }
};

// custom type guard
const isNumber = (value: any): boolean => {
  return typeof value === "number" ? true : false;
};

// use of the never type
const numberOrString = (value: number | string): string => {
  if (typeof value === "string") return "string";
  if (isNumber(value)) return "number";
  return createError("This should never happen!");
};
