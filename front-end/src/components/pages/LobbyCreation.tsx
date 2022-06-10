import React from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import './LobbyCreation.css'


function LobbySelection() {
    
    const handleSoloLobbyClick = () => {
        console.log('solo lobby clicked');
    }

    const handleGroupLobbyClick = () => {
        console.log('group lobby clicked');
    }
    
    
    return (
        <LayoutWithAppbar>
            <div className='lobby-creation-page'>
                <span className='lobby-creation-question'>Who are you eating with?</span>
                <div className='lobby-creation-button-container'>
                    <div className='lobby-creation-button'>
                        <FontAwesomeIcon icon={solid('user')} className='lobby-creation-icon' size="3x" onClick={() => {handleSoloLobbyClick()}}></FontAwesomeIcon>
                        <span>By myself</span>
                    </div>
                    <div className='lobby-creation-button'>
                        <FontAwesomeIcon icon={solid('users')} className='lobby-creation-icon' size="3x" onClick={() => {handleGroupLobbyClick()}}></FontAwesomeIcon>
                        <span>With a group</span>
                    </div>
                </div>
            </div>
        </LayoutWithAppbar>
    );
}

export default LobbySelection;