import Section from "@components/primitive_ui/Section";
import Container from "@components/primitive_ui/Container";
import Card from "@components/primitive_ui/Card";
import CardHeader from "@components/primitive_ui/CardHeader";
import CardContent from "@components/primitive_ui/CardContent";
import CardFooter from "@components/primitive_ui/CardFooter";
import Badge from "@components/primitive_ui/Badge";
import EmptyState from "@components/primitive_ui/EmptyState";
import { useState } from "react";


interface User {
  _id: string;
  full_name: string;
  email: string;
  roles: string[];
  memberId?: string | null;
  tempId: string;
  status: string;
}

const UsersPage = () => {
  const [users] = useState<User[]>([]); // temporary until backend integration
  return (
      <Section>
        <Container>
          <Card>
            <CardHeader>
              Registered Users ({users.length})
            </CardHeader>

            <CardContent>
              {users.length === 0 ? (
                  <EmptyState
                      title="No users found"
                      description="Create your first user to begin managing campus accounts."
                  />
              ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-text">
                      <thead className="text-left border-b border-border text-text-muted">
                      <tr>
                        <th className="py-3">Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Member ID</th>
                        <th>Status</th>
                      </tr>
                      </thead>

                      <tbody>
                      {users.map((user) => (
                          <tr
                              key={user._id}
                              className="border-b border-border hover:bg-surface-muted transition-colors"
                          >
                            <td className="py-3 font-medium">{user.full_name}</td>
                            <td className="text-text-muted">{user.email}</td>

                            <td className="space-x-1">
                              {user.roles.map((r) => (
                                  <Badge key={r}>{r}</Badge>
                              ))}
                            </td>

                            <td>
                              {user.memberId ?? (
                                  <Badge variant="warning">
                                    TEMP ({user.tempId})
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
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
              )}
            </CardContent>

            <CardFooter>
              Showing {users.length} users
            </CardFooter>
          </Card>
        </Container>
      </Section>
  );
};

export default UsersPage;