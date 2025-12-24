import { useReducer } from "react";
import "../MultiStepForm.css";

const initialState = {
  step: 1,
  formData: {
    name: "",
    email: "",
    username: "",
    password: "",
  },
  isSubmitted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };

    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };

    case "PREVIOUS_STEP":
      return { ...state, step: state.step - 1 };

    case "SUBMIT_FORM":
      return { ...state, isSubmitted: true };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

export default function MultiStepForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, formData, isSubmitted } = state;

  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }

  if (isSubmitted) {
    return (
      <div className="form-container">
        <h2>Registration Complete 🎉</h2>
        <button onClick={() => dispatch({ type: "RESET_FORM" })}>
          Start Again
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Step {step}</h2>

      {step === 1 && (
        <>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </>
      )}

      {step === 2 && (
        <>
          <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </>
      )}

      {step === 3 && (
        <div className="review">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Username:</strong> {formData.username}</p>
        </div>
      )}

      <div className="buttons">
        {step > 1 && <button onClick={() => dispatch({ type: "PREVIOUS_STEP" })}>Back</button>}
        {step < 3 && <button onClick={() => dispatch({ type: "NEXT_STEP" })}>Next</button>}
        {step === 3 && <button onClick={() => dispatch({ type: "SUBMIT_FORM" })}>Submit</button>}
      </div>
    </div>
  );
}
