import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "../../others/components/Button";
import { useAuth } from "../../others/contexts/auth";
import { Text } from "../../others/components/Text";
import { Input } from "../../others/components/Input";

enum FormStep {
  Username,
  Confirmation,
  Done,
}

export function ResetPassword() {
  const { t } = useTranslation();
  const { sendCode, confirmPassword } = useAuth();
  const [username, setUsername] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [step, setStep] = React.useState<FormStep>(FormStep.Username);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      switch (step) {
        case FormStep.Username:
          await sendCode(username);

          setStep(FormStep.Confirmation);
          break;

        case FormStep.Confirmation:
          await confirmPassword(code, username, newPassword);

          setStep(FormStep.Done);
          break;
        default:
          break;
      }
    },
    [step, setStep, username, code, newPassword, sendCode, confirmPassword]
  );

  const disabledStatus = React.useMemo(
    () =>
      step === FormStep.Done || (step === FormStep.Username && !username) || (step === FormStep.Confirmation && (!newPassword || !code)),
    [code, newPassword, step, username]
  );

  return (
    <React.Fragment>
      <Text>{t("ugt")}</Text>
      <Text>{t("request_new_password_label")}</Text>
      {step === FormStep.Confirmation && <div>{t("code_sent")}</div>}
      {step === FormStep.Done && (
        <React.Fragment>
          <div>{t("password_change_success")}</div>
          <Link to="/login">
            <Text>{t("go_to_login")}</Text>
          </Link>
        </React.Fragment>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          label={t("login")}
          placeholder="username"
          autoComplete="login"
          value={username}
          onChange={setUsername}
          disabled={step !== FormStep.Username}
        />
        {step === FormStep.Confirmation && (
          <React.Fragment>
            <Input label={t("code")} placeholder="123456" value={code} onChange={setCode} />
            <Input
              label={t("password")}
              placeholder="password"
              type="password"
              autoComplete="password"
              value={newPassword}
              onChange={setNewPassword}
            />
          </React.Fragment>
        )}
        <Button type="submit" disabled={disabledStatus}>
          {t("reset_password")}
        </Button>
      </form>
    </React.Fragment>
  );
}
