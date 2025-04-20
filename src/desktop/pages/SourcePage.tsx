import React from "react";

import { useParams } from "react-router";

interface SourcePageProps {}

const SourcePage: React.FC<SourcePageProps> = () => {
  const { source } = useParams<{ source: string }>();
  return (
    <div>
      <title>{source}</title>
    </div>
  );
};

export default SourcePage;
