import { Modal } from "@components/primitive_ui/Modal";
import Button from "@components/primitive_ui/Buttons";

interface Props {
  open: boolean;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
                        open,
                        title,
                        description,
                        onConfirm,
                        onCancel,
                      }: Props) => {
  return (
      <Modal open={open} onClose={onCancel}>
        <Modal.Header>{title}</Modal.Header>

        {description && (
            <Modal.Body>
              <p className="text-text-muted">{description}</p>
            </Modal.Body>
        )}

        <Modal.Footer>
          <Button
              variant="secondary"
              intent="stroke"
              onClick={onCancel}
          >
            No, Go Back
          </Button>

          <Button
              variant="primary"
              intent="fill"
              onClick={onConfirm}
          >
            Yes, Confirm
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default ConfirmModal;