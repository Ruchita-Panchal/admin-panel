import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={`Page not found`}
      extra={
        <Button type="primary" onClick={() => navigate("/dashboard")}>
          {`Go to dashboard`}
        </Button>
      }
    ></Result>
  );
};

export default NotFoundPage;
