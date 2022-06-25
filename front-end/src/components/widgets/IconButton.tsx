import React from 'react';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css'

export interface Props {
    onClick?: (e: React.MouseEvent) => void;
    icon: IconProp;
    size?: SizeProp;
    color?: string;
    style?: any;
};

function IconButton(props: Props) {
    const {icon, onClick, size, color, style} = props;
  return (
    <div onClick={onClick}>
        <FontAwesomeIcon style={style} icon={icon} size={size || "3x"} color={color}/>
    </div>
  );
}

export default IconButton;