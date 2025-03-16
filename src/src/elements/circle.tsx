/** @jsx h */
import { h } from "preact";
export function CircleBar(params: { value: number }) {
  const { value: val } = params;
  const rval = val * 0.8333333333333334;
  if (val >= 1) {
    return (
      <svg className="label circle max" viewBox="0 0 56 56">
        <path
          className="circle-base"
          fill="#f608"
          d="M 15.5 49.65063509461097 A 25 25 0 1 1 40.5 49.650635094611005 L 41.5 51.38268590217989 A 27 27 0 1 0 14.5 51.382685902179844 Z"
        />
        <path
          className="circle-val"
          fill="#0fc"
          d={`M ${circle_getXY(25, 1 / 3).join(" ")} A 25 25 0 ${
            rval > 0.5 ? 1 : 0
          } 1 ${circle_getXY(25, 1 / 3 + rval).join(" ")} L ${
            circle_getXY(27, 1 / 3 + rval).join(" ")
          } A 27 27 0 ${rval > 0.5 ? 1 : 0} 0 ${
            circle_getXY(27, 1 / 3).join(" ")
          } Z`}
        />
        <text className="circle-val-txt" x="43" y="37" fill="#0fc">100</text>
      </svg>
    );
  } else {
    return (
      <svg className="label circle" viewBox="0 0 56 56">
        <path
          className="circle-base"
          fill="#f608"
          d="M 15.5 49.65063509461097 A 25 25 0 1 1 40.5 49.650635094611005 L 41.5 51.38268590217989 A 27 27 0 1 0 14.5 51.382685902179844 Z"
        />
        <path
          className="circle-val"
          fill="#fa0"
          d={`M ${circle_getXY(25, 1 / 3).join(" ")} A 25 25 0 ${
            rval > 0.5 ? 1 : 0
          } 1 ${circle_getXY(25, 1 / 3 + rval).join(" ")} L ${
            circle_getXY(27, 1 / 3 + rval).join(" ")
          } A 27 27 0 ${rval > 0.5 ? 1 : 0} 0 ${
            circle_getXY(27, 1 / 3).join(" ")
          } Z`}
        />
        <text className="circle-val-txt" x="43" y="37" fill="#fa0">
          {Math.floor(val * 100)}
        </text>
      </svg>
    );
  }
}

export function CircleAngle(params: { value: number }) {
  const rval = params.value * 0.00462962962962963;
  return (
    <svg className="label circle" viewBox="0 0 56 56">
      <path
        className="circle-base"
        fill="#f608"
        d="M 15.5 49.65063509461097 A 25 25 0 1 1 40.5 49.650635094611005 L 41.5 51.38268590217989 A 27 27 0 1 0 14.5 51.382685902179844 Z"
      />
      <path
        className="circle-base-0"
        fill="#830"
        d="M 27.999999999999996 1 L 29.381391429644882 6.043411974578024 L 26.61860857035511 6.043411974578024 Z"
      />
      <path
        className="circle-val"
        fill="#fa0"
        d={`M ${circle_getXY(27, 1 / 3 + rval).join(" ")} L ${
          circle_getXY(22, 1 / 3 + rval + 0.01).join(" ")
        } L ${circle_getXY(22, 1 / 3 + rval - 0.01).join(" ")} Z`}
      />
      <text className="circle-val-txt" x="40" y="37" fill="#fa0">
        {Math.abs(Math.floor(params.value - 90))}
      </text>
    </svg>
  );
}

export function CircleAngle2(params: { value: number }) {
  const rval = params.value * 0.00462962962962963;
  return (
    <svg className="label circle" viewBox="0 0 56 56">
      <path
        className="circle-base"
        fill="#f608"
        d="M49.6506 40.5A25 25 0 1149.6506 15.5L51.3827 14.5A27 27 0 1051.3827 41.5Z"
      />
      <path
        className="circle-base-0"
        fill="#830"
        d="M 1 28 L 6.043411974578024 26.618608570355107 L 6.043411974578024 29.3813914296449 Z"
      />
      <path
        className="circle-val"
        fill="#fa0"
        d={`M ${circle_getXY(27, 1 / 3 - 0.25 + rval).join(" ")} L ${
          circle_getXY(22, 1 / 3 - 0.25 + rval + 0.01).join(" ")
        } L ${circle_getXY(22, 1 / 3 - 0.25 + rval - 0.01).join(" ")} Z`}
      />
      <text className="circle-val-txt" x="40" y="37" fill="#fa0">
        {Math.abs(Math.floor(params.value - 90))}
      </text>
    </svg>
  );
}

const circle_getXY = (
  r = 25,
  angle: number,
) => [
  28 + r * Math.cos(2 * Math.PI * angle),
  28 + r * Math.sin(2 * Math.PI * angle),
];

export function Compass(props: { value: number }) {
  const { value } = props;
  return (
    <svg className="label circle" viewBox={`0 0 56 56`}>
      <path
        fill="#f608"
        className="circle-base"
        d="M22.0171 3.7265A25 25 0 1033.9829 3.7265L34.4615 1.7846A27 27 0 1121.5385 1.7846Z"
      />
      <path
        fill="#fa0"
        className="circle-base"
        d="M 28 9 29 27 45 28 29 29 28 45 27 29 9 28 27 27 Z"
      />
      <path
        fill="#fa0"
        className="circle-base"
        d="M 37 37 29 28 37 19 28 27 19 19 27 28 19 37 28 29 Z"
      />
      <path
        className="circle-val"
        fill="#f30"
        d={`M ${circle_getXY(27, -0.25 + value).join(" ")} L ${
          circle_getXY(15, 0.27 + value).join(" ")
        } L ${circle_getXY(15, 0.23 + value).join(" ")} Z`}
      />
      <text
        className="circle-val-txt"
        x="34"
        y="9"
        fill="#fa0"
        style={{
          fontSize: "10px",
        }}
      >
        N
      </text>
    </svg>
  );
}
