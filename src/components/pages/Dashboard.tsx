import LogoutButton from "@components/auth/LogoutButton";
import Container from "@components/ui/Container";

const Dashboard = () => {
  return (
      <div className="flex justify-end p-4">
        <Container>
          <LogoutButton />
        </Container>

      </div>
  );
};

export default Dashboard;