import { useMemo } from "react";
import Section from "@components/primitive_ui/Section";
import Container from "@components/primitive_ui/Container";
import Card from "@components/primitive_ui/Card";
import CardHeader from "@components/primitive_ui/CardHeader";
import CardContent from "@components/primitive_ui/CardContent";
import Badge from "@components/primitive_ui/Badge";

interface User {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  memberId?: string | null;
  tempId: string;
  status: string;
}

const DashboardHome = () => {
  // Temporary static data (replace with backend fetch later)
  const users: User[] = [];

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "ACTIVE").length;
    const students = users.filter((u) => u.roles.includes("STUDENT")).length;
    const teachers = users.filter((u) => u.roles.includes("TEACHER")).length;
    const admins = users.filter((u) => u.roles.includes("ADMIN")).length;
    const pendingMemberId = users.filter((u) => !u.memberId).length;

    return {
      total,
      active,
      students,
      teachers,
      admins,
      pendingMemberId,
    };
  }, [users]);

  return (
      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* Total Users */}
            <Card>
              <CardHeader>Total Users</CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-text">
                  {stats.total}
                </div>
                <Badge variant="info" className="mt-2">
                  All registered accounts
                </Badge>
              </CardContent>
            </Card>

            {/* Active Users */}
            <Card>
              <CardHeader>Active Users</CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">
                  {stats.active}
                </div>
                <Badge variant="success" className="mt-2">
                  Currently active
                </Badge>
              </CardContent>
            </Card>

            {/* Students */}
            <Card>
              <CardHeader>Students</CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {stats.students}
                </div>
                <Badge className="mt-2">
                  Role: STUDENT
                </Badge>
              </CardContent>
            </Card>

            {/* Teachers */}
            <Card>
              <CardHeader>Teachers</CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">
                  {stats.teachers}
                </div>
                <Badge className="mt-2">
                  Role: TEACHER
                </Badge>
              </CardContent>
            </Card>

            {/* Admins */}
            <Card>
              <CardHeader>Admins</CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">
                  {stats.admins}
                </div>
                <Badge variant="warning" className="mt-2">
                  Elevated access
                </Badge>
              </CardContent>
            </Card>

            {/* Pending Member ID */}
            <Card>
              <CardHeader>Pending Member ID</CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-error">
                  {stats.pendingMemberId}
                </div>
                <Badge variant="error" className="mt-2">
                  Requires assignment
                </Badge>
              </CardContent>
            </Card>

          </div>
        </Container>
      </Section>
  );
};

export default DashboardHome;