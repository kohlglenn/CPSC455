import React, { useState, useEffect } from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../../reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate } from "react-router-dom";
import { setLobbies } from '../../actions';
import { getLobbyAsync } from '../../models/rest';
import { Lobby } from '../../models';
import LobbySettings from '../widgets/LobbySettings';



import './LobbySelection.css';

const { v4: uuid } = require('uuid');

function LobbySelection() {
    const lobbies = useSelector((state: ReduxState) => state.lobbies);
    const user = useSelector((state: ReduxState) => state.user);
    const [lobbyCode, setLobbyCode] = useState('');

    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(setLobbies(lobbies));
    }, []);

    const handleLobbyGroupClicked = (lobby: any) => {
        navigate('/lobbypage', { state: lobby });
    }

    const handleJoinLobbyClicked = () => {
        getLobbyAsync(lobbyCode).then((res) => {
            if (res.length) {
                navigate('/lobbypage', { state: {...res[0], newLobby: false} });
            } else {
                console.log('lobby code not found');
            }
        });
        // console.log(foundLobby);
        let joinlobby = {
            id: lobbyCode,
        }
        // navigate('/lobbypage', { state: });
    }

    const handleCreateLobbyClicked = () => {
        let createLobby = {
            participants: [user],
            numberRestaurants: 50,
            newLobby: true,
        }
        navigate('/lobbypage', { state: createLobby });
    }


    return (
        <LayoutWithAppbar>
            <div className='lobby-selection-page'>
                <div className='lobby-selection-join-lobby'>
                    <span className='lobby-selection-header'>
                        Join a Lobby:
                    </span>
                    <input type="text" id="lobby-code" className='lobby-code-input' value={lobbyCode} onChange={(e) => {setLobbyCode(e.target.value)}} placeholder='ENTER 4-LETTER CODE' ></input>
                    <button className='lobby-selection-join-group-button' onClick={() => handleJoinLobbyClicked()}>ENTER</button>

                </div>
                
                <div className='lobby-selection-footer'>
                    <span className='lobby-selection-footer-text'>Don't have a lobby yet?</span>
                    <button className='lobby-selection-create-group-button' onClick={() => handleCreateLobbyClicked()}>Create a Lobby</button>
                </div>
            </div>
        </LayoutWithAppbar>
    );
}

export default LobbySelection;