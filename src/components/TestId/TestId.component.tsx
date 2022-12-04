import { useDispatch } from "react-redux";
import { setTestId } from "../../features/testId/testId.slice";
import { useState } from "react";

const TestId = () => {
  const dispatch = useDispatch();
  const [testID, setTestID] = useState<string>("");


  const handleTestIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestID((e.target as HTMLInputElement).value);
  }

  const handleSubmit = async () => {
    if (testID === "") {
      return;
    }
    dispatch(setTestId(testID));
  };


  return (
    <>
      <h1 className="mb-8 text-3xl text-center">Test Id</h1>
      <input
        type="text"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="testId"
        placeholder="testId"
        onChange={(e) => handleTestIdInput(e)}
      />
      <button
        type="submit"
        className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
        onClick={() => handleSubmit()}
      >Save</button>

    </>
  );
};

export default TestId;
