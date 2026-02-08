import { parse } from "csv-parse/sync";
import dedent from "dedent";

// Dataset with numeric header elements and numeric values
const data = dedent`
  Person,2023,2024,2025
  John,100,150,200`;

// Without cast, all values are strings
const withoutCast = parse(data, {
  columns: true,
});

console.log(JSON.stringify(withoutCast)); // [{"2023":"100","2024":"150","2025":"200","Person":"John"}]

// --------------------------------`--------------------------
// With a casting function we can convert values to their appropriate types
// (requires knowledge of the data structure, or try then fallback)
// For example,
const withCastFunction = parse(data, {
  columns: true,
  cast: (value, context) => {
    if (context.column === "Person") {
      return value;
    }
    return context.header ? value : Number(value);
  },
});

console.log(JSON.stringify(withCastFunction)); // [{"2023":100,"2024":150,"2025":200,"Person":"John"}]

// ----------------------------------------------------------
// Ideally `cast: true` would always use strings for the header elements
// THROWS CsvError Error: Invalid column definition: expect a string or a literal object, got 2023 at position 1
const withCastTrue = parse(data, {
  columns: true,
  cast: true,
});

console.log(JSON.stringify(withCastTrue)); // [{"2023":100,"2024":150,"2025":200,"Person":"John"}]
