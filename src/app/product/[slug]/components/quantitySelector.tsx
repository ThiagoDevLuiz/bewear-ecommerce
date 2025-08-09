import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const QuantitySelector = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade</h3>
      <div className="flex w-[100px] items-center justify-between rounded-lg border">
        <Button variant="ghost" size="icon">
          <MinusIcon />
        </Button>
        <p>1</p>
        <Button variant="ghost" size="icon">
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
