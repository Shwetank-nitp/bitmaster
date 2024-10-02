import Typography from "../ui/Typography";
import Card from "../ui/Card";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigator = useNavigate();
  return (
    <div className="max-w-[900px] m-auto text-center p-4 h-full">
      <Typography addClass="mb-4 text-slate-700" varient="h3">
        Welcome to <strong>BitMaster</strong>
      </Typography>
      <Typography addClass="text-slate-700 capitalize" varient="h5">
        problem of the day!
      </Typography>
      <div
        className="mt-4 m-auto grid gap-8 justify-center"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(0, 300px))",
        }}
      >
        <Card
          slug="two_sum"
          title="Two Sum"
          description="Find four numbers that add up to given number K."
          onClick={(event) => {
            navigator("/problem/" + event.target.name);
          }}
        />
        <Card
          slug="sub_array"
          title="Subarray of K"
          description="Find largest sub array which is equal to given number k."
          onClick={(event) => {
            navigator("/problem/" + event.target.name);
          }}
        />
      </div>
    </div>
  );
}

export default Home;
