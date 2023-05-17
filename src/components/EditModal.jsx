import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const ModalEdit = ({ userID }) => {
  const queryClient = useQueryClient();
  const query = queryClient.getQueryData("user");
  const currentUser = query.find((q) => q.id === userID);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const mutation = useMutation(
    async (editUser) => {
      const rawResponse = await fetch(`http://localhost:3004/users/${userID}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
      });

      const content = await rawResponse.json();

      console.log("Response from the endpoint", content);
    },
    {
      onSuccess: () => {
        // makes react query client to fetch data against this key again,
        // acts like GET call after PUT call.
        return queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      id: { value: userID },
      name: { value: userName },
      email: { value: userEmail },
      age: { value: userAge },
    } = event.target.elements;

    mutation.mutate({
      id: userID,
      name: userName,
      email: userEmail,
      age: userAge,
    });
    toggle();
  };

  return (
    <>
      <Button color="warning" onClick={toggle}>
        Edit
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit User Details</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="userID">User ID</Label>
              <Input
                id="userID"
                name="id"
                placeholder="User ID"
                type="text"
                defaultValue={currentUser.id}
              />
            </FormGroup>
            <FormGroup>
              <Label for="userName">User Name</Label>
              <Input
                id="userName"
                name="name"
                placeholder="User Name"
                type="text"
                defaultValue={currentUser.name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="userEmail">User Email</Label>
              <Input
                id="userEmail"
                name="email"
                placeholder="User Email"
                type="text"
                defaultValue={currentUser.email}
              />
            </FormGroup>
            <FormGroup>
              <Label for="userAge">User Age</Label>
              <Input
                id="userAge"
                name="age"
                placeholder="User Age"
                type="text"
                defaultValue={currentUser.age}
              />
            </FormGroup>
            <Button className="d-block mx-auto" color="primary" outline>
              Submit
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          {/* <Button type='submit' color="primary" onClick={handleSubmit}>
                    Update
                </Button>{' '} */}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalEdit;
