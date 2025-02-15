import * as React from 'react';
import styled from 'styled-components';

import { Store } from '../../store/store-provider';
import { Logo } from './logo';
import { MenuButtonsSmart } from './menu-buttons';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;

  position: ${props => (props.theme.fixedHeader ? 'fixed' : 'inherit')};

  padding: 0 ${props => props.theme.gridSize * 2}px;
  height: ${props => props.theme.gridSize * 8}px;
  background: ${props => props.theme.themeColor};
  color: ${props => props.theme.colorInverted};
`;

export const FixedHeaderFixer = styled.div`
  height: ${props =>
    props.theme.fixedHeader ? props.theme.gridSize * 8 : 0}px;
`;

export const Header = () => {
  const title = 'Lightning Talks';
  const { state } = React.useContext(Store);

  return (
    <HeaderWrapper>
      <Logo title={title} />
      <MenuButtonsSmart username={state.userInfo && state.userInfo.username} />
    </HeaderWrapper>
  );
};
