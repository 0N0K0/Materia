import { TestComponent } from '@0n0k0/materia';
import { MantineDemo } from '@mantinex/demo';
import React from 'react';

const code = `
import { TestComponent } from '@0n0k0/materia';

function Demo() {
  return <TestComponent{{props}} />;
}
`;

function Wrapper(props: any) {
  return <TestComponent {...props} />;
}

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { type: 'color', prop: 'color', initialValue: 'blue', libraryValue: null },
    {
      type: 'string',
      prop: 'label',
      initialValue: 'test-component',
      libraryValue: '__',
    },
  ],
};
