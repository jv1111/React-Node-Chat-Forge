import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import SectionBadge from "../../components/ui/SectionBadge";
import Card from "../../components/ui/Card";

const Dashboard = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10">
      <header className="space-y-3">
        <SectionBadge>ChatForge Dashboard</SectionBadge>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Build real-time messaging with ease.
        </h1>

        <p className="max-w-2xl text-white/60">
          Welcome to ChatForge. Manage your messaging projects, test your API,
          and explore the sample application before integrating ChatForge into
          your own product.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ChatFlow */}
        <Card className="px-4 py-6">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 text-2xl">
            💬
          </div>

          <h2 className="text-2xl font-semibold text-white">Open ChatFlow</h2>

          <p className="mt-3 text-sm leading-7 text-white/60">
            ChatFlow is a sample messaging application powered by the ChatForge
            API. Explore how conversations, authentication, and real-time
            messaging work together in a complete application.
          </p>

          <Button className="mt-3 w-35">Open ChatFlow</Button>
        </Card>

        {/* Get Started */}
        <Card className="px-4 py-6">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-2xl">
            🚀
          </div>

          <h2 className="text-2xl font-semibold text-white">Get Started</h2>

          <p className="mt-3 text-sm leading-7 text-white/60">
            Learn how to create your first project, authenticate clients,
            connect with WebSockets, and start sending messages using the
            ChatForge API.
          </p>

          <Link to="get-started">
            <Button className="mt-3 w-35" variant="secondary">
              Get Started
            </Button>
          </Link>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
