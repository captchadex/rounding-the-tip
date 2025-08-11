import { useState } from "react";
import "./App.css";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  const [subtotal, setSubtotal] = useState("0.00");
  const [tipPercentageInput, setTipPercentageInput] = useState("15");
  const [total, setTotal] = useState("0.00");
  const [originalTotal, setOriginalTotal] = useState("0.00");
  const [grandTotal, setGrandTotal] = useState("0.00");

  const calculateTotal = () => {
    const subtotalValue = parseFloat(subtotal);
    const tipPercentage = parseFloat(tipPercentageInput);
    const tip = (subtotalValue * tipPercentage) / 100;
    const originalTotal = parseFloat(total) + tip;
    const grandTotal = Math.round(originalTotal);
    setOriginalTotal(originalTotal.toFixed(2));
    setGrandTotal(grandTotal.toFixed(2));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance p-4">
        Rounding the Tip
      </h1>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          calculateTotal();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="subtotal" className="block text-sm font-medium">
            Subtotal:
          </label>
          <Input
            id="subtotal"
            placeholder="Subtotal..."
            value={subtotal}
            onChange={(e) => setSubtotal(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === "0.00") {
                setSubtotal("");
              }
            }}
            onBlur={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                setSubtotal(value.toFixed(2));
              } else {
                setSubtotal("0.00");
              }
            }}
            className="h-12 text-base"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="tip-percentage" className="block text-sm font-medium">
            Tip:
          </label>
          <div className="relative">
            <Input
              id="tip-percentage"
              placeholder="Tip percentage..."
              type="number"
              value={tipPercentageInput}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow empty string, or positive integers (no decimals)
                if (
                  value === "" ||
                  (Number.isInteger(Number(value)) && Number(value) >= 0)
                ) {
                  setTipPercentageInput(value);
                }
              }}
              onKeyDown={(e) => {
                // Prevent decimal point and negative sign
                if (e.key === "." || e.key === "-" || e.key === "+") {
                  e.preventDefault();
                }
              }}
              onBlur={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 0) {
                  const roundedValue = Math.round(Math.abs(value));
                  setTipPercentageInput(roundedValue.toString());
                } else {
                  setTipPercentageInput("15");
                }
              }}
              min="0"
              step="1"
              className="h-12 text-base pr-10"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-base">
              %
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="total" className="block text-sm font-medium">
            Total:
          </label>
          <Input
            id="total"
            placeholder="Total..."
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === "0.00") {
                setTotal("");
              }
            }}
            onBlur={(e) => {
              const totalValue = parseFloat(e.target.value);
              const subtotalValue = parseFloat(subtotal);

              if (!isNaN(totalValue) && !isNaN(subtotalValue)) {
                if (totalValue < subtotalValue) {
                  alert("Total must be larger than subtotal");
                  setTotal(subtotalValue.toFixed(2));
                } else {
                  setTotal(totalValue.toFixed(2));
                }
              } else if (!isNaN(totalValue)) {
                setTotal(totalValue.toFixed(2));
              } else {
                setTotal("0.00");
              }
            }}
            min="0"
            className="h-12 text-base"
          />
        </div>
        <Button type="submit" className="w-full h-12 text-base">
          Calculate
        </Button>
      </form>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-lg font-semibold text-center">
          Original total: {originalTotal}
        </p>
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-lg font-semibold text-center">
          Grand total: {grandTotal}
        </p>
      </div>
    </div>
  );
}

export default App;
