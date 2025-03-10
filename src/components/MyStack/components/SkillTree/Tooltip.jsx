import React from 'react';

const Tooltip = ({ data }) => {
  if (!data) return null;

  return (
    <div 
      className="absolute pointer-events-none bg-gray-900/90 text-white px-4 py-2 rounded-lg border border-gray-700 shadow-lg backdrop-blur-sm z-50"
      style={{
        left: data.x,
        top: data.y,
        transform: 'translate(-50%, -100%)',
        marginTop: '-10px',
      }}
    >
      <div className="flex flex-col space-y-1">
        <span className="font-medium text-sm">{data.name}</span>
        {data.description && (
          <span className="text-xs text-gray-300">{data.description}</span>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
