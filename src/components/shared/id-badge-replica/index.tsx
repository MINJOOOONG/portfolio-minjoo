import { Badge } from './components/Badge';

export default function App() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-8">
        <Badge />
      </div>
    </>
  );
}
