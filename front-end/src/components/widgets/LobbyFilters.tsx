import './LobbyFilters.css'
import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { getLobbyAsync } from '../../models/rest';

export default function LobbyFilters(props: any) {
    const [numberRestaurantsValue, setNumberRestaurantsValue] = useState(9);
    const [priceValue, setPriceValue] = useState<number[]>([1,4]);
    const [starsValue, setStarsValue] = useState<number[]>([0,5]);
    const [distanceValue, setDistanceValue] = useState<number[]>([1,10]);
    const [reviewCountValue, setReviewCountValue] = useState<number[]>([5, 1000]);
    
    useEffect(() => {
        getLobbyAsync(props.lobbyID).then((res) => {
            if (res.length) {
                const lobby = res[0];
                setNumberRestaurantsValue(lobby.numberRestaurants);
                setPriceValue(lobby.price);
                setStarsValue(lobby.rating);
                setDistanceValue(lobby.distance);
                setReviewCountValue(lobby.reviewCount);
            } else {
                console.log('lobby code not found');
            }
        });
        
    }, [])

    const numberRestaurantsMarks = [{ label: 3, value: 3 }, { label: 6, value: 6 }, { label: 9, value: 9 }, { label: 12, value: 12 }, { label: 15, value: 15 }];


    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPriceValue(newValue as number[]);
    };
    const handleStarsChange = (event: Event, newValue: number | number[]) => {
        setStarsValue(newValue as number[]);
    };
    const handleDistanceChange = (event: Event, newValue: number | number[]) => {
        setDistanceValue(newValue as number[]);
    };
    const handleNumberRestaurantsChange = (e:any) => {
        setNumberRestaurantsValue(e.target.value);
    }
    const handleReviewCountChange = (event: Event, newValue: number | number[]) => {
        setReviewCountValue(newValue as number[]);
    };

    const handleSubmit = () => {
        const filters = {
            numberRestaurants: numberRestaurantsValue,
            price: priceValue,
            rating: starsValue,
            distance: distanceValue,
            reviewCount: reviewCountValue,
        }
        props.onFiltersSubmit(filters);
    }
    return(
        <div className="modal">
            <div className="modal-content" onClick = {e => e.stopPropagation()}>
                <div className="modal-header">Restaurant Filters</div>
                <hr className='lobby-page-divider'></hr>
                <div className="modal-body">
                    <div className="number-restaurants-setting">
                        How many restaurants to pick from?
                        <div className="filter-block">
                            <Slider 
                                className="filter-slider" 
                                defaultValue={9}
                                value={numberRestaurantsValue} 
                                min={3} 
                                max={15} 
                                step={3} 
                                aria-label="Default" 
                                valueLabelDisplay="auto" 
                                marks={numberRestaurantsMarks} 
                                onChange={(e) => handleNumberRestaurantsChange(e)}
                            />
                        </div>
                    </div>  
                    <div className="other-filters">
                        <div>Set Other Filters Below</div>
                        <div className="filter-block">
                            <div className="filter-range">$</div>
                            <Slider
                                className="filter-slider"
                                min={1}
                                max={4}
                                value={priceValue}
                                valueLabelFormat={(x) => {
                                    var text = '';
                                    for (let i = 0; i < x; i++) {
                                        text += '$';
                                    }
                                    return text;
                                }}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                            />
                            <div className="filter-range">$$$$</div>
                        </div>
                        <div className="filter-block">
                            <div className="filter-range">0 stars</div>
                            <Slider
                                className="filter-slider"
                                min={0}
                                max={5}
                                step={0.5}
                                value={starsValue}
                                valueLabelFormat={(x) => x + ' stars'}
                                onChange={handleStarsChange}
                                valueLabelDisplay="auto"
                            />
                            <div className="filter-range">5 stars</div>
                        </div>
                        <div className="filter-block">
                            <div className="filter-range">1 km</div>
                            <Slider
                                className="filter-slider"
                                min={1}
                                max={10}
                                step={1}
                                value={distanceValue}
                                valueLabelFormat={(x) => x + ' km'}
                                onChange={handleDistanceChange}
                                valueLabelDisplay="auto"
                            />
                            <div className="filter-range">10 km</div>
                        </div>
                        <div className="filter-block">
                            <div className="filter-range">&lt;5 reviews</div>
                            <Slider 
                                className="filter-slider"
                                min={5}
                                max={1000}
                                step={50}
                                value={reviewCountValue}
                                onChange={handleReviewCountChange}
                                valueLabelDisplay="auto"
                            />
                            <div className="filter-range">1000+ reviews</div>
                        </div>

                    </div>          
                </div>
                <hr className='lobby-page-divider'></hr>

                <div className="modal-footer">
                    <input className="lobby-filters-submit-button" type="submit" value="Submit" onClick={() => handleSubmit()}></input>

                </div>
            </div>
        </div>
    );

}