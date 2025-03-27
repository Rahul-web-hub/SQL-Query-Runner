import React from "react";

//This is the codeEditor where I have used textarea and updated its value using onChange attribute
const CodeEditor=({value,onValueChange})=>(
       <textarea
       className="code-editor"
       value={value}
       onChange={(e)=>onValueChange(e.target.value)}
       placeholder="Enter your SQL query here"
       />
);

export default CodeEditor;