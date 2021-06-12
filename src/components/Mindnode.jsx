import React, {Fragment} from 'react'
import ReactFlow, {removeElements, addEdge, Background, Controls, MiniMap, updateEdge} from 'react-flow-renderer'
import CustomEdge from "./CustomEdge"

const initialElements = [ {
    id: '1', type: 'input', data:{label: "Main idea"}, position: {x:0, y:0}},
    {
        id: '3',
        data: { label: 'Related information' },
        position: { x: 400, y: 200 },
      },
      { id: 'e1-2', source: '1', target: '3', label: 'Update me' },
]

const edgeTypes = {
    custom: CustomEdge,
  };

function onLoad(reactFlowInstance) {
    reactFlowInstance.fitView();
}

function onNodeDragStop(event, node){ console.log('drag stop', node)};
function onElementClick(event, element){ console.log('click', element)};

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
            onElementClick={onElementClick}
            onNodeDragStop={onNodeDragStop}
            edgeTypes={edgeTypes}
            key="edges"
            style={{width:'100%', height:'90vh'}}>
                <Background color="#888" gap={16} />
                <MiniMap nodeColor={ n => {
                    if(n.type == "input") return "#29ccbf";
                    return "#FFCC00" 
                    }} />
                <Controls />
                
            </ReactFlow>
            <div className="idea-maker"> 
                <input type="text" name="title" onChange={ e => setName(e.target.value)} />
                <button type="button" onClick={addNode}>Add to the idea flow</button>
            </div>
        </Fragment>
    )
}

export default Mindnode
