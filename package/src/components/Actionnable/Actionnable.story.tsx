import React from 'react';
import { Actionnable } from './Actionnable';

export default { title: 'Actionnable' };

const buttonStyle: React.CSSProperties = {
  padding: '8px 20px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: 4,
  fontSize: 16,
};

export function Usage() {
  return (
    <div style={{ padding: 40, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Actionnable component="button" style={buttonStyle}>
        Filled
      </Actionnable>
      <Actionnable component="button" variant="outline" style={buttonStyle}>
        Outline
      </Actionnable>
      <Actionnable component="button" variant="light" style={buttonStyle}>
        Light
      </Actionnable>
      <Actionnable component="button" variant="subtle" style={buttonStyle}>
        Subtle
      </Actionnable>
    </div>
  );
}

export function Colors() {
  return (
    <div style={{ padding: 40, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['blue', 'red', 'green', 'orange', 'grape'] as const).map((color) => (
        <Actionnable key={color} component="button" color={color} style={buttonStyle}>
          {color}
        </Actionnable>
      ))}
    </div>
  );
}

export function DisabledRipples() {
  return (
    <div style={{ padding: 40, display: 'flex', gap: 16 }}>
      <Actionnable component="button" style={buttonStyle}>
        All ripples
      </Actionnable>
      <Actionnable component="button" disableHoverRipple style={buttonStyle}>
        No hover ripple
      </Actionnable>
      <Actionnable component="button" disableFocusRipple style={buttonStyle}>
        No focus ripple
      </Actionnable>
      <Actionnable component="button" disableTouchRipple style={buttonStyle}>
        No touch ripple
      </Actionnable>
      <Actionnable component="button" disableRipples style={buttonStyle}>
        No ripples
      </Actionnable>
    </div>
  );
}

export function AsLink() {
  return (
    <div style={{ padding: 40 }}>
      <Actionnable
        component="a"
        href="#"
        variant="subtle"
        style={{ ...buttonStyle, display: 'inline-block' }}
      >
        Link button
      </Actionnable>
    </div>
  );
}
