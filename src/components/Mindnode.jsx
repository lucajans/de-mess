import React, {Fragment} from 'react'
import ReactFlow, {removeElements, addEdge, Background, Controls, MiniMap} from 'react-flow-renderer'

const initialElements = [ {
    id: '1', type: 'input', data:{label: "Idea"}, position: {x:0, y:0}
}]

function onLoad(reactFlowInstance) {
    reactFlowInstance.fitView();
}

function Mindnode() {
    const [elements, setElements] = React.useState(initialElements);
    const [name, setName] = React.useState("");
    function addNode() {
        setElements(e => e.concat({
            id: (e.length + 1).toString(), data: {label: `${name}`}, position: { x: Math.random() * 100, y: Math.random() * 100}
        }))
    };

    function onConnect(params) {
        setElements( e => addEdge(params, e))
    }

    function onElementsRemove(elementsToRemove){
    setElements( e => removeElements(elementsToRemove, e));
    }

    return (
        <Fragment>
            <ReactFlow 
            elements={elements} 
            onLoad={onLoad} 
            onConnect={onConnect} 
            connectionLineStyle={{stroke: "#ddd", strokewidth: 2}}
            connectionLineType="bezier" 
            snapGrid={[16,16]} 
            snapToGrid={true} 
            onElementsRemove={onElementsRemove}
            style={{width:'100%', height:'90vh'}}>
                <Background color="#888" gap={16} />
                <MiniMap nodeColor={ n => {
                    if(n.type == "input") return "#29ccbf";
                    return "#FFCC00" 
                    }} />
                <Controls />
            </ReactFlow>
            <div> 
                <input type="text" name="title" onChange={ e => setName(e.target.value)} />
                <button type="button" onClick={addNode}>Add to the idea flow</button>
            </div>
        </Fragment>
    )
}

export default Mindnode
