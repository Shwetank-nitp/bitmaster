import { Navigate, useParams } from "react-router-dom";
import ProblemStatement from "../problem-statement/ProblemStatement";
import CodeLayout from "../layouts/CodeLayout";
import CodeEditor from "../editor/Editor";

function ProblemProvider() {
  const { slug } = useParams();
  if (!slug) {
    return <Navigate to={"/"} />;
  }
  const title = slug.replace(/_/g, " ");

  return (
    <CodeLayout
      children1={<ProblemStatement slug={slug} />}
      children2={<CodeEditor slug={slug} />}
      title={title}
    />
  );
}

export default ProblemProvider;
