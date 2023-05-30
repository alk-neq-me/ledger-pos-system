const f = new Intl.NumberFormat("en-US");

export const numberFormat = (n: string|number): string => {
  const num = parseInt(n.toString(), 10);
  if (num !== 0 && !num) throw new Error("Must be a number");
  return f.format(num);
}
