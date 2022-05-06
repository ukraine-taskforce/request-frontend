import React from "react"
import {useTranslation} from "react-i18next";
import {QueryClient, useMutation, useQuery} from "react-query";

import {FormData} from "./form";
import {generateCaptchaToken} from "./recaptcha";
import {useAuth} from "./auth";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3, //3 Minutes
    },
  },
});

export const API_DOMAIN = process.env.REACT_APP_API_DOMAIN || "http://127.0.0.1";

export type ID = string | number;

function useFetch() {
  const {forceSessionRefresh, session} = useAuth();

  const query = React.useCallback(
    (input: RequestInfo, init?: RequestInit) => {
      return fetch(input, {
        headers: {
          Authorization: session?.accessToken.jwtToken || "",
        },
        ...init,
      }).then((res) => {
        if (res.status === 401) {
          forceSessionRefresh();
        }

        return res;
      });
    },
    [forceSessionRefresh, session]
  );

  return {
    query,
  };
}

export interface Location {
  id: ID;
  name: string;
}

export function useLocationsQuery() {
  const {i18n} = useTranslation();
  const {query} = useFetch();

  return useQuery<Location[]>(`locationQuery${i18n.language}`, async () => {
    try {
      const result = await query(`${API_DOMAIN}/locations?locale=${i18n.language}`)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);

          return res;
        })
        .then((res) => res.json());

      return result.locations.filter((location: Location) => Boolean(location.name) && Boolean(location.id));
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        return [
          {id: 1, name: "Kyiv"},
          {id: 2, name: "Kyinka"},
          {id: 3, name: "Kyrnasivka"},
          {id: 4, name: "Kyrylivka"},
        ];
      }

      throw error;
    }
  });
}

export interface Supply {
  id: string;
  parent: string;
  name: string;
}

export function useSuppliesQuery() {
  const {i18n} = useTranslation();
  const {query} = useFetch();

  return useQuery<Supply[]>(`suppliesQuery${i18n.language}`, async () => {
    try {
      const result = await query(`${API_DOMAIN}/supplies?locale=${i18n.language}`)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);

          return res;
        })
        .then((res) => res.json());

      return result.supplies.filter((supply: Supply) => Boolean(supply.name) && Boolean(supply.id));
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        return [
          {id: 1, name: "Food"},
          {id: 2, name: "Water"},
          {id: 3, name: "Baby Food"},
          {id: 4, name: "Medical Kits / Supplies"},
        ];
      }

      throw error;
    }
  });
}

export function useSubmitMutation() {
  const {query} = useFetch();

  return useMutation("submitMutation", async (formData: FormData) => {
    try {
      const recaptchaToken = await generateCaptchaToken("submit");
      return await query(API_DOMAIN, {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);

          return res;
        })
        .then((res) => res.json());
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        return null;
      }

      throw error;
    }
  });
}
