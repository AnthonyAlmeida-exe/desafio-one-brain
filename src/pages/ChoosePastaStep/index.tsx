import { useEffect, useState } from "react";
import { useOrder } from "hooks/useOrder";
import StepToMakePizza from "components/local/StepToMakePizza";

function ChoosePastaStep() {
  const [value, setValue] = useState("");
  const { order, setOrderValues } = useOrder();
  const [options, setOptions] = useState([]);

  async function getOptions() {
    const response = await fetch("/pastas");
    const data = await response.json();
    setOptions(data);
  }

  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
    if (order.pasta) {
      setValue(order.pasta);
    }
  }, [order.pasta]);

  const props = {
    title: "Hora de escolher a massa!",
    value,
    options,
    nextStepName: "/sizestep",
    setValue: setValue,
    setOrderValues: () => setOrderValues("pasta", value),
  };

  return <StepToMakePizza {...props} />;
}
export default ChoosePastaStep;
