import type { TreeData } from "../../types/data.types"
import { FolderIcon } from "../../assets/FolderIcon"
import { FileIcon } from "../../assets/FileIcon"
import './Tree.css'
export const TreeView = ({data, type, level}: TreeData) => {
    return (
        <div style={{marginLeft: `${level}rem`}}>
            <div className="tree-view">
                <div>{type === "object" ?  <FolderIcon/> : <FileIcon/>}</div>
                <div>{data}</div>
            </div>
        </div>
    )
}