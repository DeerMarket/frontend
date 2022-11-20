import { useState } from "react";

import dispute_create_form from "../../../../forms/dispute_create_form.json";
import FormMaker from "../../../../components/form/FormMaker";
import { useRouter } from "next/router";
import { useAction } from "../../../../hooks/useAction";
import { useGraph } from "../../../../hooks/useGraph";
import { contractsConfig } from "../../../../configs/contracts";

export default function Create() {
  const router = useRouter();
  const { order_id } = router.query;
  const storeID = order_id?.toString().split("@")[1];
  const orderID = order_id?.toString().split("@")[0];

  const [isLoading, setIsLoading] = useState(false);

  const { dispute_create } = useAction();

  const { transactionHashes } = router.query;

  if (transactionHashes) {
    router.push(`/dashboard/orders`);
    return null;
  }

  const handleSubmit = async (d: any) => {
    setIsLoading(true);

    await dispute_create(
      storeID + "." + contractsConfig.store_factory.contractId,
      orderID!,
      d.description
    );
    setIsLoading(false);

    window.location.href = "/disputes";
  };

  return (
    <FormMaker
      form={dispute_create_form}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    ></FormMaker>
  );
}
