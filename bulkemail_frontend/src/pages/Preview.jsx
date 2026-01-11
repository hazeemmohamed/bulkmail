import { useLocation, useNavigate } from "react-router-dom";
import React from 'react'

function Preview() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="p-6 text-center">
        <p>No preview data found</p>
        <button
          onClick={() => navigate("/history")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to History
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="bg-blue-950 text-white p-4 text-xl md:text-3xl font-bold">
        BulkMail
      </h1>

      <div className="bg-blue-400 p-4">
        <input type="text" className='focus:outline-none focus:ring-0 
          bg-white w-[80%] md:w-[60%] 
          border border-gray-400
          rounded-tl-xl rounded-tr-xl 
          md:text-lg text-sm p-2 wrap-normal' placeholder='TO:' readOnly value={`To: ${state.emailList.join(", ")}`} />
        <input
          type="text"
          value={state.subject}
          readOnly
          className="focus:outline-none bg-white w-[80%] md:w-[60%]
          border border-gray-400
          md:text-lg text-sm p-2"
        />

        <textarea
          value={state.message}
          readOnly
          className="focus:outline-none bg-white w-[80%] h-[60vh]
          md:w-[60%] md:h-[40vh] border border-gray-400
          rounded-bl-xl rounded-br-xl md:text-lg text-sm p-2"
        />
      </div>

      <button
        onClick={() => navigate("/history")}
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>
    </div>
  );
}

export default Preview;
