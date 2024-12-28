import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from '../../components/Loader';
import {
    useDeleteUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
} from '../../redux/api/userApiSlice';
import Message from '../../components/Message';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const { userInfo } = useSelector((state) => state.auth);

    const [deleteUser] = useDeleteUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUserName, setEditableUserName] = useState("");
    const [editableUserEmail, setEditableUserEmail] = useState("");

    const [updateUser] = useUpdateUserMutation();

    useEffect(() => {
        refetch();
    }, [refetch]);

    // delete user by admin
    const deleteHandler = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUser(id);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch();
                } catch (err) {
                    toast.error(err?.data?.message || err.error);
                }
            }
        });
    };

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id);
        setEditableUserName(username);
        setEditableUserEmail(email);
    };

    // update user by admin
    const updateHandler = async (id) => {
        try {
            await updateUser({
                userId: id,
                username: editableUserName,
                email: editableUserEmail,
            });
            setEditableUserId(null);
            toast.success("User information edited successfully", {
                position: "top-center"
            })
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="p-4 min-h-screen bg-[#0f0f10]">
            <span></span>
            <h1 className="text-4xl font-semibold mb-4 text-center py-10">
                Users{" "}
                <span className="border p-2 rounded-full text-sm">
                    {users ? users.length : 0}
                </span>
            </h1>
            {isLoading ? (
                <span><Loader /></span>
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <div className="flex flex-col md:flex-row">
                    <table className="w-full md:w-4/5 mx-auto border">
                        <thead className="border-b">
                            <tr>
                                <th className="px-4 py-2 text-left"></th>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">NAME</th>
                                <th className="px-4 py-2 text-left">EMAIL</th>
                                <th className="px-4 py-2 text-left">ADMIN</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user, index) => (
                                <tr key={user._id} className="border-b">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{user._id}</td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={editableUserName}
                                                    onChange={(e) => setEditableUserName(e.target.value)}
                                                    className="w-full text-white p-2 border rounded-lg"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {user.username}{" "}
                                                <button
                                                    onClick={() =>
                                                        toggleEdit(user._id, user.username, user.email)
                                                    }
                                                >
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={editableUserEmail}
                                                    onChange={(e) => setEditableUserEmail(e.target.value)}
                                                    className="w-full text-white p-2 border rounded-lg"
                                                />
                                                <button
                                                    onClick={() => updateHandler(user._id)}
                                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                                                <button
                                                    onClick={() =>
                                                        toggleEdit(user._id, user.name, user.email)
                                                    }
                                                >
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {user.isAdmin ? (
                                            <FaCheck style={{ color: "green" }} />
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {!user.isAdmin && (
                                            <div className="flex">
                                                <button
                                                    onClick={() => deleteHandler(user._id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;