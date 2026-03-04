import { useEffect, useState } from "react";

import Section from "@components/primitive_ui/Section";
import Container from "@components/primitive_ui/Container";
import Card from "@components/primitive_ui/Card";

import Badge from "@components/primitive_ui/Badge";
import Button from "@components/primitive_ui/Buttons";

import CreateUserModal from "@components/dashboard_ui/users/CreateUserModal";
import EditUserModal from "@components/dashboard_ui/users/EditUserModal";
import ConfirmModal from "@components/dashboard_ui/users/ConfirmModal";

import api from "@config/api";

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

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [createOpen, setCreateOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [confirmUser, setConfirmUser] = useState<User | null>(null);

  /* ================= FETCH USERS ================= */

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await api.get("/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    void loadUsers();
  }, []);

  /* ================= DEACTIVATE ================= */

  const confirmDeactivate = async () => {
    if (!confirmUser) return;

    try {
      await api.patch(`/api/users/${confirmUser._id}/deactivate`);

      setConfirmUser(null);

      await fetchUsers();
    } catch (error) {
      console.error("Failed to deactivate user", error);
    }
  };

  return (
      <Section>
        <Container>

          <Card>

            {/* Header */}

            <Card.Header className="flex items-center justify-between">

            <span className="text-lg font-semibold">
              Registered Users ({users.length})
            </span>

              <Button
                  variant="primary"
                  intent="fill"
                  onClick={() => setCreateOpen(true)}
              >
                Create User
              </Button>

            </Card.Header>

            {/* Table */}

            <Card.Content>

              <table className="w-full text-sm">

                <thead className="border-b border-border text-left">
                <tr>
                  <th className="py-2">Name</th>
                  <th>Email</th>
                  <th>Roles</th>
                  <th>ID</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                </thead>

                <tbody>

                {users.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-4 text-text-muted">
                        Showing 0 users
                      </td>
                    </tr>
                )}

                {users.map((user) => (

                    <tr
                        key={user._id}
                        className="border-b border-border"
                    >

                      <td className="py-2">
                        {user.full_name}
                      </td>

                      <td className="text-text-muted">
                        {user.email}
                      </td>


                      <td className="align-middle w-[120px]">
                        <div className="flex flex-col items-center gap-1">
                          {user.roles.map((role) => (
                              <Badge key={role}>
                                {role}
                              </Badge>
                          ))}
                        </div>
                      </td>


                      <td>
                        {user.memberId ?? (
                            <Badge variant="warning">
                              TEMP {user.tempId}
                            </Badge>
                        )}
                      </td>

                      <td>
                        <Badge
                            variant={
                              user.status === "ACTIVE"
                                  ? "success"
                                  : "default"
                            }
                        >
                          {user.status}
                        </Badge>
                      </td>

                      <td className="space-x-2">

                        <Button
                            size="sm"
                            variant="secondary"
                            intent="stroke"
                            onClick={() => setEditUser(user)}
                        >
                          Edit
                        </Button>

                        <Button
                            size="sm"
                            variant="mute-primary"
                            intent="stroke"
                            onClick={() => setConfirmUser(user)}
                        >
                          Disable
                        </Button>

                      </td>

                    </tr>

                ))}

                </tbody>

              </table>

            </Card.Content>

            <Card.Footer>
              Showing {users.length} users
            </Card.Footer>

          </Card>

          {/* Create User */}

          <CreateUserModal
              open={createOpen}
              onClose={() => setCreateOpen(false)}
              onCreated={fetchUsers}
          />

          {/* Edit User */}

          {editUser && (
              <EditUserModal
                  user={editUser}
                  open={true}
                  onClose={() => setEditUser(null)}
                  onUpdated={fetchUsers}
              />
          )}

          {/* Disable Confirmation */}

          {confirmUser && (
              <ConfirmModal
                  open={true}
                  title={`Disable user ${confirmUser.full_name}?`}
                  description={`Temporary ID: ${confirmUser.tempId}`}
                  onConfirm={confirmDeactivate}
                  onCancel={() => setConfirmUser(null)}
              />
          )}

        </Container>
      </Section>
  );
};

export default UsersPage;