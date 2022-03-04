import { QueryClient, useMutation, useQuery } from "react-query";

import { FormData } from "./form";

export const queryClient = new QueryClient();

export interface Location {
  id: number;
  name: string;
}

export function useLocationsQuery() {
  return useQuery<Location[]>("locationsQuery", () => {
    // Normal behavior when backend will be available
    // fetch("/api/locations").then((res) => res.json())

    return [
      { id: 1, name: "Kyiv" },
      { id: 2, name: "Kyinka" },
      { id: 3, name: "Kyrnasivka" },
      { id: 4, name: "Kyrylivka" },
    ];
  });
}

export interface Supply {
  id: number;
  name: string;
}

export function useSuppliesQuery() {
  return useQuery<Supply[]>("suppliesQuery", () => {
    // Normal behavior when backend will be available
    // fetch("/api/supplies").then((res) => res.json())

    return [
      { id: 1, name: "Food" },
      { id: 2, name: "Water" },
      { id: 3, name: "Baby Food" },
      { id: 4, name: "Medical Kits / Supplies" },
    ];
  });
}

export function useSubmitMutation() {
  return useMutation("locationQuery", async (formData: FormData) => {
    // Normal behavior when backend will be available
    // await fetch("/api/locations", {method: 'POST', body: formData})

    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })

    return null;
  });
}
