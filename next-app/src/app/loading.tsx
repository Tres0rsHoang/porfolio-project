import { Loading } from "@/components/loading/loading_full";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <Loading />
    </div>
  );
}
