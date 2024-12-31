const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        style={{
          shapeRendering: "auto",
          display: "block",
          background: "rgb(255, 255, 255)",
        }}
      >
        <g>
          <circle r="20" fill="#e90c59" cy="50" cx="30">
            <animate
              begin="-0.5s"
              values="30;70;30"
              keyTimes="0;0.5;1"
              dur="1s"
              repeatCount="indefinite"
              attributeName="cx"
            />
          </circle>
          <circle r="20" fill="#46dff0" cy="50" cx="70">
            <animate
              begin="0s"
              values="30;70;30"
              keyTimes="0;0.5;1"
              dur="1s"
              repeatCount="indefinite"
              attributeName="cx"
            />
          </circle>
          <circle r="20" fill="#e90c59" cy="50" cx="30">
            <animate
              begin="-0.5s"
              values="30;70;30"
              keyTimes="0;0.5;1"
              dur="1s"
              repeatCount="indefinite"
              attributeName="cx"
            />
            <animate
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;0.499;0.5;1"
              calcMode="discrete"
              values="0;0;1;1"
              attributeName="fill-opacity"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
};
export default Loader;