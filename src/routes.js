import { Routes, Route, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import Home from "./pages/Home";
import ChoosePastaStep from "./pages/ChoosePastaStep";
import ChooseSizeStep from "./pages/ChooseSizeStep";
import ChooseFlavorStep from "./pages/ChooseFlavorStep";

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
        <Route path="/" element={<Home />} />
        <Route path="/pastastep" element={<ChoosePastaStep />} />
        <Route path="/sizestep" element={<ChooseSizeStep />} />
        <Route path="/flavorstep" element={<ChooseFlavorStep />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </animated.div>
  ));
}
