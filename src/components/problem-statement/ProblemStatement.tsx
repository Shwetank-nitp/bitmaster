import { Suspense, useEffect, useState } from "react";
import Typography from "../ui/Typography";
import "./ProblemStatement.css";
import axios from "axios";

function ProblemStatement({ slug }: { slug: string }) {
  const [html, setHtml] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const url_problem = `${
      import.meta.env.CONST_BASE_URL
    }/fetch/problem/${slug}`;
    axios
      .get(url_problem, { signal })
      .then((res) => {
        setHtml(res.data);
      })
      .catch((error) => {
        if (error === "AbortError") {
          alert(error);
        }
      });
    return () => {
      controller.abort("page re-render");
    };
  }, []);
  return (
    <Suspense fallback={<Typography>Loading problem...</Typography>}>
      <div dangerouslySetInnerHTML={{ __html: html || "" }}></div>
    </Suspense>
  );
}

export default ProblemStatement;
