import { Actionnable } from '@0n0k0/materia';
import { Typography } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import React from 'react';

const code = `
import { Actionnable } from '@0n0k0/materia';

function Demo() {
  return (
    <Actionnable component="button" style={{ padding: '8px 20px', cursor: 'pointer', border: 'none', borderRadius: 4, fontSize: 14 }}>
      Click me
    </Actionnable>
  );
}
`;

function Demo() {
  return (
    <Actionnable
      component="button"
      style={{
        padding: '8px 20px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: 4,
        fontSize: 14,
      }}
    >
      <Typography style={{ position: 'relative', zIndex: 1 }}>Click me</Typography>
    </Actionnable>
  );
}

export const actionnableUsage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
