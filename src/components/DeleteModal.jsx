import { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ModalDelete = ({ userID }) => {
    const queryClient = useQueryClient()

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const mutation = useMutation(async (recordID) => {
        const rawResponse = await fetch(`https://json-server-usersdata.vercel.app/users/${recordID}`, {
            method: 'DELETE'
        });

        const content = await rawResponse.json();

        console.log('Response from the endpoint', content);
    }, {
        onSuccess: () => {
            // makes react query client to fetch data against this key again,
            // acts like GET call after DELETE call.
            return queryClient.invalidateQueries(['user'])
        }
    })

    const handleDelete = () => {
        console.log(userID)
        toggle();
        mutation.mutate(userID);
    }
    // const handleDelete = useCallback(() => {
    //     console.log(userID)
    //     toggle();
    //     mutation.mutate(userID);
    // }, [userID, toggle, mutation])

    return (<>
        <Button color="danger" onClick={toggle}>
            Delete
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Delete</ModalHeader>
            <ModalBody>
                Are You Sure
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleDelete}>
                    Yes
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    No
                </Button>
            </ModalFooter>
        </Modal>
    </>);
}

export default ModalDelete;