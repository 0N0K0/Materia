import React from 'react';
import Docs from '../actionnable.mdx';
import { DocsTabs } from '../components/DocsTabs';
import { PageHeader } from '../components/PageHeader';
import { Shell } from '../components/Shell';
import { PACKAGE_DATA } from '../data';
import docgen from '../docgen.json';
import { STYLES_API_DATA } from '../styles-api';

export default function ActionnablePage() {
  return (
    <Shell>
      <PageHeader
        data={{
          ...PACKAGE_DATA,
          packageDescription:
            'Surface d’interaction polymorphique avec effets de ripple (hover, focus, touch).',
        }}
      />
      <DocsTabs
        docgen={docgen}
        componentsProps={['@0n0k0/materia/Actionnable']}
        componentsStyles={['Actionnable']}
        stylesApiData={STYLES_API_DATA}
      >
        <Docs />
      </DocsTabs>
    </Shell>
  );
}
