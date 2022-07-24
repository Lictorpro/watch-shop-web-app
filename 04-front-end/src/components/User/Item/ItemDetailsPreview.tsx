import IItem from '../../../models/IItem.model';
export interface IItemPreviewProperties {
    item: IItem;
}

export default function ItemDetailsPreview(props: IItemPreviewProperties) {
    return (
        <div className="col-sm-4">
            <div className="card">
                <img className="card-img-top" src={props.item.imagePath} alt={props.item.name} />
                <div className="card-body">
                    <h5 className="card-title">{props.item.name}</h5>
                    <p className="card-text">Description: {props.item.description}</p>
                    <p className="card-text price">Price: {props.item.price} RSD</p>
                    <p className="card-text">Alarm: {+props.item.hasAlarm}</p>
                    <p className="card-text">Subdial: {+props.item.hasSubdial}</p>
                    <p className="card-text">Automatic calibration: {+props.item.hasAutomaticCalibration}</p>
                    <p className="card-text">Stopwatch: {+props.item.hasStopwatch}</p>
                    <p className="card-text">Stopwatch: {props.item.bandType.name}</p>
                </div>
            </div>
        </div >
    );

}