import { TestComponent } from '@0n0k0/materia';
import { MantineDemo } from '@mantinex/demo';
import React from 'react';

const code = `
import { TestComponent } from '@0n0k0/materia';

function Demo() {
  return <TestComponent label="Test component usage demo" />;
}
`;

function Demo() {
  return <TestComponent label="Test component usage demo" />;
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
