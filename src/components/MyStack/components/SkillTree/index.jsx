"use client";

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Tooltip from './Tooltip';

const SkillTreeSVG = dynamic(() => import('./SkillTreeSVG'), { ssr: false });

const SkillTree = ({ data }) => {
  const [tooltipData, setTooltipData] = useState(null);

  // Handler for when a node is hovered
  const handleNodeHover = useCallback((data) => {
    setTooltipData(data);
  }, []);

  // Handler for when hover leaves a node
  const handleNodeLeave = useCallback(() => {
    setTooltipData(null);
  }, []);

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
