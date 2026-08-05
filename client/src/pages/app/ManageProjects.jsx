import { useState } from "react";
import Button from "../../components/ui/Button";
import SectionBadge from "../../components/ui/SectionBadge";
import Card from "../../components/ui/Card";
import Modal from "../../components/ui/Model";
import { Formik, Form } from "formik";
import FormikInput from "../../components/ui/FormikInput";

import * as projectService from "../../services/project.service";

import useProjects from "../../hooks/useProjects";

const initialValues = {
  name: "",
};

const ManageProjects = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [codeError, setCodeError] = useState("");

  const {
    projects,
    pagination,
    loading,
    regeneratingProjectId,
    regenerateProjectCode,
    refreshProjects,
  } = useProjects();

  const handleCreateProject = async (
    values,
    { setSubmitting, setStatus, resetForm },
  ) => {
    try {
      setStatus(null);

      await projectService.createProject(values.name);

      resetForm();
      setOpenCreateModal(false);
      refreshProjects();
    } catch (error) {
      setStatus(error.response?.data?.message ?? "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenProjectCode = (project) => {
    setCodeError("");
    setSelectedProject(project);
  };

  const handleRegenerateProjectCode = async () => {
    if (!selectedProject?._id) return;

    try {
      setCodeError("");

      const updatedProject = await regenerateProjectCode(selectedProject._id);

      setSelectedProject(updatedProject);
    } catch (error) {
      setCodeError(
        error.response?.data?.message ?? "Unable to regenerate project code.",
      );
    }
  };

  const formatDate = (value) => {
    if (!value) return "Unknown";

    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  };

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
        {loading && (
          <Card className="p-6 text-sm text-white/60">Loading projects...</Card>
        )}

        {!loading && projects.length === 0 && (
          <Card className="p-6 text-sm text-white/60">
            No projects created yet.
          </Card>
        )}

        {!loading &&
          projects.map((project) => (
            <Card
              key={project._id}
              className="flex items-center justify-between gap-4 rounded-2xl p-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {project.name}
                </h2>

                <p className="mt-2 text-sm text-white/60">
                  Project code is available from the credentials modal.
                </p>

                <p className="mt-4 text-xs text-white/40">
                  Project ID: {project._id}
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Created {formatDate(project.createdAt)}
                </p>
              </div>

              <div className="flex shrink-0 gap-3">
                <Button
                  variant="secondary"
                  className="w-auto"
                  onClick={() => handleOpenProjectCode(project)}
                >
                  Project Code
                </Button>

                <Button
                  variant="secondary"
                  className="w-auto border-danger/30 text-danger hover:bg-danger/10"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <p className="text-sm text-white/50">
          Page {pagination.page} of {pagination.totalPages}
        </p>
      )}

      <Modal
        open={openCreateModal}
        title="Create Project"
        onClose={() => setOpenCreateModal(false)}
      >
        <Formik initialValues={initialValues} onSubmit={handleCreateProject}>
          {({ isSubmitting, status, resetForm }) => (
            <Form className="space-y-5">
              <FormikInput
                name="name"
                label="Project Name"
                placeholder="My Project"
              />

              {status && (
                <p className="rounded-lg border border-danger/20 bg-danger/10 px-3 py-2 text-sm text-danger">
                  {status}
                </p>
              )}

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-auto"
                  onClick={() => {
                    resetForm();
                    setOpenCreateModal(false);
                  }}
                >
                  Cancel
                </Button>

                <Button type="submit" className="w-auto" loading={isSubmitting}>
                  Create Project
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        open={Boolean(selectedProject)}
        title="Project Code"
        onClose={() => setSelectedProject(null)}
      >
        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-white">
              {selectedProject?.name}
            </p>

            <div className="mt-3 break-all rounded-lg border border-white/10 bg-black/20 p-4 font-mono text-sm text-white">
              {selectedProject?.projectCode}
            </div>
          </div>

          {codeError && (
            <p className="rounded-lg border border-danger/20 bg-danger/10 px-3 py-2 text-sm text-danger">
              {codeError}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              className="w-auto"
              onClick={() => setSelectedProject(null)}
            >
              Close
            </Button>

            <Button
              className="w-auto"
              loading={regeneratingProjectId === selectedProject?._id}
              onClick={handleRegenerateProjectCode}
            >
              Regenerate Code
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default ManageProjects;
