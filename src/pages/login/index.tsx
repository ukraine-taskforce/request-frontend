import React from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {AuthStatus, useAuth} from "../../others/contexts/auth";

import {Button} from "../../others/components/Button";
import {Input} from "../../others/components/Input";

export function Login() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {login, status} = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      await login(username, password);
    },
    [login, username, password]
  );

  React.useEffect(() => {
    if (status === AuthStatus.SignedIn) {
      navigate("/");
    }
  }, [status, navigate]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input label={t("login")} placeholder="username" autoComplete="login"
               value={username} onChange={setUsername}/>
        <Input
          label={t("password")}
          placeholder="password"
          type="password"
          autoComplete="password"
          value={password}
          onChange={setPassword}
        />
        <Button type="submit"
                disabled={!username || !password || status === AuthStatus.Loading}>
          {t("login2")}
        </Button>
        <Button disabled={status === AuthStatus.Loading}
                onClick={() => navigate("/reset-password")}>
          {t("request_new_password")}
        </Button>
      </form>
    </>
  );
}
