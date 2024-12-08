import { Stack } from "@mui/material";
import { STEP_TYPES } from "../../types";

import React from "react";
import { Handle, Position } from "@xyflow/react";

interface IReactNodeContainer {
  children: React.ReactNode;
}

function ReactNodeContainer({ children }: IReactNodeContainer) {
  return (
    <Stack>
      <Handle
        type="source"
        position={Position.Top}
        style={{ background: "blue" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ background: "red" }}
      />
      {children}
    </Stack>
  );
}

export default ReactNodeContainer;

export const nodeTypes = {
  [STEP_TYPES.SEND_CAMPAIGN]: ({ data }) => (
    <ReactNodeContainer>
      <div
        style={{
          padding: 10,
          border: "1px solid blue",
          backgroundColor: "#fee0ff",
        }}
      >
        {data.label}
      </div>
    </ReactNodeContainer>
  ),
  [STEP_TYPES.AUGMENTED_SEGMENT]: ({ data }) => (
    <ReactNodeContainer>
      <div
        style={{
          padding: 10,
          border: "1px solid blue",
          backgroundColor: "#e0e0ff",
        }}
      >
        {data.label}
      </div>
    </ReactNodeContainer>
  ),
  [STEP_TYPES.CONDITION_SPLIT]: ({ data }) => (
    <ReactNodeContainer>
      <div
        style={{
          padding: 10,
          border: "1px solid orange",
          backgroundColor: "#fff0e0",
        }}
      >
        {data.label}
      </div>
    </ReactNodeContainer>
  ),
  [STEP_TYPES.TIME_DELAY]: ({ data }) => (
    <ReactNodeContainer>
      <div
        style={{
          padding: 10,
          border: "1px solid grey",
          backgroundColor: "#f0f0f0",
        }}
      >
        {data.label}
      </div>
    </ReactNodeContainer>
  ),
};
