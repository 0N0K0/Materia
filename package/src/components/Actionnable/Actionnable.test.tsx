import { render, screen, tests } from '@mantine-tests/core';
import React from 'react';
import { Actionnable, ActionnableProps, ActionnableStylesNames } from './Actionnable';

const defaultProps: ActionnableProps = {
  children: 'test',
};

describe('@0n0k0/materia/Actionnable', () => {
  tests.itSupportsSystemProps<ActionnableProps, ActionnableStylesNames>({
    component: Actionnable,
    props: defaultProps,
    polymorphic: true,
    styleProps: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@0n0k0/materia/Actionnable',
    stylesApiSelectors: ['root'],
  });

  it('renders children', () => {
    render(<Actionnable>test content</Actionnable>);
    expect(screen.getByText('test content')).toBeInTheDocument();
  });

  it('does not render surface when disableRipples is set', () => {
    const { container } = render(<Actionnable disableRipples>test</Actionnable>);
    expect(container.querySelector('.surface')).toBeNull();
  });
});
