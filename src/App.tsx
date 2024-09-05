import { data } from "./data";
import "./App.css";
import { TreeView } from "./components/TreeView/TreeView";
import { useState } from "react";
import { TreeData } from "./types/data.types";
function App() {
  const [treeState, setTreeState] = useState(data);
  const handleDelete = (state: TreeData, name: string) => {
    return Object.keys(state).map((key) => {
      if (key == name) {
        delete state[key];
        return setTreeState({ ...data });
      }
      handleDelete(state[key], name);
    });
  };
  const handleChange = (state: TreeData, name: string, input: string) => {
    return Object.keys(state).map((key) => {
      if (key === name) {
        return setTreeState({ ...data });
      }
      handleChange(state[key], name, input);
    });
  };
  return (
    <div>
      <TreeView
        state={treeState}
        data={data}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
