import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = ({ selectedIds }: { selectedIds: string[] }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Evidence Vault
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage and track all compliance documents in one place.
        </p>
      </div>
      <div className="flex items-center gap-3">
        {selectedIds.length > 0 && (
          <Button
            variant="outline"
            className="text-primary font-bold border-primary/20 bg-primary/5 animate-in slide-in-from-right-4 transition-all flex gap-2"
          >
            <span>Add to Pack</span>
            <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary text-white text-[10px]">
              {selectedIds.length}
            </span>
          </Button>
        )}
        <Button className="font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 flex gap-2">
          <Plus size={18} />
          <span>Upload Document</span>
        </Button>
      </div>
    </div>
  );
}

export default Header;
