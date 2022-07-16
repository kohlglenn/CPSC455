import React, { useState, useEffect } from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { ReduxState } from '../../reducers';
import { useNavigate, useLocation } from "react-router-dom";
import { addLobby } from '../../actions';
import { Lobby } from '../../models';
import LobbySettings from '../widgets/LobbySettings';




import { useSelector, useDispatch } from 'react-redux';
import { User } from '../../models';
import { addLobbyAsync, updateNumberRestaurantsAsync } from '../../models/rest';


import './LobbyPage.css'


export interface LobbyProps {
    id?: string;
    participants: User[];
    numberRestaurants: number;
    newLobby: boolean,
}
function LobbyPage(props: LobbyProps) {
    const lobbyData = useLocation().state as LobbyProps;
    const [lobbyID, setLobbyID] = useState(lobbyData.id);
    const [showSettings, setShowSettings] = useState(false);

    const user = useSelector((state: ReduxState) => state.user);
    const defaultNumberRestaurants = 50;
    const dispatch = useDispatch();

    useEffect(() => {
        if (lobbyData.newLobby) {
            var text = "";
            var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            
            for (var i = 0; i < 4; i++) {
                text += letters.charAt(Math.random() * letters.length);
            }
            setLobbyID(text);
            const lobby: Lobby = { id: text, participants: lobbyData.participants, numberRestaurants: lobbyData.numberRestaurants, restaurants: [], votes: [] };
            addLobbyAsync(lobby);
        }
    }, [])
    
    const handleLobbySettingsClick = () => {
        setShowSettings(true);
    }

    const handleNumberRestaurantsChange = (num: number) => {
        updateNumberRestaurantsAsync({ id: lobbyID, numRestaurants: num });
        setShowSettings(false);
    }

    const handleLobbyFiltersClick = () => {
        console.log('filters clicked');
    }

    const handleAddMembersClick = () => {
        console.log('add members clicked');
    }
    
    
    return (
        <LayoutWithAppbar>
            <div className='lobby-page'>
                {showSettings && <LobbySettings onNumberRestaurantsChange={handleNumberRestaurantsChange}></LobbySettings>}
                <div className='lobby-page-header'>
                    Go2Eat Lobby
                </div>
                <hr className='lobby-page-divider'></hr>
                <div className='lobby-page-body'>
                    <div className='lobby-participants'>Participants</div>
                    <div className='lobby-buttons'>
                        <div className='lobby-room-code'>
                            <span>Room Code:</span>
                            <span>{lobbyID}</span>
                        </div>
                        <button className='lobby-settings-button' onClick={handleLobbySettingsClick}>Settings</button>
                    </div>
                </div>
                <hr className='lobby-page-divider'></hr>
                <div className='lobby-page-footer'>
                    <button className='lobby-start-search-button'>Start Search</button>
                </div>
            </div>
        </LayoutWithAppbar>
    );
}

export default LobbyPage;