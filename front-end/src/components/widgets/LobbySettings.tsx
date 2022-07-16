import './LobbySettings.css'
import React, { useState, useEffect } from 'react';

// @ts-ignore 
import RangeSlider from 'react-range-slider-input';

export default function LobbySettings(props: any) {
    const [numberRestaurants, setNumberRestaurants] = useState(50);

    const handleNumberRestaurantsChange = (e:any) => {
        setNumberRestaurants(e[1]);
    }

    const handleSubmit = () => {
        props.onNumberRestaurantsChange(numberRestaurants);
    }
    return(
        <div className="modal">
            <div className="modal-content" onClick = {e => e.stopPropagation()}>
                <div className="modal-header">Lobby Settings</div>
                <div className="modal-body">
                    <div className="number-restaurants-setting">
                        Number of Restaurants: {numberRestaurants}
                        <RangeSlider
                            id='number-restaurants'
                            className="single-thumb"
                            min={5}
                            max={100}
                            step={5}
                            defaultValue={[5, 50]}
                            thumbsDisabled={[true, false]}
                            rangeSlideDisabled={true}
                            onInput={(e:any) => handleNumberRestaurantsChange(e)}
                        />    
                    </div>            
                </div>
                <div className="modal-footer">
                    <input type="submit" value="Submit" onClick={() => handleSubmit()}></input>

                </div>
            </div>
        </div>
    );

}