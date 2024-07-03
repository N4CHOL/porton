import { useNavigate } from "react-router-dom";

const navigateTo = (route) => {
  useNavigate(route); // This won't work here

};

export default navigateTo;