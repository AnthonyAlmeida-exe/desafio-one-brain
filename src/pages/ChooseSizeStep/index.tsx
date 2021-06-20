import { useEffect, useState } from "react";
import { useOrder } from "hooks/useOrder";
import StepToMakePizza from "components/local/StepToMakePizza";

function ChooseSizeStep() {
  const [value, setValue] = useState("");
  const { order, setOrderValues } = useOrder();
  const [options, setOptions] = useState([]);

  async function getOptions() {
    const response = await fetch("/sizes");
    const data = await response.json();
    setOptions(data);
  }

  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
    if (order.size) {
      setValue(order.size);
    }
  }, [order.size]);

  const props = {
    title: "Hora de escolher o tamanho!",
    value,
    options,
    nextStepName: "/flavorstep",
    setValue: setValue,
    setOrderValues: () => setOrderValues("size", value),
  };

  return <StepToMakePizza {...props} />;
}
export default ChooseSizeStep;
