import { useState, useEffect } from 'react';
import { api } from '../../../api/api';
import ItemDetailsPreview from '../Item/ItemDetailsPreview';
import { useParams } from 'react-router-dom';
import IItem from '../../../models/IItem.model';
import IBandType from '../../../models/IBandType.model';
export interface IUserItemDetailsPageUrlParams extends Record<string, string | undefined> {
    id: string
}

export default function UserItemDetailsPage() {
    const [item, setItem] = useState<IItem>();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const params = useParams<IUserItemDetailsPageUrlParams>();

    useEffect(() => {
        setLoading(true);

        api("get", "/api/item/" + params.id, "user")
            .then(res => {
                if (res.status === 'error') {
                    throw {
                        message: 'Could not get item data!'
                    }
                }
                return setItem(res.data);

            })


            .catch(error => {
                setErrorMessage(error?.message ?? 'Unknown error while loading this item!');
            })
            .finally(() => {
                setLoading(false);
            },)
    }, [params.id]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {errorMessage && <p>Error: {errorMessage}</p>}


            <div>

                {item && (
                    <div className="container">
                        <div className="row">
                            {< ItemDetailsPreview key={"item-" + item.itemId} item={item} />}
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}