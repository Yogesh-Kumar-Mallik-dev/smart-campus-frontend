import { useEffect, useState } from "react";
import { Modal } from "@components/primitive_ui/Modal";
import Card from "@components/primitive_ui/Card";

interface Announcement {
  _id: string;
  title: string;
  content: string;
}

const AnnouncementPanel = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selected, setSelected] = useState<Announcement | null>(null);

  useEffect(() => {
    fetch("/api/announcements")
        .then((r) => r.json())
        .then(setAnnouncements);
  }, []);

  return (
      <>
        <Card className="min-h-[280px]">
          <Card.Header>Announcements</Card.Header>

          <Card.Content className="max-h-[320px] overflow-y-auto pr-1">
            {announcements.length === 0 ? (
                <p className="text-text-muted">No announcements available</p>
            ) : (
                <div className="space-y-3">
                  {announcements.map((a) => (
                      <div
                          key={a._id}
                          className="p-3 border border-border rounded-lg cursor-pointer hover:bg-surface-hover transition"
                          onClick={() => setSelected(a)}
                      >
                        <p className="font-medium">{a.title}</p>
                        <p className="text-sm text-text-muted truncate">
                          {a.content}
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
              {selected?.content}
            </p>
          </Modal.Body>
        </Modal>
      </>
  );
};

export default AnnouncementPanel;