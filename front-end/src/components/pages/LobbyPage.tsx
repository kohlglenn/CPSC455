import React from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { ReduxState } from '../../reducers';
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { User } from '../../models';

import './LobbyPage.css'


export interface LobbyProps {
    name: string;
    id: number;
    members: (User | null)[];
    lobby_photo?: string;
}
function LobbyPage() {
    const lobbyData = useLocation().state as LobbyProps;
    const user = useSelector((state: ReduxState) => state.user);

    
    const handleLobbySettingsClick = () => {
        console.log('settings clicked');
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
                <div className='lobby-page-header'>
                    {lobbyData.name}
                </div>
                <hr className='lobby-page-divider'></hr>
                <div className='lobby-page-body'>
                    <div className='lobby-participants'>
                        {lobbyData.members.map((member) => {
                          return (
                            <div className='lobby-participant'> 
                                <FontAwesomeIcon icon={solid('user')} className='lobby-participant-icon' size='3x'/>
                                <span className='lobby-participant-name'>{member?.name}</span>
                            </div>
                          ); 
                        })}
                    </div>
                    <div className='lobby-buttons'>
                        <button className='lobby-settings-button' onClick={handleLobbySettingsClick}>Settings</button>
                        <button className='lobby-filters-button' onClick={handleLobbyFiltersClick}>Search Filters</button>
                        <button className='lobby-add-members-button' onClick={handleAddMembersClick}>Add Members</button>
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