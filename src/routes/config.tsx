import type { FC, ReactElement } from "react";
import PrivateRoute from "./pravateRoute";

type WrapperRouteProps = {
  titleId: string;
  auth?: boolean;
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({
  titleId,
  auth,
  ...props
}) => {
  if (titleId) {
    document.title = titleId;
  }

  return auth ? <PrivateRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
