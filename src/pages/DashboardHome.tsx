import { useAuthStore } from "@/store/authStore";

import Container from "@components/primitive_ui/Container";
import Section from "@components/primitive_ui/Section";

import Card from "@components/primitive_ui/Card";
import CardHeader from "@components/primitive_ui/CardHeader";
import CardContent from "@components/primitive_ui/CardContent";
import CardFooter from "@components/primitive_ui/CardFooter";
import AnnouncementPanel from "@components/dashboard_ui/AnnouncementPanel.tsx";
import NotificationPanel from "@components/dashboard_ui/NotificationPanel.tsx";

const DashboardHome = () => {
  const user = useAuthStore((s) => s.user);
  const roles = user?.roles || [];

  const isRegistrar = roles.includes("REGISTRAR");
  const isAdmin = roles.includes("ADMIN");
  const isTeacher = roles.includes("TEACHER");
  const isStudent = roles.includes("STUDENT");
  const isMess = roles.includes("MESS");

  const roleDescription: Record<string, string> = {
    STUDENT: "Track your academic progress and stay updated.",
    TEACHER: "Manage your classes and monitor attendance.",
    ADMIN: "Oversee campus operations and system activity.",
    REGISTRAR: "Manage institutional records and accounts.",
    MESS: "Monitor meals and daily mess activity.",
  };

  const defaultDescription =
      "Access your tools, stay informed, and manage your campus activities from here.";

  const primaryRole = user?.roles?.[0];

  const description =
      (primaryRole && roleDescription[primaryRole]) ||
      defaultDescription;

  return (
      <Container>
        <Section className="space-y-6">

          {/* 🔹 Row 1 — Welcome (Full Width) */}
          <Card>
            <CardContent className="py-12 px-8">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                  Hello{user?.full_name ? `, ${user.full_name}` : ""}
                </h1>

                <p className="text-base text-text-muted max-w-3xl">
                  {description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 🔹 Row 2 — Announcements + Notifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnnouncementPanel />
            <NotificationPanel />
          </div>

          {/* 🔹 Role-Based Grid (Everything Below) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {(isRegistrar || isAdmin) && (
                <>
                  <Card>
                    <CardHeader>Total Users</CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">0</p>
                    </CardContent>
                    <CardFooter>
                  <span className="text-sm text-text-muted">
                    System-wide accounts
                  </span>
                    </CardFooter>
                  </Card>
                </>
            )}

            {isTeacher && (
                <>
                  <Card>
                    <CardHeader>Assigned Classes</CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">0</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>Today's Attendance</CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">0%</p>
                    </CardContent>
                  </Card>
                </>
            )}

            {isStudent && (
                <>
                  <Card>
                    <CardHeader>My Attendance</CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">0%</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>My Courses</CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">0</p>
                    </CardContent>
                  </Card>
                </>
            )}

            {isMess && (
                <>
                  <Card>
                    <CardHeader>Today's Menu</CardHeader>
                    <CardContent>
                      <p className="text-text-muted">
                        No menu uploaded.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>Meal Attendance</CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">0</p>
                    </CardContent>
                  </Card>
                </>
            )}
          </div>

        </Section>
      </Container>
  );
};

export default DashboardHome;