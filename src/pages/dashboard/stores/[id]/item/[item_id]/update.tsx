import { utils } from "near-api-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormMaker from "../../../../../../components/form/FormMaker";

import item_list_form from "../../../../../../forms/item_list_form.json";
import { useAction } from "../../../../../../hooks/useAction";
import { useData } from "../../../../../../hooks/useData";

export default function Update() {
  const router = useRouter();
  const { id, item_id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState<any>(null);

  const { item_update } = useAction();
  const { get_item } = useData();

  useEffect(() => {
    const getStore = async () => {
      const aa = await get_item(id as string, item_id as string);
      const metadata = {
        id: aa?.id,
        price: utils.format.formatNearAmount(BigInt(aa?.price).toString(), 2),
        ...aa?.metadata,
      };
      setItem(metadata);
      console.log(metadata);
      setIsLoading(false);
    };
    if (id) {
      getStore();
    }
  }, [id]);

  const handleSubmit = async (d: any) => {
    setIsLoading(true);
    await item_update(id as string, { item_id, ...d });
    setIsLoading(false);
    window.location.href = "/dashboard/stores";
  };

  const initial_answers = {
    ...item,
  };

  return (
    <>
      {!isLoading && (
        <FormMaker
          form={item_list_form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          initialAnswers={initial_answers}
        ></FormMaker>
      )}
    </>
  );
}
