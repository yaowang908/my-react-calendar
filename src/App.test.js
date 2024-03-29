import { render, screen } from "@testing-library/react";
import App from "@root/App";

test("renders App", () => {
    render(<App />);
    const app = screen.getByTestId("calendar-app");
    expect(app).toBeInTheDocument();
});
