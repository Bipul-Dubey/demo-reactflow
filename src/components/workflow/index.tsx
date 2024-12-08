import "@xyflow/react/dist/style.css";
import Sidebar from "./Sidebar";
import WorkflowRender from "./workflowRender";

function WorkFlow() {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <Sidebar />
      <WorkflowRender />
      {/* <DetailSidebar /> */}
    </div>
  );
}

export default WorkFlow;
