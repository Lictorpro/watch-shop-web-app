import IItem from '../../../models/IItem.model';
import { Link } from 'react-router-dom';
export interface IItemPreviewProperties {
  item: IItem;
}

export default function ItemPreview(props: IItemPreviewProperties) {


  return (
    <div className="col-sm-4">
      <div className="card" style={{ width: "250px" }}>
        <img className="card-img-top" src={props.item.imagePath} alt={props.item.name} />
        <div className="card-body">
          <h5 className="card-title">{props.item.name}</h5>
          <p className="card-text price">{props.item.price} RSD</p>
          <div className="btn-toolbar">
            <Link className="btn btn-primary me-3" to="">Add to cart</Link>
            <Link className="btn btn-primary " to={"/item/" + props.item.itemId}>Details</Link>
          </div>
        </div>
      </div>
    </div >
  );

}