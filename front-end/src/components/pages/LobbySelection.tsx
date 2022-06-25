import React, { useState, useEffect } from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../../reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate } from "react-router-dom";
import { setLobbies } from '../../actions';
    

import './LobbySelection.css';

const { v4: uuid } = require('uuid');

function LobbySelection() {
    const lobbies = useSelector((state: ReduxState) => state.lobbies);
    const user = useSelector((state: ReduxState) => state.user);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(setLobbies(lobbies));
    }, []);

    const handleLobbyGroupClicked = (lobby: any) => {
        navigate('/lobbypage', { state: lobby });
    }

    const handleCreateGroupClicked = () => {
        let tempLobby = {
            name: 'Temporary Lobby Name',
            id: uuid(),
            members: [user]
        }
        navigate('/lobbypage', { state: tempLobby });
    }


    return (
        <LayoutWithAppbar>
            <div className='lobby-selection-page'>
                <span className='lobby-selection-header'>
                    Join a Group:
                </span>
                <div className='lobby-selection-body'>
                    {lobbies.map((lobby) => {
                        return (
                            <div key={lobby.id} className='lobby-group' onClick={() => {
                                handleLobbyGroupClicked(lobby);
                            }}>
                                {!lobby.lobby_photo && <FontAwesomeIcon icon={solid('users')} className='group-lobby-icon' size="3x"></FontAwesomeIcon>}
                                <span className='lobby-name'>{lobby.name}</span>
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