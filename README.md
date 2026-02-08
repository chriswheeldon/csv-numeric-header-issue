# `csv` package numeric header issue

This repository demonstrates a bug in `csv-parse` when using `cast: true` with CSV files that have numeric column headers.

## Problem

When parsing CSV data with numeric headers (e.g., year columns like "2023", "2024", "2025"), using the `cast: true` option causes the parser to throw an error:

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
