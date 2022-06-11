import './AboutPage.css'

export default function AboutPage(props:any) {
    if (!props.show){
        return null;
    }
    return(
        <div className="modal" onClick = {props.closer}>
            <div className="modal-content" onClick = {e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className=" modal-title">How to use Go2Eat</h3>
                </div>
                <div className="modal-body">
                    <p>Info about go2eat</p>
                </div><br/>
                <div className="modal-footer">
                    <button className="detailed-close" onClick = {props.closer}>Close</button>
                </div>
            </div>
        </div>
    );

}