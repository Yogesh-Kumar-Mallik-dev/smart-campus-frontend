import { useEffect, useState } from "react";
import Card from "@components/primitive_ui/Card";
import { Modal } from "@components/primitive_ui/Modal";

interface Notification {
  _id: string;
  title: string;
  message: string;
}

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selected, setSelected] = useState<Notification | null>(null);

  useEffect(() => {
    fetch("/api/notifications")
        .then((r) => r.json())
        .then(setNotifications);
  }, []);

  return (
      <>
        <Card className="min-h-[280px]">
          <Card.Header>Notifications</Card.Header>

          <Card.Content className="max-h-[320px] overflow-y-auto pr-1">
            {notifications.length === 0 ? (
                <p className="text-text-muted">You are all caught up</p>
            ) : (
                <div className="space-y-3">
                  {notifications.map((n) => (
                      <div
                          key={n._id}
                          className="p-3 border border-border rounded-lg cursor-pointer hover:bg-surface-hover transition"
                          onClick={() => setSelected(n)}
                      >
                        <p className="font-medium">{n.title}</p>
                        <p className="text-sm text-text-muted truncate">
                          {n.message}
                        </p>
                      </div>
                  ))}
                </div>
            )}
          </Card.Content>
        </Card>

        <Modal open={!!selected} onClose={() => setSelected(null)}>
          <Modal.Header>{selected?.title}</Modal.Header>

          <Modal.Body>
            <p className="text-text-muted whitespace-pre-line">
              {selected?.message}
            </p>
          </Modal.Body>
        </Modal>
      </>
  );
};

export default NotificationPanel;