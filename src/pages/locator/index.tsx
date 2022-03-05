import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import loopIcon from "../../medias/images/UGT_Asset_UI_Search.svg";

import { Card } from "../../others/components/Card";
import { Input } from "../../others/components/Input";
import { Spacer } from "../../others/components/Spacer";
import { Text } from "../../others/components/Text";
import { useLocationsQuery, Location } from "../../others/contexts/api";
import { useFormValue } from "../../others/contexts/form";

import styles from "./locator.module.css";
import { fuzzySearch } from "./search";
import { Header } from "../../others/components/Header";

export function Locator() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: cities } = useLocationsQuery();
  const { updateValue } = useFormValue();
  const [inputValue, setInputValue] = React.useState("");

  const handleLocationSelection = React.useCallback(
    (location: Location) => {
      updateValue({ location: location.id });
      navigate("/people");
    },
    [navigate, updateValue]
  );

  const searchResults = React.useMemo(() => {
    if (cities?.length && inputValue.length) {
      return fuzzySearch(inputValue, cities);
    }

    return [];
  }, [cities, inputValue]);

  if (!cities) {
    // Handle loading state ?
    return null;
  }

  return (
    <React.Fragment>
      <Header hasBackButton/>
      <h1>{t("locator_where_are_you")}?</h1>
      <Spacer size={24} />
      <Input
        value={inputValue}
        onChange={setInputValue}
        placeholder={t("locator_search_your")}
        icon={<img src={loopIcon} alt="" />}
        label={t("locator_search_your")}
      />
      <Spacer size={12} />
      {Boolean(searchResults?.length) && (
        <React.Fragment>
          <Text variant="light">
            {searchResults?.length} {t("locator_results")}
          </Text>
          <Spacer />
        </React.Fragment>
      )}
      {searchResults?.map((result) => (
        <LocationElement key={result.id} location={result} onClick={() => handleLocationSelection(result)} />
      ))}
    </React.Fragment>
  );
}

interface LocationElementProps extends React.AllHTMLAttributes<HTMLDivElement> {
  location: Location;
}

const LocationElement: React.FunctionComponent<LocationElementProps> = ({ location, ...props }) => {
  return (
    <Card {...props} className={styles.wrapper}>
      <Text>{location.name}</Text>
    </Card>
  );
};
