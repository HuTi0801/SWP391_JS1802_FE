import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountListContent.css';
import { Link } from 'react-router-dom';
const AccountListContent = () => {
    const [accounts, setAccounts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/account/view-accounts-list`
                    , {
                        headers: {
                            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                        },
                        params: {
                            role,
                            status
                        }
                    });
                setAccounts(response.data.result);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchAccounts();
    }, [role, status]);

    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = accounts.slice(firstIndex, lastIndex);
    const npage = Math.ceil(accounts.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    return (
        <div className="admin-account-list-container">
            <h1>ACCOUNT LIST</h1>
            <div className="filter-container">
                <label htmlFor="filter-role">Role:</label>
                <select id="filter-role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">All Roles</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="DELIVERY_STAFF">DELIVERY_STAFF</option>
                    <option value="SALE_STAFF">SALE_STAFF</option>
                </select>

                <label htmlFor="filter-status">Account Status:</label>
                <select id="filter-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="InActive">InActive</option>
                </select>
            </div>
            <div className="admin-account-list">
                {records.map((account) => (
                    <div key={account.id} className="account-item">
                        <div className="account-avatar"></div>
                        <div className="account-info">
                            <p>Username: {account.username}</p>
                            <p>First Name: {account.firstName}</p>
                            <p>Last Name: {account.lastName}</p>
                            <p>Role: {account.role}</p>
                        </div>
                        {account.role === 'CUSTOMER' ? (
                            <Link to={`/CustomerAccountDetails/${account.id}`} className="view-detail-btn">
                                View Details
                            </Link>

                        ) : account.role === 'SALE_STAFF' ? (
                            <Link to={`/Sale_StaffAccountDetails/${account.id}`} className="view-detail-btn">
                                View Details
                            </Link>
                        ) : account.role === 'DELIVERY_STAFF' ? (
                            <Link to={`/Delivery_StaffAccountDetails/${account.id}`} className="view-detail-btn">
                                View Details
                            </Link>
                        ) : (
                            <Link to={`/ManagementAccountDetails/${account.id}`} className="view-detail-btn">
                                View Details
                            </Link>
                        )}
                    </div>
                ))}
            </div>
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={prePage}>Prev</a>
                    </li>
                    {numbers.map((n, i) => (
                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <a href='#' className='page-link' onClick={() => changePage(n)}>{n}</a>
                        </li>
                    ))}
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );

    function prePage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function changePage(id) {
        setCurrentPage(id);
    }

    function nextPage() {
        if (currentPage < npage) {
            setCurrentPage(currentPage + 1);
        }
    }
};

export default AccountListContent;