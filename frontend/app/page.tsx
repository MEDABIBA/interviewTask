import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TableClient } from "./components/RenderTables/RenderTables";
export default function Home() {
  console.log("rerender");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <TableClient />
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
}
