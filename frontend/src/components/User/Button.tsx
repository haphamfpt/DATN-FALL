interface IButon {
  content: string;
  color: string;
}
const Button = ({ content, color }: IButon) => {
  return <button className={`btn ${color}`}>{content}</button>;
};

export default Button;
