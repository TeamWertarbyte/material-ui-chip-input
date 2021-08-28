import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// non-official React 17 Enzyme adapter

Enzyme.configure({ adapter: new Adapter() });
// Fail tests on any warning
console.error = (message) => {
  throw new Error(message);
};
