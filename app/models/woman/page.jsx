import { womanModels } from "../../../data/womanModels";
import ModelsListingPage from "../../Components/ModelsListingPage/ModelsListingPage";
 

export const metadata = {
  title: "Woman Models — SKG Production",
  description: "Browse our elite roster of woman models for fashion, commercial, bridal and more.",
};

export default function WomanModelsPage() {
  return (
    <ModelsListingPage
      models={womanModels}
      title="Woman Models"
      filters={["fashion", "commercial", "bridal", "fitness"]}
      basePath="/models/woman"
    />
  );
}
