import ICart from '../../models/ICart.model';
export interface ICartPreviewProperties {
    cart: ICart;
}

export default function CartPreview(props: ICartPreviewProperties) {
    return (
        <div className="row">
            <div className="col col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="card-text">
                            <div className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Price per unit</th>
                                        <th>Quantity</th>
                                        <th>Total price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.cart.content.map((item, index) => (
                                        <tr key={"cart-item-" + item.item.itemId}>
                                            <td>{index + 1}</td>
                                            <td>{item.item.name}</td>
                                            <td>{(+item.item.price).toFixed(2) + " RSD"}</td>
                                            <td>{"x " + (+item.quantity).toFixed(0)}</td>
                                            <td>{(+item.item.price * +item.quantity).toFixed(2) + " RSD"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <th colSpan={5}></th>
                                    <th>{props.cart.content.map(item => +item.item.price * +item.quantity).reduce((sum, item) => sum + item, 0).toFixed(2) + " RSD"}</th>
                                </tfoot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}