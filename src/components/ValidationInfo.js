export default function ValidationInfo(props) {
  console.log(props.verificationResults);
  return (
    <div>
      <p>
        File '{props.fileName}' is {props.verificationResults[0]}
      </p>
      <p>File '{props.fileName}' is valid!</p>
    </div>
  );
}
