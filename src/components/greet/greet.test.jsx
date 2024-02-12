import { render, screen } from "@testing-library/react";
import Greet from ".";

// Chú ý 1
// có các đuôi file test như: .test.js, .test.jsx, .spec.js, .spec.jsx. Trường hợp dùng đuôi
// .js vs jsx thôi thì phải bỏ trong folder __tests__
// Chú ý 2
// có thể dùng it('', () => {}) or test('', () => {}) tùy thuộc thẩm mỹ của mình, còn về chức năng thì 2 cái tương tự

// describe dùng để gôm nhóm test (nên dùng describe trong mỗi file test)
describe("Greet", () => {
  // test text value
  test("Text value", () => {
    render(<Greet />);
    const textElementIsHello = screen.getByText("Hello");
    expect(textElementIsHello).toBeInTheDocument();
    const textElementIsHelloWorld = screen.getByText(/Hello World/i);
    expect(textElementIsHelloWorld).toBeInTheDocument();
  });
  // test props
  test("Props", () => {
    render(<Greet name="Ty" />);
    const textElementIsHelloTy = screen.getByText("Hello Ty");
    expect(textElementIsHelloTy).toBeInTheDocument();
  });
  // cũng có thể dùng describe trong describe
  describe("Describe nested", () => {});
  // nếu dùng test.only thì chỉ có những test .only mới được run test, những test còn lại sẽ bỏ qua
  // (dùng test.only trong trường hợp muốn test 1 vài func lấy kết quả thôi, những func còn lại không cần test)
  // test.only("Props", () => {});
  // nếu dùng test.skip thì chỉ có những test .skip mới được bỏ qua test, những test còn lại sẽ run test bình thường
  // (dùng test.skip trong trường hợp muốn bỏ qua 1 vài func test cũ, mà chỉ cần run test những func mới thôi
  // test.skip("Props", () => {});
});
