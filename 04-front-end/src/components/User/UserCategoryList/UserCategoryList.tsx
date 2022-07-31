import ICategory from "../../../models/ICategory.model";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/api';

export default function UserCategoryList() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {

        api("get", "/api/category", "user")
            .then(apiResponse => {
                if (apiResponse.status === 'ok') {
                    return setCategories(apiResponse.data);
                }

                throw { message: 'Unknown error while loading categories...' }
            })

            .catch(error => {
                setErrorMessage(error?.message ?? 'Unknown error while loading categories...')
            })

    }, [])

    return (
        <div>
            {errorMessage && <p>Error: {errorMessage}</p>}
            {!errorMessage &&

                <ul className="list-group">
                    {categories.map(category => (
                        <li className="pt-3" key={"category-" + category.categoryId} style={{ listStyle: "none", width: 300 }}>
                            <Link className="list-group-item list-group-item-action" to={"/category/" + category.categoryId}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            }

        </div>
    );
}