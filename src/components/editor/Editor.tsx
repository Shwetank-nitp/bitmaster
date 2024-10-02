import { Editor } from "@monaco-editor/react";
import Typography from "../ui/Typography";
import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import Button from "../ui/button";
import axios, { AxiosError } from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { storeDispatch, storeSelector } from "../../hooks/slice-hook";
import { Language, setLanguages } from "../../redux/language-slice";

type TestCase = {
  output: string;
  expected_output: string;
  status_code: number;
};

type Submission = {
  _id: string;
  lang: string;
  testcase_id: string;
  status: string;
  code: string;
  stderr: string;
};

function EditorComp({ slug }: { slug: string }) {
  const languages: Language[] = storeSelector(
    (state) => state.language.all_languages
  );
  const [currentLang, setCurrentLang] = useState<string>("javascript");
  const [open, setOpen] = useState<boolean>(false);
  const [boilerplate, setBoilerPlate] = useState<string>("");
  const [openConsole, setOpenConsole] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "accepted" | "rejected" | "pending" | null
  >(null);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [consoleMessage, setConsoleMessage] = useState<string>("");
  const [stderr, setStderr] = useState<string | null>(null);
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentLang(e.target.value);
  };

  const user = storeSelector((state) => state.userstate.user);

  const handleWebPolling = async (id: string, signal: AbortSignal) => {
    const url_poll = `${import.meta.env.CONST_BASE_URL}/code/poll/${id}`;
    try {
      const response = await axios.get(url_poll, { signal });
      if (response.data.status === "accepted") {
        setSubmitStatus("accepted");
      } else if (response.data.status === "rejected") {
        setSubmitStatus("rejected");
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 500) {
        return 500;
      }
    }
  };

  const fetchTestCases = async (testcase_id: string) => {
    const url_testcases = `${
      import.meta.env.CONST_BASE_URL
    }/code/testcases/${testcase_id}`;
    try {
      const response = await axios.get(url_testcases, {});
      setTestCases(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmission = async () => {
    if (!user) {
      alert("Please login to submit");
      return;
    }
    setSubmitStatus(null);
    setConsoleMessage("");
    setStderr(null);
    console.log(currentLang, boilerplate, slug);
    const url_submit = `${import.meta.env.CONST_BASE_URL}/code/evaluate`;
    try {
      const response = await axios.post(
        url_submit,
        {
          lang: languages.find((item) => item.key === currentLang)?.value,
          code: boilerplate,
          slug,
        },
        { withCredentials: true }
      );
      if (response.status !== 201) {
        console.log("failed to submit");
        return;
      }
      setSubmitStatus("pending");
      let prev_controller: AbortController | null = null;
      let pollCount = 0; // Initialize the polling counter
      const maxPollLimit = 50; // Set the maximum polling limit
      const interval = setInterval(() => {
        pollCount++; // Increment the polling counter
        if (pollCount > maxPollLimit) {
          // Stop polling after 50 attempts
          console.log("Max polling limit reached, stopping the polling.");
          setSubmitStatus("rejected");
          setConsoleMessage(
            "Taking Too Long, Please Check Submissions after some time"
          );
          clearInterval(interval);
          return;
        }

        prev_controller?.abort();
        const controller = new AbortController();
        const signal = controller.signal;
        console.log(response.data);
        handleWebPolling(response.data, signal).then((res) => {
          console.log(res);
          if (res === 500) {
            setSubmitStatus("rejected");
            clearInterval(interval);
            return;
          }
          if (res.status === "rejected" || res.status === "accepted") {
            console.log(res);
            fetchTestCases(res.testcase_id);
            clearInterval(interval);
          }
        });
        prev_controller = controller;
      }, 1000);
    } catch (error) {
      console.log(error);
      setSubmitStatus("rejected");
    }
  };

  const findFailedTestCases = () => {
    const failedTestCases = testCases.find((item) => item.status_code !== 3);
    return failedTestCases;
  };

  const submissionInfo = () => {
    const failedTestCases = findFailedTestCases();
    if (!failedTestCases) {
      setConsoleMessage(
        `${testCases.length}/${testCases.length} Test Cases Passed`
      );
      return;
    }
    const statusCode = failedTestCases.status_code;
    switch (statusCode) {
      case 4:
        const passed = testCases.filter((item) => item.status_code === 3);
        setConsoleMessage(
          `Wrong Answer: ${passed.length}/${testCases.length} passed\n
          expected output: ${failedTestCases.expected_output}\n
          output: ${failedTestCases.output}
          `
        );
        break;
      case 5:
        setConsoleMessage("Time Limit Exceeded");
        break;
      case 6:
        setConsoleMessage("Memory Limit Exceeded");
        break;
      case 11:
        setConsoleMessage("Compilation Error: Syntax Error");
        break;
      case 12:
        setConsoleMessage("Runtime Error");
        break;
      case 13:
        setConsoleMessage("Internal Server Error");
        break;
      default:
        setConsoleMessage("Something Went Wrong");
    }
    setStderr(failedTestCases.output);
  };

  useEffect(() => {
    if (testCases.length) {
      submissionInfo();
    }
  }, [testCases]);

  useEffect(() => {
    const url_code = `${
      import.meta.env.CONST_BASE_URL
    }/fetch/code/${slug}?lang=${currentLang}`;
    axios
      .get(url_code)
      .then((res) => setBoilerPlate(res.data))
      .catch((err) => console.log(err));
  }, [currentLang, slug]);
  return (
    <div className="relative">
      <div className="my-2 flex row-span-1 justify-between items-center">
        <div>
          <Typography varient="p" addClass="capitalize inline-block mr-3">
            language
          </Typography>
          <select
            className="px-2 py-1 rounded-md hover:outline hover:outline-gray-400 focus:outline-gray-400 focus:outline-2 bg-slate-900 hover:bg-slate-800 text-white"
            value={currentLang}
            onChange={handleLanguageChange}
          >
            {languages.map((lang, index) => (
              <option
                className="font-normal text-sm tracking-tight lg:text-md capitalize"
                key={index}
                value={lang.key}
                label={lang.key}
              >
                {lang.key}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <Button
            className="relative flex items-center"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <IoReload />
            {open && (
              <span
                className="bg-gray-100 absolute rounded-md p-1 -bottom-10 -left-16 whitespace-nowrap transition-opacity duration-200 ease-in-out opacity-0 hover:opacity-100 z-10"
                style={{ opacity: open ? 1 : 0 }}
              >
                <Typography varient="p">Fetch Boilerplate</Typography>
              </span>
            )}
          </Button>
          <Button
            disabled={submitStatus === "pending"}
            onClick={handleSubmission}
            styles={`${submitStatus === "pending" ? "cursor-not-allowed" : ""}`}
          >
            <Typography varient="h6">Submit</Typography>
          </Button>
          <Button>
            <Typography varient="h6">Run</Typography>
          </Button>
        </div>
      </div>
      <div>
        <Editor
          theme="vs-dark"
          height={!openConsole ? "78vh" : "60vh"}
          language={currentLang}
          value={boilerplate}
          onChange={(e) => setBoilerPlate(e ?? "")}
        />
      </div>
      <div
        className={`p-2 overflow-auto`}
        style={{
          height: !openConsole ? "23vh" : "40vh",
        }}
      >
        <button
          onClick={() => setOpenConsole((prev) => !prev)}
          className="py-3 px-2 rounded-md bg-gray-200 flex gap-2"
        >
          <Typography varient="p">Console</Typography>
          <IoIosArrowDown
            style={{
              transform: !openConsole ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>
        {openConsole && (
          <div>
            {submitStatus === "accepted" && (
              <Typography varient="h4" addClass="text-green-600">
                Accepted
              </Typography>
            )}
            {submitStatus === "rejected" && (
              <Typography varient="h4" addClass="text-red-600">
                Rejected
              </Typography>
            )}
            {submitStatus === "pending" && (
              <Typography varient="h4" addClass="text-yellow-600">
                Pending
              </Typography>
            )}
            {consoleMessage && (
              <Typography varient="h5">{consoleMessage}</Typography>
            )}
            {stderr && (
              <div className="flex flex-col gap-2">
                <Typography varient="p" addClass="text-red-600">
                  ERROR
                </Typography>
                <pre className="whitespace-pre-wrap text-red-600">{stderr}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CodePreview({ code }: { code: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const preview = `${code?.length >= 50 ? code.slice(0, 50) + "..." : code}`;
  return (
    <td className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
      <pre className="whitespace-pre-wrap text-white">
        {open ? code : preview}
      </pre>
    </td>
  );
}

function Submissions({ slug }: { slug: string }) {
  const [allSubmissions, setAllSubmissions] = useState<Submission[]>([]);
  const fetchAllSubmissions = async () => {
    const url_submissions = `${
      import.meta.env.CONST_BASE_URL
    }/code/submissions/${slug}`;
    try {
      const response = await axios.get(url_submissions, {
        withCredentials: true,
      });
      setAllSubmissions(response.data);
    } catch (error: any) {
      if (error as AxiosError) {
        console.log(error.response.data.message);
      }
      console.log(error);
    }
  };
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetchAllSubmissions().finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <div className="h-full">Loading...</div>;
  }
  function Content() {
    if (allSubmissions.length) {
      return (
        <table className="bg-transparent w-full">
          <tbody>
            {allSubmissions.map((item, index) => (
              <tr key={index} className="bg-white p-4 rounded-md">
                <td className="p-4 align-text-top">
                  <Typography varient="p">{`${index + 1}.`}</Typography>
                </td>
                <td className="p-4 align-text-top">
                  {item.status === "accepted" && (
                    <Typography varient="p" addClass="text-green-600">
                      Accepted
                    </Typography>
                  )}
                  {item.status === "rejected" && (
                    <Typography varient="p" addClass="text-red-600">
                      Rejected
                    </Typography>
                  )}
                  {item.status === "pending" && (
                    <Typography varient="p" addClass="text-yellow-600">
                      Pending
                    </Typography>
                  )}
                </td>
                <td className="p-4 align-text-top">
                  <Typography varient="p" addClass="text-slate-500">
                    {item.lang}
                  </Typography>
                </td>
                <CodePreview code={item.code} />
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else
      return (
        <div className="h-full flex justify-center items-center">
          <Typography varient="h6" addClass="mt-4">
            No Submissions Yet
          </Typography>
        </div>
      );
  }
  return (
    <div className="h-[93vh] overflow-auto rounded-lg shadow-md">
      <Content />
    </div>
  );
}

function CodeEditor({ slug }: { slug: string }) {
  const [tab, setTab] = useState<"editor" | "submissions">("editor");
  const dispatch = storeDispatch();
  useEffect(() => {
    const url_lang = `${import.meta.env.CONST_BASE_URL}/fetch/languages`;
    axios
      .get(url_lang)
      .then((res) => {
        const arr = res.data.map((item: any) => ({
          key: item.name,
          value: item.unique_number,
        }));
        dispatch(setLanguages(arr));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="p-2 bg-gray-300 rounded-md flex gap-2">
          <div
            onClick={() => setTab("editor")}
            className="cursor-pointer rounded-md py-2 px-4"
            style={{
              backgroundColor: tab === "editor" ? "white" : "transparent",
            }}
          >
            <Typography varient="p">Editor</Typography>
          </div>
          <div
            onClick={() => setTab("submissions")}
            className="cursor-pointer py-2 px-4 rounded-md"
            style={{
              backgroundColor: tab === "submissions" ? "white" : "transparent",
            }}
          >
            <Typography varient="p">Submissions</Typography>
          </div>
        </div>
      </div>
      {tab === "editor" ? (
        <EditorComp slug={slug} />
      ) : (
        <Submissions slug={slug} />
      )}
    </>
  );
}

export default CodeEditor;
