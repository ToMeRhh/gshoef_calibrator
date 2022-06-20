import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import * as XLSX from "xlsx";
import ValidationInfo from "./components/ValidationInfo";

import "./styles.css";
import verifier from "./util/verifier";

const fileTypes = ["xls", "xlsx"];

export default function App() {
  const [file, setFile] = useState(null);
  const [verificationResults, setVerificationResults] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, {
        header: [
          "Cluster#",
          "T(Degree)",
          "X(mm)",
          "THK(mm)",
          "Min(%)",
          "Max(%)",
          "Ave.(%)",
          "Size(mm*mm)",
          "no. on table",
          "TYPE"
        ]
      });
      setVerificationResults(verifier(data));
    };
    reader.readAsBinaryString(file[0]);
  };

  return (
    <div className="App">
      <h1>Hello To Drag & Drop Files</h1>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      {verificationResults ? (
        <ValidationInfo
          fileName={file[0].name}
          verificationResults={verificationResults}
        />
      ) : null}
    </div>
  );
}
