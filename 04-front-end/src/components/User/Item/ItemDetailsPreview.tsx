import IItem from '../../../models/IItem.model';
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export interface IItemPreviewProperties {
    item: IItem;
}

const capitalizeFirst = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const boolToYesOrNo = (number: boolean) => {
    if (number === true) {
        return "Yes"
    }
    if (number === false) {
        return "No"
    }
}

export default function ItemDetailsPreview(props: IItemPreviewProperties) {
    return (
        <>


            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title pb-5">{props.item.name}</h3>
                        <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-6">
                                <div className="white-box text-center"><img src={props.item.imagePath} className="img-responsive" alt={props.item.name} style={{ width: "350px" }} /></div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-6">
                                <h5 className="box-title mt-5">Product description</h5>
                                <p>{props.item.description}</p>
                                <h3 className="mt-5">
                                    <FontAwesomeIcon icon={faMoneyBill1} /> {props.item.price} RSD
                                </h3>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <h3 className="box-title mt-5">Details</h3>
                                <div className="table-responsive">
                                    <table className="table table-striped table-product">
                                        <tbody>
                                            <tr>
                                                <td width="390">Movement type</td>
                                                <td>{capitalizeFirst(props.item.movementType)}</td>
                                            </tr>
                                            <tr>
                                                <td>Display type</td>
                                                <td>{capitalizeFirst(props.item.displayType)}</td>
                                            </tr>
                                            <tr>
                                                <td>Band type</td>
                                                <td>{props.item.bandType.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Alarm</td>
                                                <td>{boolToYesOrNo(props.item.hasAlarm)}</td>
                                            </tr>
                                            <tr>
                                                <td>Subdial</td>
                                                <td>{boolToYesOrNo(props.item.hasSubdial)}</td>
                                            </tr>
                                            <tr>
                                                <td>Automatic calibration</td>
                                                <td>{boolToYesOrNo(props.item.hasAutomaticCalibration)}</td>
                                            </tr>
                                            <tr>
                                                <td>Stopwatch</td>
                                                <td>{boolToYesOrNo(props.item.hasStopwatch)}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}