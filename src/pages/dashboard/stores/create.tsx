import { useState } from "react";
import FormMaker from "../../../components/form/FormMaker";

import store_create_form from "../../../forms/store_create_form.json";
import { useAction } from "../../../hooks/useAction";

export default function Create() {
  const [isLoading, setIsLoading] = useState(false);

  const { create_store } = useAction();

  const handleSubmit = async (d: any) => {
    setIsLoading(true);
    await create_store(d);
    setIsLoading(false);
  };

  return (
    <FormMaker
      form={store_create_form}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    ></FormMaker>
  );
}
