import './AboutPage.css'

import step1 from "../../Go2EatStep1.gif"
import step2 from "../../Go2EatStep2.gif"
import step3 from "../../Go2EatStep3.gif"

export default function AboutPage(props:any) {
    if (!props.show){
        return null;
    }
    return(
        <div className="modal" onClick = {props.closer}>
            <div className="modal-content" id="about-modal" onClick = {e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className=" modal-title">How to use Go2Eat</h3>
                </div>
                <div className="modal-body">
                    <div>Using Go2Eat is an easy 3 step process:</div>
                    <div>1. Create an account, or log in if you already have one.</div>
                    <img id="stepgif" src={step1} alt="loading..." />
                    <div>2. Create a lobby and invite your friends!</div>
                    <img id="stepgif" src={step2} alt="loading..." />
                    <div>3. Start Choosing! Make sure you allow access to your location so we can give you local restaurants.</div>
                    <img id="stepgif" src={step3} alt="loading..." />
                </div><br/>
                <div className="modal-footer">
                    <button className="detailed-close" onClick = {props.closer}>Close</button>
                </div>
            </div>
        </div>
    );

}
