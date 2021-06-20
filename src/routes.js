import { Routes, Route, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import Home from "./pages/Home";
import PizzaStep from "./pages/PizzaStep";
import PizzaStep2 from "./pages/PizzaStep2";
import PizzaStep3 from "./pages/PizzaStep3";

export default function MainRoutes() {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: {
      opacity: 0,
      transform: "translate(100%, 0)",
    },
    leave: {
      opacity: 0,
      transform: "translate(-50%, 0)",
      position: "absolute",
    },
    enter: {
      opacity: 1,
      transform: "translate(0%, 0)",
    },
  });

  return transitions((props, item) => (
    <animated.div style={props}>
      <Routes location={item}>
        <Route path="" element={<Home />} />
        <Route path="/pizza" element={<PizzaStep />} />
        <Route path="/pizzastep2" element={<PizzaStep2 />} />
        <Route path="/pizzastep3" element={<PizzaStep3 />} />
        <Route path="*" element={<div>FOURI ZERO FOURI</div>} />
      </Routes>
    </animated.div>
  ));
}
