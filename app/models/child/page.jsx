import ModelsListingPage from "../../Components/ModelsListingPage/ModelsListingPage";
import { childModels } from "../../../data/childModels";

export const metadata = {
  title: "Child Models — SKG Production",
  description: "Browse our talented child models for fashion, commercial, lifestyle and more.",
};

export default function ChildModelsPage() {
  return (
    <ModelsListingPage
      models={childModels}
      title="Child Models"
      filters={["fashion", "commercial", "lifestyle"]}
      basePath="/models/child"
    />
  );
}
