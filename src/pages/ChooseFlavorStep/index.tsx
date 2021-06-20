import { useEffect, useState } from "react";
import { useOrder } from "hooks/useOrder";
import StepToMakePizza from "components/local/StepToMakePizza";

function ChooseFlavorStep() {
  const [value, setValue] = useState("");
  const { order, setOrderValues } = useOrder();
  const [options, setOptions] = useState([]);

  async function getOptions() {
    const response = await fetch("/flavors");
    const data = await response.json();
    setOptions(data);
  }

  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
    if (order.flavor) {
      setValue(order.flavor);
    }
  }, [order.flavor]);

  const props = {
    title: "Hora de escolher o sabor!",
    value,
    options,
    nextStepName: "/flavorstep",
    setValue: setValue,
    setOrderValues: () => setOrderValues("flavor", value),
    isLastStep: true,
  };

  return <StepToMakePizza {...props} />;
}
export default ChooseFlavorStep;
