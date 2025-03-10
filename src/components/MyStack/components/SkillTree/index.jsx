"use client";

import { useState, useEffect } from 'react';
import SkillTreeSVG from './SkillTreeSVG';
import Tooltip from './Tooltip';

const SkillTree = ({ data }) => {
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipDiv, setTooltipDiv] = useState(null);

  // Handler for when a node is hovered
  const handleNodeHover = (data) => {
    setTooltipData(data);
  };

  // Handler for when hover leaves a node
  const handleNodeLeave = () => {
    setTooltipData(null);
  };

  // Cleanup any D3 tooltips on unmount or data change
  useEffect(() => {
    return () => {
      if (tooltipDiv) {
        tooltipDiv.remove();
      }
    };
  }, [tooltipDiv]);

  return (
    <div className="w-full h-full flex justify-center items-center p-6 relative">
      <SkillTreeSVG 
        data={data} 
        onNodeHover={handleNodeHover}
        onNodeLeave={handleNodeLeave}
      />
      <Tooltip data={tooltipData} />
    </div>
  );
};

export default SkillTree;
