import {
  FaSquareFacebook,
  FaSquareReddit,
  FaSquareXTwitter,
} from "react-icons/fa6";
import Typography from "../ui/Typography";
import { FaLinkedin } from "react-icons/fa";

type Share = {
  to: string;
  description: string;
  url: string;
  Icon: React.ReactNode;
};

type Topics = {
  name: string;
  description: string;
};

type Resources = {
  name: string;
  url: string;
  discription: string;
};

const share: Share[] = [
  {
    to: "twitter",
    description: "Share the roadmap to master DSA with your friends",
    url: "https://twitter.com/intent/tweet?text=Check+out+this+roadmap+to+master+DSA!&url=http://localhost:3000/roadmap",
    Icon: <FaSquareXTwitter fontSize={"1.5rem"} />,
  },
  {
    to: "facebook",
    description: "Share the roadmap to master DSA with your friends",
    url: "https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/roadmap",
    Icon: <FaSquareFacebook fontSize={"1.5rem"} />,
  },
  {
    to: "reddit",
    description: "Share the roadmap to master DSA with your friends",
    url: "https://www.reddit.com/submit?url=http://localhost:3000/roadmap&title=Check+this+article+out+to+learn+DSA",
    Icon: <FaSquareReddit fontSize={"1.5rem"} />,
  },
  {
    to: "linkedin",
    description: "Share the roadmap to master DSA with your friends",
    url: "https://www.linkedin.com/shareArticle?mini=true&url=http://localhost:3000/roadmap&title=Check+this+roadmap+to+master+DSA&summary=Explore+this+great+resource+to+learn+DSA&source=http://localhost:3000",
    Icon: <FaLinkedin fontSize={"1.5rem"} />,
  },
];
const topics: Topics[] = [
  {
    name: "Data Structures",
    description:
      "Data Structures are a fundamental element of computer science. They provide a specific way to organize and store data so that it can be accessed and used efficiently. Different types of data structures include arrays, linked lists, stacks, queues, hash tables, trees, and graphs. Each of these has its unique characteristics and use-cases, and is optimal for certain kinds of operations. For example, arrays are excellent for random access, while linked lists work well for frequent insertions and deletions. The correct choice of data structure can significantly enhance the performance of your programs.",
  },
  {
    name: "Algorithms",
    description:
      "“Algorithmic Complexity” refers to the computing resources needed by an algorithm to solve a problem. These computing resources can be the time taken for program execution (time complexity), or the space used in memory during its execution (space complexity). The aim is to minimize these resources, so an algorithm that takes less time and space is considered more efficient. Complexity is usually expressed using Big O notation, which describes the upper bound of time or space needs, and explains how they grow in relation to the input size. It’s important to analyze and understand the algorithmic complexity to choose or design the most efficient algorithm for a specific use-case.",
  },
  {
    name: "Sorting algorithms",
    description:
      "Sorting algorithms are used to rearrange a given array or list elements according to a comparison operator on the elements. The comparison operator is used to decide the new order of element in the respective data structure. For example, the numerical order is a commonly used sequence but a lexicographical order is also a commonly used sequence type. There are several types of sorting algorithms: quick sort, bubble sort, merge sort, insertion sort, selection sort, heap sort, radix sort, bucket sort among others. Each has its own properties and are suited to specific types of tasks and data.",
  },
  {
    name: "Tree Data Structures",
    description:
      "A Tree data structure is a type of non-linear, hierarchical data structure that consists of nodes connected by edges. It follows the parent-child relationship, with the top node being called the root. Each node in a tree can have child nodes and each of these child nodes has a single parent node. Nodes with same parents are known as siblings. Nodes without any children are referred to as leaves. Its structure allows the organization of data in a natural hierarchy. The simplification it provides in accessing, managing and manipulating data with complex relationships makes it a vital data structure in computer science. Implementations of the tree data structure are seen in databases, file systems, and HTML DOM.",
  },
  {
    name: "Graph Data Structures",
    description:
      "A Graph Data Structure consists of a set of vertices (or nodes) and edges where each edge connects a pair of vertices. It can be visualized as networks consisting of elements in interconnected various relationships. There are two major types of graphs: Directed and Undirected. In a directed graph, all the edges are unidirectional - they only go one way. On the other hand, in an undirected graph, the edges are not directed - they are bidirectional. Another concept important to graphs is the idea of ‘Weighted’ and ‘Unweighted’ graphs. In a weighted graph, each edge is assigned a weight or cost. Unweighted graphs don’t have these extra edge information. Graphs have a diverse set of applications in computer science, from creating connections between web pages to modeling networks and much more.",
  },
  {
    name: "Indexing",
    description:
      "Indexing is a data structure technique to efficiently retrieve data from a database. It essentially creates a lookup that can be used to quickly find the location of data records on a disk. Indexes are created using a few database columns and are capable of rapidly locating data without scanning every row in a database table each time the database table is accessed. Indexes can be created using any combination of columns in a database table, reducing the amount of time it takes to find data. Indexes can be structured in several ways: Binary Tree, B-Tree, Hash Map, etc., each having its own particular strengths and weaknesses. When creating an index, it’s crucial to understand which type of index to apply in order to achieve maximum efficiency. Indexes, like any other database feature, must be used wisely because they require disk space and need to be maintained, which can slow down insert and update operations.",
  },
];
const resources: Resources[] = [
  {
    name: "Youtube Playlist",
    discription: "Follow striver to learn Data Structures",
    url: "https://www.youtube.com/watch?v=0bHoB32fuj0&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz",
  },
  {
    name: "Comprensive RoadMap",
    discription: "Follow roadmap.sh to easy you dsa journey.",
    url: "https://roadmap.sh/datastructures-and-algorithms",
  },
];

function Roadmap() {
  return (
    <div className="relative">
      <div className="absolute top-[20%] -left-10 flex flex-col gap-1">
        {share.map((item, index) => (
          <button key={index} name={item.to} className="flex gap-2">
            <a href={item.url} target="_blank">
              {item.Icon}
            </a>
          </button>
        ))}
      </div>
      <Typography varient="h3">Data Structures & Algorithms Roadmap</Typography>
      {topics.map((item, index) => (
        <div key={index} className="my-4">
          <Typography
            varient="h4"
            addClass="underline mb-1 text-slate-900 text-bold"
          >
            {item.name}
          </Typography>
          <Typography varient="p" addClass="text-slate-800 text-extrabold">
            {item.description}
          </Typography>
        </div>
      ))}
      <Typography varient="h3">Resources</Typography>
      <div>
        {resources.map((item, index) => (
          <div key={index}>
            <Typography varient="h5">{item.name}</Typography>
            <a href={item.url} target="_blank">
              <Typography addClass="hover:underline inline-block" varient="p">
                {item.discription}
              </Typography>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Roadmap;
