import Router from "next/router";
import { useEffect, useState } from "react";
import FormMaker from "../../../components/form/FormMaker";

import store_create_form from "../../../forms/store_create_form.json";
import { useAction } from "../../../hooks/useAction";

export default function Create() {
  const { create_store } = useAction();
  const [isLoading, setIsLoading] = useState(false);
  const { transactionHashes } = Router.query;

  if (transactionHashes) {
    Router.push(`/dashboard/stores?transactionHashes=${transactionHashes}`);
    return null;
  }

  const handleSubmit = async (d: any) => {
    setIsLoading(true);
    await create_store(d);
    setIsLoading(false);
    window.location.href = "/dashboard/stores";
  };
  return (
    <FormMaker
      form={store_create_form}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    ></FormMaker>
  );
}
