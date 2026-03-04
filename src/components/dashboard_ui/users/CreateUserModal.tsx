import { Modal } from "@components/primitive_ui/Modal";
import Button from "@components/primitive_ui/Buttons";
import Input from "@components/primitive_ui/Input";
import FormField from "@components/primitive_ui/FormField";

import { useState } from "react";

import { toastSuccess, toastError } from "@/lib/toast";
import api from "@config/api";
import { AxiosError } from "axios";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

interface ApiError {
  message?: string;
}

const roles = ["STUDENT", "TEACHER", "ADMIN", "MESS"];

const CreateUserModal = ({ open, onClose, onCreated }: Props) => {

  const [sameName, setSameName] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    academic_name: "",
    email: "",
    memberId: "",
    roles: [] as string[],
  });

  /* ================= ROLE TOGGLE ================= */

  const toggleRole = (role: string) => {
    if (form.roles.includes(role)) {
      setForm({
        ...form,
        roles: form.roles.filter((r) => r !== role),
      });
    } else {
      setForm({
        ...form,
        roles: [...form.roles, role],
      });
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        ...form,
        academic_name: sameName ? form.full_name : form.academic_name,
        memberId: form.memberId || null,
      };

      const res = await api.post("/api/auth/create", payload);

      toastSuccess(`User created (Temp ID: ${res.data.tempId})`);

      onCreated(); // refresh users list
      onClose();   // close modal

    } catch (error: unknown) {

      let message = "Failed to create user";

      if (error instanceof AxiosError) {
        message = (error.response?.data as ApiError)?.message || message;
      }

      toastError(message);

    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Create User</Modal.Header>

      <Modal.Body>

        <div className="space-y-4">

          <FormField label="Full Name">
            <Input
              placeholder="Enter full name"
              onChange={(e) =>
                setForm({ ...form, full_name: e.target.value })
              }
            />
          </FormField>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={sameName}
              onChange={() => setSameName(!sameName)}
            />
            Academic name same as full name
          </label>

          {!sameName && (
            <FormField label="Academic Name">
              <Input
                placeholder="Enter academic name"
                onChange={(e) =>
                  setForm({ ...form, academic_name: e.target.value })
                }
              />
            </FormField>
          )}

          <FormField label="Email">
            <Input
              type="email"
              placeholder="Enter email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </FormField>

          <FormField label="Member ID (optional)">
            <Input
              placeholder="Enter member ID"
              onChange={(e) =>
                setForm({ ...form, memberId: e.target.value })
              }
            />
          </FormField>

          <div>
            <p className="text-sm font-medium mb-2">Roles</p>

            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`px-3 py-1 rounded border text-sm transition
${
  form.roles.includes(role)
      ? "bg-primary text-white border-primary"
      : "border-border"
}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

        </div>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          intent="stroke"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          intent="fill"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModal;

