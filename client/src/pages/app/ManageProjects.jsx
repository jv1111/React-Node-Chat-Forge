import { useState } from "react";
import Button from "../../components/ui/Button";
import SectionBadge from "../../components/ui/SectionBadge";
import { sampleProjects } from "../../data/sampleProjects";
import Card from "../../components/ui/Card";
import Modal from "../../components/ui/Model";
import Input from "../../components/ui/Input";

const ManageProjects = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [projectName, setProjectName] = useState("");

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8">
      <header className="flex items-end justify-between">
        <div>
          <SectionBadge>Projects</SectionBadge>

          <h1 className="mt-3 text-4xl font-bold text-white">
            Manage Projects
          </h1>

          <p className="mt-2 max-w-2xl text-white/60">
            Create and manage your ChatForge projects. Each project has its own
            API credentials, clients, and conversations.
          </p>
        </div>

        <Button className="w-auto" onClick={() => setOpenCreateModal(true)}>
          Create Project
        </Button>
      </header>

      <div className="space-y-4">
        {sampleProjects.map((project) => (
          <Card
            key={project.id}
            className="flex items-center justify-between rounded-2xl p-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-white">
                {project.name}
              </h2>

              <p className="mt-2 text-sm text-white/60">
                {project.description}
              </p>

              <p className="mt-4 text-xs text-white/40">
                Project ID: {project.id}
              </p>

              <p className="mt-1 text-xs text-white/40">
                Created {project.createdAt}
              </p>
            </div>

            <Button
              variant="secondary"
              className="w-auto border-danger/30 text-danger hover:bg-danger/10"
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>

      <Modal
        open={openCreateModal}
        title="Create Project"
        onClose={() => setOpenCreateModal(false)}
      >
        <div className="space-y-5">
          <div>
            <Input
              label="Project Name"
              placeholder="My Project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              className="w-auto"
              onClick={() => {
                setProjectName("");
                setOpenCreateModal(false);
              }}
            >
              Cancel
            </Button>

            <Button className="w-auto">Create Project</Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default ManageProjects;
