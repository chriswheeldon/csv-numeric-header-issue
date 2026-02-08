# `csv` package numeric header issue

This repository demonstrates a bug in the [`csv` npm package's](https://www.npmjs.com/package/csv) `parse` method when using `cast: true` with csv files that have numeric column headers.

## Problem

When parsing csv data with numeric headers (e.g., year columns like "2023", "2024", "2025"), using the `cast: true` option causes the parser to throw an error:

```
CsvError Error: Invalid column definition: expect a string or a literal object, got 2023 at position 1
```

It is possible to workaround by using a custom casting function that checks `context.header` to preserve headers as strings while casting data values:

```javascript
cast: (value, context) => {
  return context.header ? value : Number(value);
};
```

## Ideal Behavior?

The `cast: true` option could preserve header elements as strings (for use as object keys) while casting the data values to their appropriate types.
