import { Controlled as CodeMirror } from "react-codemirror2";
import ReactMarkdown from "react-markdown";

const PostPage = () => {
  const [code, setCode] = useState("");

  return (
    <div>
      <h2>Create a Post</h2>
      <CodeMirror
        value={code}
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => setCode(value)}
      />
      <ReactMarkdown>{code}</ReactMarkdown>
    </div>
  );
};
