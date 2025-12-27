// apps/web/app/page.tsx
import { Button } from "@scenery/ui";
import { formatDate, capitalize } from "@scenery/utils";

const title = capitalize('scenery');
export default function Home() {
  const today = formatDate(new Date());
  
  return (
    <main style={{ padding: "50px" }}>
      <h1>{title}, Welcome to Monorepo</h1>
      <p>Today is: {today}</p>
      <Button onClick={() => alert("Hello!")}>
        Click Me
      </Button>
    </main>
  );
}