import { useEffect, useState } from "react";
import Button from "../ui/button";
import { IoIosArrowDown } from "react-icons/io";
import Typography from "../ui/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ExpandableDiv({
  catagory,
  list,
}: {
  catagory: string;
  list: Problem[];
}) {
  const [expand, setExpand] = useState<boolean>(false);
  const navigate = useNavigate();
  function handleNavigation(e: any) {
    navigate("/problem/" + e.target.name);
  }
  return (
    <div className="rounded-md flex flex-col bg-gray-100 shadow-lg p-4">
      <div className="flex justify-between items-center">
        <Typography addClass="font-extrabold underline capitalize" varient="h6">
          {catagory}
        </Typography>
        <button onClick={() => setExpand((prev) => !prev)}>
          <IoIosArrowDown
            className={`transform ${expand ? "rotate(180deg)" : ""}`}
          />
        </button>
      </div>
      {expand && (
        <div className="w-full">
          <table className="w-full">
            <tbody>
              {list.map((item, index) => (
                <tr key={item._id}>
                  <td className="text-start">
                    <Typography varient="p">{index + 1}</Typography>
                  </td>
                  <td className="text-start">
                    <Typography varient="p">{item.problem_name}</Typography>
                  </td>
                  <td className="text-start">
                    <Typography
                      varient="p"
                      addClass={`${
                        item.difficulty === "easy"
                          ? "text-green-600"
                          : item.difficulty === "medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.difficulty}
                    </Typography>
                  </td>
                  <td className="text-end">
                    <Button name={item.slug} onClick={handleNavigation}>
                      Attempt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

type Problem = {
  _id: string;
  problem_name: string;
  slug: string;
  difficulty: string;
  catagory: string;
};
type CatagoryArray = {
  catagory: string;
  problems: Problem[];
};

function ProblemList() {
  const [problems, setProblems] = useState<Problem[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const url_problems = `${
      import.meta.env.CONST_BASE_URL
    }/fetch/all?skip=0&limit=25`;
    axios
      .get(url_problems, { signal })
      .then((res) => setProblems(res.data))
      .catch((err) => {
        console.log(err);
      });
    return () => controller.abort();
  }, []);

  function generateArray(arr: Problem[]): CatagoryArray[] {
    const arr_catagory: CatagoryArray[] = [];
    arr.forEach((item) => {
      const catagory = item.catagory;
      const index = arr_catagory.findIndex(
        (item) => item.catagory === catagory
      );
      if (index === -1) {
        arr_catagory.push({
          catagory,
          problems: [item],
        });
      } else {
        arr_catagory[index].problems.push(item);
      }
    });
    return arr_catagory;
  }
  return (
    <div className="flex flex-col gap-2">
      {problems.length !== 0 ? (
        generateArray(problems).map((item, index) => (
          <ExpandableDiv
            key={index}
            catagory={item.catagory}
            list={item.problems}
          />
        ))
      ) : (
        <Typography varient="h6">No Problems Yet</Typography>
      )}
    </div>
  );
}

export default ProblemList;
