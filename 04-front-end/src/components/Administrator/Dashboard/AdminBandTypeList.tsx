import IBandType from '../../../models/IBandType.model';
import { useState, useEffect } from 'react';
import { api } from '../../../api/api';
interface IAdminBandTypeListRowProperties {
    bandType: IBandType;
}

export default function AdminBandTypeList() {
    const [bandTypes, setBandTypes] = useState<IBandType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showAddNewBandType, setShowAddNewBandType] = useState<boolean>(false);

    function AdminBandTypeListRow(props: IAdminBandTypeListRowProperties) {
        const [name, setName] = useState<string>(props.bandType.name);

        const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
        }

        const doEditBandType = (e: any) => {
            api("put", "/api/bandType/" + props.bandType.bandTypeId, "administrator", { name })
                .then(res => {
                    if (res.status === 'error') {
                        return setErrorMessage("Could not edit this band type!");
                    }

                    loadBandTypes();
                })
        }

        return (
            <tr>
                <td>{props.bandType.bandTypeId}</td>
                <td>
                    <div className='input-group'>
                        <input className="form-control" type="text" value={name} onChange={e => nameChanged(e)} />
                        {
                            props.bandType.name !== name ? <button className='btn btn-primary btn-sm' onClick={e => doEditBandType(e)}>
                                Save
                            </button> : ''
                        }

                    </div>
                </td>
                <td></td>
            </tr>
        )
    }

    function AdminBandTypeAddRow() {
        const [name, setName] = useState<string>("");

        const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
        }

        const doAddBandType = (e: any) => {
            api("post", "/api/bandType/", "administrator", { name })
                .then(res => {
                    if (res.status === 'error') {
                        return setErrorMessage("Could not add this band type!");
                    }

                    loadBandTypes();
                    setName("");
                    setShowAddNewBandType(false);
                })
        }

        return (
            <tr>
                <td></td>
                <td>
                    <div className='input-group'>
                        <input className="form-control" type="text" value={name} onChange={e => nameChanged(e)} />
                        {
                            name.trim().length >= 4 && name.trim().length <= 32 ? <button className='btn btn-primary btn-sm' onClick={e => doAddBandType(e)}>
                                Save
                            </button> : ''
                        }

                    </div>
                </td>
                <td><button className="btn btn-danger btn-sm" onClick={() => {
                    setShowAddNewBandType(false);
                    setName("");
                }}>Cancel</button></td>
            </tr>
        )
    }

    const loadBandTypes = () => {
        api("get", "/api/bandType", "administrator")
            .then(apiResponse => {
                if (apiResponse.status === 'ok') {
                    return setBandTypes(apiResponse.data);
                }

                throw { message: 'Unknown error while loading band types...' }
            })

            .catch(error => {
                setErrorMessage(error?.message ?? 'Unknown error while loading band types...')
            })
    }

    useEffect(() => {

        loadBandTypes();

    }, [])

    return (
        <div>
            {errorMessage && <p>Error: {errorMessage}</p>}
            {!errorMessage &&
                <div>
                    <button className="btn btn-primary btn-sm mt-3 mb-3" onClick={() => setShowAddNewBandType(true)}>Add new band type</button>
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bandTypes.map(bandType => <AdminBandTypeListRow key={"category-row-" + bandType.bandTypeId} bandType={bandType} />)}
                            {showAddNewBandType && <AdminBandTypeAddRow />}
                        </tbody>
                    </table>
                </div>
            }

        </div >
    );
}