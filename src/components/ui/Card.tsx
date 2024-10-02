import Typography from "./Typography";
import Button from "./button";

type CardProps = {
  title?: string;
  description?: string;
  onClick?: (event?: any) => void;
  slug: string;
};

function Card({ title, description, onClick, slug }: CardProps) {
  return (
    <div className="rounded-md outline outline-1 outline-gray-200 text-gray-600 p-4 flex flex-col shadow-lg">
      <Typography varient="h3">{title}</Typography>
      <Typography className="my-4" varient="h6">
        {description}
      </Typography>

      <Button name={slug} onClick={onClick}>
        Solve
      </Button>
    </div>
  );
}

export default Card;
