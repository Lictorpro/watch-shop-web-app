import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons"
import { useState, useEffect } from 'react';
import { api } from '../../../api/api';
import IUser from '../../../models/IUser.model';
import './AdminUserList.sass';

interface IAdminUserRowProperties {
    user: IUser;
}

export default function AdminUserList() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    function loadUsers() {
        api("get", "/api/user", "administrator")
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage(res.data + "");
                }

                setUsers(res.data);
            })
    }

    useEffect(loadUsers, []);

    function AdminUserRow(props: IAdminUserRowProperties) {
        const [editPasswordVisible, setEditPasswordVisible] = useState<boolean>(false);
        const [newPassword, setNewPassword] = useState<string>("");

        const activeSideClass = props.user.isActive ? " btn-primary" : " btn-light";
        const inactiveSideClass = !props.user.isActive ? " btn-primary" : " btn-light";

        function doToggleUserActiveState() {
            api("put", "/api/user/" + props.user.userId, "administrator", {
                isActive: !props.user.isActive,
            })
                .then(res => {
                    if (res.status === 'error') {
                        return setErrorMessage(res.data + "");
                    }

                    loadUsers();
                })
        }

        function doChangePassword() {
            api("put", "/api/user/" + props.user.userId, "administrator", {
                password: newPassword,
            })
                .then(res => {
                    if (res.status === 'error') {
                        return setErrorMessage(res.data + "");
                    }

                    loadUsers();
                })
        }

        function changePassword(e: React.ChangeEvent<HTMLInputElement>) {
            setNewPassword(e.target.value);
        }

        return (
            <tr>
                <td>{props.user.userId}</td>
                <td>{props.user.email}</td>
                <td>{props.user.forename + " " + props.user.surname}</td>
                <td>{props.user.address}</td>
                <td>
                    <div className='btn-group' onClick={() => { doToggleUserActiveState() }}>
                        <div className={"btn btn-sm" + activeSideClass}><FontAwesomeIcon icon={faSquareCheck} /></div>
                        <div className={"btn btn-sm" + inactiveSideClass}><FontAwesomeIcon icon={faSquare} /></div>
                    </div>
                </td>
                <td>
                    {!editPasswordVisible && <button className="btn btn-primary btn-sm" onClick={() => { setEditPasswordVisible(true) }}>Change password</button>}
                    {editPasswordVisible &&
                        <div className="input-group">
                            <input type="text" className="form-control" value={newPassword} onChange={e => changePassword(e)} />
                            <button className='btn btn-success btn-sm' onClick={() => { doChangePassword() }}>Save</button>
                            <button className='btn btn-danger btn-sm' onClick={() => { setEditPasswordVisible(false); setNewPassword("") }}>Cancel</button>
                        </div>}
                </td>
            </tr>
        )
    }

    return (
        <div>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            {!errorMessage &&
                <table className='table table-hover table-striped user-list'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Full name</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => <AdminUserRow key={"user" + user.userId} user={user} />)}
                    </tbody>
                </table>
            }
        </div>
    );
}