import magic8Ball from "../../img/magic8Ball.png";
import QuestionForm from "../questionForm/QuestionForm";
import ResultTable from '../table/ResultTable';

export default function Main(props) {
  return (
    <>
      <img src={magic8Ball} alt="Magic 8 ball" />
      <h1>Main Component</h1>

      <QuestionForm />

      <ResultTable />
    </>
  );
}
