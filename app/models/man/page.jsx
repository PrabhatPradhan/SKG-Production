 
import ModelsListingPage from "../../Components/ModelsListingPage/ModelsListingPage";
import { manModels } from "../../../data/manModels";

export const metadata = {
  title: "Man Models — SKG Production",
  description: "Browse our elite roster of man models for fashion, commercial, fitness and editorial.",
};

export default function ManModelsPage() {
  return (
    <ModelsListingPage
      models={manModels}
      title="Man Models"
      filters={["fashion", "commercial", "fitness", "editorial"]}
      basePath="/models/man"
    />
  );
}
