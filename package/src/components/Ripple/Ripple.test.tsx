import { render, screen, tests } from '@mantine-tests/core';
import React from 'react';
import { Ripple, RippleProps, RippleStylesNames } from './Ripple';

const defaultProps: RippleProps = {
  trigger: 'focus',
  x: 0,
  y: 0,
  radius: 100,
  color: 'blue',
  opacity: 0.5,
};

describe('@0n0k0/materia/Ripple', () => {
  tests.itSupportsSystemProps<RippleProps, RippleStylesNames>({
    component: Ripple,
    props: defaultProps,
    polymorphic: true,
    styleProps: false,
    extend: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@0n0k0/materia/Ripple',
    stylesApiSelectors: ['root'],
  });

  it('renders with focus trigger', () => {
    render(<Ripple {...defaultProps} data-testid="ripple" />);
    expect(screen.getByTestId('ripple')).toBeInTheDocument();
  });

  it('renders null for hover trigger without phaseControls', () => {
    const { container } = render(
      <Ripple trigger="hover" x={0} y={0} radius={100} color="blue" opacity={0.5} />
    );
    expect(container.querySelector('div[class]')).toBeNull();
  });

  it('renders for hover trigger with phaseControls', () => {
    const phaseControls = {
      onEnter: () => {},
      onEntered: () => {},
      onExit: () => {},
      onExited: () => {},
    };
    render(
      <Ripple
        trigger="hover"
        x={0}
        y={0}
        radius={100}
        color="blue"
        opacity={0.5}
        mounted
        phaseControls={phaseControls}
        data-testid="ripple"
      />
    );
    expect(screen.getByTestId('ripple')).toBeInTheDocument();
  });

  it('renders with touch trigger', () => {
    render(<Ripple {...defaultProps} trigger="touch" data-testid="ripple" />);
    expect(screen.getByTestId('ripple')).toBeInTheDocument();
  });
});
