import { TreeView } from "./TreeView"
import type { TreeData } from "../../types/data.types"
export const TreeNode = ({data} : TreeData) => {
    const level = 0
    const treeDrawing = (dataKey, level) => {
        console.log(dataKey)
        return Object.keys(dataKey).map((key) => {
            if (typeof dataKey[key] !== 'object') return <TreeView data = {key} type = {"file"} level = {level}/>;
            const newLevel = level+ 2
            return [<TreeView key={0} data  = {key} type = {"object"} level = {level}/>,  treeDrawing(dataKey[key], newLevel)]
        });
    }
    if(data) {
        return (
            <div>{treeDrawing(data, level)}</div>
        )
    }

}