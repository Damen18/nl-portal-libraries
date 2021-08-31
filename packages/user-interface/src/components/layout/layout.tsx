import * as React from 'react';
import {StylesProvider} from '@gemeente-denhaag/denhaag-component-library';
import {FC, ReactElement} from 'react';
import {Header} from '../header';
import {Menu} from '../menu';

interface LayoutProps {
  headerLogo: ReactElement;
  headerFacet?: ReactElement;
}

const Layout: FC<LayoutProps> = ({headerLogo, headerFacet}) => (
  <StylesProvider>
    <Header logo={headerLogo} facet={headerFacet} />
    <Menu />
  </StylesProvider>
);

export {Layout};
