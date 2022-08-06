import React, { useState, useEffect } from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { ReduxState } from '../../reducers';
import { useLocation } from "react-router-dom";
import { Lobby, Restaurant, RestaurantQuery, User, YelpBusinessSearchResponse } from '../../models';
import LobbyFilters from '../widgets/LobbyFilters';
import { useSelector, useDispatch } from 'react-redux';
import { getLobbyAsync, getRestaurantsAsync, updateFiltersAsync, setRestaurantsAsync } from '../../models/rest';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import UserWidget from '../widgets/UserWidget';
import { setLobby } from '../../actions';

import './LobbyPage.css'

const lobbyToQueryObject = (lobby: Lobby, coords: {latitude: number, longitude: number}) => {
    const {latitude, longitude} = coords;
    return {
        latitude,
        longitude,
        filters: {
            numberRestaurants: lobby.numberRestaurants,
            distanceLow: lobby.distance[0],
            ratingLow: lobby.rating[0],
            priceLow: lobby.price[0],
            reviewCountLow: lobby.reviewCount[0],
            distanceHigh: lobby.distance[1],
            ratingHigh: lobby.rating[1],
            priceHigh: lobby.price[1],
            reviewCountHigh: lobby.reviewCount[1]
        }
    } as RestaurantQuery;
};

const yelpResponseToRestaurant = (result: YelpBusinessSearchResponse) => {
const restaurant: Restaurant = {
    id: result.id as string,
    name: result.name,
    photos: [result.image_url],
    price_level: result.price,
    rating: result.rating,
    user_ratings_total: result.review_count,
    location: result.coordinates
    };
    return restaurant;
}

export interface LobbyProps {
    id?: string;
    isHost?: boolean;
}
function LobbyPage(props: LobbyProps) {
    const [lobbyID, setLobbyID] = useState((useLocation().state as LobbyProps).id);
    const [isHost, setIsHost] = useState((useLocation().state as LobbyProps).isHost);
    const [lobbyUsers, setLobbyUsers] = useState<User[]>([]);
    const [lobbyHost, setLobbyHost] = useState<User>();
    const [showFilters, setShowFilters] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const lobby = useSelector((state: ReduxState) => state.lobby);
    const user = useSelector((state: ReduxState) => state.user);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getLobbyAsync(lobbyID!).then((res) => {
            if (res.length) {
                setLobbyHost(res[0].host);  
                setLobbyUsers(res[0].participants);
                dispatch(setLobby(res[0]));
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
        const newLobby = {...lobby, ...filters};
        dispatch(setLobby(newLobby));
        setShowFilters(false);
    }

    const handleLobbyStart = () => {
        if(!navigator.geolocation) {
            setToastMsg("Browser does not have geolocation.");
        } else {
            navigator.geolocation.getCurrentPosition(position => {
                const query = lobbyToQueryObject(lobby, position.coords);
                getRestaurantsAsync(query).then(restaurants => {
                    const newLobby = {...lobby, restaurants: restaurants.businesses.map(yelpResponseToRestaurant)};
                    dispatch(setLobby(newLobby));
                    setRestaurantsAsync(newLobby.restaurants, newLobby.id);
                    navigate("/selection");
                }).catch(err => {
                    setToastMsg(`Error retrieving restaurants. ${err}`);
                });
            },
            error => {
                setToastMsg("Location must be enabled.");
            });
        }
    }
    
    return (
        <LayoutWithAppbar>
            <UserWidget></UserWidget>

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
                                       <div>{user.name}{user._id == lobbyHost?._id && <FontAwesomeIcon icon={solid('crown')}/>}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='lobby-buttons'>
                        <div className={`lobby-room-code${isHost ? '-host' : ''}`}>
                            <span>Room Code:</span>
                            <span>{lobbyID}</span>
                        </div>
                        {isHost && <button className='lobby-settings-button' onClick={handleLobbySettingsClick}>Filters</button>}
                    </div>
                </div>
                <hr className='lobby-page-divider'></hr>
                {isHost && <div className='lobby-page-footer'>
                    <button className='lobby-start-search-button' onClick={handleLobbyStart}>Start Search</button>
                </div>}
                {!isHost && 
                <div className='lobby-page-waiting-message'>
                    <span>Waiting for Host to start searching...</span>
                    <br></br>
                    <CircularProgress/>
                </div>}
                <Snackbar
                    open={!!toastMsg}
                    autoHideDuration={6000}
                    onClose={() => {setToastMsg('')}}
                    message={toastMsg}
                />
            </div>
        </LayoutWithAppbar>
    );
}

export default LobbyPage;