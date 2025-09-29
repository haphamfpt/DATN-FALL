import { Link } from "react-router-dom";

interface IViewAll {
  content: string;
  color: string;
  link?: string;
}
const ViewAll = ({ content, color, link }: IViewAll) => {
  return (
    <Link to={link!} className={`link ${color}`}>
      {content}
    </Link>
  );
};

export default ViewAll;
