import type { FC } from "react";
import type { RouteProps } from "react-router";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const PrivateRoute: FC<RouteProps> = (props) => {
  const { logged } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return logged ? (
    props.element
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="Unauthorized"
      extra={
        <Button
          type="primary"
          onClick={() => navigate(`/login`, { replace: true })}
        >
          Login
        </Button>
      }
    />
  );
};

export default PrivateRoute;
