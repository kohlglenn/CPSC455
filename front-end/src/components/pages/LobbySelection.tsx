import React, { useState, useEffect } from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../../reducers';
import { useNavigate } from "react-router-dom";
import { setLobby } from '../../actions';
import { getLobbyAsync } from '../../models/rest';
import { Lobby } from '../../models';
import UserWidget from '../widgets/UserWidget';
import { addLobbyAsync, addLobbyUsersAsync } from '../../models/rest';
import Snackbar from '@mui/material/Snackbar';




import './LobbySelection.css';

function LobbySelection() {
    const lobby = useSelector((state: ReduxState) => state.lobby);
    const user = useSelector((state: ReduxState) => state.user);
    const [lobbyCode, setLobbyCode] = useState('');
    const [showError, setShowError] = useState(false);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(setLobby(lobby));
    }, []);


    const handleJoinLobbyClicked = () => {
        getLobbyAsync(lobbyCode).then((res) => {
            if (res.length) {
                navigate('/lobbypage', { state: { id: lobbyCode, isHost: false } });
                addLobbyUsersAsync({ id: lobbyCode, user: user });
            } else {
                setShowError(true);
            }
        });       
    }

    const handleCreateLobbyClicked = () => {
        var roomCode = "";
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            
        for (var i = 0; i < 4; i++) {
            roomCode += letters.charAt(Math.random() * letters.length);
        }
        console.log(user);
        const lobby: Lobby = { id: roomCode, participants: [user], host: user, numberRestaurants: 9, rating: [0, 5], distance: [1, 10], price: [1, 4], reviewCount: [5, 1000], restaurants: [], votes: [] };
        addLobbyAsync(lobby);
        dispatch(setLobby(lobby));
        navigate('/lobbypage', { state: { id: roomCode, isHost: true } });
    }


    return (
        <LayoutWithAppbar>
            <UserWidget></UserWidget>
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
                <Snackbar
                    open={showError}
                    autoHideDuration={6000}
                    onClose={() => {setShowError(false)}}
                    message="Room not found."
                />
            </div>
        </LayoutWithAppbar>
    );
}

export default LobbySelection;