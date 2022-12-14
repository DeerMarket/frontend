import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormMaker from "../../../../components/form/FormMaker";

import item_list_form from "../../../../forms/item_list_form.json";
import { useAction } from "../../../../hooks/useAction";

export default function List() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { item_create } = useAction();

  const handleSubmit = async (d: any) => {
    setIsLoading(true);
    await item_create({
      store_id: id,
      ...d,
    });
    setIsLoading(false);
    window.location.href = "/dashboard/stores";
  };

  const { transactionHashes } = Router.query;

  if (transactionHashes) {
    router.push(`/dashboard/stores?transactionHashes=${transactionHashes}`);
    return null;
  } else {
    return (
      <FormMaker
        form={item_list_form}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      ></FormMaker>
    );
  }
}
