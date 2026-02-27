import ThemeToggle from "@components/ui/ThemeToggle";
import Button from "@components/ui/Buttons.tsx";

const App = () => {
  return (
      <>
        <ThemeToggle />
        <div className="bg-bg"></div>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" intent="fill">Example</Button>
          <Button variant="primary" intent="stroke">Example</Button>

          <Button variant="secondary" intent="fill">Example</Button>
          <Button variant="secondary" intent="stroke">Example</Button>

          <Button variant="mute-primary" intent="fill">Example</Button>
          <Button variant="mute-primary" intent="stroke">Example</Button>

          <Button variant="mute-secondary" intent="fill">Example</Button>
          <Button variant="mute-secondary" intent="stroke">Example</Button>
        </div>
      </>
  );
};

export default App;