/**
* Types
*/
type NumbersTable = {
  number: string,
  total: number,
}

type NumbersOrder = {
  number: string,
  amount: number,
}

type GenerateNumbers = (mode: "2" | "3") => NumbersTable[];

type FormlaFunction = () => string[];


/** generate numbers
 */
const generateNumbers: GenerateNumbers = (mode: "2" | "3") => {
  if (mode === "2") return [...Array(100).keys()].map(d => d.toString().length === 1 ? { number: `0${d}`, total: 0 } : { number: d.toString(), total: 0 } );

  return [...Array(1000).keys()].map(d => {
    const len = d.toString().length;

    if (len === 1) return { number: `00${d}`, total: 0 };
    else if (len === 2) return { number: `0${d}`, total: 0 };
    return { number: `${d}`, total: 0 };
  });
}


/** Calculate Formula functions
 */

// bros functon
const brosFunc: FormlaFunction = () => {
  return [12, 23, 34, 45, 56, 67, 78, 89].map(String);
};

const newFunc: FormlaFunction = () => {
  return [22, 33, 55].map(String);
}

const only3DFunc: FormlaFunction = () => ["001", "075", "078"];

// ...other functions

/**
* Create Object
*/
// Create Order Recent
function createOrderRecent(fn: FormlaFunction, amount: number): NumbersOrder[] {
  const numbers = fn();
  return numbers.map(n => ({ number: n, amount }));
}

// Create Table
function createNumbeTable(mode: "2" | "3") {
  return (fn: GenerateNumbers | NumbersTable[], orderAdd: NumbersOrder[]): NumbersTable[] => {
    const nums_from_table = typeof fn === "function" ? fn(mode) : fn;

    nums_from_table.map(table => {
      orderAdd.map(order => {
        if (order.number === table.number) table.total += order.amount;
      })
    });

    return nums_from_table;
  }
}


/** DEBUG
 */
const table = createNumbeTable("2");

const brosOrder = createOrderRecent(brosFunc, 200);
const newFuncOrder = createOrderRecent(newFunc, 500);
// const for3DOrder = createOrderRecent(only3DFunc, 200); // only 3D

const brosAddTable = table(generateNumbers, brosOrder);
const brosAddAgainTable = table(brosAddTable, brosOrder);
const newFuncAddTable = table(brosAddAgainTable, newFuncOrder);

// const table3DAdd = table(newFuncAddTable, for3DOrder);

console.log(newFuncAddTable);
