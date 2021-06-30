import { render, screen } from "@testing-library/react";
import App from "@root/App";
test("renders App", () => {
  render( /*#__PURE__*/React.createElement(App, null));
  const app = screen.getByTestId("calendar-app");
  expect(app).toBeInTheDocument();
});