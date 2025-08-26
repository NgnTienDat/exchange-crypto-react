import React, { useState } from 'react';
import {
    Search,
    Lock,
    Unlock,
    Trash2,
    Eye
} from 'lucide-react';
import { UserModal } from './UserModal';
import useUsers from '../../hooks/useUsers';
import useDeleteUser from '../../hooks/useDeleteUser';
import useUpdateUser from '../../hooks/useUpdateUser';
import { Spinner } from '../Spinner';

export const UserManagement = ({ orders, trades }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);

    const [page, setPage] = useState(0);
    const size = 3;
    const { isLoading, users, pagination } = useUsers(page, size);

    const { isLoading: delLoading, delUser } = useDeleteUser();
    const {
        isLoading: lockLoading,
        lockUserAccount,
    } = useUpdateUser();

    const handleUserAction = (userId, action) => {
        console.log(`${action} user ${userId}`);

        const targetUser = users.find(user => user.id === userId);
        if (!targetUser) return;

        switch (action) {
            case 'delete':
                if (window.confirm(`Are you sure you want to delete user: ${targetUser.email}?`)) {
                    delUser(userId);
                }
                break;

            case 'lock':
            case 'unlock':
                const confirmMessage = `Are you sure you want to ${action} account for: ${targetUser.email}?`;
                if (window.confirm(confirmMessage)) {
                    const data = {
                        userId: userId,
                        active: !targetUser.active
                    }
                    lockUserAccount(data);
                }
                break;

            default:
                console.log(`Unknown action: ${action}`);
        }
    };
    const openModal = (user) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    const closeModal = () => {
        setShowUserModal(false);
        setSelectedUser(null);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if any operation is in progress
    const isOperationInProgress = delLoading || lockLoading;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg  text-gray-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                    />
                </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Balance
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Join Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {user.email}
                                    </div>
                                    <div className="text-sm text-gray-500">ID: {user.id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        1000
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        BTC
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col space-y-1">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.active === true
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {user.active ? 'active' : 'locked'}
                                        </span>

                                        {user.tfaEnabled && (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                enable 2FA
                                            </span>
                                        )}
                                        {user.assetsLocked && (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                Assets Locked
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* Join date would go here */}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => openModal(user)}
                                            className="text-blue-600 hover:text-blue-900"
                                            title="View Details"
                                            disabled={isOperationInProgress}
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleUserAction(
                                                    user.id,
                                                    user.active ? 'lock' : 'unlock'
                                                )
                                            }
                                            className={`text-yellow-600 hover:text-yellow-900 ${isOperationInProgress ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            title={user.active ? 'Lock User' : 'Unlock User'}
                                            disabled={isOperationInProgress}
                                        >
                                            {user.active ? <Lock size={16} /> : <Unlock size={16} />}
                                        </button>
                                        <button
                                            onClick={() => handleUserAction(user.id, 'delete')}
                                            className={`text-red-600 hover:text-red-900 ${isOperationInProgress ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            disabled={isOperationInProgress}
                                            title="Delete User"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Show loading state */}
            {isOperationInProgress && (
                <div className="text-center text-gray-600">
                    {delLoading && <Spinner />}
                    {lockLoading && <Spinner />}
                </div>
            )}

            {/* Pagination controls */}
            <div className="flex space-x-5 justify-center items-center">
                <button
                    disabled={page === 0 || isOperationInProgress}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1 rounded disabled:opacity-50 text-gray-600 cursor-pointer hover:bg-gray-300"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-600">
                    Page {pagination.page + 1} / {pagination.totalPages}
                </span>
                <button
                    disabled={page >= pagination.totalPages - 1 || isOperationInProgress}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 rounded disabled:opacity-50 text-gray-600 cursor-pointer hover:bg-gray-300"
                >
                    Next
                </button>
            </div>

            {showUserModal && selectedUser && (
                <UserModal
                    user={selectedUser}
                    onClose={closeModal}
                    orders={orders}
                    trades={trades}
                />
            )}
        </div>
    );
};