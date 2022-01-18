import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

export default function PageNotFound(props) {
  const { title } = props;
  return (
    <div className="loaderCenter">
      <div className="text-center">
        <Typography variant="h5">Page not Found</Typography>
      </div>
    </div>
  );
}

PageNotFound.propTypes = {
  title: PropTypes.string,
};
