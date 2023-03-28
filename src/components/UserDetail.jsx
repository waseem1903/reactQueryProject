import { Table } from "reactstrap"
import { useQuery } from "react-query"
import { useParams, useNavigate } from "react-router-dom"

const getDetail = async (id) => {
    const response = await fetch('https://my-json-server.typicode.com/waseem1903/json-server/users/' + id)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

const UserDetail = () => {
    const { id } = useParams();

    const query = useQuery('userDetails', () => getDetail(id))

    const navigate = useNavigate();
    const handleLink = () => {
        navigate('/')
    }

    return (
        <>
            <h1 className='text-center my-3'>React Query</h1>
            <div className="container w-75 p-3 border border-2 border-dark rounded">
                <h1 className='text-center mb-3'>User Detail</h1>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{query.data?.id}</th>
                            <td>{query.data?.name}</td>
                            <td>{query.data?.email}</td>
                            <td>{query.data?.age}</td>
                        </tr>
                    </tbody>
                </Table>
                <div className='text-center'>
                    <button className='d-block mx-auto my-2 btn btn-outline-primary' onClick={handleLink}>Back</button>
                </div>
            </div>
        </>
    );
}

export default UserDetail;
