import React from 'react';
import ResponsiveAppBar from '../widgets/ResponsiveAppBar';
import UserWidget from '../widgets/UserWidget';

function LayoutWithAppbar(props: React.PropsWithChildren<{}>) {
  return (
    <div id="root">
        <ResponsiveAppBar/>
        <UserWidget></UserWidget>
        <div id="content">
            {props.children}
        </div>
    </div>
  );
}

export default LayoutWithAppbar;