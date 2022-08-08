import React from "react";
import AgentFormContainer from "../../containers/agent-forms/AgentForm.container";

const AgentDashPage = () => {
  return (
    <div className="cm-agent-dash-page-container">
      <div className="cm-page-center">
        <AgentFormContainer />
      </div>
    </div>
  );
};

export default AgentDashPage;
