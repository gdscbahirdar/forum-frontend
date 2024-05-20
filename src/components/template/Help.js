import withHeaderItem from "utils/hoc/withHeaderItem";
import classNames from "classnames";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const Help = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/help");
  };

  return (
    <>
      <div className={classNames("text-2xl", className)} onClick={handleClick}>
        <IoMdHelpCircleOutline />
      </div>
    </>
  );
};

export default withHeaderItem(Help);
