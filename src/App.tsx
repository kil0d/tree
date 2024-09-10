import { data } from "./data";
import "./App.css";
import { TreeView } from "./components/TreeView/TreeView";
import { useState } from "react";
import { TreeData } from "./types/data.types";
function App() {
  const [treeState, setTreeState] = useState(data);
  const handleDelete = (state: TreeData, name: string) => {
    delete state[name];
    setTreeState((prev) => ({ ...prev }));
  };
  const handleChange = (
    prevState: TreeData,
    name: string,
    input: string,
    currentValue: TreeData
  ) => {
    delete prevState[name];
    prevState[input] = currentValue;
    if (input.includes(".")) {
      prevState[input] = true;
      setTreeState((prev) => ({ ...prev }));
      return;
    } else if (!input.includes(".") && typeof currentValue === "boolean") {
      prevState[input] = {};
      setTreeState((prev) => ({ ...prev }));
      return;
    }
    return setTreeState((prev) => ({ ...prev }));
  };
  const handleAdd = (state: TreeData, defaultValue: string) => {
    state[defaultValue] = {};
    return setTreeState((prev) => ({ ...prev, ...state[defaultValue] }));
  };
  return (
    <div>
      <TreeView
        state={treeState}
        data={treeState}
        prevState={treeState}
        OnChange={handleChange}
        OnDelete={handleDelete}
        onAdd={handleAdd}
      />
    </div>
  );
}

export default App;
