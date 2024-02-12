import { render, screen } from "@testing-library/react";
import { Application } from ".";

describe("Application", () => {
  test("has checkbox, input, button, select, header tag", () => {
    render(<Application />);
    // const hasInput = screen.getByRole("textbox", {
    //   name: "name",
    // }); // textbox is input
    // expect(hasInput).toBeInTheDocument();
    const hasHeaderTagByName = screen.getByRole("heading", {
      // heading is header tag
      name: "Job application form", // theo name
    });
    expect(hasHeaderTagByName).toBeInTheDocument();
    const hasHeaderTagByLevel = screen.getByRole("heading", {
      // heading is header tag
      level: 2, // theo level
    });
    expect(hasHeaderTagByLevel).toBeInTheDocument();
    const hasSelect = screen.getByRole("combobox"); // combobox is select
    expect(hasSelect).toBeInTheDocument();
    const hasCheckbox = screen.getByRole("checkbox");
    expect(hasCheckbox).toBeInTheDocument();
    const hasButton = screen.getByRole("button");
    expect(hasButton).toBeInTheDocument();
    const hasTextName = screen.getByLabelText("Name"); // same with screen.getByText
    // VD: input, textarea, select thì dùng: getByLabelText, mấy thẻ html, button thì dùng: getByText
    expect(hasTextName).toBeInTheDocument();
    const hasPlaceholderText = screen.getByPlaceholderText("Fullname");
    expect(hasPlaceholderText).toBeInTheDocument();
  });
});
