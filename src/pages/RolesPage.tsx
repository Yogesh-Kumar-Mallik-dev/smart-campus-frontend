// src/pages/RolesPage.tsx

import Section from "@components/primitive_ui/Section";
import Container from "@components/primitive_ui/Container";
import Card from "@components/primitive_ui/Card";
import CardHeader from "@components/primitive_ui/CardHeader";
import CardContent from "@components/primitive_ui/CardContent";
import Badge from "@components/primitive_ui/Badge";

const RolesPage = () => {
  return (
      <Section>
        <Container>
          <Card>
            <CardHeader>Role Management</CardHeader>
            <CardContent>
              <div className="space-y-4">

                <div className="flex items-center justify-between p-4 bg-surface-muted rounded-xl">
                  <span>STUDENT</span>
                  <Badge>Standard Access</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-muted rounded-xl">
                  <span>TEACHER</span>
                  <Badge variant="info">Academic Access</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-muted rounded-xl">
                  <span>ADMIN</span>
                  <Badge variant="warning">Elevated Access</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-muted rounded-xl">
                  <span>REGISTRAR</span>
                  <Badge variant="success">Member ID Authority</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-muted rounded-xl">
                  <span>MESS</span>
                  <Badge variant="default">Food Services</Badge>
                </div>

              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
  );
};

export default RolesPage;