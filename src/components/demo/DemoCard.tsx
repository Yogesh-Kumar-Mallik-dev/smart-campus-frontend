import { useState } from "react";
import { Modal } from "@components/primitive_ui/Modal";
import Button from "@components/primitive_ui/Buttons";

const Demo = () => {
  const [open, setOpen] = useState(false);

  return (
      <>
        <Button
            variant="primary"
            intent="fill"
            onClick={() => setOpen(true)}
        >
          Open Modal
        </Button>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Modal.Header>Test Modal</Modal.Header>
          <Modal.Body>Modal content</Modal.Body>
          <Modal.Footer>
            <Button
                variant="mute-secondary"
                intent="stroke"
                onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  );
};

export default Demo;