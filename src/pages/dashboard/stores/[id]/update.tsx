import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormMaker from "../../../../components/form/FormMaker";

import store_update_form from "../../../../forms/store_update_form.json";
import { useAction } from "../../../../hooks/useAction";
import { useData } from "../../../../hooks/useData";

export default function Update() {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState<any>(null);

  const { update_store_metadata } = useAction();
  const { get_store_metadata } = useData();

  const { transactionHashes } = router.query;

  if (transactionHashes) {
    router.push(`/dashboard/stores?transactionHashes=${transactionHashes}`);
    return null;
  }

  useEffect(() => {
    const getStore = async () => {
      const metadata = await get_store_metadata(id as string);
      setStore(metadata);
      setIsLoading(false);
    };
    if (id) {
      getStore();
    }
  }, [id]);

  const handleSubmit = async (d: any) => {
    setIsLoading(true);
    await update_store_metadata(id as string, d);
    setIsLoading(false);
    window.location.href = "/dashboard/stores";
  };

  const initial_answers = {
    ...store,
  };

  return (
    <>
      {!isLoading && (
        <FormMaker
          form={store_update_form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          initialAnswers={initial_answers}
        ></FormMaker>
      )}
    </>
  );
}
