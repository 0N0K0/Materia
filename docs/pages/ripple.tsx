import React from 'react';
import { DocsTabs } from '../components/DocsTabs';
import { PageHeader } from '../components/PageHeader';
import { Shell } from '../components/Shell';
import { PACKAGE_DATA } from '../data';
import docgen from '../docgen.json';
import Docs from '../ripple.mdx';
import { STYLES_API_DATA } from '../styles-api';

export default function RipplePage() {
  return (
    <Shell>
      <PageHeader
        data={{
          ...PACKAGE_DATA,
          packageDescription: 'Bas-niveau — effet de ripple pour hover, focus et touch.',
        }}
      />
      <DocsTabs
        docgen={docgen}
        componentsProps={['@0n0k0/materia/Ripple']}
        componentsStyles={['Ripple']}
        stylesApiData={STYLES_API_DATA}
      >
        <Docs />
      </DocsTabs>
    </Shell>
  );
}
