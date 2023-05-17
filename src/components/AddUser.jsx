// import { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const AddUser = () => {
    const navigate = useNavigate();

    const mutation = useMutation(async (newUser) => {
        const rawResponse = await fetch('http://localhost:3004/users', {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        const content = await rawResponse.json();

        console.log('Response from the endpoint', content);
    }, {
        onSuccess: () => {
            return navigate('/')
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        const {
            id: { value: userID },
            name: { value: userName },
            email: { value: userEmail },
            age: { value: userAge }
        } = event.target.elements;

        mutation.mutate({ id: userID, name: userName, email: userEmail, age: userAge })
    }
    return (
        <>
            <div className="container w-50 mx-auto my-3">
                <h1 className="mb-3 text-center">React Query</h1>
                <div className="my-2 p-3 border border-2 border-dark rounded">
                    <Form onSubmit={handleSubmit}>
                        <h1 className="text-center">Add New User</h1>
                        <FormGroup>
                            <Label for="userID">
                                User ID
                            </Label>
                            <Input
                                id="userID"
                                name="id"
                                placeholder="User ID"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userName">
                                User Name
                            </Label>
                            <Input
                                id="userName"
                                name="name"
                                placeholder="User Name"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userEmail">
                                User Email
                            </Label>
                            <Input
                                id="userEmail"
                                name="email"
                                placeholder="User Email"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userAge">
                                User Age
                            </Label>
                            <Input
                                id="userAge"
                                name="age"
                                placeholder="User Age"
                                type="text"
                            />
                        </FormGroup>
                        <Button className='d-block mx-auto' color='primary' outline>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default AddUser;