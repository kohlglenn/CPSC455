import React, { useState, useEffect } from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

import './LobbySelection.css';
const lobbyListExample = [
    'Example Group 1',
    'Example Group 2',
    'Example Group 3'
]

function LobbySelection() {
    const [lobbyList, setLobbyList] = useState(lobbyListExample);
    const [showLogin, setShowLogin] = useState(false);

    const handleLobbyGroupClicked = (lobby: any) => {
        console.log(lobby);
    }

    const handleCreateGroupClicked = () => {
        console.log('Create Group clicked');
    }


    return (
        <LayoutWithAppbar>
            <div className='lobby-selection-page'>
                <span className='lobby-selection-header'>
                    Join a Group:
                </span>
                <div className='lobby-selection-body'>
                    {lobbyList.map((lobby) => {
                        return (
                            <div className='lobby-group' onClick={() => {
                                handleLobbyGroupClicked(lobby);
                            }}>
                                <FontAwesomeIcon icon={solid('users')} className='group-lobby-icon' size="3x"></FontAwesomeIcon>
                                <span className='lobby-name'>{lobby}</span>
                            </div>
                        );
                    })}
                </div>
                <div className='lobby-selection-footer'>
                    <span className='lobby-selection-footer-text'>Don't have a group yet?</span>
                    <button className='lobby-selection-create-group-button' onClick={() => handleCreateGroupClicked()}>Create A Group</button>
                </div>
            </div>
        </LayoutWithAppbar>
    );
}

export default LobbySelection;