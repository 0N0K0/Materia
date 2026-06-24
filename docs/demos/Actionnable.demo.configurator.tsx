import { Actionnable } from '@0n0k0/materia';
import { Typography } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import React from 'react';

const code = `
import { Actionnable } from '@0n0k0/materia';

function Demo() {
  return (
    <Actionnable{{props}} component="button" style={{ padding: '8px 20px', cursor: 'pointer', border: 'none', borderRadius: 4, fontSize: 14 }}>
      Click me
    </Actionnable>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Actionnable
      {...props}
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

export const actionnableConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { type: 'color', prop: 'color', initialValue: 'blue', libraryValue: null },
    {
      type: 'select',
      prop: 'variant',
      initialValue: 'filled',
      libraryValue: 'filled',
      data: [
        { label: 'filled', value: 'filled' },
        { label: 'outline', value: 'outline' },
        { label: 'light', value: 'light' },
        { label: 'subtle', value: 'subtle' },
        { label: 'transparent', value: 'transparent' },
        { label: 'white', value: 'white' },
      ],
    },
    {
      type: 'boolean',
      prop: 'disableElevation',
      initialValue: false,
      libraryValue: false,
    },
  ],
};
