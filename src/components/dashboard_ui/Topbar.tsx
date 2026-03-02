import Container from "@components/primitive_ui/Container";
import Button from "@components/primitive_ui/Buttons";

interface TopbarProps {
  onCreate: () => void;
}

const Topbar = ({ onCreate }: TopbarProps) => {
  return (
      <div className="border-b border-border bg-surface">
        <Container>
          <div className="flex items-center justify-between py-4">
            <h2 className="text-lg font-semibold text-text">
              User Management
            </h2>

            <Button variant="primary" intent="fill" onClick={onCreate}>
              Create User
            </Button>
          </div>
        </Container>
      </div>
  );
};

export default Topbar;