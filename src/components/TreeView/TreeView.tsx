import { useEffect, useRef, useState } from "react";
import { FileIcon } from "../../assets/FileIcon";
import { FolderIcon } from "../../assets/FolderIcon";
import type { TreeData } from "../../types/data.types";
import "./Tree.css";
import { PencilIcon } from "../../assets/PencilIcon";
import { TrashIcon } from "../../assets/TrashIcon";
interface Props {
  name?: string;
  data: true | TreeData;
  state: TreeData;
  isOpen?: boolean;
  handleDelete: (state: TreeData, name: string) => void;
  handleChange: (state: TreeData, name: string, input: string) => void;
}

export const TreeView = (props: Props) => {
  const {
    data,
    name = "root",
    isOpen = "true",
    handleDelete,
    state,
    handleChange,
  } = props;
  const input = useRef(null);
  const [inputValue, setInputValue] = useState<string>(name);
  const [inputDisabled, setInputDisabled] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!inputDisabled) {
      input.current.focus();
    }
  }, [inputDisabled]);
  const changeName = () => {
    setInputDisabled((prev) => !prev);
  };
  const type = typeof data === "boolean" ? "file" : "folder";

  if (!data) return;

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setOpen(!open);
  };

  return (
    <ul className={`${isOpen && "is-open"}`}>
      <li className={`tree-view`}>
        <div onClick={handleClick} className="treeview-open">
          <div>{type === "folder" ? <FolderIcon /> : <FileIcon />}</div>
          <div>
            <input
              className="input"
              type="text"
              ref={input}
              disabled={inputDisabled}
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
                handleChange(state, name, inputValue);
              }}
            />
          </div>
        </div>
        <button onClick={changeName} className="button tree-icon">
          <PencilIcon />
        </button>
        <button
          onClick={() => handleDelete(state, name)}
          className="button tree-icon"
        >
          <TrashIcon />
        </button>
      </li>

      {type === "folder" &&
        Object.keys(data).map((name): TreeData => {
          return (
            <TreeView
              key={name}
              name={name}
              data={data[name]}
              isOpen={open}
              handleDelete={handleDelete}
              state={state}
              handleChange={handleChange}
            />
          );
        })}
    </ul>
  );
};
