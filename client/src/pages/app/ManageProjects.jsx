import { useState } from "react";
import Button from "../../components/ui/Button";
import SectionBadge from "../../components/ui/SectionBadge";
import { sampleProjects } from "../../data/sampleProjects";
import Card from "../../components/ui/Card";
import Modal from "../../components/ui/Model";
import { Formik, Form } from "formik";
import FormikInput from "../../components/ui/FormikInput";

import * as projectService from "../../services/project.service";

const initialValues = {
  name: "",
};

const ManageProjects = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleCreateProject = async (
    values,
    { setSubmitting, setStatus, resetForm },
  ) => {
    try {
      setStatus(null);

      const response = await projectService.createProject(values.name);

      console.log(response);

      resetForm();
      setOpenCreateModal(false);
    } catch (error) {
      setStatus(error.response?.data?.message ?? "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
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
    </section>
  );
};

export default ManageProjects;
