import React from "react";
import { Link } from "react-router-dom";

import { useSubmitMutation } from "../../others/contexts/api";
import { useFormValue } from "../../others/contexts/form";
import { Button } from "../../others/components/Button";

export function Review() {
  const { mutate, isLoading } = useSubmitMutation();
  const { currentValue, clearStore } = useFormValue();

  const handleSumbit = React.useCallback(async () => {
    try {
      await mutate(currentValue);
      clearStore();
    } catch (error) {
      // Maybe display an error message
    }
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
