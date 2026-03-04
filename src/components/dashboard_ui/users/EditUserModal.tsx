import { Modal } from "@components/primitive_ui/Modal";
import Button from "@components/primitive_ui/Buttons";
import Input from "@components/primitive_ui/Input";
import FormField from "@components/primitive_ui/FormField";
import { useState } from "react";

interface User {
  _id: string;
  full_name: string;
  academic_name: string;
  email: string;
  roles: string[];
  memberId?: string | null;
  tempId: string;
  status: string;
}

interface Props {
  user: User;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

const EditUserModal = ({ user, open, onClose, onUpdated }: Props) => {
  const [fullName, setFullName] = useState(user.full_name);
  const [academicName, setAcademicName] = useState(user.academic_name);

  const update = async () => {
    await fetch(`/api/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        academic_name: academicName,
      }),
    });

    onUpdated();
    onClose();
  };

  return (
      <Modal open={open} onClose={onClose}>
        <Modal.Header>Edit User</Modal.Header>

        <Modal.Body>
          <div className="space-y-4">

            <FormField label="Full Name">
              <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
              />
            </FormField>

            <FormField label="Academic Name">
              <Input
                  value={academicName}
                  onChange={(e) => setAcademicName(e.target.value)}
              />
            </FormField>

          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" intent="stroke" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="primary" intent="fill" onClick={update}>
            Update User
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default EditUserModal;