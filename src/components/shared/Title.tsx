import { Helmet } from "react-helmet-async";

export function Title() {
  return (
    <Helmet>
      <title>BitMaster</title>
      <meta
        name="description"
        content={
          "Welcome to bit master website, for dsa and codeing contests practice"
        }
      />
    </Helmet>
  );
}
