import { Ripple } from '@0n0k0/materia';
import { MantineDemo } from '@mantinex/demo';
import React from 'react';

const code = `
import { Ripple } from '@0n0k0/materia';

function Demo() {
  return (
    <div style={{ position: 'relative', width: 120, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Ripple trigger="focus" x={0} y={0} radius={120} color="blue" opacity={0.3} easing="linear" duration={1200} />
      Focus ripple
    </div>
  );
}
`;

function Demo() {
  return (
    <div
      style={{
        position: 'relative',
        width: 120,
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
        radius={120}
        color="blue"
        opacity={0.3}
        easing="linear"
        duration={1200}
      />
      Focus ripple
    </div>
  );
}

export const rippleUsage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
