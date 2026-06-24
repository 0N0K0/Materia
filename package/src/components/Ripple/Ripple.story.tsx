import React from 'react';
import { Ripple } from './Ripple';

export default { title: 'Ripple' };

const phaseControls = {
  onEnter: () => {},
  onEntered: () => {},
  onExit: () => {},
  onExited: () => {},
};

export function Focus() {
  return (
    <div style={{ padding: 40, display: 'flex', gap: 16 }}>
      <div
        style={{
          position: 'relative',
          width: 100,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ripple
          trigger="focus"
          x={0}
          y={0}
          radius={100}
          color="blue"
          opacity={0.3}
          easing="linear"
          duration={1200}
        />
        Focus ripple
      </div>
    </div>
  );
}

export function Hover() {
  return (
    <div style={{ padding: 40 }}>
      <div
        style={{
          position: 'relative',
          width: 120,
          height: 40,
          overflow: 'hidden',
          background: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ripple
          trigger="hover"
          x={10}
          y={10}
          radius={120}
          color="blue"
          opacity={0.15}
          mounted
          phaseControls={phaseControls}
        />
        Hover ripple
      </div>
    </div>
  );
}

export function Touch() {
  return (
    <div style={{ padding: 40 }}>
      <div
        style={{
          position: 'relative',
          width: 120,
          height: 40,
          overflow: 'hidden',
          background: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ripple
          trigger="touch"
          x={0}
          y={0}
          radius={120}
          color="blue"
          opacity={0.3}
          duration={600}
          easing="ease-out"
        />
        Touch ripple
      </div>
    </div>
  );
}
