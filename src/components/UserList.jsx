import ModalEdit from './EditModal'
import ModalDelete from './DeleteModal'
import { Table } from 'reactstrap'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'

const getUser = async () => {
    const response = await fetch('http://localhost:3004/users')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

const UserList = () => {
    // Queries
    const query = useQuery('user', getUser)

    const navigate = useNavigate();

    const handleLink = () => {
        navigate(`addUser`)
    }

    return (
        <>
            <h1 className='text-center my-3'>React Query</h1>
            <div className="container-sm p-3 border border-2 border-dark rounded">
                <h1 className='text-center mb-3'>User List</h1>
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Details</th>
                            <th>Edit Details</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            query.data?.map((user) => (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td><Link to={`/user/${user.id}`} >View Details</Link></td>
                                    <td><ModalEdit userID={user.id} /></td>
                                    <td><ModalDelete userID={user.id} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <div className='text-center'>
                    <button className='d-block mx-auto my-2 btn btn-outline-primary' onClick={handleLink}>Add New User</button>
                </div>
            </div>
        </>
    );
}

export default UserList;