import { Divider, Stack, Typography } from "@mui/material";
import { STEP_TYPES } from "./types";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const NodeItems = [
  {
    stepType: STEP_TYPES.SEND_CAMPAIGN,
    description: "This is send campaign",
  },
  {
    stepType: STEP_TYPES.AUGMENTED_SEGMENT,
    description: "This is augmented segment",
  },
  {
    stepType: STEP_TYPES.CONDITION_SPLIT,
    description: "This is conditional split",
  },
  {
    stepType: STEP_TYPES.TIME_DELAY,
    description: "This is time delay",
  },
];

function Sidebar() {
  const NodeItem = ({
    description,
    stepType,
  }: {
    description: string;
    stepType: STEP_TYPES;
  }) => {
    return (
      <Stack
        sx={{
          padding: 1,
          border: "1px solid grey",
          borderRadius: 1,
          userSelect: "none",
        }}
        direction={"row"}
        alignItems={"flex-start"}
        draggable
        onDragStart={(event) => {
          event.dataTransfer.setData("application/reactflow", stepType);
          event.dataTransfer.effectAllowed = "move";
        }}
      >
        <Stack pt={0.5}>
          <DragIndicatorIcon />
        </Stack>
        <Stack>
          <Typography variant="h6">{stepType}</Typography>
          <Typography variant="body2">{description}</Typography>
        </Stack>
      </Stack>
    );
  };

  return (
    <Stack
      style={{
        width: "400px",
        backgroundColor: "#fff",
        height: "100%",
        borderRight: "2px solid grey",
      }}
    >
      <Stack p={2}>
        <Typography variant="h5">Steps</Typography>
      </Stack>
      <Divider />
      <Stack p={1} gap={1}>
        {NodeItems.map((item) => (
          <NodeItem
            key={item.stepType}
            description={item.description}
            stepType={item.stepType}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default Sidebar;
