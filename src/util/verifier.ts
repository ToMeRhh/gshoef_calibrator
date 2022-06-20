interface VerificationResult {
  valid: boolean;
  validationDate: Date;
}

function parseData(sheetData) {
  let table1Start = -1;
  for (let i = 1; i < sheetData.length; i++) {
    if (sheetData[i]["Cluster#"] === "Cluster#") {
      table1Start = i;
      break;
    }
  }

  let table2Start = -1;
  for (let i = table1Start + 1; i < sheetData.length; i++) {
    if (sheetData[i]["Cluster#"] === "Cluster#") {
      table2Start = i;
      break;
    }
  }

  console.log(table1Start, table2Start);
  let firstTable = sheetData.slice(table1Start + 1, table2Start - 3);
  let secondTable = sheetData.slice(table2Start + 1);
  return [firstTable, secondTable];
}

function verify(table): VerificationResult {
  return { valid: true, validationDate: new Date() };
}

export default function verifier(sheetData) {
  let [firstTable, secondTable] = parseData(sheetData);
  console.log("First table:", firstTable);
  console.log("Second table:", secondTable);

  return verify(firstTable);
}
