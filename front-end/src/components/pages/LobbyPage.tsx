import React, { useState, useEffect } from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { ReduxState } from '../../reducers';
import { useLocation } from "react-router-dom";
import { Lobby, User } from '../../models';
import LobbyFilters from '../widgets/LobbyFilters';
import { useSelector, useDispatch } from 'react-redux';
import { getLobbyAsync, updateFiltersAsync } from '../../models/rest';


import './LobbyPage.css'


export interface LobbyProps {
    id?: string;
}
function LobbyPage(props: LobbyProps) {
    const [lobbyID, setLobbyID] = useState((useLocation().state as LobbyProps).id);
    const [lobbyUsers, setLobbyUsers] = useState<User[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        getLobbyAsync(lobbyID!).then((res) => {
            if (res.length) {
                setLobbyUsers(res[0].participants);
            } else {
                console.log('lobby code not found');
            }
        });
        
    }, [])
    
    const handleLobbySettingsClick = () => {
        setShowFilters(true);
    }

    const handleFiltersSubmit = (filters: Object) => {
        updateFiltersAsync({ id: lobbyID, filters: filters });
        setShowFilters(false);
    }
    
    
    return (
        <LayoutWithAppbar>
            <div className='lobby-page'>
                {showFilters && <LobbyFilters onFiltersSubmit={handleFiltersSubmit} lobbyID={lobbyID}></LobbyFilters>}
                <div className='lobby-page-header'>
                    Go2Eat Lobby
                </div>
                <hr className='lobby-page-divider'></hr>
                <div className='lobby-page-body'>
                    <div className='lobby-participants'>
                        <div>Participants</div>
                        <div className='lobby-participants-display'>
                            {lobbyUsers!.map((user) => {
                                return (
                                    <div className='lobby-user'>
                                        <FontAwesomeIcon icon={solid('user')} size='3x' />
                                       <div>{user.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='lobby-buttons'>
                        <div className='lobby-room-code'>
                            <span>Room Code:</span>
                            <span>{lobbyID}</span>
                        </div>
                        <button className='lobby-settings-button' onClick={handleLobbySettingsClick}>Filters</button>
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