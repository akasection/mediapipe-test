import { PluginOption } from "vite";
import { basename } from "pathe";

// get from types
const EXPORT_NAMES = {
  "camera_utils.js": ["Camera"],
  "drawing_utils.js": ["clamp", "drawLandmarks", "drawConnectors", "drawRectangle", "lerp"],
  "pose.js": [
    "Pose",
    "VERSION",
    "POSE_CONNECTIONS",
    "POSE_LANDMARKS",
    "POSE_LANDMARKS_LEFT",
    "POSE_LANDMARKS_RIGHT",
    "POSE_LANDMARKS_NEUTRAL",
  ],
  "face_mesh.js": [
    "VERSION",
    "FACEMESH_LIPS",
    "FACEMESH_LEFT_EYE",
    "FACEMESH_LEFT_EYEBROW",
    "FACEMESH_LEFT_IRIS",
    "FACEMESH_RIGHT_EYE",
    "FACEMESH_RIGHT_EYEBROW",
    "FACEMESH_RIGHT_IRIS",
    "FACEMESH_FACE_OVAL",
    "FACEMESH_CONTOURS",
    "FACEMESH_TESSELATION",
    "FaceMesh"
  ],
};

export default function mediapipePlugin(): PluginOption {
  return {
    name: "vite-plugin-mediapipe",
    enforce: "pre",
    async transform(code, id) {
      const fileName = basename(id) as keyof typeof EXPORT_NAMES;
      if (!(fileName in EXPORT_NAMES)) return { code, map: null };
      return {
        code: `
          const GlobalExport = {};
          ${code.replace(".call(this)", ".call(GlobalExport)")}

          ${EXPORT_NAMES[fileName].map((exp) => `export const ${exp} = GlobalExport.${exp};`).join("\n")}
          export default GlobalExport;
        `,
        map: null,
      };
    },
  };
}
