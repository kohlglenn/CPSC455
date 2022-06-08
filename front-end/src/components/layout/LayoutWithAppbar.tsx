import React from 'react';
import ResponsiveAppBar from '../widgets/ResponsiveAppBar';

function LayoutWithAppbar(props: React.PropsWithChildren<{}>) {
  return (
    <div id="root">
        <ResponsiveAppBar/>
        <div id="content">
            {props.children}
        </div>
    </div>
  );
}

export default LayoutWithAppbar;