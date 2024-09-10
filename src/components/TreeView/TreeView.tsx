import { useEffect, useRef, useState } from "react";
import { FileIcon } from "../../assets/FileIcon";
import { OpenFolderIcon } from "../../assets/OpenFolderIcon";
import type { TreeData } from "../../types/data.types";
import "./Tree.css";
import { TrashIcon } from "../../assets/TrashIcon";
import { AddIcon } from "../../assets/AddIcon";
import { FolderIcon } from "../../assets/FolderIcon";
import { AnimatePresence, motion } from "framer-motion";
interface Props {
  name?: string;
  data: true | TreeData;
  state: true | TreeData;
  prevState: true | TreeData;
  isOpen?: boolean;
  OnDelete: (state: TreeData, name: string) => void;
  OnChange: (
    state: TreeData,
    name: string,
    input: string,
    currentValue: TreeData
  ) => void;
  onAdd: (state: TreeData, defaultValue: string) => void;
}

export const TreeView = (props: Props) => {
  const {
    data,
    prevState,
    name = "root",
    isOpen = "true",
    OnDelete,
    state,
    OnChange,
    onAdd,
  } = props;
  const input = useRef(null);
  const [focus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState<string>(name);
  const [open, setOpen] = useState(false);
  const defaultValue = "new";
  const type = typeof data === "boolean" ? "file" : "folder";
  const list = useRef(null);
  if (!state) return;
  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setOpen(!open);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!focus) {
      OnChange(prevState, name, inputValue, data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);
  return (
    <ul ref={list} className={`${isOpen && "is-open"}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            style={{ overflow: "hidden" }}
            transition={{ duration: 1 }}
          >
            <li className={`tree-view`}>
              <div onClick={handleClick} className="treeview-open">
                <div>
                  {type === "folder" ? (
                    open ? (
                      <OpenFolderIcon />
                    ) : (
                      <FolderIcon />
                    )
                  ) : (
                    <FileIcon />
                  )}
                </div>
                <div>
                  <input
                    className="input"
                    type="text"
                    onFocus={() => {
                      setFocus(true);
                    }}
                    onBlur={() => {
                      setFocus(false);
                    }}
                    disabled={name === "root"}
                    ref={input}
                    value={inputValue}
                    onChange={(event) => {
                      setInputValue(event.target.value);
                    }}
                  />
                </div>
              </div>
              {name !== "root" && (
                <button
                  onClick={() => OnDelete(prevState, name)}
                  className="button tree-icon"
                >
                  <TrashIcon />
                </button>
              )}
              {name !== "root" && type !== "file" && (
                <button
                  onClick={() => onAdd(data, defaultValue)}
                  className="button tree-icon"
                >
                  <AddIcon />
                </button>
              )}
            </li>
          </motion.div>
        )}
      </AnimatePresence>
      <hr />
      {type === "folder" &&
        Object.keys(data).map((name): TreeData => {
          return (
            <TreeView
              key={name}
              name={name}
              prevState={data}
              data={data[name]}
              isOpen={open}
              OnDelete={OnDelete}
              state={state}
              OnChange={OnChange}
              onAdd={onAdd}
            />
          );
        })}
    </ul>
  );
};
