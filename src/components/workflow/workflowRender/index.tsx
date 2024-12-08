import { Stack } from "@mui/material";
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  OnConnect,
  Edge,
  Node,
  Connection,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";
import { useCallback } from "react";
import { nodeTypes } from "./WorkflowRender";
import { STEP_TYPES } from "../types";

// Define the shape of node data
interface NodeData {
  label: string;
}

// Define the shape of custom node and edge types
type WorkflowNode = Node<NodeData>;
type WorkflowEdge = Edge;

function WorkflowRender() {
  const [nodes, setNodes, onNodesChange] = useNodesState<WorkflowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<WorkflowEdge>([]);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      const targetNode = nodes.find((node) => node.id === params.target);
      const sourceNode = nodes.find((node) => node.id === params.source);

      const targetEdges = edges.filter((edge) => edge.target === params.target);
      const sourceEdges = edges.filter((edge) => edge.source === params.source);

      if (targetEdges.some((edge) => edge.source === params.source)) return;

      if (sourceNode?.type === STEP_TYPES.CONDITION_SPLIT) {
        if (sourceEdges.length >= 1) {
          alert("Conditional Split nodes can only have one parent connection.");
          return;
        }
        setEdges((eds) => addEdge(params, eds));
      } else if (targetNode?.type === STEP_TYPES.CONDITION_SPLIT) {
        // Allow only one parent and two children
        if (targetEdges.length >= 2) {
          alert("Conditional Split nodes can only have two child connections.");
          return;
        }

        // Add "Yes" or "No" label to edges
        const label = targetEdges.length === 0 ? "Yes" : "No";
        const edgeWithLabel: Edge = {
          ...params,
          label,
          labelStyle: { fill: "black", fontSize: 12 },
        };
        setEdges((eds) => addEdge(edgeWithLabel, eds));
      } else {
        // Allow only one parent for non-conditional nodes
        if (edges.some((edge) => edge.target === params.target)) {
          alert("Only conditional nodes can have multiple connections.");
          return;
        }
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [nodes, edges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: WorkflowNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label: `${type} Node` },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <Stack style={{ flex: 1, border: "1px solid #ccc" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange as (changes: NodeChange[]) => void}
        onEdgesChange={onEdgesChange as (changes: EdgeChange[]) => void}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </Stack>
  );
}

export default WorkflowRender;
