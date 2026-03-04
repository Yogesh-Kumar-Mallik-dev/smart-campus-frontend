import { Modal } from "@components/primitive_ui/Modal";
import Button from "@components/primitive_ui/Buttons";
import Input from "@components/primitive_ui/Input";
import FormField from "@components/primitive_ui/FormField";

import { useState, useEffect } from "react";

import api from "@config/api";
import { toastSuccess, toastError, toastWarning } from "@/lib/toast";

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

const roles = ["STUDENT", "TEACHER", "ADMIN", "MESS", "REGISTRAR"];

const EditUserModal = ({ user, open, onClose, onUpdated }: Props) => {
  const [loading, setLoading] = useState(false);

  const [sameName, setSameName] = useState(
      user.full_name === user.academic_name
  );

  const [form, setForm] = useState({
    full_name: user.full_name,
    academic_name: user.academic_name,
    email: user.email,
    memberId: user.memberId || "",
    roles: user.roles,
  });

  /* Reset form when user changes */

  useEffect(() => {
    setForm({
      full_name: user.full_name,
      academic_name: user.academic_name,
      email: user.email,
      memberId: user.memberId || "",
      roles: user.roles,
    });

    setSameName(user.full_name === user.academic_name);
  }, [user]);

  /* Role toggle with safety rules */

  const toggleRole = (role: string) => {
    if (role === "REGISTRAR") {
      toastWarning("Registrar role cannot be removed.");
      return;
    }

    if (form.roles.includes(role)) {
      if (form.roles.length === 1) {
        toastWarning("A user must have at least one role.");
        return;
      }

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

  /* Update user */

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const payload = {
        ...form,
        academic_name: sameName ? form.full_name : form.academic_name,
        memberId: form.memberId || null,
      };

      await api.put(`/api/users/${user._id}`, payload);

      toastSuccess("User updated successfully");

      onUpdated();
      onClose();
    } catch {
      toastError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
      <Modal open={open} onClose={onClose}>
        <Modal.Header>Edit User</Modal.Header>

        <Modal.Body>
          <div className="space-y-4">

            <FormField label="Full Name">
              <Input
                  value={form.full_name}
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
                      value={form.academic_name}
                      onChange={(e) =>
                          setForm({ ...form, academic_name: e.target.value })
                      }
                  />
                </FormField>
            )}

            <FormField label="Email">
              <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                  }
              />
            </FormField>

            <FormField label="Member ID (optional)">
              <Input
                  value={form.memberId}
                  onChange={(e) =>
                      setForm({ ...form, memberId: e.target.value })
                  }
              />
            </FormField>

            <div>
              <p className="text-sm font-medium mb-2">Roles</p>

              <div className="flex flex-wrap gap-2">
                {roles.map((role) => {
                  const isRegistrar = role === "REGISTRAR";

                  return (
                      <button
                          key={role}
                          type="button"
                          onClick={() => !isRegistrar && toggleRole(role)}
                          className={`px-3 py-1 rounded border text-sm transition
                    ${
                              isRegistrar
                                  ? "opacity-60 cursor-not-allowed border-border"
                                  : form.roles.includes(role)
                                      ? "bg-primary text-white border-primary"
                                      : "border-border"
                          }`}
                      >
                        {role}
                      </button>
                  );
                })}
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
              onClick={handleUpdate}
              disabled={loading}
          >
            {loading ? "Updating..." : "Update User"}
          </Button>

        </Modal.Footer>
      </Modal>
  );
};

export default EditUserModal;