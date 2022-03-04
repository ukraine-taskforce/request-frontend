import React from "react";
import { Link } from "react-router-dom";

import { useSubmitMutation } from "../../others/contexts/api";
import { useFormValue } from "../../others/contexts/form";
import { Button } from "../../others/components/Button";

export function Review() {
  const { mutate, isLoading } = useSubmitMutation();
  const { currentValue } = useFormValue();

  const handleSumbit = React.useCallback(async () => {
    await mutate(currentValue);
  }, [mutate, currentValue]);

  return (
    <React.Fragment>
      <h1>Review</h1>
      <Link to="/success">Next page</Link>
      <Button onClick={handleSumbit} disabled={isLoading}>
        Submit
      </Button>
    </React.Fragment>
  );
}
